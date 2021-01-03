import express from 'express';
import Order from '../model/Order';
import Image from '../model/Image';
import Stripe from "stripe";
import dotenv from 'dotenv'

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
      console.log(savedOrder)
      res.status(201).send({ message: "New Order Created", data: savedOrder })
    } catch (error) {
      res.status(400).send({message : "La commande n'a pas pu être validée"});
    }
})

router.post('/checkout', async (req, res) => {
  
  const {amount} = req.body;
  console.log(amount)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
    })
    console.log(paymentIntent)
    res.status(200).send(paymentIntent.client_secret)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

router.post('/upload', async (req, res) => {
    console.log(req.files)
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
    console.log(order)
    if (!order) {
        return res.status(404).send('Impossible de trouver les commandes du client.')
    }
    res.status(201).send({ message: "Commandes trouvées", data: order })
})

router.put("/:id/pay", async (req, res) => {
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
});

export default router;