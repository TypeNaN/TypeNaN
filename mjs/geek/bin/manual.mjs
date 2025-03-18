'use strict'

import Setting    from '../../setting.mjs'

import Subprocess from '../subprocess.mjs'

import Ls         from './ls.mjs'
import MKDir      from './mkdir.mjs'
import Top        from './top.mjs'
import Clear      from './clear.mjs'
import Resume     from './resume.mjs'
import Blog       from './blog.mjs'


const subprocessName = 'man'
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
    th: `<p>\tแสดงรายละเอียดเกี่ยวกับการใช้งาน ${subprocessName} โดยแนะนำคำสั่งต่างๆ เพื่อใช้ป้อนสั่งให้ ${subprocessName} กระทำสิ่งใดๆ หรือให้แสดงข้อมูลที่ต้องการได้ ซึ่งคำสั่งต่างๆ มีดังต่อไปนี้</p>\n`,
    en: `<p>\tShows details about using the ${subprocessName} by recommending various conditions. For example, the ${subprocessName} does something. or to display the required information, which has various commands as follows.</p>\n`
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
      [ 'clear', '', [ [ '', Clear._help.description.th ] ] ],
      [ 'top', '', [ [ '', Top._help.description.th ] ] ],
      [ 'ls', '', [ [ '', Ls._help.description.th ] ] ],
      [ 'mkdir', '', [ [ '', MKDir._help.description.th ] ] ],
      [ 're', 'resume', [ [ '', Resume._help.description.th ] ] ],
      [ 'bl', 'blog', [ [ '', Blog._help.description.th ] ] ],
      [ '', '', [ [ '', '' ] ] ],
      [ 'setting', '', [ [ '', Setting._help.description.th ] ] ],
      [ '', '', [ [ '', '' ] ] ],
    ],
    en: [
      [ '-h', '--help', [ [ '', 'show help message'] ] ],
      [ '-v', '--version', [ [ '', 'show version' ] ] ],
      [ 'clear', '', [ [ '', Clear._help.description.en ] ] ],
      [ 'top', '', [ [ '', Top._help.description.en ] ] ],
      [ 'ls', '', [ [ '', Ls._help.description.en ] ] ],
      [ 'mkdir', '', [ [ '', MKDir._help.description.en ] ] ],
      [ 're', 'resume', [ [ '', Resume._help.description.en ] ] ],
      [ 'bl', 'blog', [ [ '', Blog._help.description.en ] ] ],
      [ '', '', [ [ '', '' ] ] ],
      [ 'setting', '', [ [ '', Setting._help.description.en ] ] ],
      [ '', '', [ [ '', '' ] ] ],
    ]

    //th: [
    //  ['top', 'แสดงรายละเอียดข้อมูลการใช้ทรัพยากร'],
    //  ['clear', 'ล้างหน้าต่าง Terminal console'],
    //  [],
    //
    //  ['pr, print', 'จัดรูปแบบข้อมูลเพื่อสั่งพิมพ์ออกไปยังเครื่องพิมพ์เอกสาร'],
    //  ['wp, weapon', 'แสดงข้อมูลสุดยอดอาวุธคู่กายที่ใช้เนรมิตทุกสรรพสิ่ง'],
    //  ['ed, education', 'แสดงข้อมูลประวัติการศึกษา'],
    //  ['ex, experience', 'แสดงข้อมูลประวัติการทำงาน'],
    //  ['', ''],
    //  ['st, stack', 'แสดงข้อมูลภาษาและเทคโนโลยีเกี่ยวกับการพัฒนา'],
    //  ['\t-f, --frontend', '\tแสดงข้อมูลทางฝั่ง Frontend'],
    //  ['\t-b, --backend', '\tแสดงข้อมูลทางฝั่ง Backend'],
    //  ['\t-o, --dev-op', '\tแสดงข้อมูลทางฝั่ง DevOps'],
    //  ['\t--full', '\tแสดงข้อมูลทั้งหมด (ตั้งเป็นค่าปริยาย)'],
    //  [],
    //  ['re, resume', 'แสดงข้อมูลประวัติส่วนตัว'],
    //  ['lk, looking', 'แสดงข้อมูลสิ่งที่กำลังมองหา'],
    //  ['at, attention', 'แสดงข้อมูลสิ่งที่สนใจเป็นพิเศษ'],
    //  ['sk, skill', 'แสดงข้อมูลทักษะด้านต่างๆ'],
    //  ['gh, github', 'แสดงข้อมูลและสถานะต่างบน github'],
    //  ['pf, portfolio', 'แสดงแฟ้มสะสมผลงาน'],
    //  ['hb, hobby', 'แสดงข้อมูลงานอดิเรก'],
    //  ['bl, blog', 'แสดงข้อมูล blog post'],
    //  ['co, contact', 'แสดงข้อมูลติดต่อ'],
    //  ['', ''],
    //  ['sudo conf', 'ตั้งค่าเว็บไซต์'],
    //  ['\t-l=arg, --lang=arg', '\tตั้งค่าภาษาของเว็บไซต์ argument คือ ["th","en"]'],
    //  ['\t-v=arg, --viewer=arg', '\tตั้งค่ารูปแบบสดงผลเว็บไซต์ให้เหมาะกับผู้เข้าชม ["hr","geek","gamer"]'],
    //  ['\t-c, --clear', '\tล้างการตั้งค่า'],
    //  [],
    //],
    //en: [
    //  ['pr, print', 'Format data for printing to a document printer.'],
    //  ['wp, weapon', 'Show information on the ultimate weapon that is used to create everything.'],
    //  ['ed, education', 'Show education history information.'],
    //  ['ex, experience', 'Show work history information.'],
    //  [],
    //  ['st, stack', 'Show language and technology information about development.'],
    //  ['\t-f, --frontend', '\tShow information on the Frontend side.'],
    //  ['\t-b, --backend', '\tShow information on the Backend side.'],
    //  ['\t-o, --dev-op', '\tShow information on the DevOps side.'],
    //  ['\t--full', '\tShow all information. (set as default)'],
    //  [],
    //  ['re, resume', 'Show profile information.'],
    //  ['lk, looking', 'Show what i\'m looking for?'],
    //  ['at, attention', 'Show information of special interest.'],
    //  ['sk, skill', 'Show information about skills.'],
    //  ['gh, github', 'Show information and status on github.'],
    //  ['pf, portfolio', 'Show portfolio.'],
    //  ['hb, hobby', 'Show hobby information.'],
    //  ['bl, blog', 'My blog post.'],
    //  ['co, contact', 'Show contact information.'],
    //  ['', ''],
    //  ['sudo conf', 'Configure (root permission)'],
    //  ['\t-l=arg, --lang=arg', '\tSet the language for the website ["th","en"].'],
    //  ['\t-v=arg, --viewer=arg', '\tSet up a website display format to suit your visit. ["hr","geek","gamer"]'],
    //  ['\t-c, --clear', '\tClear setting.'],
    //  []
    //]
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


class Man extends Subprocess {
  constructor() {
    if (!Man.instance) {
      super()
      this._help = help
      this._version = version
      this.parameters = help.parameters.th
      this.prmi = this.ParamsIndex()
      Man.instance = this
    }
    return Man.instance
  }

  async render(id, sudo, params) {
    this.sudo = sudo
    this.manual = this._help

    for (const param of params) {
      const [key, value] = param.split(/=| +/)
      switch (key) {
        case '-h':
        case '--help': return this.help()
        case '-v':
        case '--version': return this.version()
        case 'top': this.manual = Top._help; break
        case 'clear': this.manual = Clear._help; break
        case 'ls': this.manual = Ls._help; break
        case 'mkdir': this.manual = MKDir._help; break
        case 're':
        case 'resume': this.manual = Resume._help; break
        case 'bl':
        case 'blog': this.manual = Blog._help; break
        case 'setting': this.manual = Setting._help; break
        default: throw new Error(`${subprocessName}: unkonw parameter "${arg}"`)
      }
    }
    if (!this.manual) throw new Error(`${subprocessName}: not found manual for "${arg}".`)
    return await super.render(id)
  }

  version() { return super.version(this._version) }
  help() { return super.help(this._help) }

  async processing() {
    try {
      const lang = document.documentElement.lang
      const buildinparams = this.manual.parameters[lang] || this.manual.parameters['en']
      if (!buildinparams) throw new Error(`${subprocessName}: not found build-in parameters for "${arg}".`)

      const div = document.createElement('div')
      div.className = 'subprocess-help'
      div.innerHTML += `<div id="manual-control">[ j: down, k: up, q: quit ]</div>`

      const pre = document.createElement('pre')
      pre.innerHTML = this.manual.manual
      div.appendChild(pre)
      if (this.sudo) div.innerHTML += this.manual.sudo[lang]
      div.innerHTML += this.manual.description[lang]
      div.innerHTML += this.manual.label[lang]

      buildinparams.forEach(params => {
        const [ short, full, options ] = params
        if (short == '' && full == '') {
          div.innerHTML += '<br/>'
        } else {
          options.forEach(option => {
            const [ opt, info ] = option
            if (opt === '') {
              div.innerHTML += `<div class="help-cmds-container"><div class="cmds">${short}, ${full}</div><div class="info">${info}</div></div>`
            } else {
              div.innerHTML += `<div class="help-cmds-container"><div class="cmds">\t\t${opt}</div><div class="info">${info}</div></div>`
            }
          })
        }
      })
      div.innerHTML += this.manual.tips[lang]
      div.innerHTML += this.manual.backtohelp[lang]
      this.body = document.createElement('div')
      this.body.appendChild(div)
      this.window.appendChild(this.body)
    } catch (error) {
      return { message: error.message }
    }
  }

}

export default new Man()

