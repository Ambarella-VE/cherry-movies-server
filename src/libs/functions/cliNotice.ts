import * as clc from 'cli-color';
import * as emoji from 'node-emoji';

export default function cliNotice (message: string): void {
  console.log(clc.blue.italic(`${emoji.get('loudspeaker')} ${message}`))
}