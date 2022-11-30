'use strict';


import preconfig from "./initconfig.mjs"
import setting from "./setting.mjs"

export default class {
  constructor(section, ignore) {
    this.parent = document.body
    this.section = section
    this.ignore = ignore
    this.conf = { lang: false, viewer: false }
    this.render()
  }

  render = async () => {
    this.lang = document.documentElement.lang
    const conf_lang = preconfig.language_available
    const conf_view = preconfig.viewer_enable
    const conf_disabled = preconfig.viewer_disabled
    const container = document.createElement('ul')
    container.id = 'container-mainnav'
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
      if (i === this.ignore) continue
      if (!document.getElementById(i)) {
        const v = document.createElement('li')
        v.id = i
        v.className = 'viewer'
        v.innerHTML = i.toUpperCase()
        container.appendChild(v)
        if (conf_disabled.indexOf(i) > -1) {
          v.setAttribute('disabled', true)
          continue
        }
        v.onclick = () => {
          const obj = new setting('sudo', [`--viewer=${i}`])
          obj.render()
        }
      }
    }
  }
}