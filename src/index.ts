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
        if(!user){
            console.log("throwin error");
            
            throw new Error("Incorrect ID passed as parameter.")
        }
        const res:any = await createCustomerFunc(this.stripe,user)
        return res
    }
    async deleteCustomer(userId:string):Promise<object>{
        const user:UserDocument = await this.getUser(userId)
        const stripeId = await user.stripeId
        const res:any = await this.stripe.customers.del(stripeId)
        return res
    }
    async getUser(userId:string):Promise<UserDocument>{
        return await this.collection.findById(userId)
    }
    async addPaymentMethodWithId(userId:string,paymentMethodId:string):Promise<object|Error>{
        try{
            const user:UserDocument = await this.getUser(userId)
            const customerId:string = await user.stripeId
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
        const customerId:string = await user.stripeId
        const res:(PaymentMethod|Error|void) = await addPaymentMethodAfterCreating(customerId,paymentMethod.id,this.stripe)
        if(!res||(res instanceof Error)||res.customer===undefined){
            throw "No Correct StripeId Found"
        }
        
        return res
    }
    async clearPaymentIntentMetaData(paymentIntentId:string){
        const metadata:any = await this.getPaymentIntentMetaData(paymentIntentId)
        for (let key in metadata){
            metadata[key]=""
        }
        const res = await this.updatePaymentIntentMetaData(paymentIntentId,metadata)
        return res
    }
    async clearPaymentMethodMetaData(paymentMethodId:string){
        const metadata:any = await this.getPaymentMethodMetaData(paymentMethodId)
        for (let key in metadata){
            metadata[key]=""
        }
        const res = await this.updatePaymentMethodMetaData(paymentMethodId,metadata)
        return res
    }
    async getPaymentIntent(paymentIntentId:string){
        const res = await this.stripe.paymentIntents.retrieve(paymentIntentId)
        return res
    }
    async getPaymentIntentMetaData(paymentIntentId){
        const paymentIntent = await this.getPaymentIntent(paymentIntentId)
        return paymentIntent.metadata
    }
    async getPaymentMethod(paymentMethodId:string){
        const res = await this.stripe.paymentMethods.retrieve(paymentMethodId)
        return res
    }
    async getPaymentMethodMetaData(paymentMethodId){
        const paymentMethod = await this.getPaymentMethod(paymentMethodId)
        return paymentMethod.metadata
    }
    async getUsersPaymentMethods(userId:string):Promise<PaymentMethodsData>{
        const user:UserDocument = await this.getUser(userId)
        const customerId:string = await user.stripeId
        if(!customerId){
            throw new Error("User does not have stripeId.")
        }
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
                    console.log("changing to true",pmId);
                    
                    await this.updateMetaData(pmId,{[metadataTag]:"true"})
                }
                else{
                    console.log("changing to false",pmId);
                    await this.updateMetaData(pmId,{[metadataTag]:"false"})
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
        const customer:string = await user.stripeId
        const res:PaymentIntent = await makePaymentFunc(customer,paymentMethodId,amount,currency,this.stripe,options)
        return res
    }
    // this is the same as the function below with a more specific name
    async updateMetaData(paymentMethodId:string,metadata:object):Promise<any>{
        if(!(typeof metadata ==="object") || Array.isArray(metadata)){
            throw new Error("Metadata must be an object.")
        }
        try{

            const res:any = await this.stripe.paymentMethods.update(
                paymentMethodId,{metadata}
                )
                return res
            }catch(err){                
                throw new Error(err.raw.message)
            }
    }
    async updatePaymentMethodMetaData(paymentMethodId:string,metadata:object):Promise<any>{
        if(!(typeof metadata ==="object") || Array.isArray(metadata)){
            throw new Error("Metadata must be an object.")
        }
        try{

            const res:any = await this.stripe.paymentMethods.update(
                paymentMethodId,{metadata}
                )
                return res
            }catch(err){
                throw new Error(err.raw.message)
            }
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
