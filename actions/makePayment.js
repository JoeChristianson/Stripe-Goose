const makePaymentFunc = async (customer,paymentMethodId,amount,currency,stripe)=>{
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

module.exports = makePaymentFunc