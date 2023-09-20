import express from 'express';

import initUserRoutes from './user.route.js';
export default function useFormRoutes(io) {
  const router = express.Router();
  router.use('/', initUserRoutes(io));

  return router;
}
