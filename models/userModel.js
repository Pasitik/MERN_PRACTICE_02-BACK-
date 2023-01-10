const mongoose=require("mongoose")
const bcrypt = require("bcrypt")
const validator= require("validator")

const Schema= mongoose.Schema 

const userSchema = new Schema({
    email:{
        type: String, 
        unique:true, 
        required: true
    },
    password:{
        type: String, 
        required: true
    }
}) 
//login method
userSchema.statics.login=async function (email, password){
    if(!email || !password){
        throw Error("All fields are required!!")
    } 
    const user =await this.findOne({email}) 
    if(!user){
        throw Error("Incorrect Email!!")
    }
    //using "compare" from the bcrypt package to compare passwords
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error ("Incorrect Password")
    }
return user
}

//signup method
userSchema.statics.signup= async function( email, password){ 
    //validation 
    if(!email || !password){
        throw Error("All fields are required!!")
    } 

    if (!validator.isEmail(email)){
        throw Error("invalid Email")
    }

    if (!validator.isStrongPassword(password)){
        throw Error("Password is weak")
    }


    const exists= await this.findOne({email})

    if(exists){
        throw Error("Email already exists")
    }
//using bcrypt to encrypt password before submiting to db 
    const salt = await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    //creating user data to db 
     const user= await this.create({email, password: hash})

    return user
}

module.exports = mongoose.model("User", userSchema)