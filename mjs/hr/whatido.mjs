'use strict'


const whatido_set = {
  header: { th: 'สิ่งที่ฉันทำ', en: 'What I do.' }, 
  do: [
    {
      header: {
        th: 'การเผยแพร่ข้อมูล',
        en: 'Dissemination of information',
        cover: null
      },
      desc: {
        th: 'งานด้านการเผยแพร่ข้อมููลข่าวสารที่ฉันสร้างสรรออกมานั้นมีทั้งในรูปแบบเว็บไซต์และเว็บแอพพลิเคชั่น ผลงานที่ผ่านมาอย่างเช่น',
        en: 'The information dissemination work I create is both the website and the web application. Past works such as',
      },
      portfolio: [
        ['port 1', './assets/512x512.png'],
        ['port 2', './assets/512x512.png'],
        ['port 3', './assets/512x512.png'],
        ['port 4', './assets/512x512.png'],
        ['port 5', './assets/512x512.png'],
        ['port 6', './assets/512x512.png'],
        ['port 7', './assets/512x512.png']
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
      cover.style.backgroundImage = `url(${ido['header']['cover'] || './assets/lain.webp'})`
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
          const item = document.createElement('div')
          item.className = 'Whatido-box-portfolio-item scroll-animate'
          portfolio.appendChild(item)

          const img = document.createElement('div')
          img.className = 'Whatido-box-portfolio-img'
          img.style.backgroundImage = `url(${data[1] || './assets/lain.webp'})`
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
