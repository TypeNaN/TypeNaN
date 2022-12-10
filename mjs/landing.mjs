'use strict';


import initconfig from "./initconfig.mjs"

const waitfor = (millisecond) => new Promise(resolve => setTimeout(() => resolve(), millisecond))


export default class {
  constructor() {
    this.parent = document.body
    this.conf = { lang: false, viewer: false }
  }

  render = async () => {
    const conf_lang = initconfig.language_available
    const conf_view = initconfig.viewer_enable
    const conf_disabled = initconfig.viewer_disabled

    this.landing = document.createElement('section')
    this.landing.id = 'Landing'
    this.parent.appendChild(this.landing)
    this.landing.innerHTML = `<ul class="bg-bubbles">
      <li></li><li></li><li></li><li></li><li></li>
      <li></li><li></li><li></li><li></li><li></li>
    </ul>`

    this.preconfig = document.createElement('section')
    this.preconfig.id = 'Preconfig'
    this.landing.appendChild(this.preconfig)

    const header = document.createElement('h1')
    header.innerHTML ='View Curriculum Vitae As'
    this.preconfig.append(header)

    const language = document.createElement('ul')
    language.id = 'container-language'
    this.preconfig.appendChild(language)

    for (const i of conf_lang) {
      if (!document.getElementById(i)) {
        const v = document.createElement('li')
        v.id = i
        v.className = 'language'
        v.innerHTML = i.toUpperCase()
        language.appendChild(v)
        v.onclick = () => {
          this.conf['lang'] = i
          sessionStorage.setItem('conf', JSON.stringify(this.conf))
          for (const n of conf_lang) {
            const vf = document.getElementById(n)
            if (vf != v) {
              vf.classList.remove('selected')
            } else {
              if (vf.classList.length > 0) {
                let dup = false
                vf.classList.forEach((v) => { if (v == 'selected') dup = true })
                if (!dup) vf.classList.add('selected')
              } else {
                vf.classList.add('selected')
              }
            }
          }
        }
      }
    }

    const viewer = document.createElement('ul')
    viewer.id = 'container-viewer'
    this.preconfig.appendChild(viewer)

    for (const i of conf_view) {
      if (!document.getElementById(i)) {
        const v = document.createElement('li')
        v.id = i
        v.className = 'viewer'
        v.innerHTML = i.toUpperCase()
        viewer.appendChild(v)
        if (conf_disabled.indexOf(i) > -1) {
          v.setAttribute('disabled', true)
          continue
        }
        v.onclick = () => {
          this.conf['viewer'] = i
          sessionStorage.setItem('conf', JSON.stringify(this.conf))
          for (const n of conf_view) {
            const vf = document.getElementById(n)
            if (vf != v) {
              vf.classList.remove('selected')
            } else {
              if (vf.classList.length > 0) {
                let dup = false
                vf.classList.forEach((v) => { if (v == 'selected') dup = true })
                if (!dup) vf.classList.add('selected')
              } else {
                vf.classList.add('selected')
              }
            }
          }
        }
      }
    }

    let accept = false
    this.accept = document.createElement('botton')
    this.accept.id = 'conf-accept'
    this.accept.className = 'conf-accept-hide'
    this.accept.innerHTML = 'Go!'
    this.preconfig.appendChild(this.accept)
    this.accept.onclick = () => accept = true

    while (!this.conf.lang || !this.conf.viewer) await waitfor(200)
    this.accept.className = 'conf-accept-show'
    while (!accept) await waitfor(200)
    this.parent.removeChild(this.landing)
  }

  getconf = () => this.conf
}