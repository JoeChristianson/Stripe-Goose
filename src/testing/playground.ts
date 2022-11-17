import User from "./model"
const StripeGoose = require("../index")
require("dotenv").config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const stripegoose = new StripeGoose(stripeSecretKey,User)

const main = async ()=>{
    const metadata = {test:"true"}
    const args = ["pi_3M4rIxIL4JNHFQKV0GCON2nR"]
    const res = await stripegoose.clearPaymentIntentMetaData(...args)
    console.log(res)
}

main()