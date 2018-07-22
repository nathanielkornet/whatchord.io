import React, { Component } from 'react'
import './styles.css'
import { MidiIcon } from './components/icons'
import ChordDisplay from './components/chord-display'
import Keyboard from './components/keyboard'
import { Note } from 'tonal'
import { chord as detectChord } from 'tonal-detector'

function getNotesAndChordFromMidi (midiNotes) {
  const notes = midiNotes.map(midiNote => Note.fromMidi(midiNote))
  const chords = getChordsFromNotes(notes)
  return { notes, chords }
}

function getChordsFromNotes (notes) {
  let chords = []

  if (notes.length > 0) {
    const rawNotes = notes.map(note => note.substring(0, note.length - 1))
    chords = detectChord(rawNotes)
  }

  return chords
}

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      midiNotes: [],
      notes: [],
      chords: []
    }

    this.midiNoteOn = this.midiNoteOn.bind(this)
    this.midiNoteOff = this.midiNoteOff.bind(this)
    this.toggleNote = this.toggleNote.bind(this)
    this.midiEnabled = false

    if (props.midiInput != null) {
      this.midiInput = props.midiInput
      this.midiInput.addListener('noteon', 'all', ev => this.midiNoteOn(ev))
      this.midiInput.addListener('noteoff', 'all', ev => this.midiNoteOff(ev))
    }
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

    const chords = getChordsFromNotes(nextNotes)

    this.setState({notes: nextNotes, chords})
  }

  render () {
    const { notes, chords } = this.state
    const noteSet = new Set(notes)

    return <div className={'flex-column'}>
      <MidiIcon />
      <ChordDisplay notes={notes} chords={chords} />
      <Keyboard notes={noteSet} midiEnabled={this.midiInput != null} toggleNote={this.toggleNote} />
    </div>
  }
}
