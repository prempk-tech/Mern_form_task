import mongoose from 'mongoose';

const settingSchema = mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
})

const setting = mongoose.model('setting', settingSchema)


export default setting;