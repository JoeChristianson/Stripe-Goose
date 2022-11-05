import { Card, PaymentMethod, StripeObject } from "../custom-types";

const createPaymentMethodFunc = async (card:Card,stripe:StripeObject):Promise<PaymentMethod>=>{
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card

        // type: 'card',
        // card: {
        //   number: '4242424242424242',
        //   exp_month: 10,
        //   exp_year: 2023,
        //   cvc: '314',
        // },
      });
    return paymentMethod
}

export default createPaymentMethodFunc