import React, { Component } from "react"
import { browserHistory } from 'react-router'

export default class Main extends Component {

  render () {
    return (
      <div id='Main'>
        This is Main page.
      </div>
    )
  }

  componentDidMount () {
    browserHistory.push('/')
  }

}
