import catchAsync from "../utils/catchAsync.js";

import setting from "../models/setting.model.js";

export default function settingController(io){
    const settingdata = catchAsync (async (req,res) => {
        const reqdata = req.body;
console.log(req.body);
          let settings = await setting.create({...reqdata})

    res.json({
        data:settings,
        message: 'Created Successfully'
    })
});

const getsetting = catchAsync(async (req, res) => {
    const settings = await setting.find();
    if (!settings) {
      throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
    }

    res.json(settings);
  });
  
return{
    settingdata,
    getsetting,
}
}