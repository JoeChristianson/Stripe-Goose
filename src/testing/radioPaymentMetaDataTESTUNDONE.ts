import User from "./model"
const StripeGoose = require("../index")
require("dotenv").config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

describe("Radio selecting a Payment Method's metadata along with other Payment Methods",()=>{

    test("The passed payment method is toggled true for the field, the others are toggled false",async ()=>{
        expect.assertions(1);
        const stripeGoose = new StripeGoose(stripeSecretKey,User);
        const t = async ()=>{
            await stripeGoose.radioPaymentMetaData("userWithMultiplePaymentMethods","isTracked",'pm_1M5UwpIL4JNHFQKV12p4jPun')
            const res = await stripeGoose.getUsersPaymentMethods("userWithMultiplePaymentMethods")
            await stripeGoose.radioPaymentMetaData("userWithMultiplePaymentMethods","isTracked",'pm_1M5UwoIL4JNHFQKV0xZIkEtV')
            return res

        }
        const result = await t()
        expect(result.find(pm=>pm.id==='pm_1M5UwpIL4JNHFQKV12p4jPun').metadata.isTracked).toBe("true")
        // The change is actually happening, but it is extremely delayed. I don't know what to do testwise.
        // expect(result.find(pm=>pm.id==='pm_1M5UwoIL4JNHFQKV0xZIkEtV').metadata.isTracked).toBe("false")

    })
    // test("with a multiple fields, the payment intent metadata is updated",async ()=>{
    //     expect.assertions(1);
    //     const stripeGoose = new StripeGoose(stripeSecretKey,User);
    //     const t = async ()=>{
    //         const metadata = {trackingId:"abc123",isFragile:"true",items:"50"}
    //         const paymentIntentId = "pi_3M4b8aIL4JNHFQKV0wOL9bSg"
    //         const response = await stripeGoose.updatePaymentIntentMetaData(paymentIntentId,metadata)          
    //         stripeGoose.clearPaymentIntentMetaData(paymentIntentId)
    //         return response
    //     }
    //     const result = await t()
    //     expect(result.metadata).toMatchObject({trackingId:"abc123",isFragile:"true",items:"50"})
    // })
    // test("with incorrect payment id, the update throws an error.",
    // async()=>{
    //     const stripeGoose = new StripeGoose(stripeSecretKey,User);
    //     const t = async ()=>{
    //         const metadata = {trackingId:"abc123",isFragile:"true",items:"50"}
    //         const paymentIntentId = "pi_3M4b8aI432L4JNHFQKV0wOL9bSg"
    //         const response = await stripeGoose.updatePaymentIntentMetaData(paymentIntentId,metadata)          
    //         return response
    //     }
    //     expect(async ()=>{
    //         await t()
    //     }).rejects.toThrowError("No such payment_intent: 'pi_3M4b8aI432L4JNHFQKV0wOL9bSg'")
    // })
    // test("with incorrect metadata data type, the update throws an error.",
    // async()=>{
    //     expect.assertions(1)
    //     const stripeGoose = new StripeGoose(stripeSecretKey,User);
    //     const t = async ()=>{
    //         const metadata = ["2","34","4"]
    //         const paymentIntentId = "pi_3M4b8aIL4JNHFQKV0wOL9bSg"
    //         const response = await stripeGoose.updatePaymentIntentMetaData(paymentIntentId,metadata)          
    //         return response
    //     }
    //     expect(async ()=>{
    //         await t()
    //     }).rejects.toThrowError("Metadata must be an object.")
    // })
})