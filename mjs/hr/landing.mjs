'use strict'


const landing_lang = {
  info1: {
    th: 'คุณสามารถดาวน์โหลด',
    en: 'You can download.'
  },
  info2: {
    th: 'รูปแบบมาตรฐานไฟล์ PDF ได้ที่นี่',
    en: 'Standard format in PDF file here.'
  },
  info3: {
    th: 'หรือสละเวลาสักเล็กน้อย<br>เพื่อเยี่ยมชมและสำรวจเว็บไซต์',
    en: 'Or take a few moments to <br>visit and explore the website.'
  }
}


export default class {
  constructor(section) {
    this.section = section
    this.render()
  }

  render = async () => {
    this.lang = document.documentElement.lang

    this.landing = document.createElement('section')
    this.landing.id = 'HR-Landing'
    this.section.appendChild(this.landing)
    
    this.landing.innerHTML += `
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>`
    
    const landing_box = document.createElement('div')
    landing_box.id = 'HR-Landing-Download'
    landing_box.innerHTML = `<h3>${landing_lang['info1'][this.lang]}</h3>
    <div id="HR-Landing-header-resume"></div>
    <h3>${landing_lang['info2'][this.lang]}</h3>
    <a target="_blank" href="./assets/resume.pdf#toolbar=1&navpanes=1&scrollbar=0&view=FitH,top"><button>Download PDF</button></a>
    <h3>${landing_lang['info3'][this.lang]}</h3>`
    
    this.landing.appendChild(landing_box)
    this.landing.onclick = () => this.randomText(this.generateNonce(6))
    this.randomText(this.generateNonce(6))
    
    const observer = new IntersectionObserver(async (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) this.randomText(this.generateNonce(6))
      })
    })
    const scrollAnimate = document.querySelectorAll('#HR-Landing-header-resume')
    scrollAnimate.forEach(async (el) => observer.observe(el))
  }

  randomText = (msg = `${this.generateNonceUp()}${this.generateNonce(5)}`) => {
    this.renderNonce(msg)
    if (msg != 'Resume') {
      let char = msg.split('')
      if (char[0] != 'R') char[0] = this.generateNonceUp()
      if (char[1] != 'e') char[1] = this.generateNonceLow()
      if (char[2] != 's') char[2] = this.generateNonceLow()
      if (char[3] != 'u') char[3] = this.generateNonceLow()
      if (char[4] != 'm') char[4] = this.generateNonceLow()
      if (char[5] != 'e') char[5] = this.generateNonceLow()
      msg = char.join('')
      this.renderNonce(msg)
      requestAnimationFrame(() => this.randomText(msg))
    }
  }

  generateNonce(length = 1, posible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') {
    let text = ''
    for (let i = 0; i < length; i++) text += posible.charAt(Math.floor(Math.random() * posible.length))
    return text
  }

  generateNonceUp = (length = 1, posible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') => this.generateNonce(length, posible)
  generateNonceLow = (length = 1, posible = 'abcdefghijklmnopqrstuvwxyz') => this.generateNonce(length, posible)

  renderNonce = (msg) => {
    const parent = document.getElementById('HR-Landing-header-resume')
    if (parent) {
      const cursor = document.createElement('span')
      cursor.className = 'blink-cursor'
      parent.innerHTML = msg
      parent.appendChild(cursor)
    }
  }
}