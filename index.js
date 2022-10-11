const addPaymentMethodAfterCreating = require("./actions/addPaymentMethod")
const createCustomerFunc = require("./actions/createCustomer")
const createPaymentMethod = require("./actions/createPaymentMethod")
const listAllPaymentMethods = require("./actions/listAllPaymentMethods")
const removePaymentMethodFunc = require("./actions/removePaymentMethod")
const makePaymentFunc = require("./actions/makePayment")

class StripeGoose{
    constructor(stripeSecretKey,collection){
        this.stripeSecretKey=stripeSecretKey
        this.stripe = require("stripe")(stripeSecretKey)
        this.collection = collection
    }
    async createCustomer(userId){
        const user = await this.getUser(userId)
        createCustomerFunc(this.stripe,user)
    }
    async getUser(userId){
        return this.collection.findById(userId)
    }
    async addCard(userId,card){
        const paymentMethod = await createPaymentMethod(card,this.stripe)
        const user = await this.getUser(userId)
        const customerId = user.stripeId
        const res = await addPaymentMethodAfterCreating(customerId,paymentMethod.id,this.stripe)
        return res
    }
    async getUsersPaymentMethods(userId){
        const user = await this.getUser(userId)
        const customerId = user.stripeId
        const res =  await listAllPaymentMethods(this.stripe,customerId)
        return res
    }
    async getUsersCards(userId){
        const paymentMethods = await this.getUsersPaymentMethods(userId)
        const res = paymentMethods.map(m=>m.card);
        return res
    }
    async removeCard (paymentMethodId){
        const res = await removePaymentMethodFunc(paymentMethodId,this.stripe)
        return res
    }
    async makePayment (userId,paymentMethodId,amount,currency){
        const user = await this.getUser(userId)
        const customer = user.stripeId
        const res = await makePaymentFunc(customer,paymentMethodId,amount,currency,this.stripe)
        return res
    }
}

module.exports = StripeGoose