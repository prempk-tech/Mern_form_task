import express from 'express';

import settingController from '../../controllers/setting.controller.js';
export default function initSettingRoutes(io){
    const router = express.Router();
    const settingsController = settingController(io)

    router.post('/Regrole', settingsController.settingdata)

    router.get('/getsettings', settingsController.getsetting)


    return router;
}