'use strict'


document.addEventListener('DOMContentLoaded', async () => {
  let conf = JSON.parse(sessionStorage.getItem('conf')) || { lang: false, viewer: false }
  if (!conf['lang'] || !conf['viewer']) {
    const landing = await import('./landing.mjs')
    const land = new landing.default()
    await land.render()
    conf = land.getconf()
  }
  document.documentElement.lang = conf['lang']
  const module = await import(`./${conf['viewer']}.mjs`)
  new module.default()
})