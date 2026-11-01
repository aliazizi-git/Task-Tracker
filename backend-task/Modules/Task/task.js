import { Router } from "express";
import isLogin from "../../Middlewares/isLogin.js";
import { create, getAll, getOne, remove, update } from "./taskCn.js";


const taskRouter=Router()

taskRouter.use(isLogin)

taskRouter.route('/')
    .get(getAll)
    .post(create)

taskRouter.route('/:id')
    .get(getOne)
    .put(update)
    .delete(remove)

export default taskRouter