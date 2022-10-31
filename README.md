# Stripe-Goose

This is a package for handling stripe actions using a customerId value in a mongoose document's field. 

## Instantiating the Object

All the methods are attached to one exported class. 

```const stripegoose = new Stripegoose(stripeId,User)```

The constructor calls for a stripe secret key as its first argument, and a mongoose collection for its second argument. This Mongoose collection's schema must include "stripeId" as a field (and it should be of type "string").

## Methods

Note: Most the following methods require a 'docId.' By this, I just mean the id of the mongoDB document that you are attaching the stripe customer to. This document needs to be part of the same collection that was passed in the constructor. For the examples below, we are using the id of a particular user document that is in our User collection.

The following methods are available:

### createCustomer(docId)

```
const userId = "6343333d7d02232f0f469664"
stripegoose.createCustomer(userId)
```

This function will use the stripe API to create a customerId, which then will be saved in the "stripeId" field of the document.

### addCard(docId,cardInfo)

```
    const userId = "6343333d7d02232f0f469664"
    const card =   {
        number: '5555555555554444',
        exp_month: 10,
        exp_year: 2023,
        cvc: '314',
    }
    await stripegoose.addCard(userId,card)
```

This will add the card as a payment method on stripe. This payment method will not be saved to the database.

### addPaymentMethodWithId(userId,paymentMethodId)

```
    const paymentMethodId = "pm_934nmvf893nv89jn3vf"
    const userId = "6343333d7d02232f0f469664"
    stripegoose.addPaymentMethodWithId(userId,paymentMethodId)
```

This method is useful if the client is creating the payment method on the frontend. After creating it, they can post to the server the paymentMethodId so you can add it to their customer profile on stripe.

### getUsersCards(docId)

```
    const userId = "6343333d7d02232f0f469664"
    const cards = await stripegoose.getUsersCards(userId)
```

This will retrieve all the user's cards using the Stripe API.

### getUsersPaymentMethodIds(docId)

This operates like the above method, but just returns an array of the paymentMethodIds.

### makePayment(docId,paymentMethodId,amount,currency)

```
const userId = "6343333d7d02232f0f469664"
const response = await stripegoose.makePayment(userId,"pm_39493ndf839njv90nj3f",9995,"usd")
```

Payment method ids can be fetched with stripegoose.getUsersCards(docId)
The amount is given in cents. 
The code for various currencies can be found in stripe's documentation.

### removeCard(paymentMethodId)

```stripegoose.removePaymentMethod("pm_1Lr8RgIL4JNHFQKVySUDxcja")```

Note that you do not need the doc's id to remove a payment method.

### updateMetaData(paymentMethodId,metadata)

    const paymentMethodId = "pm_934nmvf893nv89jn3vf"
    const metadata = {tag:"Business Card"}
    stripegoose.updateMetaData(paymentMethodId,metadata)

This is useful if you want to store information about the card that is not a built in field for the Stripe API. This means that you do not have to create a separate model for storing these values in your database.

### radioPaymentMetaData(userId,metaDataTag,paymentMethodId)

```
    const userId = "6343333d7d02232f0f469664"
    const metaDataTag = "isDefault"
    const paymentMethodId = "pm_934nmvf893nv89jn3vf"
    stripegoose.radioPaymentMetaData(userId,metaDataTag,paymentMethodId)
```

The above example sets isDefault to true for the given payment method and sets isDefault to false for all other payment methods for that customer.

### Further Development

I created this library to help with a specific e-commerce site I was interning at. It includes at this point only the functionality that that specific project required. If there are additional methods that would be helpful for your project, please reach out to me at joechristiansonwebdev@gmail.com for suggestions.