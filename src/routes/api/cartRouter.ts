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
      const msg200 = `Cart successfully created with id ${id}`
      const msg404 = `Cart was not created`;

      if (id) {
        cliWarn(msg200);
        res.status(200).json({
          message: msg200,
          response: id
        })
      } else {
        cliWarn(msg404);
        res.status(404).json({
          message: msg404
        });
      }
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
        const msg200 = `Cart with id ${id} successfully deleted`
        cliWarn(msg200)
        res.status(200).json({
          message: msg200,
          response: newProducts
        })
      } else {
        const msg404 = `Cart with id ${id} not found!`
        cliWarn(msg404);
        res.status(404).json({
          message: msg404,
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

      if (products) {
        const msg200 = `Products in cart id ${id}`
        cliWarn(msg200)
        res.status(200).json({
          message: msg200,
          response: products
        })
      } else {
        const msg404 = `Cart with id ${id} not found!`;
        cliWarn(msg404);
        res.status(404).json({
          message: msg404
        });
      }
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
  
        if (cartExists) {
          const msg200 = `Product with id ${idProduct} added successfully to the cart with id ${id}`;

          cliWarn(msg200);
          res.status(200).json({
            message: msg200,
          })
        } else {
          const msg404 = `Cart with id ${id} not found!`;
          cliWarn(msg404)
          res.status(404).json({
            message: msg404
          })
        }
      } else {
        const msg404 = `Product with id ${idProduct} not found!`
        cliWarn(msg404);
        res.status(404).json({
          message: msg404
        })
      }
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

        if (cartExist) {
          const msg200 = `Product with id ${id_prod} was removed successfully from the cart with id ${id}`
          cliWarn(msg200);
          res.status(200).json({
            message: msg200
          })
        } else {
          const msg404 = `Cart with id ${id} not found!`;
          cliWarn(msg404);
          res.status(404).json({
            message: msg404
          });
        }
      }
    } catch (err: any) {
      cliError(err['message'] || err);
    }
    })

export default router;
