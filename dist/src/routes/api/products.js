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
import productsContainer from '../../utils/products.js';
import { cliError, cliNotice, cliWarn } from '../../libs/index.js';
const router = Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cliNotice('Server request received...');
    try {
        const products = yield productsContainer.getAll();
        res.send(products);
    }
    catch (err) {
        cliError(err['message']);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cliNotice('Server request received...');
    const { id } = req.params;
    try {
        const product = yield productsContainer.get(parseInt(id));
        if (product) {
            res.json({
                message: `Product with id ${id} found`,
                response: product
            });
        }
        else {
            cliWarn(`Product with id ${id} not found!`);
            res.status(404).json({
                message: `Product with id ${id} not found`,
            });
        }
    }
    catch (err) {
        cliError(err['message']);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cliNotice('Server request received...');
    try {
        const newProduct = req.body;
        const id = yield productsContainer.save(newProduct);
        res.json({
            message: `Product saved with id ${id}`,
            response: id
        });
    }
    catch (err) {
        cliError(err['message']);
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cliNotice('Server request received...');
    const { id } = req.params;
    const newData = req.body;
    try {
        const product = yield productsContainer.get(parseInt(id));
        if (product) {
            const newProducts = yield productsContainer.update(parseInt(id), newData);
            res.json({
                message: `Product with id ${id} updated`,
                response: newProducts
            });
        }
        else {
            cliWarn(`Product with id ${id} not found!`);
            res.status(404).json({
                message: `Product with id ${id} not found`,
            });
        }
    }
    catch (err) {
        cliError(err['message']);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cliNotice('Server request received...');
    const { id } = req.params;
    try {
        const product = yield productsContainer.get(parseInt(id));
        if (product) {
            const newProducts = yield productsContainer.delete(parseInt(id));
            res.json({
                message: `Product with id ${id} deleted`,
                response: newProducts
            });
        }
        else {
            cliWarn(`Product with id ${id} not found!`);
            res.status(404).json({
                message: `Product with id ${id} not found`,
            });
        }
    }
    catch (err) {
        cliError(err['message']);
    }
}));
export default router;
//# sourceMappingURL=products.js.map