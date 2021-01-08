import express from 'express';
import Product from '../model/Product';

const router = express.Router();

router.get('/list', async (req, res) => {
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

router.get('/details', async (req, res) => {
  if (req.query.id) {
    const product = await Product.findOne({ _id: req.query.id });
    if (product) {
      res.send({product : product, faceNumber: []});
    } else {
        res.status(404).send({ message: 'Modèle non trouvé.' });
    }    
  } else {
    const faceNumberReq = req.query.faceNumber.split('-')[0];
    const product = await Product.findOne({ slug: req.query.slug, faceNumber: faceNumberReq });
    const faceNumber = await Product.find({ slug: req.query.slug });
    if (product) {
      res.send({product : product, faceNumber: faceNumber});
    } else {
        res.status(404).send({ message: 'Modèle non trouvé.' });
    }
  }
})

router.get('/cartDetails', async (req, res) => {
  const products = await Product.find({ _id: { $in: req.query.ids } });
  
  if (products) {
    res.send({products : products,});
  } else {
      res.status(404).send({ message: 'Modèle non trouvé.' });
  }    

})

router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.product.name,
    slug: req.body.product.slug,
    faceNumber: req.body.product.faceNumber,
    price: req.body.product.price,
    image: req.body.product.image,
    category: req.body.product.category,
    description: req.body.product.description,
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