import fs from 'fs';
import { parseRingtone } from './src/nokiaParser';
import { convertToMidi } from './src/midi';

const ringtone = `4g2 8#a2 16g2 16- 16g2
8c3 8g2 8f2 4g2 8d3
16g2 16- 16g2 8#d3 8d3
8#a2 8g2 8d3 8g3 16g2
16f2 16- 16f2 8d2 8a2
2g2`;

const tempo = 100;
const octaveShift = 4;

(function main() {
  const notes = parseRingtone(ringtone)
  const midi = convertToMidi(notes, tempo, octaveShift);
  fs.writeFileSync('output.mid', midi);
})();