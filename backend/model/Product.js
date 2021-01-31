import mongoose from 'mongoose';

const categorySchema = {
  style: { type: Array, required: true },
  size: { type: String, required: true },
  colors: { type: Array, required: true },
};

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
    category: categorySchema,
    person: { 
        type: Number, 
        required: true 
    },
    face: { 
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