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
    
    this.landing.innerHTML += `<div id="HR-Landing-Download">
    <h3>${landing_lang['info1'][this.lang]}</h3>
    <div id="HR-Landing-header-resume"></div>
    <h3>${landing_lang['info2'][this.lang]}</h3>
    <a target="_blank" href="./assets/resume.pdf#toolbar=1&navpanes=1&scrollbar=0&view=FitH,top"><button>Download PDF</button></a>
    <h3>${landing_lang['info3'][this.lang]}</h3>
    </div>`

    this.randomText()
  }
  
  randomText = async () => {
    let msg = `Resum${this.generateNonce()}`
    const timeInterval = setInterval(() => {
      if (msg == 'Resume') {
        this.renderNonce(msg)
        clearTimeout(timeInterval)
      } else {
        msg = `Resum${this.generateNonce()}`
        this.renderNonce(msg)
      }
    }, 100)
  }

  generateNonce(length = 1) {
    let text = ''
    const posible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    for (let i = 0; i < length; i++) text += posible.charAt(Math.floor(Math.random() * posible.length))
    return text
  }

  renderNonce = (msg) => {
    const parent = document.getElementById('HR-Landing-header-resume')
    if (parent) {
      const cursor = document.createElement('span')
      cursor.setAttribute('class', 'blink-cursor')
      parent.innerHTML = msg
      parent.appendChild(cursor)
    }
  }
}