import User from "./model"
import BadUser from "./badModel"
const StripeGoose = require("../index")
require("dotenv").config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

// No teardown needed

describe("Creating an instance of Stripegoose",()=>{
     test("We can create a stripegoose instance with a Model and a stripe secret key",()=>{
          const stripeGoose = new StripeGoose(stripeSecretKey,User)
          expect(typeof stripeGoose.stripe).toBe("object")
     })

     test("If we pass a bad collection, it errors out",()=>{
          const t = ()=>{
               try{

                    const stripeGoose = new StripeGoose(stripeSecretKey,BadUser)
               }catch(err){
                    return "error"
               }
          }

          expect(t()).toBe("error")
          
     })
})



