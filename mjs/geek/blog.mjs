'use strict';

import Windows from "./windows.mjs";

const description = `Command blog

Pattern     : blog
Arguments   : No arguments
Exit Status : void

`

export default class extends Windows {
  constructor(params) { super(params) }

  render = async (id) => {
    this.create(id, description)
    await this.waitfor(50)
    this.show()

    const blog = document.createElement('div')
    blog.id = 'Blog'
    blog.innerHTML = '<img alt="TypeNaN" src="https://res.cloudinary.com/practicaldev/image/fetch/s--rR4Xzq6L--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/859123/ae293bd6-130c-43f3-ae70-71c9f61b31dd.jpeg" />'
    blog.innerHTML += '<h1>Blog</h1>'
    this.console.appendChild(blog)

    // Scraping, slow and log warnning
    fetch('https://dev.to/typenan', { referrerPolicy: 'no-referrer' })
    .then(res => res.text())
    .then(raw => {
      // const regex_src = /[^h]*(href=[^=]+)"\ (data-preload-image=[^=]+)"\ (id=[^=]+)"/g
      // raw = raw.split('\n')
      (raw.split('\n')).forEach((line, i, a) => {
        line = line.trim()
        if (line.startsWith('<h2 class="crayons-story__title">')) {
          const anchor = a[i + 1].trim()
          const title = a[i + 2].trim()
          const url = anchor.split(' ')[1].replace('href="/', src => src.substring(7, src.length - 1))
          let img = anchor.split(' ')[2].replace('data-preload-image="', src => src.substring(20, src.length - 1))
          let id = anchor.split(' ')[3]
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

    /*
    // Load from feed, fast and no log warnning/error but no image
    fetch('https://dev.to/feed/typenan', { referrerPolicy: 'no-referrer' })
    .then(res => res.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
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
        const pubDate = item.children[2]
        const link = item.children[3]
        blog.innerHTML += `<div><a href="${link.textContent}" alt="${pubDate.textContent}" target="_blank">${title.textContent}</a></div>`
      }
    }).catch((e) => console.error(e))
    */
  }
}