import express from 'express';

import initSettingRoutes from '../setting/setting.route.js';
export default function useSettingRoutes(io) {
  const router = express.Router();
  router.use('/', initSettingRoutes(io));

  return router;
}
