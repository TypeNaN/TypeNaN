'use strict'

import FakeFS from '../fakefs.mjs'
import Subprocess from '../subprocess.mjs'

const subprocessName = 'mkdir'
const version = `${subprocessName} : version 0.0.1 build from deep kernal 0.0.1`

const help = {
  manual: `Command ${version}

Pattern     : ${subprocessName} [...directories]
Arguments   : directory names to create
Exit Status : void
`,
  sudo: {
    th: '<p class="no-sudo">คำสั่งนี้ไม่ต้องการสิทธิ์พิเศษใดๆ เพื่อดำเนิดการ</p>',
    en: '<p class="no-sudo">Do not need super user permission</p>',
  },
  description: {
    th: `<p>\tคำสั่ง "${subprocessName}" ใช้สำหรับสร้าง directory ใหม่ในระบบไฟล์เสมือน</p>\n`,
    en: `<p>\tThe "${subprocessName}" command is used to create a new directory in the virtual file system.</p>\n`
  },
  label: {
    th: '<p>ชุดคำสั่ง :</p>',
    en: '<p>Arguments :</p>'
  },
  parameters: {
    th: [
      [ '-h', '--help', [ [ '', 'แสดงข้อมูลวิธีใช้'] ] ],
      [ '-v', '--version', [ [ '', 'แสดงเลขรุ่น' ] ] ],
      [ '', '', [ [ '', '' ] ] ],
    ],
    en: [
      [ '-h', '--help', [ [ '', 'show help message'] ] ],
      [ '-v', '--version', [ [ '', 'show version' ] ] ],
      [ '', '', [ [ '', '' ] ] ],
    ]
  },
  tips: {
    th: `<p>\tคุณสามารถใช้คำสั่ง "${subprocessName}" เพื่อสร้างโฟลเดอร์ภายในไดเรกทอรีในระบบไฟล์เสมือน</p>\n`,
    en: `<p>\tYou can use the "${subprocessName}" command to create directory in the visual file system.</p>\n`
  },
  backtohelp: {
    th: `<p>* คุณสามารถกลับมาเรียกดูรายละเอียดนี้ได้ทุกเมื่อด้วยคำสั่ง "${subprocessName} --help"</p>`,
    en: `<p>* You can return to this detail at any time with the "${subprocessName} --help" command.</p>`
  }
}

class MKDir extends Subprocess {
  constructor() {
    if (!MKDir.instance) {
      super()
      this._help = help
      this._version = version
      this.parameters = help.parameters.th
      this.prmi = this.ParamsIndex()
      MKDir.instance = this
    }
    return MKDir.instance
  }

  async render(id, sudo, params) {
    this.sudo = sudo

    for (const param of params) {
      if (param === '--help') { return this.help()
      } else if (param === '-v' || param === '--version') { return this.version()
      } else if (param.startsWith('-')) {
        for (const char of param.slice(1)) {
          switch (char) {
            case 'P': break
            default: throw new Error(`${subprocessName}: unknown option '${char}'`)
          }
        }
      } else { this.destination = param }
    }
    return await super.render(id)
  }

  async processing() {
    try {
      if (!this.destination) {
        throw new Error(`${subprocessName}: missing operand`)
      }

      const error = FakeFS.mkdir(this.sudo ? 'root' : 'deep', this.destination)
      if (error) return { message: error.message }

      const cwd = FakeFS.loadCWD()
      this.done = true
      return { out: `Directories created: ${cwd}/${this.destination}` }
    } catch (error) {
      this.done = true
      return { message: error.message }
    }
  }

  version() { return super.version(this._version) }
  help() { return super.help(this._help) }
}

export default new MKDir()

