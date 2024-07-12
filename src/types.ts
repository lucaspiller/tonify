// Represents a musical note
export interface Note {
  /**
   * The duration of the note or rest.
   * 1 = whole note
   * 2 = half note
   * 4 = quarter note
   * 8 = eighth note
   * 16 = sixteenth note
   * 32 = thirty-second note
   */
  duration: number;

  /**
   * The pitch of the note, represented by a letter from A to G.
   * If null, this represents a rest (a pause in the music).
   */
  pitch: string | null;

  /**
   * The octave of the note.
   * In standard notation, middle C is typically in octave 4.
   * Higher numbers represent higher octaves.
   */
  octave: number;

  /**
   * Indicates whether the note is sharp.
   * true if the note is sharp, false otherwise.
   */
  sharp: boolean;
}