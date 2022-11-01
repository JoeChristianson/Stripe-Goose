

const createCustomer = async (stripe,user)=>{
  const customer = await stripe.customers.create({
      description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
    });
    user.stripeId = customer.id;
    user.save()
    return customer
}



module.exports = createCustomer
