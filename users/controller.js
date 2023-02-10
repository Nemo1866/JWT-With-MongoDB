require("dotenv").config()
const userModel=require("./model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
module.exports={
    registerUser:async (req,res)=>{
        const {username,email,password}=req.body
        let hashPassword=await bcrypt.hash(password,10)
        let user=new userModel({
            username,
            email,
            password:hashPassword
        })
        user.save(err=>{
            if(!err){
                res.json({
                    message:"User Register Sucessfully"
                })
            }else{
                res.json({
                    message:"User with these email already exists"
                })
            }
        })
    },loginUser:async (req,res)=>{
        const {email,password}=req.body
        let user=await userModel.findOne({email})
        if(!user){
            res.json({
                message:"Invalid email or password"
            })
        }
        let checkValidate=await bcrypt.compare(password,user.password)
        if(!checkValidate){
            res.json({
                message:"Invalid email or password"
            })
        }else{
            const token= jwt.sign(checkValidate,process.env.TOKEN_SECRET)
            res.json({
                message:"Login Sucessfully",
                token:token
            })
        }
    },homePage:(req,res)=>{
        res.send("Welcome to our Homepage")
    }
}