import React, { Component } from 'react'
import { Chord } from 'tonal'
import './styles.css'

const baseNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

function noteSort (a, b) {
  const aOctave = a[a.length - 1]
  const bOctave = b[b.length - 1]

  if (aOctave > bOctave) {
    return 1
  } else if (aOctave < bOctave) {
    return -1
  }

  const aNote = a.substr(0, a.length - 1)
  const aNoteIdx = baseNotes.indexOf(aNote)

  const bNote = b.substr(0, b.length - 1)
  const bNoteIdx = baseNotes.indexOf(bNote)

  if (aNoteIdx > bNoteIdx) {
    return 1
  } else if (aNoteIdx < bNoteIdx) {
    return -1
  }
}

function formatChordType (chordType) {
  return chordType === '64'
    ? 'Maj'
    : chordType
}

export default class ChordDisplay extends Component {
  render () {
    const { notes, chords } = this.props

    chords.forEach(c => console.log(Chord.tokenize(c)))

    const sortedNotes = notes.sort(noteSort)

    return <div styleName={'chord-display'}>
      <div styleName={'chords'}>
        {chords.map(chord => {
          // splits the chord into root note and chord type
          const tokens = Chord.tokenize(chord)
          return (
            <span key={chord} styleName={'chord'}>
              {tokens[0]}
              <sup>{formatChordType(tokens[1])}</sup>
            </span>
          )
        })}
      </div>
      <div styleName={'notes'}>
        {sortedNotes.map(note => {
          // const noteOctave = note[note.length - 1]
          const noteName = note.substring(0, note.length - 1)
          return (
            <span key={note} >
              {noteName + ''}
            </span>
          )
        })}
      </div>
    </div>
  }
}
