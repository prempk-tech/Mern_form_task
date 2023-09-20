import {createServer} from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import httpStatus from 'http-status';
import helmet from 'helmet';

import initCronJobs from './cron.js';
import ApiError from './utils/ApiError.js';

import corsHeaders from './middlewares/cors.js';
import bodyParser from 'body-parser';
import initUserRoutes from './routes/user.route.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import initAppRoutes from './routes/router.js';

export default function initAppServer() {
    const app = express();
    const server = createServer(app);
  
    // eslint-disable-next-line no-underscore-dangle
    // const __dirname = path.dirname(fileURLToPath(import.meta.url));
  
    // Initializing security middlewares
    app.use(helmet());
    app.use(express.urlencoded({ limit: '100mb', extended: true }));
    // app.use(cookieParser('AutoScreen'));
    app.use(express.json());
    app.use(
      cors({
        origin: ['http://localhost:3000'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        // You can add your customization headers into the allowedHeaders
      })
    );
  
    // Serving Static Files
  
  
    // Compression the output data using brotli algorithm to compress and serve the static datat
    // app.use(compression());
  
    //Initiating Socket connection
    const io = new Server(server);
  
    // Initiating Cron Jobs
    initCronJobs(io);
  
    // Initialize API routes
    app.use('/', initAppRoutes(io));
  
    app.options('*', corsHeaders);
  
    app.use(corsHeaders)

    app.use(
        bodyParser.json({
          limit: '50mb',
        })
      );
      
      app.use(
        bodyParser.urlencoded({
          limit: '50mb',
          parameterLimit: 100000,
          extended: true,
        })
      );
    // app.use(express.urlencoded({ limit: '100mb', extended: true }));
    app.use(express.json({limit:'50mb'}))
    // app.use(bodyParser.urlencoded({ extended: true }))
//   app.use(bodyParser.json())
    // No API found handler
    app.use('*', (req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, `Route ${req.originalUrl} Not found`));
    });
  
    // Global Error Conventor
    app.use(errorConverter);
  
    // Global Error Handler
    app.use(errorHandler);
  
    return server;
  }
