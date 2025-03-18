'use strict'


export default class {
  constructor() {
    //this._private
  }

  create = (id, description) => {
    this.parent = document.getElementById('GEEK')
    if (!this.parent) {
      this.parent = document.createElement('section')
      this.parent.id = 'GEEK'
      document.body.appendChild(this.parent)
    }

    this.windows = document.createElement('section')
    this.windows.id = id
    this.windows.className = 'Windows'
    this.parent.appendChild(this.windows)
    this.createElement('div', [['id', 'Windows-Title']], this.windows, `DEEP ${id}`)
    this.createElement('div', [['id', 'Windows-X']], this.windows.childNodes[0], 'X')
    this.createElement('div', [['id', 'Windows-console']], this.windows)
    this.createElement('div', [['id', 'Windows-console-foot']], this.windows, 'status')
    this.createElement('pre', [['id', 'Windows-description']], this.windows.childNodes[1], description)
    this.console = this.windows.childNodes[1]
    this.console.className = 'allow-print'

    /*
    const ads = document.createElement('div')
    ads.className = 'myAds'
    ads.innerHTML += '\
      <ins class="adsbygoogle"\
      style="display:block"\
      data-ad-client="ca-pub-6854323187340337"\
      data-ad-slot="1579484690"\
      data-ad-format="auto"\
      data-full-width-responsive="true">\
      </ins>\
    '
    this.windows.childNodes[1].childNodes[0].appendChild(ads)
    if ('adsbygoogle' in window) (adsbygoogle = window.adsbygoogle || []).push({})
    */

    this.X = this.windows.childNodes[0].childNodes[1]
    this.X.onclick = (e) => this.remove()
    this.randomStatusBarReverse()
  }

  createElement = (n, a = [], p = false, t = false) => {
    const e = document.createElement(n)
    a.forEach((v) => e.setAttribute(v[0], v[1]))
    if (t) e.innerHTML = t
    let parent
    if (p instanceof HTMLElement) parent = p
    else if (typeof p === 'string') parent = document.getElementById(p) || document.body
    else parent = document.body
    parent.appendChild(e)
    return e
  }

  show = () => this.windows.className = 'Windows Windows-Slide-RF'
  waitfor = (millisecond) => new Promise(resolve => setTimeout(() => resolve(), millisecond))
  remove = async () => {
    const id = this.windows.id
    this.windows.id = `${id}-removing`
    this.windows.className = 'Windows Windows-remove'
    this.waitfor(1000).then(async () => this.windows.parentNode.removeChild(this.windows))
  }

  typing = (parent, msg, delta = 16.66) => {
    const p = document.createElement('p')
    const span = document.createElement('span')
    const cursor = document.createElement('span')
    cursor.setAttribute('class', 'blink-cursor')
    p.appendChild(span)
    p.appendChild(cursor)
    parent.appendChild(p)
    let txt = ''
    let timeout
    const typeUpdate = async (span, txt, msg) => {
      txt = msg.substring(0, txt.length + 1)
      span.innerHTML = txt.replace(' ', '&nbsp;')
      const bottom = this.console.scrollHeight - Math.round(this.console.scrollTop) === this.console.clientHeight
      if (!bottom) this.console.scrollTop = this.console.clientHeight
      if (txt === msg) {
        await this.waitfor(3000)
        cursor.parentNode.removeChild(cursor)
        clearTimeout(timeout)
      }
      else timeout = setTimeout(() => typeUpdate(span, txt, msg), Math.random() * 33.33)
    }
    timeout = setTimeout(() => typeUpdate(span, txt, msg), delta)
  }

  randomStatusBar = async () => {
    this.StatusBarTyping(this.windows.childNodes[2], this.generateNonce())
    setInterval(() => this.StatusBarTyping(this.windows.childNodes[2], this.generateNonce()), 5000)
  }

  randomStatusBarReverse = async () => {
    this.StatusBarTypingReverse(this.windows.childNodes[2], this.generateNonce())
    setInterval(() => this.StatusBarTypingReverse(this.windows.childNodes[2], this.generateNonce()), 5000)
  }

  StatusBarTyping = (parent, msg, delta = 16.66) => {
    const span = document.createElement('span')
    const cursor = document.createElement('span')
    cursor.setAttribute('class', 'blink-cursor')
    parent.innerHTML = ''
    parent.appendChild(span)
    parent.appendChild(cursor)
    let txt = ''
    let timeout
    const typeUpdate = async (span, txt, msg) => {
      txt = msg.substring(0, txt.length + 1)
      span.innerHTML = txt.replace(' ', '&nbsp;')
      if (txt === msg) clearTimeout(timeout)
      else timeout = setTimeout(() => typeUpdate(span, txt, msg), Math.random() * 33.33)
    }
    timeout = setTimeout(() => typeUpdate(span, txt, msg), delta)
  }

  StatusBarTypingReverse = (parent, msg, delta = 16.66) => {
    const span = document.createElement('span')
    const cursor = document.createElement('span')
    cursor.setAttribute('class', 'blink-cursor')
    parent.innerHTML = ''
    parent.appendChild(cursor)
    parent.appendChild(span)
    let txt = ''
    let timeout
    msg = msg.split('').reverse().join('')
    const typeUpdate = async (span, txt, msg) => {
      txt = msg.substring(msg.length - (txt.length + 1) , msg.length)
      span.innerHTML = txt.replace(' ', '&nbsp;')
      if (txt === msg) clearTimeout(timeout)
      else timeout = setTimeout(() => typeUpdate(span, txt, msg), Math.random() * 33.33)
    }
    timeout = setTimeout(() => typeUpdate(span, txt, msg), delta)
  }

  generateNonce() {
    // const posible = '\
    // ABCDEFGHIJKLMNOPQRSTUVWXYZ \
    // abcdefghijklmnopqrstuvwxyz \
    // 0123456789;:.@#$%!*(){}[]-=+^<> \
    // กขฃคตฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ \
    // ๐๑๒๓๔๕๖๗๘๙ฯๆ \
    // あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん '
    const posible = ' ! ! ! ! ? ? & あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん '
    let text = ''
    let length = 24
    for (let i = 0; i < length; i++) text += posible.charAt(Math.floor(Math.random() * posible.length))
    return text
  }

  module = async (src) => await import(src)
}
