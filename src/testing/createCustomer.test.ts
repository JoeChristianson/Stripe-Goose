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
        stripeGoose.deleteCustomer("1")
        stripeGoose.stripe.customers.del(user.stripeId)
        stripeGoose.stripe.customers.del("cus_MoRRjuBX98HZgf")
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
            await stripeGoose.createCustomer("20");
            const user = User.findById("20")
            return user.stripeId
    }
    expect(async ()=>{
        await t()
    }).rejects.toThrowError("Incorrect ID passed as parameter.")
})

})