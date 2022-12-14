import {
  cliError, cliNotice, cliSuccess 
} from "../functions/index.js";
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
    } catch (err: any) {
      if (err['code'] === 'ENOENT'){
        cliNotice(`File ${this._fileDir} does not exists\n${err['message']}`);
        fs.promises.writeFile(this._fileDir,'[]','utf8');
        cliSuccess(`New file ${this._fileDir} created`);
      } else {
        cliError(`Error Code: ${err['code']} | There was an unexpected error when trying to read ${this._fileDir}\n${err['message']}`);
      }
    } 
  }
  /* ---------- End readOrCreateFile ---------- */

  /* --------------- Begin save --------------- */
  async save(data: object): Promise<number|undefined> {
    try {
      const jsonData: Array<object> = JSON.parse(
        await fs.promises.readFile(this._fileDir,'utf8')
      );
      const newData: any = data;
      if (jsonData.length) {
        const lastItem: any = jsonData[jsonData.length - 1];
        const lastId: any | undefined = lastItem['id'] ? lastItem['id'] : undefined;
        newData["id"] = lastId ? lastId + 1: 1;
      } else {
        newData["id"] = 1;
      }
      const jsonNewData = jsonData;
      jsonNewData.push(newData);
      await fs.promises.writeFile(this._fileDir,JSON.stringify(jsonNewData));
      cliSuccess('Product saved!')
      return await newData['id'];
    } catch (err: any) {
      cliError(err['message'])
    }
  }
  /* ---------------- End save ---------------- */

  /* --------------- Begin update --------------- */
  async update(
    id: number,
    element: object
  ): Promise<any> {
    try {
      const data: any = await this.getAll()
      const elemIndex = data.findIndex((elem: any)=> elem['id'] === id)
      if (elemIndex){
        data[elemIndex] = {
          id: id,
          ...element
        }
        await fs.promises.writeFile(this._fileDir, JSON.stringify(data))
        cliSuccess(`Object with id ${id} updated!`);
        return data;
      }
    } catch (err: any) {
      cliError(err['message']);
    }
  }
  /* ---------------- End update ---------------- */

  /* -------------- Begin getById ------------- */
  async get(id: number): Promise<any> {
    try {
      const data: any = await this.getAll()
      if (data.length > 0){
        const element = data.find((elem: any) => elem['id'] === id);
        cliSuccess(`Object with id ${id} retrieved!`);
        return element;
      }
    } catch (err: any) {
      cliError(err['message']);
    }
  }
  /* --------------- End getById -------------- */

  /* -------------- Begin getAll -------------- */
  async getAll(): Promise<any> {
    try {
      const jsonData = JSON.parse(await fs.promises.readFile(this._fileDir,'utf8'));
      cliSuccess('Array retrieved!');
      return jsonData
    } catch (err: any) {
      cliError(err['message']);
    }
  }
  /* --------------- End getAll --------------- */

  /* ------------ Begin deleteById ------------ */
  async delete(id: number): Promise<void>{
    try {
      const data: any = await this.getAll()
      const jsonNewData = data.filter((elem: any) => elem['id'] != id);
      await fs.promises.writeFile(this._fileDir, JSON.stringify(jsonNewData));
      cliSuccess(`Object with id ${id} deleted!`);
    } catch (err: any) {
      cliError(err['message']);
    }
  }
  /* ------------- End deleteById ------------- */

  /* ------------- Begin deleteAll ------------ */
  async deleteAll(): Promise<void> {
    try {
      await fs.promises.unlink(this._fileDir);
      cliSuccess('Array deleted!');
    } catch (err: any) {
      cliError(err['message']);
    } finally {
      fs.promises.writeFile(this._fileDir,'[]','utf8')
      cliSuccess(`File ${this._fileDir} cleared`);
    }
  }
  /* -------------- End deleteAll ------------- */

  
}
