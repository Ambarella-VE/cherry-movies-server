import clc from 'cli-color';
import emoji from 'node-emoji';
export default function cliSuccess(message) {
    console.log(clc.green.bold(`${emoji.get('tada')} ${message}`));
}
//# sourceMappingURL=cliSuccess.js.map