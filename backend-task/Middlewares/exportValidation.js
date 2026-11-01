import JWT from 'jsonwebtoken'

const exportValidation=(req , res , next )=>{
    try {
        const token = req.headers?.authorization?.split(' ').at(1)
        if(!token){
            throw Error("No token provided!")
        }
        const {id=null,role=null}=JWT.verify(token,process.env.JWT_SECRET)
        req.userId = id,
        req.role=role,
        req.token=token
    } catch (error) { 
        req.userId=null
        req.role=null
        req.token=null
    }
    next()
}

export default exportValidation