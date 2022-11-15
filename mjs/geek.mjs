'use strict'


import terminal from './terminal.mjs'


export default class {
  constructor() {
    this.render()
  }

  render = async () => {
    this.section = document.createElement('section')
    this.section.id = 'GEEK'
    document.body.appendChild(this.section)
    new terminal(this.section)
  }
}