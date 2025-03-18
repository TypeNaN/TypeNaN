'use strict'


import initconfig from "./initconfig.mjs"

const subprocessName = 'setting'
const version = `${subprocessName} : version 0.0.1 build from kernel deep#0.0.1`

const help = {
  manual: `Command ${version}

Pattern     : ${subprocessName} [...arguments]
Arguments   : look below
Exit Status : void

`,
  sudo: {
    th: '<p class="no-sudo">คำสั่งนี้ไม่ต้องการสิทธิ์พิเศษใดๆ เพื่อดำเนิดการ</p>',
    en: '<p class="no-sudo">Do not need super user permission</p>',
  },
  description: {
    th: `<p>\tคำสั่ง "${subprocessName}" คือคำสั่งเพื่อ...</p>\n`,
    en: `<p>\tThe "${subprocessName}" command is a command to ....</p>\n`
  },
  label: {
    th: '<p>ชุดคำสั่ง :</p>',
    en: '<p>Arguments :</p>'
  },
  parameters: {
    th: [
      [ '-l', '--lang', [ [ '', '\tตั้งค่าภาษาของเว็บไซต์ --lang=arg มี argument คือ ["th","en"]' ] ] ],
      [ '-v', '--viewer', [ [ '', '\tตั้งค่ารูปแบบสดงผลเว็บไซต์ให้เหมาะกับผู้เข้าชม  --viewer=arg มี argument ["hr","geek","gamer"]' ] ] ],
      [ '-c', '--clear', [ [ '', '\tล้างการตั้งค่าทั้ง land และ view' ] ] ],
      [ '', '', [ [ '', '' ] ] ],
    ],
    en: [
      [ '-h', '--help', [ [ '', 'show help message'] ] ],
      [ '-v', '--version', [ [ '', 'show version' ] ] ],
      [ '-c', '--clear', [ [ '', '\tล้างการตั้งค่าทั้ง land และ view' ] ] ],
      [ '', '', [ [ '', '' ] ] ],
    ]
  },
  tips: {
    th: '<p>\tคุณสามารถค้นหาคำสั่งที่เคยใช้ก่อนหน้าได้โดยการใช้ปุ่ม Arrow key Up/Down เพื่อเลื่อนหาคำสั่งที่คุณเคยใช้ได้ หรือกด tab เพื่อเติมคำอัติโนมัติ เช่น กดปุ่ม t แล้วตามด้วยปุ่ม tab แล้วคำสั่งที่ขึ้นต้นด้วย t จะแสดงออกมาเป็นตัวเลือกให้คุณ</p>\n',
    en: '<p>\tYou can search for previously used commands by using the arrow key Up/Down to scroll through commands you\'ve used before, or pressing tab to autocomplete.For example, press t followed by tab.Commands starting with t will show you options.</p>\n'
  },
  backtohelp: {
    th: `<p>* คุณสามารถกลับมาเรียกดูรายละเอียดนี้ได้ทุกเมื่อด้วยคำสั่ง "${subprocessName} --help"</p>`,
    en: `<p>* You can return to this detail at any time with the "${subprocessName} --help" command.</p>`
  }
}
class Setting {
  constructor() {
    if (!Setting.instance) {
      this._help = help
      this._version = version
      this.parameters = help.parameters.th
      Setting.instance = this
    }
    return Setting.instance
  }

  render = async (id, sudo, params) => {
    if (!sudo)  throw new Error('permission deny')
    this.sudo = sudo
    this.conf_lang = initconfig.language_available
    this.conf_view = initconfig.viewer_all
    this.conf_disabled = initconfig.viewer_disabled
    this.conf = JSON.parse(sessionStorage.getItem('conf')) || { lang: false, viewer: false }
    this.setting = { lang: this.conf.lang, viewer: this.conf.viewer }

    for (const param of params) {
      const [key, value] = param.split(/=| +/) // split ด้วย "=" หรือ " " (อาจมีหลายช่องว่างติดกัน)
      switch (key) {
        case '-l':
        case '--lang':
          if (this.conf_lang.indexOf(value) > -1) this.lang = value
          break
        case '-v':
        case '--viewer':
          if (this.conf_disabled.indexOf(value) > -1) {
            this.conf.viewer = value
            break
          }
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

    if (this.conf_disabled.indexOf(this.conf.viewer) > -1) {
      await this.waitfor(10)
      const stdlog = document.getElementById('Terminal-console-log')
      stdlog.innerHTML += `<li>Viewer ${this.conf.viewer} is unavailable.</li>`
      this.conf.viewer = this.setting.viewer
      return
    }
    if (this.conf.viewer != this.setting.viewer) {
      const section = document.getElementsByTagName('section')
      for (let i = 0; i < section.length; i++) {
        section[i].parentNode.removeChild(section[i])
      }
    }
    if (this.conf.lang != this.setting.lang || this.conf.viewer != this.setting.viewer) {
      window.location.reload()
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

  waitfor = (millisecond) => new Promise(resolve => setTimeout(() => resolve(), millisecond))
}

export default new Setting()

