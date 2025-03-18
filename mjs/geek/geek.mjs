'use strict'


class Geek {
  constructor() {
    if (!Geek.instance) {
      Geek.instance = this
    }
    return Geek.instace
    /*
    // <!-- adsbygoogle banner name TypeNaN Profile -->
    const script = document.createElement('script')
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6854323187340337'
    script.crossorigin = 'anonymous'
    document.head.appendChild(script)
    */
  }

  render = async () => {
    this.section = document.createElement('section')
    this.section.id = 'GEEK'
    document.body.appendChild(this.section)

    const { default: terminal } = await import('./terminal.mjs')
    new terminal(this.section)

    //const { default: matrix } = await import('./matrix.mjs')
    //new matrix(this.section)
  }
}

export default new Geek()
