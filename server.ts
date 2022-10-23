import express from 'express';
import emoji from 'node-emoji';
import {
  cliNotice, 
  cliWarn 
} from './src/libs/index.js';

/* --------- //# Server Configuration --------- */
const app: express.Application = express();
const PORT: string | number = process.env.PORT || 8080;
app.use(express.static('public'));

/* ---------------- //# Routes ---------------- */
app.get('/',(
  req: express.Request,
  res: express.Response,
  )=>{
    cliWarn(`A request was made on path ${req.url}`);
    res.sendFile(`/index.html`)
})

/* ------------- //# Raise Server ------------- */
app.listen(PORT,()=>{
  cliNotice(`${emoji.get('white_check_mark')} Server listening on port ${PORT}`)
})
