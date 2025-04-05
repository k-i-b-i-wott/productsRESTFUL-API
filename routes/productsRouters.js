import {Router} from 'express';
import { PrismaClient } from '@prisma/client';


import validateProducts from '../middleware/validateProducts.js';

export const productsRouters = Router();
export const  productsOnOffer =Router();

const client = new PrismaClient();

productsOnOffer.route('/')
.get(
  async (_req,res)=> {
    try {
      const productsOnOffer = await client.products.findMany({
        where: {
          isOnOffer: true,
        },
      });
      res.status(200).json({
        status: "success",
        message: "Products on offer fetched successfully",
        data: productsOnOffer,
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Error fetching products on offer",
      });
      
    }
  
  }
)

productsRouters.route('/')
.get( async (_req, res) => {
        try {
           const allProducts = await client.products.findMany();
          res.status(200).json({
            status: "success",
            message: "Products fetched successfully",
            data: allProducts,
          });
      
        } catch (error) {
          console.log(error);
          res.status(500).json({
            status: "error",
            message: "Error fetching products",
          });    
        }
      
      
      }
)
.post( validateProducts, async (req, res) => {
    const { productTitle, productDescription, unitsLeft, pricePerUnit } =
      req.body;
    try {
      const createdProduct = await client.products.create({
        data: {
          productTitle,
          productDescription,
          unitsLeft,
          pricePerUnit,
        },
      });
      res.status(201).json({
        status: "success",
        message: "Product created successfully",
        task: createdProduct,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error creating product",
      });
    }
  }
)

productsRouters.route('/:productId')
.get( async (req, res) => {  
  const {productId} =req.params;

  try {
    const product = await client.products.findFirst({
      where: {
        productId,
      },
    });

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: product,
    });

}catch (error) {
  console.log(error);
  res.status(500).json({
    status: "error",
    message: "Error  fetching the product",
  });    
}

})
.patch(
  async (req, res) => {
    const { productId } = req.params;
    const { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer } =
      req.body;
  
    try {
      const updatedProduct = await client.products.update({
        where: {
          productId,
        },
        data: {
          productTitle: productTitle&& productTitle,
          productDescription: productDescription && productDescription,
          unitsLeft: unitsLeft && unitsLeft,
          pricePerUnit: pricePerUnit && pricePerUnit,
          isOnOffer: isOnOffer && isOnOffer,
        },    
      });
      res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error updating product",
      });
    }
  }
)
.delete(
  async (req, res) => {
    const { productId } = req.params;
  
    try {
      const deletedProduct = await client.products.delete({
        where: {
          productId,
        },
      });
      res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
        data: deletedProduct,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error deleting product",
      });
    }
  }
)



