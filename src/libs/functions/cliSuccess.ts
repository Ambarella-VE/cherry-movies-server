import clc from 'cli-color';
import emoji from 'node-emoji';

export default function cliSuccess (message: string): void {
  console.log(clc.green.bold(`${emoji.get('tada')} ${message}`))
}
