import { StripeObject } from "../custom-types"

const makePaymentFunc1 = async (customer:string,paymentMethodId:string,amount:number,currency:string,stripe:StripeObject)=>{
    const paymentIntent = await stripe.paymentIntents.create(
        {customer,amount,
        currency,
        payment_method_types: ['card'],
        payment_method:paymentMethodId,
        confirm:false
    }
    )
    return paymentIntent
}

export default makePaymentFunc1