const Workout = require("../models/workoutsModel")
const mongoose= require("mongoose")

//get all workouts 
const getWorkouts = async (req, res)=>{
    const user_id= req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt:-1})

    res.status(200).json(workouts)
}

//get single workout 

const getsingleWorkout =async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({error: "No such workout"})        
    }
    
    const workout= await Workout.findById(id)

    !workout ? res.status(400).json({error: " No such workout"}): res.status(200).json(workout)
}

//create new workout
const createWorkout = async (req, res ) => {
    const{title, load, reps} =req.body //destracturing schema props 

    let emptyFields=[]; 
    if(!title){
        emptyFields.push("title")
    }
    if(!load){
        emptyFields.push("load")
    }
    if(!reps){
        emptyFields.push("reps")
    }

    if(emptyFields.length>0){
        return res.status(400).json({error: "Please fill in all fields", emptyFields})
    }

    try{
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)

    }
    catch(error){
        res.status(400).json({error: error.message})
    }
} 

//delete workout 
const deletesingleWorkout =async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({error: "No such workout"})        
    }
    
    const workout= await Workout.findOneAndDelete({_id: id})

    !workout ? res.status(400).json({error: " No such workout"}): res.status(200).json(workout)
}

//update workout 
const updateWorkout = async (req, res ) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({error: "No such workout"})        
    }

    const workout= await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    !workout ? res.status(400).json({error: " No such workout"}): res.status(200).json(workout)
} 


module.exports={
    createWorkout,
    getWorkouts,
    getsingleWorkout,
    deletesingleWorkout, 
    updateWorkout

}