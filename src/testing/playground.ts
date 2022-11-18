import User from "./model"
const StripeGoose = require("../index")
require("dotenv").config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const stripegoose = new StripeGoose(stripeSecretKey,User)

const main = async ()=>{
    const response = await stripegoose.getUsersPaymentMethods("userWithPaymentMethods")           
    const res = response.map(p=>p.id)
    console.log(res);
    
    

}

main()

// 'pm_1M5UwoIL4JNHFQKV0xZIkEtV'
// 'pm_1M5UwpIL4JNHFQKV12p4jPun'