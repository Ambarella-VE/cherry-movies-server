import express, { Router } from 'express';
import {
  productsContainer
} from '../../utils/index.js';
import {
  cliError,
  cliWarn,
  isAdmin
} from '../../libs/index.js';

const router = Router();

router.get('/', async (
  req: express.Request, 
  res: express.Response
  )=>{
  try {
    const products: any = await productsContainer.getAll();
    
    if (products) {
      const msg200 = `Products retrieved successfully`
      res.status(200).json({
        message: msg200,
        response: products
      })
    }
  } catch (err: any) {
    cliError(err['message'] || err)
  }
});

router.get('/:id', async (
  req: express.Request, 
  res: express.Response
  )=>{
  const {id} = req.params;
  try {
    const product: any = await productsContainer.get(parseInt(id));
    if (product){
      const msg200 = `Product with id ${id} found`;
      cliWarn(msg200);
      res.status(200).json({
        message: msg200,
        response: product
      });
    } else {
      const msg404 = `Product with id ${id} not found!`
      cliWarn(msg404);
      res.status(404).json({
        message: msg404,
      })
    }
  } catch (err: any) {
    cliError(err['message'] || err)
  }
});

router.post('/', isAdmin, async (
  req: express.Request, 
  res: express.Response
  )=>{
  try{
    const newProduct = req.body;
      const id = await productsContainer.save(newProduct);

      if (id) {
        const msg200 = `Product saved with id ${id}`;

        cliWarn(msg200)
        res.status(200).json({
            message: msg200,
            response: id
        })
      } else {
        const msg404 = `Product not saved`
        cliWarn(msg404)
        res.status(404).json({
          message: msg404
        })
      }
  } catch (err: any) {
      cliError(err['message'] || err)
  }
});

router.put('/:id', isAdmin, async (
  req: express.Request, 
  res: express.Response
  )=>{
    const {id} = req.params;
    const newData = req.body;
    try {
      const product: any = await productsContainer.get(parseInt(id));
      if (product){
        const newProducts = await productsContainer.update(parseInt(id), newData);
        const msg200 = `Product with id ${id} updated`;

        cliWarn(msg200)
        res.status(200).json({
          message: msg200,
          response: newProducts
        })
      } else {
        const msg404 = `Product with id ${id} not found!`
        cliWarn(msg404);
        res.status(404).json({
          message: `Product with id ${id} not found`,
        })
      }
    } catch (err: any) {
      cliError(err['message'] || err)
    }  
});

router.delete('/:id', isAdmin, async (
  req: express.Request,
  res: express.Response
  )=>{
  const {id} = req.params;
    try {
      const product: any = await productsContainer.get(parseInt(id));
      if (product){
        const newProducts = await productsContainer.delete(parseInt(id));
        const msg200 = `Product with id ${id} deleted`

        cliWarn(msg200)
        res.json({
          message:msg200,
          response: newProducts
        })
      } else {
        const msg404 = `Product with id ${id} not found!`
        
        cliWarn(msg404);
        res.status(404).json({
          message: msg404,
        })
      }
    } catch (err: any) {
      cliError(err['message'] || err)
    }
});

export default router
