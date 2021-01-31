import express from 'express';
import Product from '../model/Product';
import multer from 'multer';

const router = express.Router();

router.get('/list', async (req, res) => {
  const offset = Number(req.query.offset);
  const per_page = Number(req.query.per_page);

  const style = req.query.style && req.query.style !== 'all' ? req.query.style : '';
  const size = req.query.size && req.query.size !== 'all' ? req.query.size : '';
  const color = req.query.color || '';
  const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max = req.query.max ? Number(req.query.max) : 100;

  const styleFilter = style ? { 'category.style': style } : {};
  const styleSize = size ? { 'category.size': size } : {};
  const styleColor = color ? { 'category.color': color } : {};
  const priceFilter = { price: { $gte: min, $lte: max } };

  const products = await Product.find({ ...styleFilter, ...styleSize, ...styleColor, ...priceFilter }).skip(offset).limit(per_page);
  
  if (products) {
    res.send(products);
  } else {
      res.status(404).send({ message: 'Modèles non trouvés.' });
  }
})

router.get('/count', async (req, res) => {

  const style = req.query.style && req.query.style !== 'all' ? req.query.style : '';
  const size = req.query.size && req.query.size !== 'all' ? req.query.size : '';
  const color = req.query.color || '';
  const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max = req.query.max ? Number(req.query.max) : 100;

  const styleFilter = style ? { 'category.style': style } : {};
  const styleSize = size ? { 'category.size': size } : {};
  const styleColor = color ? { 'category.color': color } : {};
  const priceFilter = { price: { $gte: min, $lte: max } };

  const number = await Product.countDocuments({ ...styleFilter, ...styleSize, ...styleColor, ...priceFilter });
  const data = { count: number }
  if (data) {
    res.send(data);
  } else {
      res.status(404).send({ message: 'Modèles non trouvés.' });
  }
})

router.get('/details', async (req, res) => {
    const product = await Product.findOne({ _id: req.query.productId });
    const similarProducts = await Product.find({ slug: req.query.slug });
    if (product) {
      res.send({ product: product, similarProducts: similarProducts });
    } else {
        res.status(404).send({ message: 'Modèle non trouvé.' });
    }
  }
)

router.get('/cartDetails', async (req, res) => {
  const products = await Product.find({ _id: { $in: req.query.ids } });
  
  if (products) {
    res.send({products : products,});
  } else {
      res.status(404).send({ message: 'Modèle non trouvé.' });
  }    

})

/* router.get('/sort', async (req, res) => {


  const query = req.query.category
  const products = await Product.find( { ...styleFilter, ...styleSize, ...styleColor, ...priceFilter } );

  if (products) {
    res.send({products : products,});
  } else {
      res.status(404).send({ message: 'Modèle non trouvé.' });
  }    

}) */

router.put('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = req.body.product.name;
    product.slug = req.body.product.slug;
    product.faceNumber = req.body.product.faceNumber;
    product.price = req.body.product.price;
    product.description = req.body.product.description;
    product.category = {
      style: req.body.product.category.style,
      colors: req.body.product.category.colors,
      size: req.body.product.category.size,
    }
    if (req.body.product.image !== null) {
      product.image = req.body.product.image;
    }
    const updatedProduct = await product.save();
    console.log(updatedProduct)
    return res
      .status(201)
      .send({ message: 'Product Updated', data: updatedProduct });
  } else {
    return res.status(500).send({ message: ' Error in updating Product.' });
  }
});

router.delete('/:id', async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id)
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.product.name,
    slug: req.body.product.slug,
    faceNumber: req.body.product.faceNumber,
    price: req.body.product.price,
    image: req.body.product.image,
    category: {
      size: req.body.product.category.size,
      colors: req.body.product.category.colors,
      style: req.body.product.category.style
    },
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

/* PRODUCT IMAGE */
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, `product-images`)
	},
	filename(req, file, cb) {
		cb(null, `${req.params.id}.jpg`)
	}
})
const uploadProductImage = multer({
	storage
})
router.post('/product-images/:id', uploadProductImage.single('image'), async (req, res) => {

	res.status(200).send(`OK`)
})

export default router;