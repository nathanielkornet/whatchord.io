import React, { Component } from 'react'
import Color from 'color'
import { isMobile } from 'react-device-detect'

// TODO: base width/height props on keyboard dimensions

class Key extends Component {
  constructor (props) {
    super(props)

    this.state = { hovered: false }

    this.x = props.x

    this.toggleNote = this.toggleNote.bind(this)

    this.onMouseEnter = () => this.setState({hovered: true})
    this.onMouseLeave = () => this.setState({hovered: false})
  }

  toggleNote () {
    if (this.props.allowMouseInteraction) {
      this.props.toggleNote(this.props.noteName)
    }
  }

  render () {
    const { isSelected, allowMouseInteraction } = this.props

    let fill = isSelected ? 'red' : this.fill

    if (this.state.hovered && allowMouseInteraction && !isMobile) {
      fill = Color(fill).mix(Color('grey'), 0.5)
    }

    return <g>
      <text x={this.x}>{isSelected ? this.props.noteName : ''}</text>
      <rect
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={allowMouseInteraction ? 'pointer' : ''}
        onClick={this.toggleNote}
        fill={fill}
        stroke={'black'}
        x={this.x}
        y={0}
        width={this.width}
        height={this.height}
      />
    </g>
  }
}

export class WhiteKey extends Key {
  constructor (props) {
    super(props)
    this.width = 23
    this.height = props.keyboardHeight

    this.fill = 'white'
  }
}

export class BlackKey extends Key {
  constructor (props) {
    super(props)
    this.width = 13
    this.height = props.keyboardHeight * 2 / 3

    this.fill = 'black'
  }
}
