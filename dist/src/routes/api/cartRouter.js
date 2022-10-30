var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { cartContainer, productsContainer } from '../../utils/index.js';
import { cliError, cliWarn } from '../../libs/index.js';
const router = Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCartProducts = req.body;
    const newCart = {
        "products": newCartProducts
    };
    try {
        const id = yield cartContainer.save(newCart);
        res.json({
            message: `Cart successfully created with id ${id}`,
            response: id
        });
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield cartContainer.get(parseInt(id));
        if (product) {
            const newProducts = yield cartContainer.delete(parseInt(id));
            res.json({
                message: `Cart with id ${id} deleted`,
                response: newProducts
            });
        }
        else {
            cliWarn(`Cart with id ${id} not found!`);
            res.status(404).json({
                message: `Cart with id ${id} not found`,
            });
        }
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.get('/:id/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cart = yield cartContainer.getAll();
        const products = cart['products'];
        products
            ? res.status(200).json({
                message: `Products in cart id ${id}`,
                response: products
            })
            : res.status(404).json({
                message: `Cart with id ${id} not found`
            });
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.post('/:id/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idProduct = parseInt(req.body['id']);
    try {
        const newCartProduct = yield productsContainer.get(idProduct);
        if (newCartProduct) {
            const newCart = yield cartContainer.get(parseInt(id));
            newCart['products'].push(newCartProduct);
            const cartExists = yield cartContainer.update(parseInt(id), newCart);
            cartExists
                ? res.status(200).json({
                    message: `Product with id ${idProduct} added successfully to the cart with id ${id}`,
                })
                : res.status(404).json({
                    message: 'Cart not found'
                });
        }
        else
            res.status(404).json({
                message: 'Product not found'
            });
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.delete('/:id/products/:id_prod', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //# TODO: Eliminar un producto del carrito por su id de carrito y de producto.
    const { id, id_prod } = req.params;
    try {
        const productExist = yield productsContainer.get(parseInt(id_prod));
        if (productExist) {
            const cartExist = yield cartContainer.get(parseInt(id));
            cartExist
                ? res.status(200).json({
                    message: `Product with id ${id_prod} was removed successfully from the cart with id ${id}`
                })
                : res.status(404).json({
                    message: `Cart with id ${id} not found`
                });
        }
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
export default router;
//# sourceMappingURL=cartRouter.js.map