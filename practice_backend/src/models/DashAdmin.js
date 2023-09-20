import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    image: {
        type: String,
        default: '',
    },
})

const adminimage = mongoose.model('AdminImage', imageSchema)


export default adminimage;