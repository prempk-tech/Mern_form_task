import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    image:{
        type:String,
        default:'',
    },
    addressline1: {
        type: String,
        required: true,
    },
    addressline2: {
        type: String,
        required: true,
    },
    country: {
        type: Array,
        required: true,
    },
    city: {
        type: Array,
        required: true,
    },
    state: {
        type: Array,
        required: true,
    },
    role: {
        type: Array,
        required: true,
    },
    gender: {
        type: Array,
        required: true,
    },
    postcode: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  })

const Admin = mongoose.model('userSchema', userSchema)

export default Admin;

