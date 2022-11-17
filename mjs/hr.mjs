'use strict'


import setting from "./setting.mjs"


const myskill_lang = {
  header: {
    th: 'คะแนนความถนัดแต่ละทักษะ',
    en: 'Skill Score'
  },
  head_frontend: {
    th: 'ทักษะด้าน Web Frontend',
    en: 'Skill Web Frontend'
  },
  head_backend: {
    th: 'ทักษะด้าน Web Backend',
    en: 'Skill Web Backend'
  },
  head_devops: {
    th: 'ทักษะด้าน Web Development Operations',
    en: 'Skill Web Development Operations'
  },
  head_lang: {
    th: 'ทักษะด้านการสื่อสารภาษาอังกฤษ',
    en: 'Skill English'
  },
  head_ml: {
    th: 'ทักษะด้านการ Machine Learning',
    en: 'Skill Machine Learning'
  },
  head_typing1: {
    th: 'ทักษะด้านการพิมพ์สัมผัส (Words Per Minute)',
    en: 'Skill Typing (Words Per Minute)'
  },
  head_typing2: {
    th: 'ทักษะด้านการพิมพ์สัมผัส (Accuracy Percentage)',
    en: 'Skill Typing (Accuracy Percentage)'
  },

}


export default class {
  constructor() {

    // <!-- adsbygoogle banner name TypeNaN Profile -->
    const script = document.createElement('script')
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6854323187340337'
    script.crossorigin = 'anonymous'
    document.head.appendChild(script)
    this.render()
  }

  render = async () => {
    this.lang = document.documentElement.lang
    this.section = document.createElement('section')
    this.section.id = 'HR'
    document.body.appendChild(this.section)
    
    this.section.innerHTML += `<h1>${myskill_lang['header'][this.lang]}</h1>`
    this.section.innerHTML += `<h2>${myskill_lang['head_frontend'][this.lang]}</h2>`

    this.myskill([
      [
        ['HTML', 90],
        ['CSS', 60],
        ['JavaScript', 72],
        ['JQuery', 49],
        ['Socket.io', 67],
        ['SPA', 97],
        ['WPA', 88],
        ['SW', 70],
        ['API', 90],
        ['Websocket', 67],
        ['Encrypt', 30],
        ['Graphic', 10],
      ]
    ])

    this.section.innerHTML += `<h2>${myskill_lang['head_backend'][this.lang]}</h2>`
    this.myskill([
      [
        ['Node.js', 70],
        ['GO', 42],
        ['Python', 46],
        ['Express', 59],
        ['Socket.io', 57],
        ['RestAPI', 85],
        ['CRUD', 73],
        ['Socket', 67],
      ]
    ])

    this.section.innerHTML += `<h2>${myskill_lang['head_devops'][this.lang]}</h2>`
    this.myskill([
      [
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
    ])

    this.section.innerHTML += `<h2>${myskill_lang['head_ml'][this.lang]}</h2>`
    this.myskill([
      [
        ['Image', 13],
        ['voice', 6],
        ['Neural', 19],
      ]
    ])

    this.section.innerHTML += `<h2>${myskill_lang['head_lang'][this.lang]}</h2>`
    this.myskill([
      [
        ['Read', 23],
        ['Write', 5],
        ['Listen', 18],
        ['Speak', 6],
      ]
    ])

    this.section.innerHTML += `<h2>${myskill_lang['head_typing1'][this.lang]}</h2>`
    this.myskill([
      [
        ['10 words', 59],
        ['25 words', 46],
        ['50 words', 44],
        ['100 words', 42],
      ], [
        ['15 sec', 49],
        ['30 sec', 52],
        ['60 sec', 41],
        ['120 sec', 39],
      ]
    ])

    this.section.innerHTML += `<h2>${myskill_lang['head_typing2'][this.lang]}</h2>`
    this.myskill([
      [
        ['10 words', 100],
        ['25 words', 100],
        ['50 words', 100],
        ['100 words', 100],
      ],[
        ['15 sec', 100],
        ['30 sec', 100],
        ['60 sec', 100],
        ['120 sec', 100],
      ]
    ])

    this.topnav()
  }


  myskill = async (skill_set) => {
    skill_set.forEach((groups) => {
      const container = document.createElement('div')
      container.className = 'skill-container'
      groups.forEach((v) => {
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
        percent.innerHTML += '<svg><circle cx="40" cy="40" r="40"> </circle><circle cx="40" cy="40" r="40"> </circle></svg>'
      })
      container.innerHTML += `<hr />`
      this.section.appendChild(container)
    })
  }

  topnav = async () => {
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
}