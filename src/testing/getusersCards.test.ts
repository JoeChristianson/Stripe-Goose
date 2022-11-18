import User from "./model"
const StripeGoose = require("../index")
require("dotenv").config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

describe("Getting a User's cards",()=>{

    test("With correct userId passed, User's Cards are returned",async ()=>{
        const stripeGoose = new StripeGoose(stripeSecretKey,User);
        const t = async ()=>{
            const response = await stripeGoose.getUsersCards("userWithPaymentMethods")   
            console.log(response);
                    
            const res = response.map(p=>p.last4)

            return res
        }
        return t().then(data=>{        
            expect(data).toEqual(["4242"])
        })
    })
    test("With userId with no payment methods, empty array is returned",async ()=>{
        const stripeGoose = new StripeGoose(stripeSecretKey,User);
        const t = async ()=>{
            const response = await stripeGoose.getUsersCards("userWithCorrectStripeId")
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
            const response = await stripeGoose.getUsersCards("1")
            const res = response.map(p=>p.id)
        }
        expect(async ()=>{
            await t()
        }).rejects.toThrowError("User does not have stripeId.")
    })
})