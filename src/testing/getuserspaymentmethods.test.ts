import User from "./model"
const StripeGoose = require("../index")
require("dotenv").config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

describe("Getting a User's payment methods",()=>{

    test("With correct userId passed, User's payment Methods are returned",async ()=>{
        const stripeGoose = new StripeGoose(stripeSecretKey,User);
        const t = async ()=>{
            const response = await stripeGoose.getUsersPaymentMethods("userWithPaymentMethods")           
            const res = response.map(p=>p.id)
            return res
        }
        return t().then(data=>{        
            expect(data).toEqual(["pm_1M5H1qIL4JNHFQKV52FxTMss"])
        })
    })
    test("With userId with no payment methods, empty array is returned",async ()=>{
        const stripeGoose = new StripeGoose(stripeSecretKey,User);
        const t = async ()=>{
            const response = await stripeGoose.getUsersPaymentMethods("userWithCorrectStripeId")
            const res = response.map(p=>p.id)
            return res
        }
        return t().then(data=>{        
            expect(data).toEqual([])
        })
    })
    test("With userId with no stripeId, error is thrown",async ()=>{
        const stripeGoose = new StripeGoose(stripeSecretKey,User);
        const t = async ()=>{
            const response = await stripeGoose.getUsersPaymentMethods("1")
            const res = response.map(p=>p.id)
        }
        expect(async ()=>{
            await t()
        }).rejects.toThrowError("User does not have stripeId.")
    })
})