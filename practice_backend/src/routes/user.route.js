import express from 'express';

import userController from '../controllers/user.controller.js';
import config from '../config/config.js';
import uploadFile from '../middlewares/uploadfile.js';
import multer from 'multer';


export default function initUserRoutes(io){
    const router = express.Router();
    const RegisterController = userController(io)

    router.post('/uploadImage',uploadFile(config.directories.userProfilePhoto).fields([{ name: 'imgdata', maxCount: 1 }]), RegisterController.AdminImage)


    router.post('/Reguser', RegisterController.RegisterData)

    router.get('/getuser', RegisterController.getuser)

    router.get('/getAdminImage', RegisterController.getAdminImage)

    router.get('/userdetails/:id', RegisterController.getuserDetails);

    router.get('/useredit/:id', RegisterController.getuserdetailsById);

    router.put('/updateuser/:id', RegisterController.updateUserDetailsById);

    router.delete('/deleteuser/:id',RegisterController.deleteUserDetailById);

    router.post('/userData/aggregate', RegisterController.aggregateUser);

    router.post(
        '/download/test',
        RegisterController.pdfdownload
      );





    return router;
}
