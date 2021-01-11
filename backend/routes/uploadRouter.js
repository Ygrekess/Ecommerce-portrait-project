import multer from 'multer';
import express from 'express';
import fs from 'fs';
import Order from '../model/Order';

const uploadRouter = express.Router();

/* ORDER PHOTO */
const storage = multer.diskStorage({
	destination(req, file, cb) {
		const dir = `orders/order-${req.params.orderId}`;
		const dir1 = `orders/order-${req.params.orderId}/${req.params.folderName}`;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		if (!fs.existsSync(dir1)) {
			fs.mkdirSync(dir1);
		}
		cb(null, `orders/order-${req.params.orderId}/${req.params.folderName}`)//
	},
	filename(req, file, cb) {
		cb(null, `${file.originalname}`)
	}
})
const uploadOrder = multer({
	storage
})
uploadRouter.post('/:orderId&:folderName', uploadOrder.array('image'), async (req, res) => {
	res.status(200).send(`OK`)
})


export default uploadRouter;