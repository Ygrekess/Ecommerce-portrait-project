import express from 'express';
import Order from '../model/Order';
import Image from '../model/Image';
import Stripe from "stripe";
import dotenv from 'dotenv'

//Dotenv
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_CLIENT_ID);

router.post('/', async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.order.orderItems,
        user: req.body.userInfo._id,
        isPaid: true,
        shipping: req.body.order.shipping,
        payment: req.body.order.payment,
        itemsNumb: req.body.order.itemsNumb,
        taxPrice: req.body.order.tva,
        shippingPrice: req.body.order.shippingPrice,
        totalPrice: req.body.order.total,
    })
  try {
      const savedOrder = await newOrder.save();
      res.status(201).send({ message: "New Order Created", data: savedOrder })
    } catch (error) {
      res.status(400).send({message : "La commande n'a pas pu être validée"});
    }
})

router.get('/list', async (req, res) => {
  const offset = Number(req.query.offset);
  const per_page = Number(req.query.per_page);
  const orders = await Order.find().skip(offset).limit(per_page);
  if (orders) {
    res.send(orders);
  } else {
      res.status(404).send({ message: 'Modèles non trouvés.' });
  }
})

router.get('/count', async (req, res) => {
  const number = await Order.countDocuments();
  const data = { count: number }
  if (data) {
    res.send(data);
  } else {
      res.status(404).send({ message: 'Order count fail.' });
  }
})

router.post('/checkout', async (req, res) => {  
  const {amount} = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
    })
    res.status(200).send(paymentIntent.client_secret)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

router.post('/upload', async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ message: "No file uploaded"})
    }
    const file = req.files.file;

    file.mv(`${__dirname}/../../frontend/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err)
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`})
    })
})

router.get('/:id', async (req, res) => {
    const order = await Order.findById( req.params.id  );
    if (!order) {
        return res.status(404).send('Impossible de trouver la commande.')
    }
    res.status(201).send({ message: "Commande trouvée", data: order })
})

router.get('/user/:id', async (req, res) => {
  const order = await Order.find({ user: req.params.id });
    if (!order) {
        return res.status(404).send('Impossible de trouver les commandes du client.')
    }
    res.status(201).send({ message: "Commandes trouvées", data: order })
})

/* router.put("/photoupload/pay", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
}); */

router.put("/photoupload/:orderId&:itemName", async (req, res) => {
	const cartItemId = req.params.itemName.split('-')[2];
  const order = await Order.findById(req.params.orderId);
  if (order) {
    const cartItem = order.orderItems.find(x => x.cartItemId === cartItemId)
    cartItem.photoUpload = true;
    cartItem.photo = req.body.filesName;
    const newOrderItems = order.orderItems.map(x => x.cartItemId === cartItemId ? cartItem : x)
    order.orderItems = newOrderItems;

    const updatedOrder = await order.save(); 
    
    res.send({ message: 'Order Paid.', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});

export default router;