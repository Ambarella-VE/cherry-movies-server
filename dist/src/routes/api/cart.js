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
import { cliError, cliNotice, cliWarn } from '../../libs/index.js';
const router = Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cliNotice('Server request received...');
    //# TODO: Crea un carrito y devuelve su id.
    try {
        cliWarn('');
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cliNotice('Server request received...');
    //# TODO: Vacía un carrito y lo elimina.
    try {
        cliWarn('');
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.get('/:id/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cliNotice('Server request received...');
    //# TODO: Me permite listar todos los productos guardados en el carrito.
    try {
        cliWarn('');
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.post('/:id/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cliNotice('Server request received...');
    //# TODO: Para incorporar productos al carrito por su id de producto.
    try {
        cliWarn('');
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
router.delete('/:id/products/:id_prod', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cliNotice('Server request received...');
    //# TODO: Eliminar un producto del carrito por su id de carrito y de producto.
    try {
        cliWarn('');
    }
    catch (err) {
        cliError(err['message'] || err);
    }
}));
export default router;
//# sourceMappingURL=cart.js.map