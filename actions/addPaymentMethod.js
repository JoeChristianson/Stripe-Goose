const addPaymentMethodAfterCreating = async (customerId,paymentMethodId,stripe)=>{
    const paymentMethod = await stripe.paymentMethods.attach(
        paymentMethodId,
        {customer: customerId}
    )
    return paymentMethod
}

module.exports = addPaymentMethodAfterCreating