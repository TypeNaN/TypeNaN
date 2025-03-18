'use strict'


import Subprocess from '../subprocess.mjs'


const subprocessName = 'blog'
const version = `${subprocessName} : versiont 0.0.1 build from kernel deep#0.0.1`

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
    th: `<p>\tคำสั่ง "${subprocessName}" คือคำสั่งเพื่อแสดงรายละเอียดข้อมูลการใช้ทรัพยากรของ JavaScript ซึ่งจะแสดงข้อมูลทั้ง ข้อความ ตัวเลข ความคืบหน้า และกราฟ </p>\n`,
    en: `<p>\tThe "${subprocessName}" command is a command to display detailed information about JavaScript resource usage, which can display information such as text, numbers, progress bars, and graphs.</p>\n`
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

class Blog extends Subprocess {
  constructor() {
    if (!Blog.instance) {
      super()
      this._help = help
      this._version = version
      this.parameters = help.parameters.th
      this.prmi = this.ParamsIndex()
      Blog.instance = this
    }
    return Blog.instance
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
  help(param, option) { return super.help(this._help, param, option) }

  async processing() {

    const blog = document.createElement('div')
    blog.id = 'Blog'
    this.body.appendChild(blog)

    //function truncateText(text, maxLength) {
    //  return text.length > maxLength
    //    ? text.slice(0, maxLength) + '...'
    //    : text
    //}
    function truncateText(text, maxLength) {
      if (text.length <= maxLength) return text
      const truncated = text.slice(0, maxLength)
      return truncated.slice(0, truncated.lastIndexOf(' ')) + '...'
    }

    function stripHtml(html) {
      return html.replace(/<[^>]*>/g, '')
    }

    // Load from feed, fast and no log warnning/error
    fetch('https://dev.to/feed/typenan', { referrerPolicy: 'no-referrer' })
    .then(res => res.text())
    .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then(data => {
      const rss = data.children[0]
      const channel = rss.children[0]
      const rsstitle = channel.children[0]
      const description = channel.children[1]
      const rsslink = channel.children[2]
      const rssimage = channel.children[3]
      const rssurl = rssimage.children[0]
      blog.innerHTML += `<div align="center"><a href="${rsslink.textContent}" alt="${rsstitle.textContent}" target="_blank"><img src="${rssurl.textContent}" alt="${rsstitle.textContent}" /><h1>${description.textContent}</h1></a></div>`
      for (let i = 6; i < channel.children.length; i++) {
        const item = channel.children[i]
        const title = item.children[0]
        console.log(title.textContent.length)
        const pubDate = item.children[2]
        const link = item.children[3]
        const description = item.children[5]
        //blog.innerHTML += ` <div><a href="${link.textContent}" alt="${pubDate.textContent}" target="_blank">+ ${title.textContent}</a> -- ${truncateText(stripHtml(description.textContent), 80 - title.textContent.length)}</div>`
        //blog.innerHTML += ` <div><span id="${title.textContent}">+ ${title.textContent}</span> -- ${truncateText(stripHtml(description.textContent), 80 - title.textContent.length)}</div>`
        const div = document.createElement('div')
        const span = document.createElement('span')
        span.innerHTML = `+ ${title.textContent}`
        span.onclick = (e) => console.log(e.target.textContent)
        div.appendChild(span)
        blog.appendChild(div)
        //div.innerHTML += ` -- ${truncateText(stripHtml(description.textContent), 80 - title.textContent.length)}`


      }
    }).catch((e) => console.error(e))



    // Scraping, slow and log warnning
    //const blog = document.createElement('div')
    //blog.id = 'Blog'
    //blog.innerHTML = '<img alt="TypeNaN" src="https://media2.dev.to/dynamic/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F859123%2Fae293bd6-130c-43f3-ae70-71c9f61b31dd.jpeg" />'
    //blog.innerHTML += '<h1>Blog</h1>'
    //this.body.appendChild(blog)
    //
    //return await fetch('https://dev.to/typenan', { referrerPolicy: 'no-referrer' }).then(res => res.text()).then(raw => {
    //  (raw.split('\n')).forEach((line, i, a) => {
    //    line = line.trim()
    //    if (line.startsWith('<h2 class="crayons-story__title">')) {
    //      const anchor = a[i + 1].trim()
    //      const title = a[i + 2].trim()
    //      const url = anchor.split('href="')[1].split('"')[0]
    //      let id = anchor.split(' ')[3]
    //      id = id.split('>')[0].replace('id="', src => src.substring(4, src.length - 1))
    //      blog.innerHTML += `<a id="${id}" href="${url}" alt="${title}" target="_blank">+ ${title}</a><br>`
    //    }
    //  })
    //}).catch(error => {
    //  this.done = true
    //  return { message: error.message }
    //})
  }

}

export default new Blog()

