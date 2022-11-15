import { PaymentMethod, StripeObject } from "../custom-types"

const addPaymentMethodAfterCreatingFunc = async (customerId:string,paymentMethodId:string,stripe:StripeObject):Promise<PaymentMethod|Error|void>=>{
    try{
        const paymentMethod = await stripe.paymentMethods.attach(
            paymentMethodId,
            {customer: customerId}
            )
            return paymentMethod
        }catch(err){
            return new Error(err)
        }
}

export default addPaymentMethodAfterCreatingFunc