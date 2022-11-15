// We'll have to see the methods by which stripegoose interacts with the model.

type UserModelType = {
    users:UserType[],
    addUser:Function,
}

type UserType = {
    id:string,
    save:Function
}

const User:UserModelType = {
    users:[],
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
User.addUser(user0)
User.addUser(user1)
User.addUser(user2)

export default User

