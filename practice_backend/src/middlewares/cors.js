import cors from 'cors';

const whitelist = 'http://localhost:3000';

const corsOptions = {
    optionsSuccessStatus: 200,
    origin: function(origin, callback){
        callback(null, true)

        // if(whitelist.includes(origin)){
        //     callback(null, true)
        // }
        // else{
        //      callback(new Error('blocked by CORS'))
        // }
    },
    Credential: true
}
export default cors(corsOptions);