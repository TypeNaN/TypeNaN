'use strict'


const myskill_desc = {
  th: [
    '0-10 เรียนรู้',
    '11-30 ฝึกหัด',
    '31-60 พอใช้ได้',
    '60-80 คุ้นเคยดี',
    '81-100 ชำนาญ',
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
  header: { th: 'ทักษะที่ฉันมี', en: 'Skill' },
  head_frontend: {
    th: { h2:'ทักษะด้าน<br>Frontend', li: myskill_desc['th'] },
    en: { h2: 'Skill<br>Frontend', li: myskill_desc['en'] }
  },
  head_backend: {
    th: { h2: 'ทักษะด้าน<br>Backend', li: myskill_desc['th'] },
    en: { h2: 'Skill<br>Backend', li: myskill_desc['en'] },
  },
  head_devops: {
    th: { h2: 'ทักษะด้าน<br>Development Operations', li: myskill_desc['th'] },
    en: { h2: 'Skill<br>Development Operations', li: myskill_desc['en'] },
  },
  head_arch: {
    th: { h2: 'ทักษะด้าน<br>สถาปัตยกรรม บริการ API', li: myskill_desc['th'] },
    en: { h2: 'Skill<br>API Service Architecture', li: myskill_desc['en'] },
  },
  head_ml: {
    th: { h2: 'ทักษะด้าน<br>Machine Learning<br>และ Data Analysis', li: myskill_desc['th'] },
    en: { h2: 'Skill<br>Machine Learning<br>and Data Analysis', li: myskill_desc['en'] },
  },
  head_iot: {
    th: { h2: 'ทักษะด้าน<br>Embeded System<br>และ Internet of think', li: myskill_desc['th'] },
    en: { h2: 'Skill<br>Embeded System<br>and Internet of think', li: myskill_desc['en'] },
  },
  head_lang: {
    th: {
      h2: 'ทักษะด้าน<br>การสื่อสารภาษาอังกฤษ', li: [
        '0-30 เข้าใจบางส่วน',
        '31-50 พอสื่อสารได้',
        '51-80 สื่อสารได้ดี',
        '81-100 ไม่ต่างจากเจ้าของถาษา'
      ]
    },
    en: {
      h2: 'Skill<br>English', li: [
        '0-30 Partially understand',
        '31-50 Enough to communicate',
        '51-80 Communicate well',
        '81-100 Native speaker'
      ]
    }
  },
  head_typing: {
    th: {
      h2: 'ทักษะด้าน<br>การพิมพ์สัมผัส (ค่าเฉลี่ย)', li: [
        '0-10 wpm งมหาปุ่ม',
        '11-20 wpm ก้มหน้าจิ้ม',
        '21-50 wpm ชำเลืองมอง',
        '51-100 wpm คำอยู่ในหัว',
        '101-300 wpm แชมป์พิมพ์เร็ว'
      ]
    },
    en: {
      h2: 'Skill<br>Typing (Average)', li: [
        '0-10 wpm Find key',
        '11-20 wpm Bow down keystroke',
        '21-50 wpm Glance',
        '51-100 wpm Word in head',
        '101-300 wpm Champion'
      ]
    }
  }
}
const myskill = [
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
      ['Token', 60],
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
      ['JWT', 60],
      ['CRUD', 73],
      ['Socket', 57],
    ]
  ],
  [
    'head_devops', [
      ['Linux', 80],
      ['Apache', 31],
      ['Nginx', 44],
      ['Tor', 23],
      ['Docker', 20],
      ['K8s', 9],
      ['AWS', 24],
      ['Firebase', 47],
      ['Git', 55],
      ['Shell', 65],
    ]
  ],
  [
    'head_arch', [
      ['Clean', 2],
      ['Onion', 2],
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
      ['Image', 15],
      ['voice', 13],
      ['Neural', 19],
    ]
  ],
  [
    'head_iot', [
      ['Raspberry Pi', 90],
      ['ESP8266', 51],
      ['ESP32', 51],
      ['STM32', 30],
      ['Arduino', 63],
      ['GPIO', 60],
      ['UART', 30],
      ['SPI', 10],
      ['I2C', 40],
      ['CAN', 2],
      ['RS232', 2],
      ['FreeRTOS', 9],
      ['Assembly', 10],
      ['MicroPython', 18],
      ['C/C++', 62],
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
]

export default class {
  constructor(section) {
    this.section = section
    this.render()
  }

  render = async () => {
    this.lang = document.documentElement.lang
    this.skill = document.createElement('section')
    this.skill.id = 'HR-Skill'
    this.section.appendChild(this.skill)

    this.skill.innerHTML += `<h1>${myskill_lang['header'][this.lang]}</h1>`
    this.render_skill(myskill)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show')
        else entry.target.classList.remove('show')
      })
    })
    const scrollAnimate = document.querySelectorAll('.skill-container.scroll-animate')
    scrollAnimate.forEach((el) => observer.observe(el))
  }

  render_skill = async (skill_set) => {
    skill_set.forEach((groups) => {
      const container = document.createElement('div')
      container.className = 'skill-container scroll-animate'
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

        box.className = 'skill-box'
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
}