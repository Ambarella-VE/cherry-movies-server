import express, { Router } from 'express';
import {
  cartContainer,
  productsContainer
} from '../../utils/index.js';
import {
  cliError,
  cliWarn
} from '../../libs/index.js';

const router = Router();

router.post('/', async (
  req: express.Request, 
  res: express.Response
  )=>{
    const newCartProducts = req.body;
    const newCart = {
      "products": newCartProducts 
    }
    try {
      const id = await cartContainer.save(newCart);
      res.json({
        message: `Cart successfully created with id ${id}`,
        response: id
      })
    } catch (err: any) {
      cliError(err['message'] || err);
    }
  })

router.delete('/:id', async (
  req: express.Request, 
  res: express.Response
  )=>{
    const {id} = req.params;
    try {
      const product: any = await cartContainer.get(parseInt(id));
      if (product){
        const newProducts = await cartContainer.delete(parseInt(id));
        res.json({
          message:`Cart with id ${id} deleted`,
          response: newProducts
        })
      } else {
        cliWarn(`Cart with id ${id} not found!`);
        res.status(404).json({
          message: `Cart with id ${id} not found`,
        })
      }
    } catch (err: any) {
      cliError(err['message'] || err)
    }
  })

router.get('/:id/products', async (
  req: express.Request, 
  res: express.Response
  )=>{
  const {id} = req.params;
    try {
      const cart = await cartContainer.getAll();
      const products = cart['products'];

      products
      ? res.status(200).json({
        message: `Products in cart id ${id}`,
        response: products
      })
      : res.status(404).json({
        message: `Cart with id ${id} not found`
      });
    } catch (err: any) {
      cliError(err['message'] || err);
    }
  })

router.post('/:id/products', async (
  req: express.Request, 
  res: express.Response
  )=>{
    const {id} = req.params;
    const idProduct: number = parseInt(req.body['id']);
    try {
      const newCartProduct: object = await productsContainer.get(idProduct)
      if(newCartProduct){
        const newCart = await cartContainer.get(parseInt(id));
        newCart['products'].push(newCartProduct);
        const cartExists = await cartContainer.update(parseInt(id),newCart)
  
        cartExists
        ? res.status(200).json({
          message: `Product with id ${idProduct} added successfully to the cart with id ${id}`,
        })
        : res.status(404).json({
          message: 'Cart not found'
        })
      } else res.status(404).json({
        message: 'Product not found'
      })
    } catch (err: any) {
      cliError(err['message'] || err);
    }
  })

router.delete('/:id/products/:id_prod', async (
  req: express.Request, 
  res: express.Response
  )=>{
    //# TODO: Eliminar un producto del carrito por su id de carrito y de producto.
    const {id, id_prod} = req.params;
    try {
    const productExist = await productsContainer.get(parseInt(id_prod));
      if (productExist) {
        const cartExist = await cartContainer.get(parseInt(id));

        cartExist
        ? res.status(200).json({
          message: `Product with id ${id_prod} was removed successfully from the cart with id ${id}`
        })
        : res.status(404).json({
          message: `Cart with id ${id} not found`
        });
      }
    } catch (err: any) {
      cliError(err['message'] || err);
    }
    })

export default router;
