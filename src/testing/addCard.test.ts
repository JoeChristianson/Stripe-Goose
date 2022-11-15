import User from "./model"
const StripeGoose = require("../index")
require("dotenv").config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

describe("Adding Cards to Customer",()=>{

test("with a User with a stripeId, we can add a card using a well-formed card object as an argument",()=>{
    expect.assertions(1)
    const stripeGoose = new StripeGoose(stripeSecretKey,User);
    const t = async ()=>{
        const card ={
            number: '5555555555554444',
            exp_month: 10,
            exp_year: 2023,
            cvc: '314',
          }
        const response = await stripeGoose.addCard("0",card)
        const result = {customer:response.customer.substring(0,4),object:response.object}
        return result
    }
    return t().then(data=>{        
        expect(data).toEqual({customer:"cus_",object:"payment_method"})
    })
})
test("Fails with a bad Card argument",()=>{
    const stripeGoose = new StripeGoose(stripeSecretKey,User);
    const t = async ()=>{
        try{

            const card = "VISA"
            const response = await stripeGoose.addCard("0",card)
            const result = {customer:response?.customer.substring(0,4),object:response?.object}
            return result
        }catch(err){
            return "error"
        }
    }
    return t().then((data)=>{      
        expect(data).toBe("error")
    })
})
test("Fails with an invalid card number",()=>{
    const stripeGoose = new StripeGoose(stripeSecretKey,User);
    const t = async ()=>{
        try{

            const card ={
                number: '555555555554444',
                exp_month: 10,
                exp_year: 2023,
                cvc: '314',
              }
            const response = await stripeGoose.addCard("0",card)
            const result = {customer:response?.customer.substring(0,4),object:response?.object}
            return result
        }catch(err){
            return "error"
        }
    }
    return t().then((data)=>{      
        expect(data).toBe("error")
    })
})
test("Fails with a declined card",()=>{
    const stripeGoose = new StripeGoose(stripeSecretKey,User);
    const t = async ()=>{
        try{

            const card ={
                number: '4000000000000002',
                exp_month: 10,
                exp_year: 2023,
                cvc: '314',
              }
            const response = await stripeGoose.addCard("0",card)
            const result = {customer:response?.customer.substring(0,4),object:response?.object}
            return result
        }catch(err){
            return err
            
        }
    }
    return t().then((data)=>{      
        expect(data).toBe("No Correct StripeId Found")
    })
})


test("with a User with no stripeId yet, the request fails",()=>{
    const stripeGoose = new StripeGoose(stripeSecretKey,User);
    const t = async ()=>{
        try{
            const card ={
                number: '5555555555554444',
                exp_month: 10,
                exp_year: 2023,
                cvc: '314',
              }
            const response = await stripeGoose.addCard("1",card)
            const result = {customer:response?.customer.substring(0,4),object:response?.object}
            return result
        }catch(err){
            return "error"
        }
    }
    return t().then((data)=>{      
        expect(data).toBe("error")
    })
})
test("with a User with an incorrect stripeId, the request fails",()=>{
    const stripeGoose = new StripeGoose(stripeSecretKey,User);
    const t = async ()=>{
        try{
            const card ={
                number: '5555555555554444',
                exp_month: 10,
                exp_year: 2023,
                cvc: '314',
              }
            const response = await stripeGoose.addCard("2",card)
            const result = {customer:response?.customer.substring(0,4),object:response?.object}
            return result
        }catch(err){
            return "error"
        }
    }
    return t().then((data)=>{      
        expect(data).toBe("error")
    })
})
test("with an invalid UserId, the request fails",()=>{
    const stripeGoose = new StripeGoose(stripeSecretKey,User);
    const t = async ()=>{
        try{
            const card ={
                number: '5555555555554444',
                exp_month: 10,
                exp_year: 2023,
                cvc: '314',
              }
            const response = await stripeGoose.addCard("20",card)
            const result = {customer:response?.customer.substring(0,4),object:response?.object}
            return result
        }catch(err){
            return "error"
        }
    }
    return t().then((data)=>{      
        expect(data).toBe("error")
    })
})
})