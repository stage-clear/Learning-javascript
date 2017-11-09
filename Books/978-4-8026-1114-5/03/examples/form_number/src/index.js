import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import NumberForm from './NumberFrom'

const st = { textAlign: 'center'}

ReactDOM.render(
  <div style={st}>
    <NumberForm/>
  </div>,
  document.getElementById('root')
)
