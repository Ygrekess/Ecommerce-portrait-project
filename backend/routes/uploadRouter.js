import multer from 'multer';
import express from 'express';
import fs from 'fs';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		const dir = `orders/order-${req.params.orderId}`;
		const dir1 = `orders/order-${req.params.orderId}/${req.params.itemName}`;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		if (!fs.existsSync(dir1)) {
			fs.mkdirSync(dir1);
		}
		console.log(req.params)
		cb(null, `orders/order-${req.params.orderId}/${req.params.itemName}`)//
	},
	filename(req, file, cb) {
		cb(null, `${Date.now()}.jpg`)
	}
})

const upload = multer({
	storage
})

uploadRouter.post('/:orderId&:itemName', upload.array('image'), (req, res) => {
	res.status(200).send(`OK`)
})

export default uploadRouter;