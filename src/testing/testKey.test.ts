import User from "./model"
const falseSecretKey = "mnisdnf3njoivni234nooinin32noi3"
const StripeGoose = require("../index")
require("dotenv").config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

// No teardown needed

test("If we pass an correct key, the error is false",()=>{
    const t = async ()=>{
              const stripeGoose = new StripeGoose(stripeSecretKey,User)
              const {error} = await stripeGoose.testKey()
              return error
    }
    expect(t()).resolves.toBe(false)
})

test("If we pass an incorrect key, it throws an error",()=>{
    const t = async ()=>{
              const stripeGoose = new StripeGoose(falseSecretKey,User)
              const {error} = await stripeGoose.testKey()
              return error
    }
    expect(t()).resolves.toBe("Incorrect Stripe Key")
})