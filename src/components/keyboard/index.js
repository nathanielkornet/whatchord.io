import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import Keyboard from './keyboard'

export default class KeyboardView extends Component {
  render () {
    return (
      <div>
        <MediaQuery minDeviceWidth={1224}>
          <Keyboard numOctaves={5} {...this.props} />
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <MediaQuery orientation={'portrait'}>
            <Keyboard numOctaves={2} {...this.props} />
          </MediaQuery>
          <MediaQuery orientation={'landscape'}>
            <Keyboard numOctaves={2} heightScale={0.6} {...this.props} />
          </MediaQuery>
        </MediaQuery>
      </div>
    )
  }
}
