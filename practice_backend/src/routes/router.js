import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import useFormRoutes from './index.js';
import useSettingRoutes from './setting/index.js';

export default function initAppRoutes(io) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const router = express.Router();
  
    router.use('/forms',useFormRoutes(io))
    router.use('/setting',useSettingRoutes(io))
  
  
  return router;

}