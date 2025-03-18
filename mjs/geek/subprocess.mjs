'use strict'

// Disable
// 9   Tab          Move Focus
// 37  Arrow        Left
// 38  Arrow        Up
// 39  Arrow        Right
// 40  Arrow        Down
// 93  ContextMenu  Toggle context menu
// 112 F1           Help
// 114 F3           Search
// 116 F5           Refresh
// 117 F6           Move Focus
// 118 F7           Toggle on/off caret browsing
// 121 F10          Toggle menu
// 123 F12          Toggle dev tools

const disabledKeys = [ 9, 37, 38, 39, 40, 93, 112, 114, 116, 117, 118, 121, 123 ]


export default class {
  constructor() {
  }

  async render(id) {
    let keypress = {}
    this.done = false
    const terminal = document.getElementById('Terminal')
    const termcons = document.getElementById('Terminal-console')

    this.window = document.createElement('div')
    this.window.id = id
    this.window.className = 'Terminal-subprocess'
    this.body = document.createElement('div')
    this.body.className = 'Terminal-subprocess-body'
    this.window.appendChild(this.body)
    terminal.appendChild(this.window)

    termcons.style.opacity = 0

    const keyInputDown = (e) => {
      let code = e.keyCode ? e.keyCode : e.which
      let ascii = String.fromCharCode(code)
      let key = e.key
      keypress[code] = { ascii: ascii, key: key, press: true }
      if (disabledKeys.indexOf(code) > -1) e.preventDefault()
      if (keypress[17] && keypress[67]) {
        if (keypress[17].press && keypress[67].press) {
          this.done = true
          return
        }
      }
      switch (code) {
        case 37: // Arrow Left
        case 40: // Arrow Down
        case 72: // h
        case 74: // j
          this.window.scrollTop += 20
          break

        case 38: // Arrow Up
        case 39: // Arrow Right
        case 75: // k
        case 76: // l
          this.window.scrollTop -= 20
          break

        case 81: // q
          this.done = true
          break
        default:
          break
      }
    }

    const keyInputUp = (e) => {
      let code = e.keyCode ? e.keyCode : e.which
      let ascii = String.fromCharCode(code)
      let key = e.key
      keypress[code] = { ascii: ascii, key: key, press: false }
    }

    window.addEventListener('keydown', keyInputDown, true)
    window.addEventListener('keyup', keyInputUp, true)

    const std =await this.processing()

    while (!this.done) {
      await this.waitfor(50)
    }

    window.removeEventListener('keydown', keyInputDown, true)
    window.removeEventListener('keyup', keyInputUp, true)
    terminal.removeChild(this.window)
    termcons.style.opacity = 1
    return std
  }

  waitfor = (millisecond) => new Promise(resolve => setTimeout(() => resolve(), millisecond))

  async processing() {}

  ParamsIndex() {
    const index = []
    const parameters = this.parameters
    for (let p1 = 0; p1 < parameters.length; p1++) {
      const param1 = parameters[p1][0]
      const param2 = parameters[p1][1]
      const param3 = parameters[p1][2]
      if (param1) index.push(param1)
      if (param2) index.push(param2)
      if (param3) {
        for (let p3 = 0; p3 < param3.length; p3++) {
          index.push(param3[p3][0])
        }
      }
    }
    return index
  }

  version(version) {
    this.done = false
    const div = document.createElement('div')
    div.innerHTML = version
    this.done = true
    return { out: div.outerHTML }
  }

  help(help, param, option) {
    if (option) return this.optionshelp(help, param, option)
    return this.mainhelp(help)
  }

  mainhelp(help) {
    this.done = false
    const lang = document.documentElement.lang
    const buildinparams = help.parameters[lang] || help.parameters['en']
    if (!buildinparams) return this.done = true

    const div = document.createElement('div')
    div.className = 'subprocess-help'
    const pre = document.createElement('pre')
    pre.innerHTML = help.manual
    div.appendChild(pre)
    if (this.sudo) div.innerHTML += help.sudo[lang]
    div.innerHTML += help.description[lang]
    div.innerHTML += help.label[lang]
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
    div.innerHTML += help.tips[lang]
    div.innerHTML += help.backtohelp[lang]
    this.done = true
    return { out: div.outerHTML }
  }

  optionshelp(help, param, option) {
    this.done = false
    const lang = document.documentElement.lang
    const buildinparams = help.parameters[lang] || help.parameters['en']
    if (!buildinparams) return this.done = true

    const div = document.createElement('div')
    div.className = 'subprocess-help'
    buildinparams.forEach(params => {
      const [ short, full, options ] = params
      if ([ short, full ].includes(param)) {
        if (short == '' && full == '') {
          div.innerHTML += '<br/>'
        } else {
          options.forEach(o => {
            const [ opt, info ] = o
            if (opt == option) {
              div.innerHTML += `${info}`
              this.done = true
              return { out: div.outerHTML }
            }
          })
        }
      }
    })
    this.done = true
    return { out: div.outerHTML }
  }

}


