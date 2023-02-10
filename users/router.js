const router=require("express").Router()
const checkAuth = require("../middleware/auth")
const {registerUser,loginUser, homePage}=require("./controller")

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/",checkAuth,homePage)

module.exports=router