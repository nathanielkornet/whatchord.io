import React, { Component } from 'react'
import './styles.css'
import WebMidi from 'webmidi'
import ChordDisplay from './components/chord-display'
import Keyboard from './components/keyboard'
const Tonal = require('tonal')
const Detect = require('./ext/tonal-detect')

function getNotesAndChordFromMidi (midiNotes) {
  const notes = midiNotes.map(midiNote => Tonal.Note.fromMidi(midiNote))
  const chords = getChordsFromNotes(notes)
  return { notes, chords }
}

function getChordsFromNotes (notes) {
  let chords = []

  if (notes.length > 0) {
    const rawNotes = notes.map(note => note.substring(0, note.length - 1))
    chords = Detect.chord(rawNotes)
  }

  return chords
}

export default class App extends Component {
  constructor () {
    super()

    this.state = {
      midiNotes: [],
      notes: [],
      chords: []
    }

    this.midiEnabled = false

    WebMidi.enable(err => {
      if (err) {
        console.error(err)
      } else {
        const input = WebMidi.inputs[0]
        if (input != null) {
          this.midiEnabled = true
          input.addListener('noteon', 'all', ev => this.midiNoteOn(ev))
          input.addListener('noteoff', 'all', ev => this.midiNoteOff(ev))
        }
      }
    })

    this.midiNoteOn = this.midiNoteOn.bind(this)
    this.midiNoteOff = this.midiNoteOff.bind(this)
    this.setNotes = notes => this.setState({notes})
  }

  midiNoteOn (ev) {
    const { midiNotes } = this.state

    const nextMidiNotes = midiNotes.slice() // copy

    const noteId = ev.data[1]

    nextMidiNotes.push(noteId)
    nextMidiNotes.sort()

    const { notes, chords } = getNotesAndChordFromMidi(nextMidiNotes)

    this.setState({midiNotes: nextMidiNotes, notes, chords})
  }

  midiNoteOff (ev) {
    const { midiNotes } = this.state

    const nextMidiNotes = midiNotes.slice() // copy

    const noteId = ev.data[1]

    const noteIdx = nextMidiNotes.indexOf(noteId)
    nextMidiNotes.splice(noteIdx, 1)

    const { notes, chords } = getNotesAndChordFromMidi(nextMidiNotes)

    this.setState({midiNotes: nextMidiNotes, notes, chords})
  }

  render () {
    const { notes, chords } = this.state
    const noteSet = new Set(notes)
    return <div>
      <ChordDisplay notes={notes} chords={chords} />
      <Keyboard notes={noteSet} midiEnabled={this.midiEnabled} />
    </div>
  }
}
