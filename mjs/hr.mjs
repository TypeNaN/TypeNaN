'use strict'


import setting from "./setting.mjs"


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
    th: 'หรือสละเวลาสักเล็กน้อยเพื่อเยี่ยมชม<br>และสำรวจเว็บไซต์',
    en: 'Or take a few moments to visit<br>and explore the website.'
  }
}
const myskill_desc = {
  th: [
    '0-10 เรียนรู้',
    '11-30 ฝึกหัด',
    '31-60 พอใช้ได้',
    '60-80 คุ้นเคยดี',
    '81-100 ชำนาญมาก',
  ],
  en: [
    '0-10 Learning',
    '11-30 Practice',
    '31-60 Acceptable',
    '60-80 Familiar',
    '81-100 Proficient',
  ]
}

const myskill_lang = {
  header: { th: 'คะแนนความถนัดแต่ละทักษะ', en: 'Skill Score' },
  head_frontend: {
    th: { h2:'ทักษะด้าน Frontend', li: myskill_desc['th'] },
    en: { h2: 'Skill Frontend', li: myskill_desc['en'] }
  },
  head_backend: {
    th: { h2: 'ทักษะด้าน Backend', li: myskill_desc['th'] },
    en: { h2: 'Skill Backend', li: myskill_desc['en'] },
  },
  head_devops: {
    th: { h2: 'ทักษะด้าน Development Operations', li: myskill_desc['th'] },
    en: { h2: 'Skill Development Operations', li: myskill_desc['en'] },
  },
  head_arch: {
    th: { h2: 'ทักษะด้านสถาปัตยกรรมโปรมแกรม', li: myskill_desc['th'] },
    en: { h2: 'Skill Programming Architecture', li: myskill_desc['en'] },
  },
  head_ml: {
    th: 'ทักษะด้าน Machine Learning และ Data Analysis',
    en: 'Skill Machine Learning & Data Analysis'
  },
  head_ml: {
    th: { h2: 'ทักษะด้าน Machine Learning และ Data Analysis', li: myskill_desc['th'] },
    en: { h2: 'Skill Machine Learning & Data Analysis', li: myskill_desc['en'] },
  },
  head_lang: {
    th: {
      h2: 'ทักษะด้านการสื่อสารภาษาอังกฤษ', li: [
        '0-30 เข้าใจบางส่วน',
        '31-50 พอสื่อสารได้',
        '51-80 สื่อสารได้ดี',
        '81-100 ไม่ต่างจากเจ้าของถาษา'
      ]
    },
    en: {
      h2: 'Skill English', li: [
        '0-30 Partially understand',
        '31-50 Enough to communicate',
        '51-80 Communicate well',
        '81-100 Native speaker'
      ]
    }
  },
  head_typing: {
    th: {
      h2: 'ทักษะด้านการพิมพ์สัมผัส (ค่าเฉลี่ย)', li: [
        '0-10 wpm งมหาปุ่ม',
        '11-20 wpm ก้มหน้าจิ้ม',
        '21-50 wpm ชำเลืองมอง',
        '51-100 wpm คำอยู่ในหัว',
        '101-300 wpm แชมป์พิมพ์เร็ว'
      ]
    },
    en: {
      h2: 'Skill Typing (Average)', li: [
        '0-10 wpm Find key',
        '11-20 wpm Bow down keystroke',
        '21-50 wpm Glance',
        '51-100 wpm Word in head',
        '101-300 wpm Champion'
      ]
    }
  }
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
    this.render_footer()
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
  
  render_skill = async () => {
    this.skill = document.createElement('section')
    this.skill.id = 'HR-Skill'
    this.section.appendChild(this.skill)

    this.skill.innerHTML += `<h1>${myskill_lang['header'][this.lang]}</h1>`
    this.myskill([
      [
        'head_frontend', [
          ['HTML', 90],
          ['CSS', 69],
          ['JavaScript', 90],
          ['JQuery', 39],
          ['Socket.io', 67],
          ['Flutter', 25],
          ['SPA', 97],
          ['WPA', 88],
          ['SW', 70],
          ['API', 90],
          ['Websocket', 67],
          ['Encrypt', 30],
          ['Graphic', 16],
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
          ['Socket', 57],
        ]
      ],
      [
        'head_devops', [
          ['Apache', 41],
          ['Nginx', 54],
          ['Docker', 25],
          ['K8s', 11],
          ['AWS', 24],
          ['Firebase', 47],
          ['Tor', 23],
          ['Git', 60],
        ]
      ],
      [
        'head_arch', [
          ['Clean', 2],
          ['Onion', 5],
          ['Hexagonal', 18],
        ]
      ],
      [
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
      ],
      [
        'head_lang', [
          ['Read', 26],
          ['Write', 11],
          ['Listen', 18],
          ['Speak', 6],
        ]
      ],
      [
        'head_typing', [
          ['WORD WPM', 59],
          ['ACC %', 88],
          ['CHAR CPM', 223],
          ['CONS %', 70],
        ]
      ]
    ])
  }

  myskill = async (skill_set) => {
    skill_set.forEach((groups) => {
      const container = document.createElement('div')
      container.className = 'skill-container'
      container.innerHTML += `<h2>${myskill_lang[groups[0]][this.lang]['h2']}</h2>`

      const description = document.createElement('ul')
      description.className = 'skill-description'
      container.appendChild(description)

      myskill_lang[groups[0]][this.lang]['li'].forEach((v) => {
        const li = document.createElement('li')
        li.innerHTML = v
        description.appendChild(li)
      })

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
        percent.innerHTML += '<svg><circle cx="45" cy="45" r="45"> </circle><circle cx="45" cy="45" r="45"> </circle></svg>'
      })
      container.innerHTML += `<hr />`
      this.skill.appendChild(container)
    })
  }

  
  render_footer = async () => {
    this.footer = document.createElement('section')
    this.footer.id = 'footer-container'
    this.section.appendChild(this.footer)

    const ul = document.createElement('ul')
    this.footer.appendChild(ul)

    const img_path = [
      ['youtube', './assets/qr-youtube.webp', 'https://www.youtube.com/c/5ikronoz?view_as=subscriber&sub_confirmation=1'],
      ['github', './assets/qr-github.webp', 'https://github.com/TypeNaN'],
      // ['discord', './assets/qr-discord.webp', 'https://discord.gg/gsfuA7s2bw'],
      // ['slack', './assets/qr-slack.webp', 'https://join.slack.com/t/aloneinthailand/shared_invite/zt-1d88p9fpg-z~20Alg5CA~cbaZJ0MHMzg']
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

  randomText = async () => {
    let timeInterval
    let msg = `Resum${this.generateNonce()}`
    timeInterval = setInterval(() => {
      if (msg == 'Resume') {
        this.renderNonce(msg)
        clearTimeout(timeInterval)
      } else {
        msg = `Resum${this.generateNonce()}`
        this.renderNonce(msg)
      }
    }, 100)
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

  generateNonce() {
    const posible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let text = ''
    let length = 1
    for (let i = 0; i < length; i++) text += posible.charAt(Math.floor(Math.random() * posible.length))
    return text
  }
}