var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { cliError, cliNotice, cliSuccess } from "../functions";
import * as fs from "fs";
export default class Container {
    constructor(fileDir) {
        this._fileDir = fileDir;
        this.readOrCreateFile();
    }
    /* ------------------------------------------ */
    /*                   Methods                  */
    /* ------------------------------------------ */
    /* --------- Begin readOrCreateFile --------- */
    readOrCreateFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.promises.readFile(this._fileDir, 'utf8');
            }
            catch (err) {
                if (err['code'] === 'ENOENT') {
                    cliNotice(`File ${this._fileDir} does not exists\n${err['message']}`);
                    fs.promises.writeFile(this._fileDir, '[]', 'utf8');
                    cliSuccess(`New file ${this._fileDir} created`);
                }
                else {
                    cliError(`Error Code: ${err['code']} | There was an unexpected error when trying to read ${this._fileDir}\n${err['message']}`);
                }
            }
        });
    }
    /* ---------- End readOrCreateFile ---------- */
    /* --------------- Begin save --------------- */
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonData = JSON.parse(yield fs.promises.readFile(this._fileDir, 'utf8'));
                const newData = data;
                if (jsonData.length) {
                    const lastItem = jsonData[jsonData.length - 1];
                    const lastId = lastItem['id'] ? lastItem['id'] : undefined;
                    newData["id"] = lastId ? lastId + 1 : 1;
                }
                else {
                    newData["id"] = 1;
                }
                const jsonNewData = jsonData;
                jsonNewData.push(newData);
                yield fs.promises.writeFile(this._fileDir, JSON.stringify(jsonNewData));
                cliSuccess('Product saved!');
                return yield newData['id'];
            }
            catch (err) {
                cliError(err['message']);
            }
        });
    }
    /* ---------------- End save ---------------- */
    /* -------------- Begin getById ------------- */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonData = JSON.parse(yield fs.promises.readFile(this._fileDir, 'utf8'));
                const filteredData = jsonData.filter((elem) => elem['id'] === id);
                cliSuccess(`Object with id ${id} retrieved!`);
                return filteredData[0];
            }
            catch (err) {
                cliError(err['message']);
            }
        });
    }
    /* --------------- End getById -------------- */
    /* -------------- Begin getAll -------------- */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonData = JSON.parse(yield fs.promises.readFile(this._fileDir, 'utf8'));
                cliSuccess('Array retrieved!');
                return jsonData;
            }
            catch (err) {
                cliError(err['message']);
            }
        });
    }
    /* --------------- End getAll --------------- */
    /* ------------ Begin deleteById ------------ */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonData = JSON.parse(yield fs.promises.readFile(this._fileDir, 'utf8'));
                const jsonNewData = jsonData.filter((elem) => elem['id'] != id);
                yield fs.promises.writeFile(this._fileDir, JSON.stringify(jsonNewData));
                cliSuccess(`Object with id ${id} deleted!`);
            }
            catch (err) {
                cliError(err['message']);
            }
        });
    }
    /* ------------- End deleteById ------------- */
    /* ------------- Begin deleteAll ------------ */
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.promises.unlink(this._fileDir);
                cliSuccess('Array deleted!');
            }
            catch (err) {
                cliError(err['message']);
            }
            finally {
                fs.promises.writeFile(this._fileDir, '[]', 'utf8');
                cliSuccess(`File ${this._fileDir} cleared`);
            }
        });
    }
}
//# sourceMappingURL=Container.js.map
//# sourceMappingURL=Container.js.map