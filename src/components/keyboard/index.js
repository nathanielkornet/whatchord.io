import React, { Component } from 'react'

const baseNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

const whiteKeyNotes = []
let blackKeyNotes = []

const whiteKeyWidth = 23

for (let i = 0; i < 6; i++) {
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

const keyboardWidth = 161 * 8
const keyboardHeight = 120

export default class Keyboard extends Component {
  render () {
    const { notes } = this.props
    return (
      <div>
        <svg width={keyboardWidth} height={keyboardHeight}>
          {whiteKeyNotes.map((noteName, i) => {
            const x = whiteKeyWidth * i
            const fill = notes.has(noteName) ? 'red' : 'white'
            return <rect key={noteName} fill={fill} stroke={'black'} x={x} y={0} width={whiteKeyWidth} height={keyboardHeight} />
          })}
          {blackKeyNotes.map((noteData, i) => {
            const fill = notes.has(noteData.noteName) ? 'red' : 'black'
            return <rect key={noteData.noteName} fill={fill} stroke={'black'} x={noteData.x} y={0} width={13} height={80} />
          })}
        </svg>
      </div>
    )
  }
}
