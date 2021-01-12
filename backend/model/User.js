import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255
    },
    lastname: {
        type: String,
        max: 255
    },
    firstname: {
        type: String,
        max: 255
    },
    newsletter: {
        type: Boolean,
        required: true,
        default: false
    },    
    email: {
        type: String,
        required: true,
        max: 255
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    phone: { 
        type: String,
        max: 10,
        },
    address: { 
        type: String, 
        },
    city: { 
        type: String, 
        },
    postalCode: { 
        type: String, 
        },
    country: { 
        type: String, 
        },
    date: {
        type: Date,
        default: Date.now
    }  
})

const userModel = mongoose.model('users', userSchema)

export default userModel;