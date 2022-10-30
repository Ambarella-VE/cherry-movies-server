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
import { productsContainer } from '../../utils/index.js';
import { cliError, cliWarn, isAdmin } from '../../libs/index.js';
const router = Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productsContainer.getAll();
        if (products) {
            const msg200 = `Products retrieved successfully`;
            res.status(200).json({
                message: msg200,
                response: products
            });
        }
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield productsContainer.get(parseInt(id));
        if (product) {
            const msg200 = `Product with id ${id} found`;
            cliWarn(msg200);
            res.status(200).json({
                message: msg200,
                response: product
            });
        }
        else {
            const msg404 = `Product with id ${id} not found!`;
            cliWarn(msg404);
            res.status(404).json({
                message: msg404,
            });
        }
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.post('/', isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = req.body;
        const id = yield productsContainer.save(newProduct);
        if (id) {
            const msg200 = `Product saved with id ${id}`;
            cliWarn(msg200);
            res.status(200).json({
                message: msg200,
                response: id
            });
        }
        else {
            const msg404 = `Product not saved`;
            cliWarn(msg404);
            res.status(404).json({
                message: msg404
            });
        }
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.put('/:id', isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newData = req.body;
    try {
        const product = yield productsContainer.get(parseInt(id));
        if (product) {
            const newProducts = yield productsContainer.update(parseInt(id), newData);
            const msg200 = `Product with id ${id} updated`;
            cliWarn(msg200);
            res.status(200).json({
                message: msg200,
                response: newProducts
            });
        }
        else {
            const msg404 = `Product with id ${id} not found!`;
            cliWarn(msg404);
            res.status(404).json({
                message: `Product with id ${id} not found`,
            });
        }
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.delete('/:id', isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield productsContainer.get(parseInt(id));
        if (product) {
            const newProducts = yield productsContainer.delete(parseInt(id));
            const msg200 = `Product with id ${id} deleted`;
            cliWarn(msg200);
            res.json({
                message: msg200,
                response: newProducts
            });
        }
        else {
            const msg404 = `Product with id ${id} not found!`;
            cliWarn(msg404);
            res.status(404).json({
                message: msg404,
            });
        }
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
export default router;
//# sourceMappingURL=productsRouter.js.map