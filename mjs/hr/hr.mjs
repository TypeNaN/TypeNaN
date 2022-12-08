'use strict'


import mainnav from '../mainnav.mjs'
import landing from './landing.mjs'
import skill from './skill.mjs'


export default class {
  constructor() {
    /*
    // <!-- adsbygoogle banner name TypeNaN Profile -->
    const script = document.createElement('script')
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6854323187340337'
    script.crossorigin = 'anonymous'
    document.head.appendChild(script)
    */
    this.id = 'hr'
    this.render()
  }

  render = async () => {
    this.lang = document.documentElement.lang
    this.section = document.createElement('section')
    this.section.id = 'HR'
    document.body.appendChild(this.section)
    
    new mainnav(this)
    new landing(this.section)
    new skill(this.section)
    this.render_footer()
  }

  render_footer = async () => {
    this.footer = document.createElement('section')
    this.footer.id = 'footer-container'
    this.section.appendChild(this.footer)

    const ul = document.createElement('ul')    
    ul.id = 'footer-qrcode'
    this.footer.appendChild(ul)

    const img_path = [
      ['YouTube Channel', './assets/qr-youtube.webp', 'https://www.youtube.com/5ikronoz?view_as=subscriber&sub_confirmation=1'],
      ['Github', './assets/qr-github.webp', 'https://github.com/TypeNaN'],
      ['typenan💀duck.com', './assets/typenanatduckdotcom.webp', 'mailto:typenan@duck.com'],
      // ['Discord', './assets/qr-discord.webp', 'https://discord.gg/gsfuA7s2bw'],
      // ['Slack', './assets/qr-slack.webp', 'https://join.slack.com/t/aloneinthailand/shared_invite/zt-1d88p9fpg-z~20Alg5CA~cbaZJ0MHMzg']
    ]
    img_path.forEach((v) => {
      const li = document.createElement('li')
      const a = document.createElement('a')
      const img = document.createElement('img')
      img.alt = v[0]
      img.src = v[1]
      a.href = v[2]
      a.target = '_blank'
      a.appendChild(img)
      li.appendChild(a)
      ul.appendChild(li)
      a.innerHTML += `<h3>${v[0]}</h3>`
    })
  }
}