'use strict'


import Subprocess from '../subprocess.mjs'


const subprocessName = 'resume'
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
    th: `<p>\tคำสั่ง "${subprocessName}" คือคำสั่งจัดรูปแบบข้อมูลเพื่อสั่งพิมพ์ออกไปยังเครื่องพิมพ์เอกสารขนาด A4 คุณสามารถสั่งการพิมพ์ออกไปยังเครื่องพิมพ์เอกสารได้โดยที่รูปแบบที่พิมพ์ ออกไปจะมีรูปแบบตามที่แสดงให้เห็นจากด้านล่างนี้ หรือหากตัวอย่างที่ด้านล่างไม่แสดงสามารถกดดาวน์โหลดได้ <a target="_blank" href="./assets/resume.pdf#toolbar=1&navpanes=1&scrollbar=0&view=FitH,top">ที่ตรงนี้</a>\n</p>`,
    en: '<p>\tThe "${subprocessName}" command to format the data to print out to an A4 document printer You can print out to a document printer that prints that format. The result will look like the one below. Or if the preview below doesn\'t show, you can click to download it <a target="_blank" href="./assets/resume.pdf#toolbar=1&navpanes=1&scrollbar=0&view=FitH,top">here</a>.\n</p>'
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

class Resume extends Subprocess {
  constructor() {
    if (!Resume.instance) {
      super()
      this._help = help
      this._version = version
      this.parameters = help.parameters.th
      this.prmi = this.ParamsIndex()
      Resume.instance = this
    }
    return Resume.instance
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
    return await super.render(id)
  }

  version() { return super.version(this._version) }
  help() { return super.help(this._help) }

  async processing() {
    const lang = document.documentElement.lang

    this.body.innerHTML += `<div class="subprocess-help">${this._help.description[lang]}\n\n</div>`
    const frame = document.createElement('iframe')
    frame.id = 'Frame-resume'
    frame.src = './assets/resume.pdf#toolbar=1&navpanes=0&scrollbar=0&view=FitH,top'
    this.body.appendChild(frame)

    const pdfScale = (e) => {
      const A4Scale = 297 / 210
      const padding = parseInt(
        window.getComputedStyle(this.body, null)
        .getPropertyValue('padding-left')
        .split('px')[0]
      ) * 2
      e.target.width = this.body.clientWidth - padding
      e.target.height = e.target.clientWidth * A4Scale + 40
    }

    frame.onload = (e) => {
      const resizeObserver = new ResizeObserver(entries => pdfScale({ target: frame }))
      resizeObserver.observe(this.body)
    }
  }
}

export default new Resume()

