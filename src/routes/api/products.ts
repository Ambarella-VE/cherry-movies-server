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
    cliError(err['message'])
    res.status(500).send('Server Error')
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
        product: product
      });
    } else {
      cliWarn(`Product with id ${id} not found!`);
      res.status(404).json({
        message: `Product with id ${id} not found`,
      })
    }
  } catch (err: any) {
    cliError(err['message'])
    res.status(500).send('Server Error')
  }
});

router.post('/', async (
  req: express.Request, 
  res: express.Response
  )=>{
  cliNotice('Server request received...')
  const newProduct = req.body;
    const id = await productsContainer.save(newProduct);
    res.json({
        message: `Product saved with id ${id}`,
        response: id
    })
});

router.put('/:id', async (
  req: express.Request, 
  res: express.Response
  )=>{
    cliNotice('Server request received...')
  //TODO: Receive and update a product from id, if product does not exist return {error: "Product not found"
    const {id}: req.params;
    const newData = req.body;
    productsContainer
});

router.delete('/:id', async (
  req: express.Request,
  res: express.Response
  )=>{
  cliNotice('Server request received...')
  //TODO: Receive and update a product from id, if product does not exist return {error: "Product not found"
});

export default router
