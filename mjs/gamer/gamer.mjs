'use strict'


import mainnav from "../mainnav.mjs"


export default class {
  constructor() {
    /*
    // <!-- adsbygoogle banner name TypeNaN Profile -->
    const script = document.createElement('script')
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6854323187340337'
    script.crossorigin = 'anonymous'
    document.head.appendChild(script)
    */
    this.id = 'gamer'
    this.render()
  }

  render = async () => {
    this.lang = document.documentElement.lang
    this.section = document.createElement('section')
    this.section.id = 'GAMER'
    document.body.appendChild(this.section)

    new mainnav(this.section, this.id)
  }
}