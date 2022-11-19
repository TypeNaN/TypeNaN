'use strict'


import setting from "./setting.mjs"


const landing_lang = {
  info1: {
    th: 'คุณสามารถดาวน์โหลด',
    en: 'You can download.'
  },
  info2: {
    th: 'รูปแบบมาตรฐานในไฟล์ PDF ได้ที่นี่',
    en: 'Standard format in PDF file here.'
  },
  info3: {
    th: 'หรือสละเวลาสักเล็กน้อยเพื่อเยี่ยมชม<br>และสำรวจเว็บไซต์',
    en: 'Or take a few moments to visit<br>and explore the website.'
  }
}
const myskill_lang = {
  header: {
    th: 'คะแนนความถนัดแต่ละทักษะ',
    en: 'Skill Score'
  },
  head_frontend: {
    th: 'ทักษะด้าน Frontend',
    en: 'Skill Frontend'
  },
  head_backend: {
    th: 'ทักษะด้าน Backend',
    en: 'Skill Backend'
  },
  head_devops: {
    th: 'ทักษะด้าน Development Operations',
    en: 'Skill Development Operations'
  },
  head_arch: {
    th: 'ทักษะด้านสถาปัตยกรรมโปรมแกรม',
    en: 'Skill Programming Architecture'
  },
  head_lang: {
    th: 'ทักษะด้านการสื่อสารภาษาอังกฤษ',
    en: 'Skill English'
  },
  head_ml: {
    th: 'ทักษะด้าน Machine Learning และ Data Analysis',
    en: 'Skill Machine Learning & Data Analysis'
  },
  head_typing: {
    th: 'ทักษะด้านการพิมพ์สัมผัส (ค่าเฉลี่ย)',
    en: 'Skill Typing (Average)'
  },
}


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
    this.lang = document.documentElement.lang
    this.section = document.createElement('section')
    this.section.id = 'HR'
    document.body.appendChild(this.section)
    
    this.render_landing()
    this.render_skill()
    this.render_topnav()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animate-show')
        } else {
          entry.target.classList.remove('scroll-animate-show')
        }
      })
    })
    const scrollAnimate = document.querySelectorAll('.scroll-animate')
    scrollAnimate.forEach((el) => observer.observe(el))
  }

  render_landing = async () => {
    this.landing = document.createElement('section')
    this.landing.id = 'HR-Landing'
    this.section.appendChild(this.landing)
    
    // this.landing.innerHTML += '<img id="HR-Landing-img1" src="../assets/lain.webp" alt="HR-Landing-img1" />'
    // this.landing.innerHTML += '<img id="HR-Landing-img2" src="../assets/lain.webp" alt="HR-Landing-img2" />'
    // this.landing.innerHTML += '<img id="HR-Landing-img3" src="../assets/lain.webp" alt="HR-Landing-img3" />'

    // const resume = document.createElement('h1')
    // resume.id = 'HR-Landing-header-resume'
    // this.landing.appendChild(resume)
    // this.randomNonce()

    this.landing.innerHTML += `<div id="HR-Landing-Download">
    <h3>${landing_lang['info1'][this.lang]}</h3>
    <h1 id="HR-Landing-header-resume"></h1>
    <h3>${landing_lang['info2'][this.lang]}</h3>
    <a target="_blank" href="../assets/resume.pdf#toolbar=1&navpanes=1&scrollbar=0&view=FitH,top"><button>Download PDF</button></a>
    <h3>${landing_lang['info3'][this.lang]}</h3>
    </div>`

    this.randomNonce()

  }
  
  render_skill = async () => {
    this.section.innerHTML += `<h1>${myskill_lang['header'][this.lang]}</h1>`
    this.myskill([
      [
        'head_frontend', [
          ['HTML', 90],
          ['CSS', 60],
          ['JavaScript', 85],
          ['JQuery', 39],
          ['Socket.io', 67],
          ['Flutter', 25],
          ['SPA', 97],
          ['WPA', 88],
          ['SW', 70],
          ['API', 90],
          ['Websocket', 67],
          ['Encrypt', 30],
          ['Graphic', 10],
        ]
      ],
      [
        'head_backend', [
          ['Node.js', 85],
          ['GO', 36],
          ['Python', 46],
          ['Express', 59],
          ['Socket.io', 57],
          ['RestAPI', 85],
          ['CRUD', 73],
          ['Socket', 67],
        ]
      ], [
        'head_devops', [
          ['Xampp', 38],
          ['Apache', 41],
          ['Nginx', 54],
          ['Docker', 25],
          ['K8s', 11],
          ['AWS', 24],
          ['Firebase', 47],
          ['Tor', 23],
          ['Git', 60],
        ]
      ], [
        'head_arch', [
          ['Clean', 2],
          ['Onion', 5],
          ['Hexagonal', 18],
        ]
      ], [
        'head_ml', [
          ['Python', 68],
          ['Numpy', 37],
          ['matplotlib', 25],
          ['pytorch', 5],
          ['JavaScript', 22],
          ['TensorFlow', 5],
          ['Image', 13],
          ['voice', 6],
          ['Neural', 19],
        ]
      ], [
        'head_lang', [
          ['Read', 23],
          ['Write', 5],
          ['Listen', 18],
          ['Speak', 6],
        ]
      ], [
        'head_typing', [
          ['WPM', 59],
          ['ACC', 88],
          ['CPM', 223],
          ['Consistency', 70],
        ]
      ]
    ])
  }

  myskill = async (skill_set) => {
    skill_set.forEach((groups) => {
      const container = document.createElement('div')
      container.className = 'skill-container'
      container.innerHTML += `<h2>${myskill_lang[groups[0]][this.lang]}</h2>`
      groups[1].forEach((v) => {
        const box = document.createElement('div')
        const shadow = document.createElement('div')
        const content = document.createElement('div')
        const percent = document.createElement('div')
        const dot = document.createElement('div')
        const label = document.createElement('div')

        box.className = 'skill-box scroll-animate'
        shadow.className = 'skill-shadow'
        content.className = 'skill-content'
        percent.className = 'skill-percent'
        percent.setAttribute('data-text', v[1])
        percent.setAttribute('style', `--num:${v[1]};`)

        dot.className = 'skill-dot'
        label.className = 'skill-label'
        label.innerHTML = v[0]

        container.appendChild(box)
        box.appendChild(shadow)
        box.appendChild(content)
        content.appendChild(label)
        content.appendChild(percent)
        percent.appendChild(dot)
        percent.innerHTML += '<svg><circle cx="40" cy="40" r="40"> </circle><circle cx="40" cy="40" r="40"> </circle></svg>'
      })
      container.innerHTML += `<hr />`
      this.section.appendChild(container)
    })
  }

  render_topnav = async () => {
    const conf_lang = ['th', 'en']
    const conf_view = ['geek', 'gamer']

    const container = document.createElement('ul')
    container.id = 'container-setting'
    this.section.appendChild(container)

    for (const i of conf_lang) {
      if (!document.getElementById(i)) {
        const v = document.createElement('li')
        v.id = i
        v.innerHTML = i.toUpperCase()
        if (i === this.lang) v.className = 'selected'
        container.appendChild(v)
        v.onclick = (e) => {
          new setting('sudo', [`--lang=${i}`])
          for (const n of conf_lang) {
            const vf = document.getElementById(n)
            if (vf != v) {
              vf.classList.remove('selected')
            } else {
              if (vf.classList.length > 0) {
                let dup = false
                vf.classList.forEach((v) => { if (v == 'selected') dup = true })
                if (!dup) {
                  vf.classList.add('selected')
                  this.lang = n
                  document.body.removeChild(this.section)
                  this.render()
                }
              } else {
                vf.classList.add('selected')
                this.lang = n
                document.body.removeChild(this.section)
                this.render()
              }
            }
          }
        }
      }
    }

    for (const i of conf_view) {
      if (!document.getElementById(i)) {
        const v = document.createElement('li')
        v.id = i
        v.className = 'viewer'
        v.innerHTML = i.toUpperCase()
        container.appendChild(v)
        v.onclick = () => {
          const obj = new setting('sudo', [`--viewer=${i}`])
          obj.render()
        }
      }
    }
  }

  randomNonce = async () => {
    let timeInterval
    let msg = `Resum${this.generateNonce()}`
    timeInterval = setInterval(() => {
      if (msg == 'Resume') {
        this.renderNonce(msg)
        clearTimeout(timeInterval)
      }
      else {
        msg = `Resum${this.generateNonce()}`
        this.renderNonce(msg)
      }
    }, 50)
  }

  renderNonce = (msg) => {
    const parent = document.getElementById('HR-Landing-header-resume')
    const cursor = document.createElement('span')
    cursor.setAttribute('class', 'blink-cursor')
    parent.innerHTML = msg
    parent.appendChild(cursor)
  }

  generateNonce() {
    const posible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let text = ''
    let length = 1
    for (let i = 0; i < length; i++) text += posible.charAt(Math.floor(Math.random() * posible.length))
    return text
  }
}