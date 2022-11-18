// We'll have to see the methods by which stripegoose interacts with the model.

type UserModelType = {
    users:UserType[],
    findById:Function,
    addUser:Function,
}

type UserType = {
    id:string,
    save:Function
}

const User:UserModelType = {
    users:[],
    findById(id:string):any{
        return this.users.find((user:UserType)=>{
            return user?.id===id
        })
    },
    addUser(user:(UserType)){
        this.users.push(user)
    },


}

const userMethods = {
    save(){
        return "saved"
    }
}

const user0 = {id:"0",stripeId:"cus_MnnCidkFvgekHB",...userMethods}
const user1 = {id:"1",...userMethods}
// this is an incorrect stripeId
const user2 = {id:"2",stripeId:"cus_isdnfin3939nvf9",...userMethods}
const userWithCorrectStripeId = {id:"userWithCorrectStripeId",stripeId:"cus_MoQil87e5BWxM0",...userMethods}
const userWithPaymentMethods = {id:"userWithPaymentMethods",stripeId:"cus_MourjJIjIoIoY5",...userMethods}
User.addUser(user0)
User.addUser(user1)
User.addUser(user2)
User.addUser(userWithCorrectStripeId)
User.addUser(userWithPaymentMethods)

export default User

