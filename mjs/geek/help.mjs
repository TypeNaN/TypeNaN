'use strict'

import Windows from "./windows.mjs"

const description = `Command help

Pattern     : help
Arguments   : No arguments
Exit Status : void

`
const buidincmds_th = [
  ['pr, print', 'จัดรูปแบบข้อมูลเพื่อสั่งพิมพ์ออกไปยังเครื่องพิมพ์เอกสาร'],
  ['wp, weapon', 'แสดงข้อมูลสุดยอดอาวุธคู่กายที่ใช้เนรมิตทุกสรรพสิ่ง'],
  ['ed, education', 'แสดงข้อมูลประวัติการศึกษา'],
  ['ex, experience', 'แสดงข้อมูลประวัติการทำงาน'],
  ['', ''],
  ['st, stack', 'แสดงข้อมูลภาษาและเทคโนโลยีเกี่ยวกับการพัฒนา'],
  ['\t-f, --frontend', '\tแสดงข้อมูลทางฝั่ง Frontend'],
  ['\t-b, --backend', '\tแสดงข้อมูลทางฝั่ง Backend'],
  ['\t-o, --dev-op', '\tแสดงข้อมูลทางฝั่ง DevOps'],
  ['\t--full', '\tแสดงข้อมูลทั้งหมด (ตั้งเป็นค่าปริยาย)'],
  ['', ''],
  ['re, resume', 'แสดงข้อมูลประวัติส่วนตัว'],
  ['lk, looking', 'แสดงข้อมูลสิ่งที่กำลังมองหา'],
  ['at, attention', 'แสดงข้อมูลสิ่งที่สนใจเป็นพิเศษ'],
  ['sk, skill', 'แสดงข้อมูลทักษะด้านต่างๆ'],
  ['gh, github', 'แสดงข้อมูลและสถานะต่างบน github'],
  ['pf, portfolio', 'แสดงแฟ้มสะสมผลงาน'],
  ['hb, hobby', 'แสดงข้อมูลงานอดิเรก'],
  ['bl, blog', 'แสดงข้อมูล blog post'],
  ['co, contact', 'แสดงข้อมูลติดต่อ'],
  ['', ''],
  ['sudo conf', 'ตั้งค่าเว็บไซต์'],
  ['\t-l=arg, --lang=arg', '\tตั้งค่าภาษาของเว็บไซต์ argument คือ ["th","en"]'],
  ['\t-v=arg, --viewer=arg', '\tตั้งค่ารูปแบบสดงผลเว็บไซต์ให้เหมาะกับผู้เข้าชม ["hr","geek","gamer"]'],
  ['\t-c, --clear', '\tล้างการตั้งค่า'],
  ['', ''],
]

const buidincmds_en = [
  ['pr, print', 'Format data for printing to a document printer.'],
  ['wp, weapon', 'Show information on the ultimate weapon that is used to create everything.'],
  ['ed, education', 'Show education history information.'],
  ['ex, experience', 'Show work history information.'],
  ['', ''],
  ['st, stack', 'Show language and technology information about development.'],
  ['\t-f, --frontend', '\tShow information on the Frontend side.'],
  ['\t-b, --backend', '\tShow information on the Backend side.'],
  ['\t-o, --dev-op', '\tShow information on the DevOps side.'],
  ['\t--full', '\tShow all information. (set as default)'],
  ['', ''],
  ['re, resume', 'Show profile information.'],
  ['lk, looking', 'Show what i\'m looking for?'],
  ['at, attention', 'Show information of special interest.'],
  ['sk, skill', 'Show information about skills.'],
  ['gh, github', 'Show information and status on github.'],
  ['pf, portfolio', 'Show portfolio.'],
  ['hb, hobby', 'Show hobby information.'],
  ['bl, blog', 'My blog post.'],
  ['co, contact', 'Show contact information.'],
  ['', ''],
  ['sudo conf', 'Configure (root permission)'],
  ['\t-l=arg, --lang=arg', '\tSet the language for the website ["th","en"].'],
  ['\t-v=arg, --viewer=arg', '\tSet up a website display format to suit your visit. ["hr","geek","gamer"]'],
  ['\t-c, --clear', '\tClear setting.'],
  ['', ''],
]

const desc0 = {
  th: '<p class="no-sudo">คำสั่งนี้ไม่ต้องการสิทธิ์พิเศษใดๆ เพื่อดำเนิดการ</p>',
  en: '<p class="no-sudo">Do not need super user permission</p>'
}
const desc1 = {
  th: '\tแสดงรายละเอียดเกี่ยวกับการใช้งาน Terminal โดยแนะนำคำสั่งต่างๆ เพื่อใช้ป้อนสั่งให้ Terminal กระทำสิ่งใดๆ หรือให้แสดงข้อมูลที่ต้องการได้ ซึ่งคำสั่งต่างๆ มีดังต่อไปนี้\n\n',
  en: '\tShows details about using the Terminal by recommending various conditions. For example, the Terminal does something. or to display the required information, which has various commands as follows.\n\n'
}
const desc2 = {
  th: 'ชุดคำสั่ง :\n\n',
  en: 'Commands :'
}
const desc3 = {
  th: '\tคุณสามารถค้นหาคำสั่งที่เคยใช้ก่อนหน้าได้โดยการใช้ปุ่ม Arrow key Up/Down เพื่อเลื่อนหาคำสั่งที่คุณเคยใช้ได้ หรือกด tab เพื่อเติมคำอัติโนมัติ เช่น กดปุ่ม h แล้วตามด้วยปุ่ม tab แล้วคำสั่งที่ขึ้นต้นด้วย h จะแสดงออกมาเป็นตัวเลือกให้คุณ\n\n',
  en: '\tYou can search for previously used commands by using the arrow key Up/Down to scroll through commands you\'ve used before, or pressing tab to autocomplete.For example, press h followed by tab.Commands starting with h will show you options.\n\n'
}
const desc4 = {
  th: '* คุณสามารถกลับมาเรียกดูรายละเอียดนี้ได้ทุกเมื่อด้วยคำสั่ง "help"\n\n\n',
  en: '* You can return to this detail at any time with the "help" command.\n\n\n'
}


export default class extends Windows {
  constructor(sudo, params) {
    super(params)
    this.sudo = sudo
  }

  render = async (id) => {
    const lang = document.documentElement.lang
    const buidincmds = lang === 'th' ? buidincmds_th : buidincmds_en
    
    this.create(id, description)
    await this.waitfor(50)
    this.show()
    
    if (this.sudo) this.console.innerHTML += desc0[lang]

    this.console.innerHTML += desc1[lang]
    this.console.innerHTML += desc2[lang]

    buidincmds.forEach((v) => {
      const container = document.createElement('div')
      container.className = 'container'
      if (!v[0]) {
        container.innerHTML = '<br>'
      } else {
        const cmds = document.createElement('div')
        const info = document.createElement('div')
        cmds.className = 'cmds'
        info.className = 'info'
        cmds.innerHTML = v[0]
        info.innerHTML = v[1]
        container.appendChild(cmds)
        container.appendChild(info)
      }
      this.console.appendChild(container)
    })

    

    this.console.innerHTML += `<br />${desc3[lang]}`
    this.console.innerHTML += desc4[lang]
    
  }
}