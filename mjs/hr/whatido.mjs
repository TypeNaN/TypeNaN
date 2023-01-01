'use strict'


const whatido_set = {
  header: { th: 'สิ่งที่ฉันทำ', en: 'What I dev.' }, 
  do: [
    {
      header: {
        th: 'งานด้านประชาสัมพันธ์และข้อมูลข่าวสาร',
        en: 'Public relations and information',
        cover: null
      },
      desc: {
        th: '<p>งานด้านประชาสัมพันธ์และข้อมูลข่าวสารที่ฉันสร้างสรรออกมานั้นมีทั้งในรูปแบบเว็บไซต์และเว็บแอพพลิเคชั่น ไม่ว่าจะเป็นด้านออกแบบหรือระบบเบื้องหลังฉันก็ทำได้ ผลงานที่ผ่านมาเช่น</p>',
        en: "<p>The public relations and information work that I create is both the website and the web application.</p><p>Whether it's the design side or the systems behind it, I can do it.</p><p>Past works such as.</p>",
      },
      portfolio: [
        ['Lex Car Gas Garage', 'https://raw.githubusercontent.com/TypeNaN/TypeNaN/main/portfolio/lek.png', 'https://raw.githubusercontent.com/TypeNaN/TypeNaN/main/portfolio/lek.png'],
        ["Disney Products O'Clock Asia", "https://raw.githubusercontent.com/TypeNaN/TypeNaN/main/portfolio/Disney%20Products%20O'Clock%20Asia.png", "https://raw.githubusercontent.com/TypeNaN/TypeNaN/main/portfolio/Disney%20Products%20O'Clock%20Asia.png"],
        ['8E88', 'https://raw.githubusercontent.com/TypeNaN/TypeNaN/main/portfolio/8E88.png', 'https://raw.githubusercontent.com/TypeNaN/TypeNaN/main/portfolio/8E88.png'],
        ['ไก่กลมกล่อม', 'https://raw.githubusercontent.com/TypeNaN/TypeNaN/main/portfolio/kkk.png', 'https://raw.githubusercontent.com/TypeNaN/TypeNaN/main/portfolio/kkk.png'],
        ['mamatell', 'https://raw.githubusercontent.com/TypeNaN/TypeNaN/main/portfolio/mamatell.png', 'https://raw.githubusercontent.com/TypeNaN/TypeNaN/main/portfolio/mamatell.png']
      ]
    },
    {
      header: {
        th: 'งานด้านระบบ',
        en: 'Systems',
        cover: null
      },
      desc: {
        th: '<p>การพัฒนาซอร์แวร์เพื่อสนับสนุนระบบต่างๆ ไม่ว่าจะเป็น IoT, MCU, SBC, Embedded</p><p>คลิกเพื่อชมคลิปตัวอย่างผลงาน</p>',
        en: '<p>Software development to support various systems such as IoT, MCU, SBC, Embedded</p><p>Click to view the sample clip</p>',
      },
      portfolio: [
        ['Voice recognition<br>Raspberry pi<br>[ภาษา Python]', 'https://youtu.be/ToU-9Mjx-PA', 'https://img.youtube.com/vi/ToU-9Mjx-PA/0.jpg'],
        ['Home automation with Ai<br>แม่หญิงการะเกด<br>[ภาษา Python]', 'https://youtu.be/FiZrHdiAenY', 'https://img.youtube.com/vi/FiZrHdiAenY/0.jpg'],
        ['Thermal camera<br>Raspberry pi<br>[ภาษา Python]', 'https://youtu.be/qjY0JrnNLmE', 'https://img.youtube.com/vi/qjY0JrnNLmE/0.jpg'],
        ['DIY CNC<br>[ภาษา C/C++]<br>(Sorry no clip)', null, null],
      ]
    },
    {
      header: {
        th: 'เกมส์',
        en: 'Games',
        cover: null
      },
      desc: {
        th: 'ฉันกำลังใช้เวลาว่างเพื่อพัฒนาเกมส์ของฉันอย่างค่อยเป็นค่อยไป',
        en: '.',
      },
      portfolio: null
    },
    {
      header: {
        th: 'นวัตกรรม',
        en: 'Innovations',
        cover: './assets/512x512.png'
      },
      desc: {
        th: 'ฉันซุ่มพัมนานวัตกรรมใหม่ๆ เพื่อใช้เปลี่ยนโลก แต่เหมือนฉันยังตามไม่ทันโลก',
        en: '.',
      },
      portfolio: null
    },
  ]
}


export default class {
  constructor(section) {
    this.section = section
    this.render()
  }

  render = async () => {
    this.lang = document.documentElement.lang
    this.whatido = document.createElement('section')
    this.whatido.id = 'HR-Whatido'
    this.section.appendChild(this.whatido)

    this.whatido.innerHTML += `<h1>${whatido_set['header'][this.lang]}</h1>`

    this.whatido_container = document.createElement('div')
    this.whatido_container.id = 'Whatido'
    this.whatido.appendChild(this.whatido_container)

    whatido_set['do'].forEach((ido) => {
      this.whatido_box = document.createElement('div')
      this.whatido_box.className = 'Whatido-box scroll-animate'
      this.whatido_container.appendChild(this.whatido_box)
      
      const cover = document.createElement('div')
      cover.className = 'Whatido-box-cover'
      cover.style.backgroundImage = `url("${ido['header']['cover'] || './assets/lain.webp'}")`
      cover.style.backgroundPosition = 'center'
      cover.style.backgroundRepeat = 'no-repeat'
      cover.style.backgroundSize = 'cover'
      this.whatido_box.appendChild(cover)

      this.whatido_box.innerHTML += `<div class="Whatido-box-head">${ido['header'][this.lang]}</div>`
      this.whatido_box.innerHTML += `<div class="Whatido-box-desc">${ido['desc'][this.lang]}</div>`

      if (ido['portfolio']) {
        const portfolio = document.createElement('div')
        portfolio.className = 'Whatido-box-portfolio'
        this.whatido_box.appendChild(portfolio)
        
        ido['portfolio'].forEach((data) => {
          let anchor
          if (data[1]) {
            anchor = document.createElement('a')
            anchor.target = '_blank'
            anchor.alt = data[0]
            anchor.href = data[1] || '#'
          } else {
            anchor = document.createElement('div')
          }

          anchor.className = 'Whatido-box-portfolio-item scroll-animate'
          portfolio.appendChild(anchor)
          
          const item = document.createElement('div')
          anchor.appendChild(item)

          const img = document.createElement('div')
          img.className = 'Whatido-box-portfolio-img'
          img.style.backgroundImage = `url("${data[2] || './assets/lain.webp'}")`
          img.style.backgroundPosition = 'center'
          img.style.backgroundRepeat = 'no-repeat'
          img.style.backgroundSize = 'cover'
          item.appendChild(img)

          const desc = document.createElement('p')
          desc.className = 'Whatido-box-portfolio-desc'
          desc.innerHTML = data[0] || ''
          item.appendChild(desc)
        })
      }
    })
  }
}
