import express, { Router } from 'express';
import productsContainer from '../../utils/products.js';
import {
  cliError,
  cliNotice,
  cliWarn
} from '../../libs/index.js';

const router = Router();

router.get('/', async (
  req: express.Request, 
  res: express.Response
  )=>{
  cliNotice('Server request received...')
  try {
    const products: any = await productsContainer.getAll();
    res.send(products);
  } catch (err: any) {
    cliError(err['message'] || err)
  }
});

router.get('/:id', async (
  req: express.Request, 
  res: express.Response
  )=>{
  cliNotice('Server request received...')
  const {id} = req.params;
  try {
    const product: any = await productsContainer.get(parseInt(id));
    if (product){
      res.json({
        message: `Product with id ${id} found`,
        response: product
      });
    } else {
      cliWarn(`Product with id ${id} not found!`);
      res.status(404).json({
        message: `Product with id ${id} not found`,
      })
    }
  } catch (err: any) {
    cliError(err['message'] || err)
  }
});

router.post('/', async (
  req: express.Request, 
  res: express.Response
  )=>{
  cliNotice('Server request received...')
  try{
    const newProduct = req.body;
      const id = await productsContainer.save(newProduct);
      res.json({
          message: `Product saved with id ${id}`,
          response: id
      })
  } catch (err: any) {
      cliError(err['message'] || err)
  }
});

router.put('/:id', async (
  req: express.Request, 
  res: express.Response
  )=>{
    cliNotice('Server request received...')
    const {id} = req.params;
    const newData = req.body;
    try {
      const product: any = await productsContainer.get(parseInt(id));
      if (product){
        const newProducts = await productsContainer.update(parseInt(id), newData);
        res.json({
          message:`Product with id ${id} updated`,
          response: newProducts
        })
      } else {
        cliWarn(`Product with id ${id} not found!`);
        res.status(404).json({
          message: `Product with id ${id} not found`,
        })
      }
    } catch (err: any) {
      cliError(err['message'] || err)
    }  
});

router.delete('/:id', async (
  req: express.Request,
  res: express.Response
  )=>{
  cliNotice('Server request received...')
  const {id} = req.params;
    try {
      const product: any = await productsContainer.get(parseInt(id));
      if (product){
        const newProducts = await productsContainer.delete(parseInt(id));
        res.json({
          message:`Product with id ${id} deleted`,
          response: newProducts
        })
      } else {
        cliWarn(`Product with id ${id} not found!`);
        res.status(404).json({
          message: `Product with id ${id} not found`,
        })
      }
    } catch (err: any) {
      cliError(err['message'] || err)
    }
});

export default router
