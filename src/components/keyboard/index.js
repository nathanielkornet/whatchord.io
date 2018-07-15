import React, { Component } from 'react'
import { WhiteKey, BlackKey } from './key'
import { isMobile } from 'react-device-detect'

const numOctaves = isMobile ? 2 : 6

const baseNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

const whiteKeyNotes = []
let blackKeyNotes = []

for (let i = 0; i < numOctaves; i++) {
  baseNotes.forEach(baseNote => {
    const noteName = baseNote + i
    if (baseNote.length === 2) {
      blackKeyNotes.push({noteName})
    } else {
      whiteKeyNotes.push(noteName)
    }
  })
}

let x = 0
let j = 0
// this only works if we assume we are starting with C0
blackKeyNotes = blackKeyNotes.map((noteData, i) => {
  if (j === 0) {
    if (i === 0) {
      x += 14.33333
    } else {
      x += 14.33333 + 29
    }
  } else if (j === 1) {
    x += 27.33333
  } else if (j === 2) {
    x += 40.58334
  } else if (j === 3) {
    x += 26
  } else if (j === 4) {
    x += 23.5
    j = -1
  }
  j++
  return { noteName: noteData.noteName, x }
})


export default class Keyboard extends Component {
  constructor () {
    super()

    this.keyboardWidth = 160 * numOctaves
    this.keyboardHeight = 120
  }
  render () {
    const { notes, toggleNote, midiEnabled } = this.props

    return (
      <div>
        <svg viewBox={`0 0 ${this.keyboardWidth} ${this.keyboardHeight}`}>
          {whiteKeyNotes.map((noteName, i) => {
            const x = 23 * i
            const isSelected = notes.has(noteName)

            return (
              <WhiteKey key={noteName}
                noteName={noteName}
                x={x}
                keyboardHeight={this.keyboardHeight}
                allowMouseInteraction={!midiEnabled}
                isSelected={isSelected}
                toggleNote={toggleNote} />
            )
          })}
          {blackKeyNotes.map((noteData, i) => {
            const isSelected = notes.has(noteData.noteName)
            return (
              <BlackKey key={noteData.noteName}
                noteName={noteData.noteName}
                x={noteData.x}
                keyboardHeight={this.keyboardHeight}
                allowMouseInteraction={!midiEnabled}
                isSelected={isSelected}
                toggleNote={toggleNote} />
            )
          })}
        </svg>
      </div>
    )
  }
}
