import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: { 
        type: Array, 
        required: true 
    },
    faceNumber: { 
        type: Number, 
        required: true 
    },
/*     countInStock: {
        type: Number,
        default: 0,
        required: true
    }, */
    created_at: {
        type: Date,
        default: Date.now
    }  
})

const productModel = mongoose.model('products', productSchema)

export default productModel;