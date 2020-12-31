import express from 'express';
import Product from '../model/Product';

const router = express.Router();

router.get('/', async (req, res) => {
  const offset = Number(req._parsedUrl.query.split("=")[1]);
  const products = await Product.find().skip(offset).limit(6);
  if (products) {
    res.send(products);
  } else {
      res.status(404).send({ message: 'Modèles non trouvés.' });
  }
})

router.get('/count', async (req, res) => {
  const number = await Product.countDocuments();
  const data = { count: number }
  if (data) {
    res.send(data);
  } else {
      res.status(404).send({ message: 'Modèles non trouvés.' });
  }
})

router.get('/:id', async (req, res) => {
  console.log(req);
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
        res.status(404).send({ message: 'Modèle non trouvé.' });
    }
})

router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
});

export default router;