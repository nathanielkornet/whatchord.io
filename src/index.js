import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import WebMidi from 'webmidi'

let midiInput = null

new Promise((resolve, reject) => {
  WebMidi.enable(err => {
    if (err) {
      console.log('WebMidi is not supported')
    } else {
      midiInput = WebMidi.inputs[0]
    }
    resolve()
  })
}).then(() => ReactDOM.render(
  <App midiInput={midiInput} />,
  document.getElementById('app')
))
