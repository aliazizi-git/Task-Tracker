const isLogin = async(req,res,next)=>{
    if(!req.userId || !req.token){
        return res.status(404).json({
            success:false,
            message: 'you must be logged in to access this route!'
        })
    }
    next()
}

export default isLogin