import User from "./model"
const StripeGoose = require("../index")
require("dotenv").config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

describe("Updating Payment Intent Metadata",()=>{
    test("with a single field, the payment intent metadata is updated",async ()=>{
        expect.assertions(1);
        const stripeGoose = new StripeGoose(stripeSecretKey,User);
        const t = async ()=>{
            const metadata = {trackingId:"t3246ds4"}
            const paymentMethodId = "pm_1LvO3vIL4JNHFQKVsFlOJcw0"
            const response = await stripeGoose.updatePaymentMethodMetaData(paymentMethodId,metadata)
            return response
        }
        const result = await t()
        expect(result.metadata.trackingId).toBe("t3246ds4")
    }),
    test("with a multiple fields, the payment intent metadata is updated",async ()=>{
        expect.assertions(1);
        const stripeGoose = new StripeGoose(stripeSecretKey,User);
        const t = async ()=>{
            const metadata = {trackingId:"abc123",isFragile:"true",items:"50"}
            const paymentMethodId = "pm_1LvO3vIL4JNHFQKVsFlOJcw0"
            const response = await stripeGoose.updatePaymentMethodMetaData(paymentMethodId,metadata)          
            return response
        }
        const result = await t()
        expect(result.metadata).toMatchObject({trackingId:"abc123",isFragile:"true",items:"50"})
    })
    test("with incorrect payment id, the update throws an error.",
    async()=>{
        const stripeGoose = new StripeGoose(stripeSecretKey,User);
        const t = async ()=>{
            const metadata = {trackingId:"abc123",isFragile:"true",items:"50"}
            const paymentMethodId = "pi_3M4b8aI432L4JNHFQKV0wOL9bSg"
            const response = await stripeGoose.updatePaymentMethodMetaData(paymentMethodId,metadata)          
            return response
        }
        expect(async ()=>{
            await t()
        }).rejects.toThrowError("No such payment_intent: 'pi_3M4b8aI432L4JNHFQKV0wOL9bSg'")
    })
    test("with incorrect metadata data type, the update throws an error.",
    async()=>{
        expect.assertions(1)
        const stripeGoose = new StripeGoose(stripeSecretKey,User);
        const t = async ()=>{
            const metadata = ["2","34","4"]
            const paymentMethodId = "pm_1LvO3vIL4JNHFQKVsFlOJcw0"
            const response = await stripeGoose.updatePaymentMethodMetaData(paymentMethodId,metadata)          
            return response
        }
        expect(async ()=>{
            await t()
        }).rejects.toThrowError("Metadata must be an object.")
    })
})