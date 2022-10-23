import clc from 'cli-color';
import emoji from 'node-emoji';
export default function cliWarn(message) {
    console.log(clc.yellow.blink(`${emoji.get('warning')} ${message}`));
}
//# sourceMappingURL=cliWarn.js.map
//# sourceMappingURL=cliWarn.js.map