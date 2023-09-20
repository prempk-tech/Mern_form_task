import mongoose from 'mongoose';
import initAppServer from './app.js';
import config from './config/config.js';

let server;

mongoose
  .connect(config.mongodb.uri, {
    useNewUrlParser: true,
    keepAlive: 1,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    useUnifiedTopology: true,
    // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    // reconnectInterval: 500, // Reconnect every 500ms
  })
  .then(() => {
    console.log('💽 MonogoDB Connected');

    server = initAppServer();
    server.listen(config.port, () => {
      console.log(`🚀 Server started on ${config.NODE_ENV} in port ${config.port}`);
    });
});