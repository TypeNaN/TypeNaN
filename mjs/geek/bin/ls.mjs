'use strict'

import FakeFS from '../fakefs.mjs'
import Subprocess from '../subprocess.mjs'

const subprocessName = 'ls'
const version = `${subprocessName} : version 0.0.1 build from deep kernal 0.0.1`

const help = {
  manual: `Command ${version}

Pattern     : ${subprocessName} [...arguments]
Arguments   : look below
Exit Status : void

`,
  sudo: {
    th: '<p class="no-sudo">คำสั่งนี้ไม่ต้องการสิทธิ์พิเศษใดๆ เพื่อดำเนินการ</p>',
    en: '<p class="no-sudo">Do not need super user permission</p>',
  },
  description: {
    th: `<p>\tคำสั่ง \"${subprocessName}\" ใช้สำหรับแสดงรายการไฟล์และโฟลเดอร์ในไดเรกทอรีในระบบไฟล์เสมือน</p>\n`,
    en: `<p>\tThe \"${subprocessName}\" command is used to list files and directories in the visual file system.</p>\n`
  },
  label: {
    th: '<p>ชุดคำสั่ง :</p>',
    en: '<p>Arguments :</p>'
  },
  parameters: {
    th: [
      [ '', '--help', [ [ '', 'แสดงข้อมูลวิธีใช้'] ] ],
      [ '-v', '--version', [ [ '', 'แสดงเลขรุ่น' ] ] ],
      [ '-l', '', [ [ '', 'แสดงรายละเอียดไฟล์แบบเต็ม'] ] ],
      [ '-h', '', [ [ '', 'แสดงขนาดไฟล์ที่อ่านง่าย'] ] ],
      [ '-a', '', [ [ '', 'แสดงไฟล์ที่ซ่อนอยู่'] ] ],
      [ '', '', [ [ '', '' ] ] ],
    ],
    en: [
      [ '', '--help', [ [ '', 'show help message'] ] ],
      [ '-v', '--version', [ [ '', 'show version' ] ] ],
      [ '-l', '', [ [ '', 'show detailed file information'] ] ],
      [ '-h', '', [ [ '', 'show human-readable file sizes'] ] ],
      [ '-a', '', [ [ '', 'show hidden files'] ] ],
      [ '', '', [ [ '', '' ] ] ],
    ]
  },
  tips: {
    th: '<p>\tคุณสามารถใช้คำสั่ง \"ls\" เพื่อดูรายการไฟล์และโฟลเดอร์ภายในไดเรกทอรีในระบบไฟล์เสมือน</p>\n',
    en: '<p>\tYou can use the \"ls\" command to view the list of files and directories in the visual file system.</p>\n'
  },
  backtohelp: {
    th: `<p>* คุณสามารถกลับมาเรียกดูรายละเอียดนี้ได้ทุกเมื่อด้วยคำสั่ง \"${subprocessName} --help\"</p>`,
    en: `<p>* You can return to this detail at any time with the \"${subprocessName} --help\" command.</p>`
  }
}

class LS extends Subprocess {
  constructor() {
    if (!LS.instance) {
      super()
      this._help = help
      this._version = version
      this.parameters = help.parameters.th
      LS.instance = this
    }
    return LS.instance
  }

  async render(id, sudo, params) {
    this.sudo = sudo
    this.options = {
      showHidden: false,
      showDetails: false,
      humanReadable: false,
    }
    for (const param of params) {
      if (param === '--help') { return this.help()
      } else if (param === '-v' || param === '--version') { return this.version()
      } else if (param.startsWith('-')) {
        for (const char of param.slice(1)) {
          switch (char) {
            case 'l': this.options.showDetails = true; break
            case 'a': this.options.showHidden = true; break
            case 'h': this.options.humanReadable = true; break
            default: throw new Error(`${subprocessName}: unknown option '${char}'`)
          }
        }
      } else { this.destination = param }
    }
    return await super.render(id)
  }

  async processing() {
    let container
    try {
      const files = FakeFS.list(this.sudo ? 'root' : 'deep', this.destination)
      if (this.options.showDetails) {
        let infoStyle = 'style="padding: 0 5px; text-align: center;"'
        let sizeStyle = 'style="padding: 0 5px; text-align: right;"'
        container = `
          <table>
            <tr>
              <th ${infoStyle}>Permission</th>
              <th ${infoStyle}>owner</th>
              <th ${infoStyle}>Type</th>
              <th ${sizeStyle}>Size</th>
              <th>Name</th>
            </tr>
        `
        files.forEach(file => {
          let type = file.isDirectory ? 'Directory' : 'File'
          let color = file.isExecute ? 'style="color: #a6e22e;"' : ''
          let nameStyle = file.isDirectory
            ? 'style="color: #67c2f9; font-weight: bold;"'
            : color
          let size = this.options.humanReadable ? file.humanSize : file.size
          if (this.options.showHidden && file.isHidden) {
            container += `<tr>
              <td ${infoStyle}>${file.permission}</td>
              <td ${infoStyle}>${file.owner}</td>
              <td ${infoStyle}>${type}</td>
              <td ${sizeStyle}>${size}</td>
              <td ${nameStyle}>${file.name}</td>
            </tr>`
          } else if (!file.isHidden) {
            container += `<tr>
              <td ${infoStyle}>${file.permission}</td>
              <td ${infoStyle}>${file.owner}</td>
              <td ${infoStyle}>${type}</td>
              <td ${sizeStyle}>${size}</td>
              <td ${nameStyle}>${file.name}</td>
            </tr>`
          }
        })
        container += '</table>'
      } else {
        container = '<div>'
        files.forEach(file => {
          let nameStyle = file.isDirectory ? 'style="color: #67c2f9; font-weight: bold; display: inline-block; padding-right: 100px;"' : ''
          if (this.options.showHidden && file.isHidden) {
            container += `<span ${nameStyle}>${file.name}</span>\t`
          } else if (!file.isHidden) {
            container += `<span ${nameStyle}>${file.name}</span>\t`
          }
        })
        container += '</div>'
      }
      this.done = true
      return { out: container }
    } catch (error) {
      this.done = true
      console.error(error)
      return { message: error.message }
    }
  }

  version() { return super.version(this._version) }
  help(param, option) { return super.help(this._help, param, option) }

}

export default new LS()

