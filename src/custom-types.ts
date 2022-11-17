export type Card = {
    number:string,
    exp_month: number,
    exp_year: number,
    cvc: number,
}

export type StripeCustomer = object

type StripeCustomers = {
    create:Function
    del:Function
}

export type PaymentMethod = {
    id:string,
    card:object,
    customer:string
    metadata:object
}
type TypeAndCard = {
    type:string,
    card:Card
}

type PaymentMethodsAttach = (a:string,b:object)=>Promise<PaymentMethod>
type PaymentMethodsCreate = (a:TypeAndCard)=>Promise<PaymentMethod>

type PaymentMethodsList = (a:{customer:string,type:string})=>Promise<StripePaymentMethods>
type PaymentMethodsRetrieve = (a:string)=>Promise<PaymentMethod>
type PaymentMethodsUpdate = (a:string,b:object)=>Promise<any>


export type PaymentMethodsData = PaymentMethod[]

type StripePaymentMethods = {
    attach:PaymentMethodsAttach,
    create:PaymentMethodsCreate,
    list:PaymentMethodsList,
    retrieve:PaymentMethodsRetrieve,
    update:PaymentMethodsUpdate,
    detach:(a:string)=>PaymentMethod,
    data:PaymentMethodsData
}

export type PaymentIntent = any

type PaymentIntentsCreate = (a:{customer:string,amount:number,currency:string,payment_method_types:string[],payment_method:string,confirm:boolean})=>Promise<PaymentIntent>
type PaymentIntentsUpdate = (paymentIntentId:string,paymentIntentProperties:object)=>Promise<PaymentIntent>
type PaymentIntentsRetrieve = (paymentIntentId:string)=>Promise<PaymentIntent>

type StripePaymentIntents = {
    create:PaymentIntentsCreate,
    retrieve:PaymentIntentsRetrieve,
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
