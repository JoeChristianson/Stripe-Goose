const removePaymentMethodFunc = async (paymentMethodId,stripe)=>{
    const paymentMethod = await stripe.paymentMethods.detach(
        paymentMethodId
    )
    return paymentMethod
}

module.exports = removePaymentMethodFunc