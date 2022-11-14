import { StripeObject } from "../custom-types"

const makePaymentFunc1 = async (customer,paymentMethodId,amount,currency,stripe,options)=>{
    const paymentIntent = await stripe.paymentIntents.create(
        {customer,amount,
        currency,
        payment_method_types: ['card'],
        payment_method:paymentMethodId,
        confirm:options?.confirm||false
    }
    )
    return paymentIntent
}

export default makePaymentFunc1