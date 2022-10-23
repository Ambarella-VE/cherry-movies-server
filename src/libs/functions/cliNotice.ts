import clc from 'cli-color';
import emoji from 'node-emoji';

export default function cliNotice (message: string): void {
  console.log(clc.blue.italic(`${emoji.get('loudspeaker')} ${message}`))
}
