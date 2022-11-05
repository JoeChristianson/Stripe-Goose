import { PaymentMethod, StripeObject } from "../custom-types"

const removePaymentMethodFunc1 = async (paymentMethodId:string,stripe:StripeObject):Promise<PaymentMethod>=>{
    const paymentMethod = await stripe.paymentMethods.detach(
        paymentMethodId
    )
    return paymentMethod
}

export default removePaymentMethodFunc1