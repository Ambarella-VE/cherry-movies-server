import clc from 'cli-color';
import emoji from 'node-emoji';
export default function cliError(message) {
    console.log(clc.white.bgRed(`${emoji.get('boom')} ${message}`));
}
//# sourceMappingURL=cliError.js.map
//# sourceMappingURL=cliError.js.map