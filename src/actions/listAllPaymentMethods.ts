const listAllPaymentMethodsFunc = async (stripe,customer)=>{
    const paymentMethods = await stripe.paymentMethods.list(
        {customer,type:"card"}
      );
    return paymentMethods.data
}

module.exports = listAllPaymentMethodsFunc