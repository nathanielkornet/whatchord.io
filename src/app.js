import React, { Component } from 'react'
import './styles'
import WebMidi from 'webmidi'
import ChordDisplay from './components/chord-display'
import Keyboard from './components/keyboard'
const Tonal = require('tonal')
const Detect = require('./ext/tonal-detect')
import { isMobile } from 'react-device-detect'

function noteSort (a, b) {
  const aOctave = a[a.length - 1]
  const aNote = a.substr(0, a.length - 1)
  const _a = aOctave + aNote

  const bOctave = b[b.length - 1]
  const bNote = b.substr(0, b.length - 1)
  const _b = bOctave + bNote

  return _a > _b
    ? 1
    : 0
}

function getNotesAndChordFromMidi (midiNotes) {
  const notes = midiNotes.map(midiNote => Tonal.Note.fromMidi(midiNote)).sort(noteSort)
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
      initialized: isMobile,
      midiNotes: [],
      notes: [],
      chords: []
    }

    this.midiEnabled = false

    this.midiNoteOn = this.midiNoteOn.bind(this)
    this.midiNoteOff = this.midiNoteOff.bind(this)
    this.toggleNote = this.toggleNote.bind(this)
    this.initialize = () => this.setState({initialized: true})

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
      this.initialize()
    })
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

  // for use with mouse interaction
  toggleNote (noteName) {
    const { notes } = this.state

    const nextNotes = notes.slice()

    if (nextNotes.includes(noteName)) {
      const noteIdx = nextNotes.indexOf(noteName)
      nextNotes.splice(noteIdx, 1)
    } else {
      nextNotes.push(noteName)
    }

    nextNotes.sort(noteSort)

    const chords = getChordsFromNotes(nextNotes)

    this.setState({notes: nextNotes, chords})
  }

  render () {
    const { notes, chords } = this.state
    const noteSet = new Set(notes)

    if (!this.state.initialized) return null

    return <div className={'flex-column'}>
      <ChordDisplay notes={notes} chords={chords} />
      <Keyboard notes={noteSet} midiEnabled={this.midiEnabled} toggleNote={this.toggleNote} />
    </div>
  }
}
