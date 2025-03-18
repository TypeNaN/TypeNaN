'use strict'


import mainnav from "../mainnav.mjs"


class Gamer {
  constructor() {
    if (!Gamer.instance) {
      Gamer.instance = this
    }
    return Gamer.instace
    /*
    // <!-- adsbygoogle banner name TypeNaN Profile -->
    const script = document.createElement('script')
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6854323187340337'
    script.crossorigin = 'anonymous'
    document.head.appendChild(script)
    */
    this.render()
  }

  render = async () => {
    this.lang = document.documentElement.lang
    this.section = document.createElement('section')
    this.section.id = 'GAMER'
    document.body.appendChild(this.section)

    new mainnav(this)
  }
}

export default new Gamer()

