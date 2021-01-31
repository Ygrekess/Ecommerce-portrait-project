import mongoose from 'mongoose';

const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
};

const paymentSchema = {
  paymentMethod: { type: String }
};

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: Array, required: true },
  face: { type: Number, required: true },
  photo: { type: Array },
  photoUpload: { type: Boolean, default: false },
  cartItemId: { type: String, required: true },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [orderItemSchema],
  shipping: shippingSchema,
  payment: paymentSchema,
  itemsNumb: { type: Number },
  taxPrice: { type: Number },
  shippingPrice: { type: Number },
  totalPrice : { type: Number },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  created_at: {
    type: Date,
    default: Date.now
  }  
});

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;