const express= require('express')
const mongoose = require("mongoose")
require("dotenv").config()
const workoutRoutes = require("./routes/workouts.js")
const userRoutes= require("./routes/user.js")



//express app
const app= express(); 

//middleware (fires before routes)
app.use(express.json())//perpares app for sending data to server

app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next()
})

//route handler 
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes )

//connecting to db 
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listen for request
    const port=process.env.PORT;
    app.listen(port, ()=>{
        console.log(" connected to db & listening at port "+port)
})
})
.catch((err)=>{
    console.log(err)
})



