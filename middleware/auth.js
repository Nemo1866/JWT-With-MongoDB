const jwt=require("jsonwebtoken")
function checkAuth(req,res,next){
    let token=req.get("authorization")
    if(token==null){
        res.json({
            message:"Please provide a token in order to access our homepage."
        })
    }
    token=token.slice(7)
jwt.verify(token,process.env.TOKEN_SECRET,(err,result)=>{
        if(err){
            res.json({
                message:"Invalid Token"
            })
        }else{
            next()
        }
    })
}
module.exports=checkAuth