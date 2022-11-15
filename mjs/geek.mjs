'use strict'


export default class {
  constructor() {
    this.render()
  }

  render = async () => {
    this.section = document.createElement('section')
    this.section.id = 'GEEK'
    document.body.appendChild(this.section)
  }
}