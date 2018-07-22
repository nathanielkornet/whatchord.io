import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import { Glyphicon } from 'react-bootstrap'
import MidiIcon from './midi'
import './styles.css'

export default class Icons extends Component {
  render () {
    const { toggleInfoModal } = this.props
    return (
      <div styleName={'icons'}>
        <MediaQuery minDeviceWidth={1224}>
          <Info toggleInfoModal={toggleInfoModal} />
          <MidiIcon />
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <Info toggleInfoModal={toggleInfoModal} />
        </MediaQuery>
      </div>
    )
  }
}

class Info extends Component {
  render () {
    const { toggleInfoModal } = this.props
    return (
      <div styleName={'info-container'}>
        <Glyphicon glyph='info-sign' onClick={toggleInfoModal} />
      </div>
    )
  }
}
