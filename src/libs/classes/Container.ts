import {
  cliError, cliNotice, cliSuccess 
} from "../functions";
import * as fs from "fs";

export default class Container {
  _fileDir: string

  constructor (
    fileDir: string
  ) {
    this._fileDir = fileDir;
    this.readOrCreateFile();
  }

  /* ------------------------------------------ */
  /*                   Methods                  */
  /* ------------------------------------------ */

  /* --------- Begin readOrCreateFile --------- */
  async readOrCreateFile (): Promise<void> {
    try {
      await fs.promises.readFile(this._fileDir,'utf8')
    } catch (err) {
      if (err.code === 'ENOENT'){
        cliNotice(`File ${this._fileDir} does not exists\n${err.message}`);
        fs.promises.writeFile(this._fileDir,'[]','utf8');
        cliSuccess(`New file ${this._fileDir} created`);
      } else {
        cliError(`Error Code: ${err.code} | There was an unexpected error when trying to read ${this._fileDir}\n${err.message}`);
      }
    } 
  }
  /* ---------- End readOrCreateFile ---------- */

  /* --------------- Begin save --------------- */
  async save(data): Promise<number> {
    try {
      const jsonData = JSON.parse(
        await fs.promises.readFile(this._fileDir,'utf8')
      );
      const newData = data;
      if (jsonData.length) {
        const lastItem = jsonData[jsonData.length - 1];
        const lastId = lastItem.id ? lastItem.id : undefined;
        newData["id"] = lastId ? lastId + 1: 1;
      } else {
        newData["id"] = 1;
      }
      const jsonNewData = jsonData;
      jsonNewData.push(newData);
      await fs.promises.writeFile(this._fileDir,JSON.stringify(jsonNewData));
      cliSuccess('Product saved!')
      return await newData["id"];
    } catch (err) {
      cliError(err.message)
    }
  }
  /* ---------------- End save ---------------- */

  /* -------------- Begin getById ------------- */
  async get(id): Promise<unknown> {
    try {
      const jsonData = JSON.parse(await fs.promises.readFile(this._fileDir,'utf8'));
      const filteredData = jsonData.filter((elem) => elem.id === id);
      cliSuccess(`Object with id ${id} retrieved!`);
      return filteredData[0];
    } catch (err) {
      cliError(err.message);
    }
  }
  /* --------------- End getById -------------- */

  /* -------------- Begin getAll -------------- */
  async getAll(): Promise<unknown> {
    try {
      const jsonData = JSON.parse(await fs.promises.readFile(this._fileDir,'utf8'));
      cliSuccess('Array retrieved!');
      return jsonData
    } catch (err) {
      cliError(err.message);
    }
  }
  /* --------------- End getAll --------------- */

  /* ------------ Begin deleteById ------------ */
  async delete(id): Promise<void>{
    try {
      const jsonData  = JSON.parse(await fs.promises.readFile(this._fileDir,'utf8'));
      const jsonNewData = jsonData.filter((elem) => elem.id != id);
      await fs.promises.writeFile(this._fileDir, JSON.stringify(jsonNewData));
      cliSuccess(`Object with id ${id} deleted!`);
    } catch (err) {
      cliError(err.message);
    }
  }
  /* ------------- End deleteById ------------- */

  /* ------------- Begin deleteAll ------------ */
  async deleteAll(): Promise<void> {
    try {
      await fs.promises.unlink(this._fileDir);
      cliSuccess('Array deleted!');
    } catch (err) {
      cliError(err.message);
    } finally {
      fs.promises.writeFile(this._fileDir,'[]','utf8')
      cliSuccess(`File ${this._fileDir} cleared`);
    }
  }
  /* -------------- End deleteAll ------------- */

  
}