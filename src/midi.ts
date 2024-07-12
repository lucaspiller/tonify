import MidiWriter from 'midi-writer-js';
import { Note } from './types';

export function convertToMidi(notes: Note[], tempo: number, octaveShift: number): Uint8Array {
  const track = new MidiWriter.Track();

  // Set tempo
  track.setTempo(tempo);

  // Set instrument
  track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 80}));

  const noteToMidiNumber: { [key: string]: number } = {
    'C': 60, 'C#': 61, 'D': 62, 'D#': 63, 'E': 64, 'F': 65,
    'F#': 66, 'G': 67, 'G#': 68, 'A': 69, 'A#': 70, 'B': 71
  };

  let waitTicks = 0;

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const durationInTicks = Math.round(512 / note.duration);
    
    if (note.pitch === null) {
      // This is a rest, accumulate wait time
      waitTicks += durationInTicks;
    } else {
      let pitchName = note.pitch + (note.sharp ? '#' : '');
      let midiNumber = noteToMidiNumber[pitchName] + (note.octave - 4 + octaveShift) * 12;

      // Ensure the MIDI number is within valid range (0-127)
      midiNumber = Math.min(Math.max(midiNumber, 0), 127);

      const noteEvent: any = {
        pitch: midiNumber,
        duration: `T${durationInTicks}`,
        velocity: 127,
      };

      // If there's accumulated wait time, add it to this note
      if (waitTicks > 0) {
        noteEvent.wait = `T${waitTicks}`;
        waitTicks = 0;
      }

      track.addEvent(new MidiWriter.NoteEvent(noteEvent));
    }
  }

  // Add remaining wait time and a quarter note rest to the end
  waitTicks += Math.round(512 / 4);
  track.addEvent(new MidiWriter.NoteEvent({
    wait: `T${waitTicks}`,
    pitch: [0],
    duration: 'T0',
    velocity: 0
  }));

  const write = new MidiWriter.Writer([track]);
  return write.buildFile();
}