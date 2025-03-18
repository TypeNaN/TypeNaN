'use strict'


const loadcss = async href => {
  const root = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
  const head = document.getElementsByTagName('head')[0]
  const links = document.getElementsByTagName('link')
  for (let i = 0; i < links.length; i++) { if (links[i].href === root + './css/' + href + '.css') { return Promise.resolve() } }
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = './css/' + href + '.css'
    link.media = 'all'
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load CSS: ${href}.css`))
    head.appendChild(link)
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  let conf = JSON.parse(sessionStorage.getItem('conf')) || { lang: false, viewer: false }
  if (!conf['lang'] || !conf['viewer']) {
    await loadcss('landing')
    const { default: landing } = await import('./landing.mjs')
    await landing.render()
    conf = landing.getconf()
  }

  await loadcss(conf['viewer'])

  document.documentElement.lang = conf['lang']
  const { default: view } = await import(`./${conf['viewer']}/${conf['viewer']}.mjs`)
  view.render()
})
