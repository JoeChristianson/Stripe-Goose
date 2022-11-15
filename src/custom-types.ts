export type Card = {
    number:string,
    exp_month: number,
    exp_year: number,
    cvc: number,
}

export type StripeCustomer = object

type StripeCustomers = {
    create:Function
}

export type PaymentMethod = {
    id:string,
    card:object,
    customer:string
}
type TypeAndCard = {
    type:string,
    card:Card
}

type PaymentMethodsAttach = (a:string,b:object)=>Promise<PaymentMethod>
type PaymentMethodsCreate = (a:TypeAndCard)=>Promise<PaymentMethod>

type PaymentMethodsList = (a:{customer:string,type:string})=>Promise<StripePaymentMethods>

type PaymentMethodsUpdate = (a:string,b:object)=>Promise<any>

export type PaymentMethodsData = PaymentMethod[]
type StripePaymentMethods = {
    attach:PaymentMethodsAttach,
    create:PaymentMethodsCreate,
    list:PaymentMethodsList,
    update:PaymentMethodsUpdate,
    detach:(a:string)=>PaymentMethod,
    data:PaymentMethodsData
}

export type PaymentIntent = any

type PaymentIntentsCreate = (a:{customer:string,amount:number,currency:string,payment_method_types:string[],payment_method:string,confirm:boolean})=>Promise<PaymentIntent>
type PaymentIntentsUpdate = (paymentIntentId:string,paymentIntentProperties:object)=>Promise<PaymentIntent>

type StripePaymentIntents = {
    create:PaymentIntentsCreate,
    update:PaymentIntentsUpdate
}

export type StripeObject = {
    customers:StripeCustomers;
    paymentMethods:StripePaymentMethods;
    paymentIntents:StripePaymentIntents;
}

export type UserDocument = {
    stripeId:string,
    save:Function
}
