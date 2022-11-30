'use strict';

import Windows from "./windows.mjs";


export default class extends Windows {
  constructor(params) { super(params) }

  render = async (id) => {
    this.create(id, null)
    await this.waitfor(50)
    this.show()

    const blog = document.createElement('div')
    blog.id = 'Blog'
    blog.innerHTML = '<h1>Blog</h1>'
    this.console.appendChild(blog)

    fetch('https://dev.to/typenan', {
      referrerPolicy: 'no-referrer',
    }).then(async (res) => {
      if (res.status == 200) {
        res.text().then((raw) => {
          // const regex_src = /[^h]*(href=[^=]+)"\ (data-preload-image=[^=]+)"\ (id=[^=]+)"/g
          raw = raw.split('\n')
          raw.forEach((line, i, a) => {
            line = line.trim()
            if (line.startsWith('<h2 class="crayons-story__title">')) {
              const anchor = a[i + 1].trim()
              const title = a[i + 2].trim()
              const url = anchor.split(' ')[1].replace('href="/', src => src.substring(7, src.length-1))
              let img = anchor.split(' ')[2].replace('data-preload-image="', src => src.substring(20, src.length - 1))
              let id  = anchor.split(' ')[3]
              id = id.split('>')[0].replace('id="', src => src.substring(4, src.length - 1))
              let link
              if (img.length > 2) {
                link = `<div class="blog-link-img"><a href="https://dev.to${url}" alt="${title}" target="_blank"><img src=${img} /><br>+ ${title}</a></div>`
              } else {
                link = `<a href="https://dev.to${url}" alt="${title}" target="_blank">+ ${title}</a>`
              }
              blog.innerHTML += `${link}<br>`
            }
          })
        }).catch((e) => console.error(e))
      }
    }).catch((e) => console.error(e))
  }
}