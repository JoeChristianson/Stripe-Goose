#Stripe-Goose

This is a package for handling stripe actions using a customerId value in a mongoose document's field. 

## Instantiating the Object

All the methods are attached to one exported class. The constructor calls for a stripe secret key as its first argument, and a mongoose collection for its second argument. This Mongoose collection's schema must include "stripeId" as a field (and it should be of type "string").

## Methods

The following methods are available. All of them are asynchronous:

### createCustomer()

Pass in the document's id as an argument. This function will use the stripe API to create a customerId, which then will be saved in the "stripeId" field of the document.

### addCard()

Pass in the document's id as the first argument, and the card information as a second argument. This will add the card as a payment method on stripe. This payment method will not be saved to the database.

### getUsersCards()

Pass in the document's id as the only argument, and it will retrieve all the customer's cards' objects from Stripe.

### makePayment()

Pass in (in this order) document's id, payment method id (which can be retrieved with the getUsersCards method), the amount (in cents as an integer) and the currency (see stripe documentation for abbreviations). This will make a payment through stripe and return a confirmation of that payment.

### removeCard()

This takes in a payment method id as an argument and detaches that payment from stripe. When calling getUsersCards() it will no longer be in the array.

