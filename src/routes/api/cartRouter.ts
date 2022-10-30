import express, { Router } from 'express';
import {
  cartContainer
} from '../../utils/containers/index.js';
import {
  cliError,
  cliNotice,
  cliWarn
} from '../../libs/index.js';

const router = Router();

router.post('/', async (
  req: express.Request, 
  res: express.Response
  )=>{
    cliNotice('Server request received...')
    //# TODO: Crea un carrito y devuelve su id.
    try {
      cliWarn('')
    } catch (err: any) {
      cliError(err['message'] || err);
    }
  })

router.delete('/:id', async (
  req: express.Request, 
  res: express.Response
  )=>{
    cliNotice('Server request received...')
    //# TODO: Vacía un carrito y lo elimina.
    try {
      cliWarn('')
    } catch (err: any) {
      cliError(err['message'] || err);
    }
  })

router.get('/:id/products', async (
  req: express.Request, 
  res: express.Response
  )=>{
    cliNotice('Server request received...')
    //# TODO: Me permite listar todos los productos guardados en el carrito.
    try {
      cliWarn('')
    } catch (err: any) {
      cliError(err['message'] || err);
    }
  })

router.post('/:id/products', async (
  req: express.Request, 
  res: express.Response
  )=>{
    cliNotice('Server request received...')
    //# TODO: Para incorporar productos al carrito por su id de producto.
    try {
      cliWarn('')
    } catch (err: any) {
      cliError(err['message'] || err);
    }
  })

router.delete('/:id/products/:id_prod', async (
  req: express.Request, 
  res: express.Response
  )=>{
    cliNotice('Server request received...')
    //# TODO: Eliminar un producto del carrito por su id de carrito y de producto.
    try {
      cliWarn('')
    } catch (err: any) {
      cliError(err['message'] || err);
    }
    })

export default router;
