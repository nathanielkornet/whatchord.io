import React, { Component } from 'react'

export default class ChordDisplay extends Component {
  render () {
    const { notes, chords } = this.props

    return <div className={'chord-display'}>
      <div className={'chords'}>
        {chords.map(chord => <span key={chord}>{chord + ' '}</span>)}
      </div>
      <div className={'notes'}>
        {notes.map(note => {
          const noteOctave = note[note.length - 1]
          const noteName = note.substring(0, note.length - 1)
          return (
            <span key={note}>
              {noteName + ''}
              <sub>{noteOctave}</sub>
            </span>
          )
        })}
      </div>
    </div>
  }
}
