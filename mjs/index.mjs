'use strict'


import landing from './landing.mjs'
import hr from './hr.mjs'
import geek from './geek.mjs'
import gamer from './gamer.mjs'

const waitfor = (millisecond) => new Promise(resolve => setTimeout(() => resolve(), millisecond))

document.addEventListener('DOMContentLoaded', async () => {
  const viewcase = { hr: hr, geek: geek, gamer: gamer }  
  let conf = JSON.parse(sessionStorage.getItem('conf')) || { lang: false, viewer: false }
  if (conf['lang'] && conf['viewer']) {
    document.documentElement.lang = conf['lang']
    new viewcase[conf['viewer']]()
  } else {
    const land = new landing()
    await land.render()
    conf = land.getconf()
    document.documentElement.lang = conf['lang']
    new viewcase[conf['viewer']]()
  }
})