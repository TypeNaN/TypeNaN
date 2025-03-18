'use strict';


import preconfig from "./initconfig.mjs"
import setting from "./setting.mjs"

export default class {
  constructor(obj) {
    this.parent = obj
    this.section = obj.section
    this.viewID = obj.id
    this.conf = { lang: false, viewer: false }
    this.render()
  }

  render = async () => {
    this.lang = document.documentElement.lang
    const conf_lang = preconfig.language_available
    const conf_view = preconfig.viewer_all
    const conf_disabled = preconfig.viewer_disabled
    const container = document.createElement('ul')
    container.id = 'container-mainnav'
    this.section.appendChild(container)

    for (const i of conf_lang) {
      if (!document.getElementById(i)) {
        const v = document.createElement('li')
        v.id = i
        v.innerHTML = i.toUpperCase()
        container.appendChild(v)
        if (i === this.lang) {
          v.className = 'selected'
          continue
        }
        v.onclick = (e) => {
          setting.render(null, 'sudo', [`--lang=${i}`])
          for (const n of conf_lang) {
            if (n === this.lang) continue
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
                  this.parent.render()
                }
              } else {
                vf.classList.add('selected')
                this.lang = n
                document.body.removeChild(this.section)
                this.parent.render()
              }
            }
          }
        }
      }
    }

    for (const i of conf_view) {
      //if (i === this.viewID) continue
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
        if (i === this.viewID) {
          v.classList.add('selected')
          continue
        }
        v.onclick = () => {
          setting.render(null, 'sudo', [`--viewer=${i}`])
        }
      }
    }
  }
}
