'use strict'


export default class {
  constructor() {

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
    this.section = document.createElement('section')
    this.section.id = 'GEEK'
    document.body.appendChild(this.section)
    const { default:terminal } = await import('./terminal.mjs')
    new terminal(this.section)
  }
}