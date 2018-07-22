import React, { Component } from 'react'
import './styles.css'

export default class ChordDisplay extends Component {
  render () {
    const { notes, chords } = this.props

    return <div styleName={'chord-display'}>
      <div styleName={'chords'}>
        {chords.map(chord => <span key={chord}>{chord + ' '}</span>)}
      </div>
      <div styleName={'notes'}>
        {notes.map(note => {
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
