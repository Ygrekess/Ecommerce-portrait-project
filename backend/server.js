import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'
import orderRoutes from './routes/orderRoutes'
import productRoutes from './routes/productRoutes'
import fileUpload from 'express-fileupload';
import cors from 'cors'

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

app.use(fileUpload());
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.listen(5000, () => console.log('API server start'))
