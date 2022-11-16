'use strict'


import setting from "./setting.mjs"


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
    this.topnav()
    this.myskill()
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

  myskill = async () => {
    const skill_set = [
      ['HTML', 90],
      ['CSS', 60],
      ['JS', 72],
      ['Node.js', 70],
      ['Express', 54],
      ['Socket.io', 62],
      ['Python', 70],
      ['GO', 44],
      ['Bash', 60],
      ['Lua', 55]
    ]

    const container = document.createElement('div')

    skill_set.forEach((v) => {
      const box = document.createElement('div')
      const shadow = document.createElement('div')
      const content = document.createElement('div')
      const percent = document.createElement('div')
      const dot = document.createElement('div')
      const number = document.createElement('div')
      const value = document.createElement('h2')

      container.className = 'skill-container'
      box.className = 'skill-box'
      shadow.className = 'skill-shadow'
      content.className = 'skill-content'
      percent.className = 'skill-percent'
      percent.setAttribute('data-text', `${v[1]}%`)
      percent.setAttribute('style', `--num:${v[1]};`)

      dot.className = 'skill-dot'
      number.className = 'skill-number'
      value.innerHTML = v[0]

      container.appendChild(box)
      box.appendChild(shadow)
      box.appendChild(content)
      content.appendChild(percent)
      percent.appendChild(dot)
      percent.innerHTML += '<svg><circle cx="70" cy="70" r="70"> </circle><circle cx="70" cy="70" r="70"> </circle></svg>'
      percent.appendChild(number)
      number.appendChild(value)
    })
    this.section.appendChild(container)
  }
}