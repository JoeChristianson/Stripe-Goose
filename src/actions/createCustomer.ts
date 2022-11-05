import {Document} from "mongoose"
import { StripeCustomer, StripeObject,UserDocument } from "../custom-types";

const createCustomer = async (stripe:StripeObject,user:UserDocument):Promise<StripeCustomer>=>{
  const customer = await stripe.customers.create({
      description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
    });
    user.stripeId = customer.id;
    user.save()
    return customer
}



export default createCustomer
