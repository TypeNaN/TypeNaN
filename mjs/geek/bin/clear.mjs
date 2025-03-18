'use strict'


import Subprocess from '../subprocess.mjs'


const subprocessName = 'clear'
const version = `${subprocessName} : version 0.0.1 build from deep kernal 0.0.1`

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
    th: `<p>\tคำสั่ง "${subprocessName}" คือคำสั่งเพื่อล้างหน้าจอ Terminal ลบข้อความทั้งหมดที่แสดงอยู่ และเลื่อนเคอร์เซอร์ไปมุมซ้ายบน โดยไม่ส่งผลต่อกระบวนการที่กำลังทำงานหรือประวัติคำสั่ง</p>\n`,
    en: `<p>\tThe "${subprocessName}" command in Linux is used to clear the terminal screen, removing all previous output and displaying a clean prompt. This does not terminate the session or remove any running processes—only the visual content in the terminal window is cleared.</p>\n`
  },
  label: {
    th: '<p>ชุดคำสั่ง :</p>',
    en: '<p>Arguments :</p>'
  },
  parameters: {
    th: [
      [ '-h', '--help', [ [ '', 'แสดงข้อมูลวิธีใช้'] ] ],
      [ '-v', '--version', [ [ '', 'แสดงเลชรุ่น' ] ] ],
      [ '', '', [ [ '', '' ] ] ],
    ],
    en: [
      [ '-h', '--help', [ [ '', 'show help message'] ] ],
      [ '-v', '--version', [ [ '', 'show version' ] ] ],
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

class Clear extends Subprocess {
  constructor() {
    if (!Clear.instance) {
      super()
      this._help = help
      this._version = version
      this.parameters = help.parameters.th
      this.prmi = this.ParamsIndex()
      Clear.instance = this
    }
    return Clear.instance
  }

  async render(id, sudo, params) {
    this.sudo = sudo
    for (const param of params) {
      const [key, value] = param.split(/=| +/)
      switch (key) {
        case '-h':
        case '--help': return this.help(key, value)
        case '-v':
        case '--version': return this.version()
        default: throw new Error(`${subprocessName}: unkonw parameter "${arg}"`)
      }
    }

    document.getElementById('welcome').innerHTML = ''
    document.getElementById('Terminal-console-log').innerHTML = ''
    return { clear: 'clear' }
  }

  version() { return super.version(this._version) }
  help() { return super.help(this._help) }
}

export default new Clear()

