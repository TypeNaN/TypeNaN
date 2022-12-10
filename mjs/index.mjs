'use strict'


const loadcss = href => {
  let iscss = false
  let root = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
  let head = document.getElementsByTagName("head")[0]
  let links = document.getElementsByTagName('link')
  for (let i = 0; i < links.length; i++) { if (links[i].href === root + './css/' + href + '.css') { iscss = true; break; } }
  if (!iscss) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = './css/' + href + '.css'
    link.media = 'all'
    head.appendChild(link)
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  let conf = JSON.parse(sessionStorage.getItem('conf')) || { lang: false, viewer: false }
  if (!conf['lang'] || !conf['viewer']) {
    loadcss('landing')
    const landing = await import('./landing.mjs')
    const land = new landing.default()
    await land.render()
    conf = land.getconf()
  }

  loadcss(conf['viewer'])

  document.documentElement.lang = conf['lang']
  const module = await import(`./${conf['viewer']}/${conf['viewer']}.mjs`)
  new module.default()
})