import * as clc from 'cli-color';
import * as emoji from 'node-emoji';

export default function cliWarn (message: string): void {
  console.log(clc.yellow.blink(`${emoji.get('warning')} ${message}`))
}