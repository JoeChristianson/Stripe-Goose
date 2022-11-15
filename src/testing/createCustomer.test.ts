import User from "./model"
const StripeGoose = require("../index")
require("dotenv").config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY



describe("Creating a Customer",()=>{
test("with correct secret key and userId, customer is created and customerId is added to the user document",()=>{
    expect.assertions(1)
    const stripeGoose = new StripeGoose(stripeSecretKey,User);
    const t = async ()=>{
        const result = await stripeGoose.createCustomer("1");
        const user = User.findById("1")
        return user.stripeId
    }
    return t().then(data=>{        
        expect(data).toMatch(/^cus_/)
    })
})

test("With an incorrect userId, the method errors out.",()=>{
    expect.assertions(1)
    const stripeGoose = new StripeGoose(stripeSecretKey,User);
    const t = async ()=>{
        try{
            const result = await stripeGoose.createCustomer("20");
            const user = User.findById("1")
            return user.stripeId
        }catch(err){
            return "error"
        }
    }
    return t().then(data=>{        
        expect(data).toBe("error")
    })
})

})