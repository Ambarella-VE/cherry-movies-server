import express from 'express';
import * as emoji from 'node-emoji';
import { cliNotice, cliWarn } from './libs/index.js';
/* --------- //# Server Configuration --------- */
const app = express();
const PORT = process.env.PORT || 8080;
/* ---------------- //# Routes ---------------- */
app.get('/', (req, res) => {
    res.sendFile('../client/public/index.html');
    cliWarn(`A request was made on path ${req.url}`);
});
/* ------------- //# Raise Server ------------- */
app.listen(PORT, () => {
    cliNotice(`${emoji.get('white_check_mark')} Server listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map