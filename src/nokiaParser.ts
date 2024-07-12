import { Note } from './types';

export function parseRingtone(ringtone: string): Note[] {
  const notes: Note[] = [];
  const parts = ringtone.replace(/\n/g, ' ').split(' ');

  for (const part of parts) {
    const match = part.match(/^(\d+)(\.)?(#?)([a-g]|-)?(\d)?$/);
    if (match) {
      const [, duration, dotted, sharp, pitch, octave] = match;

      let durationValue = parseInt(duration);
      if (dotted) {
        durationValue = durationValue * 1.5;
      }

      notes.push({
        duration: durationValue,
        pitch: pitch === '-' ? null : pitch?.toUpperCase() ?? null,
        octave: octave ? parseInt(octave) : 2,
        sharp: sharp === '#'
      });
    }
  }

  return notes;
}
