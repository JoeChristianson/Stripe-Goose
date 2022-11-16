import { Card, PaymentIntent, PaymentMethod, PaymentMethodsData, StripeObject, UserDocument } from "./custom-types"
import listAllPaymentMethods from "./actions/listAllPaymentMethods"
import addPaymentMethodAfterCreating from "./actions/addPaymentMethod"
import createCustomerFunc from "./actions/createCustomer"
import createPaymentMethod from "./actions/createPaymentMethod"
import removePaymentMethodFunc from "./actions/removePaymentMethod"
import makePaymentFunc from "./actions/makePayment"

class StripeGoose{
    stripeSecretKey:string;
    stripe:StripeObject;
    collection:any;
    modelCheck:any;
    constructor(stripeSecretKey,collection){
        this.stripeSecretKey=stripeSecretKey
        this.stripe = require("stripe")(stripeSecretKey)
        this.collection = collection;
        this.modelCheck = collection.findById.prototype
    }
    async createCustomer(userId:string):Promise<object>{
        const user:UserDocument = await this.getUser(userId)
        const res:any = await createCustomerFunc(this.stripe,user)
        return res
    }
    async getUser(userId:string):Promise<UserDocument>{
        return this.collection.findById(userId)
    }
    async addPaymentMethodWithId(userId:string,paymentMethodId:string):Promise<object|Error>{
        try{
            const user:UserDocument = await this.getUser(userId)
            const customerId:string = user.stripeId
            const res:(PaymentMethod|Error|void) = await addPaymentMethodAfterCreating(customerId,paymentMethodId,this.stripe)
            if(!res){
                throw "payment method failed to add"
            }
            return res;
        }catch(err){
            return err
        }
    }
    async addCard(userId:string,card:Card):Promise<object|void>{
        const paymentMethod:PaymentMethod = await createPaymentMethod(card,this.stripe)
        const user:UserDocument = await this.getUser(userId)
        const customerId:string = user.stripeId
        const res:(PaymentMethod|Error|void) = await addPaymentMethodAfterCreating(customerId,paymentMethod.id,this.stripe)
        if(!res||(res instanceof Error)||res.customer===undefined){
            throw "No Correct StripeId Found"
        }
        
        return res
    }
    async getUsersPaymentMethods(userId:string):Promise<PaymentMethodsData>{
        const user:UserDocument = await this.getUser(userId)
        const customerId:string = user.stripeId
        const res:(PaymentMethodsData) =  await listAllPaymentMethods(this.stripe,customerId)
        return res
    }
    async getUsersPaymentMethodsIds(userId:string):Promise<string[]>{
        const pms = await this.getUsersPaymentMethods(userId)
        return pms.map(pm=>pm.id)
    }
    async radioPaymentMetaData(userId:string,metadataTag:string,paymentMethodId:string):Promise<void>{
        try{
            const pmIds:string[] = await this.getUsersPaymentMethodsIds(userId);
            pmIds.forEach(async pmId=>{
                if(pmId===paymentMethodId){
                    await this.updateMetaData(pmId,{[metadataTag]:true})
                }
                else{
                    await this.updateMetaData(pmId,{[metadataTag]:false})
                }
            })
        }catch(err){
            console.error(err)
        }
    }
    async getUsersCards(userId:string):Promise<any[]>{
        const paymentMethods:PaymentMethod[] = await this.getUsersPaymentMethods(userId)
        const res:any[] = paymentMethods.map(m=>m.card);
        return res
    }
    async removeCard (paymentMethodId:string):Promise<any>{
        const res = await removePaymentMethodFunc(paymentMethodId,this.stripe)
        return res
    }
    async makePayment (userId:string,paymentMethodId:string,amount:number,currency:string,options):Promise<PaymentIntent>{
        const user:UserDocument = await this.getUser(userId)
        const customer:string = user.stripeId
        const res:PaymentIntent = await makePaymentFunc(customer,paymentMethodId,amount,currency,this.stripe,options)
        return res
    }
    async updateMetaData(paymentMethodId:string,metadata:object):Promise<any>{
        const res:any = await this.stripe.paymentMethods.update(
            paymentMethodId,{metadata}
        )
        return res
    }
    async updatePaymentIntentMetaData(paymentIntentId:string,metadata:object):Promise<any>{
        if(!(typeof metadata ==="object") || Array.isArray(metadata)){
            throw new Error("Metadata must be an object.")
        }
        try{

            const res:any = await this.stripe.paymentIntents.update(
                paymentIntentId,{metadata}
                )
                        return res
            }catch(err){
                throw new Error(err.raw.message)
            }
    }
    async testKey(){
        try{
            const stripeTest = require("stripe")(this.stripeSecretKey)
            const customers = await stripeTest.customers.list({limit:1})
            return {error:false}
        }catch(err){
            // throw new Error("Incorrect Stripe Key")
            return {error:"Incorrect Stripe Key"}
        }
    }
}


module.exports = StripeGoose
