import { validationResult } from "express-validator"


const handleValidation = async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({
            success:false,
            message:errors
                .array()
                .map((item)=>item.msg)
                .join(" | ")
        })
    }
    next()
}

export default handleValidation