import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Task from "./taskMd.js";

export const getAll = catchAsync(async (req, res, next) => {
  const condition = { userId: req.userId };
  const futures = new ApiFeatures(Task, req.query, req.role)
    .addManualFilters(condition)
    .filter()
    .search(["description"])
    .limitFields()
    .sort()
    .paginate();
  const result = await futures.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, userId: req.userId });
  if (!task) {
    return next(new HandleERROR("Task not found!", 400));
  }
  return res.status(200).json({
    success: true,
    data: task,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { description, status = "todo" } = req.body;
  const task = await Task.create({
    description,
    status,
    userId: req.userId,
  });
  return res.status(200).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.userId },
    req.body,
    { new: true, runValidators: true },
  );
  if(!task){
    return next(new HandleERROR('Task not found',404))
  }
  return res.status(200).json({
    success:true,
    message:'Task updated successfully',
    data:task
  })
});


export const remove= catchAsync(async(req,res,next)=>{
    const {id}= req.params
    const task = await Task.findOneAndDelete({_id:id,userId:req.userId}
    )
    if(!task){
        return next (new HandleERROR('Task not found',404))

    }
    return res.status(200).json({
        success:true,
        message:'Task deleted successfully'
    })
})


