import { PaymentMethodsData, StripeObject } from "../custom-types";

const listAllPaymentMethodsFunc = async (stripe:StripeObject,customer:string):Promise<PaymentMethodsData>=>{
    const paymentMethods = await stripe.paymentMethods.list(
        {customer,type:"card"}
      );
    return paymentMethods.data
}

export default listAllPaymentMethodsFunc