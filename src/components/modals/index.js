import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

export default class InfoModal extends Component {
  render () {
    const { showInfoModal, toggleInfoModal } = this.props
    return (
      <Modal show={showInfoModal} onHide={toggleInfoModal}>
        <Modal.Header closeButton>
          <h4>Welcome to <b>whatchord.io!</b></h4>
        </Modal.Header>
        <Modal.Body>
          <Info />
        </Modal.Body>
      </Modal>
    )
  }
}

class Info extends Component {
  render () {
    return (
      <div>
        <p>
          This application was built to help answer the question: "What chord am I playing?"
        </p>
        <p>
          To identify a chord select each key in the chord on the keyboard below. The identified
          chord (or chords) will display once a chord has been detected.
        </p>
      </div>
    )
  }
}
