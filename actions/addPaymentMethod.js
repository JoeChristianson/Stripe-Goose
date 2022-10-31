const addPaymentMethodAfterCreating = async (customerId,paymentMethodId,stripe)=>{
    try{

        const paymentMethod = await stripe.paymentMethods.attach(
            paymentMethodId,
            {customer: customerId}
            )
            return paymentMethod
        }catch(err){
            console.error(err)
        }
}

module.exports = addPaymentMethodAfterCreating