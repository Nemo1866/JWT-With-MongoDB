const express=require("express")
const app=express()
const mongoose=require("mongoose")
const router = require("./users/router")

mongoose.connect("mongodb://127.0.0.1:27017/jwtuser")

app.use(express.json())

app.use("/api/user",router)



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})