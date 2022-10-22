import * as clc from 'cli-color';
import * as emoji from 'node-emoji';
export default function cliError(message) {
    console.log(clc.white.bgRed(`${emoji.get('boom')} ${message}`));
}
//# sourceMappingURL=cliError.js.map