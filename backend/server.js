import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'
import orderRoutes from './routes/orderRoutes'
import productRoutes from './routes/productRoutes'
import cors from 'cors'
import path from 'path'
import uploadRouter from './routes/uploadRouter';

const app = express()

//Dotenv
dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to DB')
)

//Middleware
app.use(express.json());
app.use(cors());

app.use('/api/upload', uploadRouter)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
const __dirname = path.resolve(); 
app.use('/product-images', express.static(path.join(__dirname, '/product-images')))
app.use('/orders', express.static(path.join(__dirname, '/orders')))

app.listen(5000, () => console.log('API server start'))
