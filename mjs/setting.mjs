'use strict'


export default class {
  constructor(sudo, params, worker) {
    this.sudo = sudo
    this.worker = worker
    this.conf_lang = ['th', 'en']
    this.conf_view = ['hr', 'geek', 'gamer']
    this.conf = JSON.parse(sessionStorage.getItem('conf')) || { lang: false, viewer: false }
    this.setting = { lang: this.conf.lang, viewer: this.conf.viewer }
    if (sudo) {
      for (const param of params) {
        const [key, value] = param.split('=')
        switch (key) {
          case '-l':
          case '--lang':
            if (this.conf_lang.indexOf(value) > -1) this.lang = value
            break
          case '-v':
          case '--viewer':
            if (this.conf_view.indexOf(value) > -1) this.viewer = value
            break
          case '-c':
          case '--clear':
            this.conf = { lang: false, viewer: false }
            sessionStorage.setItem('conf', JSON.stringify(this.conf))
            break
          default:
            break
        }
      }
    }
  }

  render = async () => {
    if  (this.sudo) {
      if (this.conf.viewer != this.setting.viewer) {
        const section = document.getElementsByTagName('section')
        for (let i = 0; i < section.length; i++) {
          section[i].parentNode.removeChild(section[i])
        }
        if (this.worker) this.worker.terminate()
      }
      if (this.conf.lang != this.setting.lang || this.conf.viewer != this.setting.viewer) {
        window.location.reload()
      }
    }
  }

  set lang(params) {
    this.conf.lang = params
    document.documentElement.lang = params
    sessionStorage.setItem('conf', JSON.stringify(this.conf))
  }

  set viewer(params) {
    this.conf.viewer = params
    sessionStorage.setItem('conf', JSON.stringify(this.conf))
  }

  get lang() {
    const conf = JSON.parse(sessionStorage.getItem('conf')) || { lang: false, viewer: false }
    this.conf.lang = conf['lang']
    return conf['lang']
  }

  get viewer() {
    const conf = JSON.parse(sessionStorage.getItem('conf')) || { lang: false, viewer: false }
    this.conf.viewer = conf['viewer']
    return conf['viewer']
  }
}