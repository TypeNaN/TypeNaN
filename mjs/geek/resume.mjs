'use strict'

import Windows from "./windows.mjs"

const description = `Command resume

Pattern     : resume
Arguments   : No arguments
Exit Status : void

`

const desc0 = {
  th: '<p class="no-sudo">คำสั่งนี้ไม่ต้องการสิทธิ์พิเศษใดๆ เพื่อดำเนิดการ</p>',
  en: '<p class="no-sudo">Do not need super user permission</p>'
}
const desc1 = {
  th: '<p>\tคำสั่งจัดรูปแบบข้อมูลเพื่อสั่งพิมพ์ออกไปยังเครื่องพิมพ์เอกสารขนาด A4 คุณสามารถสั่งการพิมพ์ออกไปยังเครื่องพิมพ์เอกสารได้โดยที่รูปแบบที่พิมพ์ ออกไปจะมีรูปแบบตามที่แสดงให้เห็นจากด้านล่างนี้ หรือหากตัวอย่างที่ด้านล่างไม่แสดงสามารถกดดาวน์โหลดได้ <a target="_blank" href="./assets/resume.pdf#toolbar=1&navpanes=1&scrollbar=0&view=FitH,top">ที่ตรงนี้</a>\n\n</p>',
  en: '<p>\tCommand to format the data to print out to an A4 document printer You can print out to a document printer that prints that format. The result will look like the one below. Or if the preview below doesn\'t show, you can click to download it <a target="_blank" href="./assets/resume.pdf#toolbar=1&navpanes=1&scrollbar=0&view=FitH,top">here</a>.\n\n</p>'
}


class Resume extends Windows {
  constructor() {
    if (!Resume.instance) {
      super()
      Resume.instance = this
    }
    return Resume.instance
  }

  render = async (id, sudo, params) => {
    this.sudo = sudo
    const lang = document.documentElement.lang
    this.create(id, description)
    await this.waitfor(50)
    this.show()
    if (this.sudo) this.console.innerHTML += desc0[lang]
    this.console.innerHTML += desc1[lang]
    this.preview()
  }

  preview = async () => {
    const container = document.createElement('div')
    container.id = 'Frame-container'
    const frame = document.createElement('iframe')
    frame.id = 'Frame-resume'
    frame.src = './assets/resume.pdf#toolbar=1&navpanes=0&scrollbar=0&view=FitH,top'
    container.appendChild(frame)
    this.console.appendChild(container)

    const pdfScale = (e) => {
      const A4Scale = 297 / 210
      const padding = parseInt(
        window.getComputedStyle(this.console, null)
        .getPropertyValue('padding-left')
        .split('px')[0]
      ) * 2
      e.target.width = this.console.clientWidth - padding
      e.target.height = e.target.clientWidth * A4Scale + 40
    }

    frame.onload = (e) => {
      const resizeObserver = new ResizeObserver(entries => pdfScale({ target: frame }))
      resizeObserver.observe(this.console)
    }
  }

}

export default new Resume()

    //const padding = parseInt(
    //  window.getComputedStyle(this.console, null)
    //    .getPropertyValue('padding-left')
    //    .split('px')[0]
    //) * 2
    //
    //const A4 = 297 / 210
    //let scale = 1
    //
    //frame.onload = (e) => {
    //  e.target.width = (this.console.clientWidth - padding < 814 ? this.console.clientWidth - padding : 814)
    //  //const fw = e.target.clientWidth
    //  //if (fw < 205) scale = 1
    //  //else if (fw < 305) scale = 1.10
    //  //else if (fw < 405) scale = 1.07
    //  //else if (fw < 505) scale = 1.05
    //  //else if (fw < 605) scale = 1.04
    //  //else scale = 1.03
    //  e.target.height = (fw * A4) * scale
    //
    //  // --------------------------------------------------------------------
    //  // ส่วนนี้ไม่จำเป็นต้องกำหนดเอง หากใส่พารามิเตอร์ดังนี้
    //  // --> frame.src = 'filename.pdf#toolbar=1&navpanes=1&scrollbar=0&view=FitH,top'
    //  // --------------------------------------------------------------------
    //
    //  // const fdoc = e.target.contentDocument || e.target.contentWindow.document
    //  // const doc = fdoc.childNodes[1]
    //  // const iframe_html = doc.childNodes[0]
    //  // const iframe_body = doc.childNodes[1]
    //  // const iframe_embed = iframe_body.childNodes[0]
    //  // iframe_body.width = fw
    //  // iframe_body.height = e.target.height
    //  // iframe_body.style.width = `${fw}px`
    //  // iframe_body.style.height = `${e.target.height}px`
    //  // --------------------------------------------------------------------
    //
    //
    //  const resizeObserver = new ResizeObserver((entries) => {
    //    const parent = (entries[0].target.clientWidth - padding < 814 ? entries[0].target.clientWidth - padding : 814)
    //    frame.width = parent
    //    if (parent < 205) scale = 1
    //    else if (parent < 305) scale = 1.10
    //    else if (parent < 405) scale = 1.07
    //    else if (parent < 505) scale = 1.05
    //    else if (parent < 605) scale = 1.04
    //    else scale = 1.03
    //    frame.height = (frame.width * A4) * scale
    //
    //    // --------------------------------------------------------------------
    //    // ส่วนนี้ไม่จำเป็นต้องกำหนดเอง หากใส่พารามิเตอร์ดังนี้
    //    // --> frame.src = 'filename.pdf#toolbar=1&navpanes=1&scrollbar=0&view=FitH,top'
    //    // --------------------------------------------------------------------
    //
    //    // const scale = doc.clientWidth / iframe_body.clientWidth
    //
    //    // // // doc.style.transform = `scale(${scale})`
    //    // // // iframe_html.style.transform = `scale(${scale})`
    //    // // iframe_body.style.transform = `scale(${scale})`
    //    // // iframe_embed.style.transform = `scale(${scale})`
    //
    //    // iframe_body.width = parent
    //    // iframe_body.height = frame.height
    //    // iframe_body.style.width = `${parent}px`
    //    // iframe_body.style.height = `${frame.clientHeight}px`
    //
    //    // iframe_embed.width = parent
    //    // iframe_embed.height = frame.height
    //    // iframe_embed.style.width = `${parent}px`
    //    // iframe_embed.style.height = `${frame.clientHeight}px`
    //    // --------------------------------------------------------------------
    //  })
    //  resizeObserver.observe(this.console)
    //}

