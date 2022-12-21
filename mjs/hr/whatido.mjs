'use strict'


const whatido_set = {
  header: { th: 'สิ่งที่ฉันทำ', en: 'What I do.' }, 
  do: [
    {
      header: {
        th: '<div class="Whatido-box-head">เว็บไซต์ / เว็บแอพ</div>',
        en: '<div class="Whatido-box-head">Website / Webapp</div>',
        cover: null
      },
      desc: {
        th: '<div class="Whatido-box-desc">ฉันสร้างสรรออกแบบและดูและเว็บไซต์มาแล้วหลายเว็บ</div>',
        en: '<div class="Whatido-box-desc">.</div>',
      }
    },
    {
      header: {
        th: '<div class="Whatido-box-head">เกมส์</div>',
        en: '<div class="Whatido-box-head">Games</div>',
        cover: null
      },
      desc: {
        th: '<div class="Whatido-box-desc">ฉันกำลังใช้เวลาว่างเพื่อพัฒนาเกมส์ของฉันอย่างค่อยเป็นค่อยไป</div>',
        en: '<div class="Whatido-box-desc">.</div>',
      }
    },
    {
      header: {
        th: '<div class="Whatido-box-head">นวัตกรรม</div>',
        en: '<div class="Whatido-box-head">Innovations</div>',
        cover: './assets/512x512.png'
      },
      desc: {
        th: '<div class="Whatido-box-desc">ฉันซุ่มพัมนานวัตกรรมใหม่ๆ เพื่อใช้เปลี่ยนโลก แต่เหมือนฉันยังตามไม่ทันโลก</div>',
        en: '<div class="Whatido-box-desc">.</div>',
      }
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
      const cover = document.createElement('img')
      cover.className = 'Whatido-box-cover'
      cover.src = ido['header']['cover'] || './assets/lain.webp'
      this.whatido_box.appendChild(cover)
      this.whatido_box.className = 'Whatido-box scroll-animate'
      this.whatido_box.innerHTML += ido['header'][this.lang]
      this.whatido_box.innerHTML += ido['desc'][this.lang]
      this.whatido_container.appendChild(this.whatido_box)
    })


    
    const observer = new IntersectionObserver(async (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show')
        else entry.target.classList.remove('show')
      })
    })
    const scrollAnimate = document.querySelectorAll('.Whatido-box.scroll-animate')
    scrollAnimate.forEach(async (el) => observer.observe(el))
  }
}