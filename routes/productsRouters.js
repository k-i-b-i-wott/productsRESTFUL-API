import {Router} from 'express';

import { getAllProducts, getAllProductsOnOffer,getSpecificProduct,updateProduct,deleteProduct,createProduct } from '../controllers/productsControllers.js';

import validateProducts from '../middleware/validateProducts.js';
export const productsRouters = Router();
export const  productsOnOffer =Router();

productsOnOffer.route('/')
.get(getAllProductsOnOffer)

productsRouters.route('/')
.get(getAllProducts )
.post( validateProducts,createProduct)

productsRouters.route('/:productId')
.get(getSpecificProduct)
.patch(updateProduct)
.delete(deleteProduct)



