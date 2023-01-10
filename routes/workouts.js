const express=require('express')
const {
    createWorkout,
    getWorkouts,
    getsingleWorkout, 
    deletesingleWorkout,
    updateWorkout
}= require("../controllers/workoutController")
const requireAuth = require("../middleware/requireAuth")



const router = express.Router() 
router.use(requireAuth)

//Get all workouts
router.get("/",getWorkouts)

//Get single workout 
router.get("/:id", getsingleWorkout)

//Post new workout 
router.post("/", createWorkout)

//Delete a workout
router.delete("/:id", deletesingleWorkout)

//Update a workout
router.patch("/:id", updateWorkout)

module.exports = router
