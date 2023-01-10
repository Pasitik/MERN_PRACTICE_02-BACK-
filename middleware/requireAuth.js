const User = require("../models/userModel")
const jwt= require("jsonwebtoken")

const requireAuth=async (req,res, next)=>{
    //verify authentication 
    const {authorization} = req.headers 

    if(!authorization){
        return res.status(401).json({error:"authorisation token required"})
    }

    const token= authorization.split(' ')[1]

    try{
        //verify token and extract the id from it 
        const {_id} = jwt.verify(token, process.env.SECRET)

        //find and extract the id of a user with same id as the extracted 
        req.user = await User.findOne({_id}).select("_id")
        next() 
    }
    catch(error){
        console.log(error)
        res.status(401).json({error: "Unauthorized Request"})
    }

}
module.exports = requireAuth