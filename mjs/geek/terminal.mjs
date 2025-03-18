'use strict'


let commands
let cmdindex
let paramsindex
let pathindex


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

const disabledKeys = [9, 37, 38, 39, 40, 93, 112, 114, 117, 118, 121]



// For font monospace
//const welcome_logo = `
//##########################################################################################
//##########################################################################################
//###                     ##########################    ########     ###    ########     ###
//###                     ##########################     #######     ###     #######     ###
//########     #####################################      ######     ###      ######     ###
//########  ########################################       ################### #####     ###
//########  ##     ###   #            ###         ##        ####              # ####     ###
//########  ##     ###   #     ####    ##         ##         ##     ######     # ###     ###
//########  ##     ###   #     ####    ##     ######    #    ##     ######     #  ##     ###
//########   ##     #    #            ###     ######    ##   #############     #   #     ###
//########    ##         #     ##########        ###    ###   ##               #         ###
//########     ##       ##     ##########     ######    #### ##     ######     ##        ###
//########     ###     ###     ##########     ######    #######     ######     ###       ###
//########     ###     ###     ##########         ##    #######                ####      ###
//########     ###     ###     ##########         ##    ########        ##     #####     ###
//##########################################################################################
//##########################################################################################
//
//              LL      OOOO   GGGGGG  GGGGGG  EEEEE  DDDD      II  NN  NN
//              LL     OO  OO  GG      GG      EE     DD DD     II  NN  NN
//              LL     OO  OO  GG GGG  GG GGG  EEEE   DD  DD    II  NNN NN
//              LL     OO  OO  GG  GG  GG  GG  EE     DD DD     II  NN NNN
//              LLLLL   OOOO   GGGGGG  GGGGGG  EEEEE  DDDD      II  NN  NN
//
//              TTTTTT  EEEEE  RRRRRR  MM    MM  II  NN  NN   AAAA   LL
//                TT    EE     RR  RR  MM    MM  II  NN  NN  AA  AA  LL
//                TT    EEE    RRRRRR  MMM  MMM  II  NNN NN  AA  AA  LL
//                TT    EE     RR RR   MM MM MM  II  NN NNN  AAAAAA  LL
//                TT    EEEEE  RR  RR  MM    MM  II  NN  NN  AA  AA  LLLLLL
//
//`


// For font monospace
const welcome_logo = `
##############################################################
##############################################################
###              ################   ######   ##   ######   ###
###              ################    #####   ##    #####   ###
#######  ########################     ############  ####   ###
#######  #  ###  #       ##     #      ###        #  ###   ###
#######  #  ###  #   ##   #  ####   #   #    ##    #  ##   ###
#######  #  ###  #   ##   #  ####   ##  #   ####   #   #   ###
#######  ##   #  #       ##    ##   ### ########   #       ###
#######   ###   ##   ######  ####   ######         ##      ###
#######   ####  ##   ######  ####   #####   ####   ###     ###
#######   ##   ###   ######  ####   #####   #      ####    ###
#######   ##  ####   ######     #   ######    ##   #####   ###
##############################################################
##############################################################
`

const welcome_en = `
  If you're new to the LINUX operating system and find it challenging to use command-line utilities,
  a good place to start is the "man" command. "man" stands for "manual" and provides detailed
  information about any built-in command in the system. It's a helpful way to learn how each command works.
`

const welcome_th = `
  หากคุณเพิ่งเริ่มใช้ระบบปฏิบัติการ LINUX และยังไม่คุ้นเคยกับการใช้งานคำสั่งต่างๆ
  ขอแนะนำให้เริ่มต้นด้วยคำสั่ง "man" ซึ่งย่อมาจาก "manual" หรือคู่มือใช้งาน
  โดยคำสั่งนี้จะช่วยให้คุณเรียนรู้และเข้าใจการทำงานของคำสั่งต่างๆ ในระบบได้ง่ายขึ้น
`

export default class Terminal {
  constructor(parent, id) {
    if (!Terminal.instance) {
      this.parent = parent || document.body
      this.id = id || 'Terminal'
      this.render()

      Terminal.instance = this
    }
    return Terminal.instance
  }

  async waitfor(millisecond) { return new Promise(resolve => setTimeout(() => resolve(), millisecond)) }

  createElement(n, a = [], p = false, t = false) {
    const e = document.createElement(n)
    a.forEach((v) => e.setAttribute(v[0], v[1]))
    if (t) e.innerHTML = t
    let parent
    if (p instanceof HTMLElement) parent = p
    else if (typeof p === 'string') {
      parent = document.getElementById(p) || document.body
    } else parent = document.body
    parent.appendChild(e)
    return e
  }

  async render() {
    this.call_worker = true
    this.subprocessDone = true

    this.on_completer = {
      processing: false,
      data: {},
      select: -1
    }

    this.keypress = {}

    this.termhistory = []
    this.termhistory_index = -1

    this.command_line = []
    this.command_line_tmp = []
    this.command_cursor = -1

    this.terminal = document.createElement('section')
    this.terminal.id = this.id
    this.parent.appendChild(this.terminal)
    this.createElement('div',  [['id', 'Terminal-Title']], this.terminal, '<span id="Terminal-min">⇊</span><span id="Terminal-max">⊡</span>DEEP TERMINAL')
    this.createElement('div',  [['id', 'Terminal-console']], this.terminal)
    this.createElement('div',  [['id', 'Terminal-console-foot']], this.terminal, 'Server performance : ')

    this.createElement('div',  [['id', 'welcome']], this.terminal.childNodes[1])
    this.createElement('pre',  [], this.terminal.childNodes[1].childNodes[0], welcome_logo)
    this.createElement('div',  [], this.terminal.childNodes[1].childNodes[0], (document.documentElement.lang === 'th' ? welcome_th : welcome_en))
    this.createElement('ul',   [['id', 'Terminal-console-log']], this.terminal.childNodes[1])
    this.createElement('div',  [['id', 'Terminal-prompt']], this.terminal.childNodes[1])
    this.createElement('span', [['id', 'Terminal-prompt-sign']], this.terminal.childNodes[1].childNodes[2], '<span class="Terminal-prompt-sign">∺⋗</span> ')
    this.createElement('span', [['id', 'Terminal-prompt-interrupt']], this.terminal.childNodes[1].childNodes[2])
    this.createElement('span', [['id', 'Terminal-prompt-cursor']], this.terminal.childNodes[1].childNodes[2], '')
    this.createElement('span', [['id', 'Terminal-foot-status']], this.terminal.childNodes[2].childNodes[0], 'High')
    this.console = this.terminal.childNodes[1]

    const termicon = document.createElement('section')
    termicon.id = 'Terminal-thumnail'
    termicon.innerHTML = '⊑⊒'
    this.parent.appendChild(termicon)

    const termmin = document.getElementById('Terminal-min')
    const termmax = document.getElementById('Terminal-max')

    let termwinstat = 0

    termmax.onclick = () => {
      if (this.terminal.classList.contains('maximizing')) {
        this.terminal.classList.remove('maximizing')
        termwinstat = 0
      } else {
        this.terminal.classList.add('maximizing')
        termwinstat = 1
      }
    }

    termmin.onclick = () => {
      if (this.terminal.classList.contains('maximizing')) {
        this.terminal.classList.remove('maximizing')
      }
      if (this.terminal.classList.contains('minimizing')) {
        this.terminal.classList.remove('minimizing')
        termicon.classList.remove('show')
        termicon.classList.add('hide')
      } else {
        termicon.classList.remove('hide')
        termicon.classList.add('show')
        this.terminal.classList.add('minimizing')
      }
    }

    termicon.onclick = () => {
      if (this.terminal.classList.contains('minimizing')) {
        this.terminal.classList.remove('minimizing')
        termicon.classList.remove('show')
        termicon.classList.add('hide')
      } else {
        termicon.classList.remove('hide')
        termicon.classList.add('show')
        this.terminal.classList.remove('minimizing')
        if (termwinstat) this.terminal.classList.add('maximizing')
      }
    }

    this.randomStatusBarReverse()

    const { Commands, CmdsIndex, ParamsIndex, PathIndex } = await import('./commands.mjs')
    commands = Commands
    cmdindex = CmdsIndex()
    paramsindex = ParamsIndex
    pathindex = PathIndex

    const { default: FakeFS } = await import('./fakefs.mjs')
    this.fs = FakeFS.loadFS()
    this.cwd = FakeFS.loadCWD()

    //const worker = new Worker('./mjs/geek/worker-terminal.mjs', { type: 'module', name: `worker-terminal-${this.time()}` })
    //this.worker = worker

    this.termhistory = JSON.parse(localStorage.getItem('.geek_history')) || []
    this.termhistory_index = this.termhistory.length

    //worker.postMessage({ on: 'add_path_completer', path: this.fs, cwd: this.cwd })
    //worker.postMessage({ on: 'load_command_history', history: this.termhistory })

    window.onkeydown = async (e) => {
      if (this.subprocessDone) {
        let code = e.keyCode ? e.keyCode : e.which
        let key = e.key
        if (disabledKeys.indexOf(code) > -1) e.preventDefault()
        if (this.call_worker) {
          //worker.postMessage({ on: 'keydown', code: code, ascii: String.fromCharCode(code), key: key })
          //worker.postMessage({ on: 'get_completer' })
          this.keydown({ code: code, ascii: String.fromCharCode(code), key: key })
          this.termEvent({ on: 'get_completer' })
        } else {
          if (this.on_completer.processing) {
            switch (code) {
              case 9: // Tab
                if (e.shiftKey) {
                  if (this.on_completer.select > 0) this.on_completer.select--
                  else this.on_completer.select = this.on_completer.data.options.length - 1
                  this.command_completer_dialog()
                } else {
                  if (this.on_completer.select < this.on_completer.data.options.length - 1) this.on_completer.select++
                  else this.on_completer.select = 0
                  this.command_completer_dialog()
                }
                break
              case 16: // Shift
                break
              case 13: // Enter
                this.command_completer_dialog()
                this.on_completer.processing = false
                this.call_worker = true
                break
              case 8: // Back space
                this.on_completer.select = -1
                this.on_completer.processing = false
                this.call_worker = true
                //worker.postMessage({ on: 'keydown', code: code, ascii: String.fromCharCode(code), key: key })
                this.keydown({ code: code, ascii: String.fromCharCode(code), key: key })
                break
              case 27: //Escape
                this.on_completer.select = -1
                this.on_completer.processing = false
                this.call_worker = true
                break
              case 37: // Arrow Left
                this.on_completer.select = -1
                this.on_completer.processing = false
                this.call_worker = true
                //worker.postMessage({ on: 'keydown', code: code, ascii: String.fromCharCode(code), key: key })
                this.keydown({ code: code, ascii: String.fromCharCode(code), key: key })
                break
              case 38: // Arrow Up
                //if (this.on_completer.select > 0) this.on_completer.select--
                //else this.on_completer.select = this.on_completer.data.options.length - 1
                //this.command_completer_dialog()
                this.on_completer.select = -1
                this.on_completer.processing = false
                this.call_worker = true
                //worker.postMessage({ on: 'keydown', code: code, ascii: String.fromCharCode(code), key: key })
                this.keydown({ code: code, ascii: String.fromCharCode(code), key: key })
                break
              case 39: // Arrow Right
                this.on_completer.select = -1
                this.on_completer.processing = false
                this.call_worker = true
                //worker.postMessage({ on: 'keydown', code: code, ascii: String.fromCharCode(code), key: key })
                this.keydown({ code: code, ascii: String.fromCharCode(code), key: key })
                break
              case 40: // Arrow Down
                //if (this.on_completer.select < this.on_completer.data.options.length - 1) this.on_completer.select++
                //else this.on_completer.select = 0
                //this.command_completer_dialog()
                this.on_completer.select = 0
                this.on_completer.processing = false
                this.call_worker = true
                //worker.postMessage({ on: 'keydown', code: code, ascii: String.fromCharCode(code), key: key })
                this.keydown({ code: code, ascii: String.fromCharCode(code), key: key })
                break
              default:
                this.on_completer.select = -1
                this.on_completer.processing = false
                this.on_completer.data.cursor += 1
                this.on_completer.data.command += key
                //worker.postMessage({ on: 'keydown', code: code, ascii: String.fromCharCode(code), key: key })
                //await this.waitfor(50)
                //worker.postMessage({ on: 'get_completer' })
                this.keydown({ code: code, ascii: String.fromCharCode(code), key: key })
                this.termEvent({ on: 'get_completer' })
                break
            }
          }
        }
      }
    }

    window.onkeyup = (e) => {
      if (this.subprocessDone) {
        if (this.call_worker) {
          let code = e.keyCode ? e.keyCode : e.which
          let key = e.key
          if (disabledKeys.indexOf(code) > -1) e.preventDefault()
          //worker.postMessage({ on: 'keyup', code: code, ascii: String.fromCharCode(code), key: key })
          this.keyup({ code: code, ascii: String.fromCharCode(code), key: key })
        }
      }
    }

    //worker.onmessage = async (event) => {
    //  if (event.data.do !== undefined) {
    //    switch (event.data.do) {
    //      case 'command_line_change':
    //        this.command_change(event.data)
    //        break
    //      case 'command_line_interrupt':
    //        this.command_interrupt(event.data)
    //        break
    //      case 'command_line_completer':
    //        this.command_completer(event.data)
    //        break
    //      case 'command_line_completer_done':
    //        this.on_completer.processing = false
    //        this.call_worker = true
    //        break
    //      default:break
    //    }
    //  }
    //}

    //await this.waitfor(1000)
    import('./matrix.mjs').then(module => {
      const matrix = module.default
      new matrix(this.parent)
    })

  }

  keyup(e) { this.keypress[e.code] = { ascii: e.ascii, key: e.key, press: false } }

  keydown(e) {
    this.keypress[e.code] = { ascii: e.ascii, key: e.key, press: true }
    let code = e.code
    let key = e.key

    if (this.keypress[17] && this.keypress[67]) {
      if (this.keypress[17].press && this.keypress[67].press) {
        this.command_line.length = 0
        this.command_line_tmp. length = 0
        this.command_cursor = -1
        this.displayEvent({ do: 'command_line_change', command: this.command_line, cursor: this.command_cursor })
        return
      }
    }
    switch (code) {
      case 9: // Tab
        if (this.command_cursor > -1) this.completer(this.command_line)
        break

        // [Shift, Control, Alt]
      case 16: case 17: case 18: break

        // [Pause, CapsLock, Escape]
      case 19: case 20: case 27: break

        // [PageUp, PageDown, Insert]
      case 33: case 34: case 45: break

        // [ContextMenu, NumLock, ScrollLock]
      case 93: case 144: case 145: break

        // [F1-F12]
      case 112: case 113: case 114: case 115: case 116: case 117: break
      case 118: case 119: case 120: case 121: case 122: case 123: break

      case 8: // Back space
        if (this.command_cursor > -1) {
          this.command_line.splice(this.command_cursor, 1)
          this.command_cursor--
          this.displayEvent({ do: 'command_line_change', command: this.command_line, cursor: this.command_cursor })
        }
        break
      case 13: // Enter
        // if (command_line.length > 0) this.enterinterrupt()
        this.enterinterrupt()
        break
      default:
        this.command_cursor++
        this.command_line.splice(this.command_cursor, 0, key)
        this.displayEvent({ do: 'command_line_change', command: this.command_line, cursor: this.command_cursor })
        break
    }
  }

  termEvent(event) {
    switch (event.on) {
      case 'get_completer':
        if (this.command_cursor > -1) this.completer(this.command_line)
        break
      case 'set_completer':
        this.set_completer({
          oldCursor : event.oldCursor,
          oldCommand: event.oldCommand,
          cursor    : event.cursor,
          command   : event.command,
        })
        break
      default: break
    }
  }

  displayEvent(event) {
    if (event.do !== undefined) {
      switch (event.do) {
        case 'command_line_change':
          this.command_change(event)
          break
        case 'command_line_interrupt':
          this.command_interrupt(event)
          break
        case 'command_line_completer':
          this.command_completer(event)
          break
        case 'command_line_completer_done':
          this.on_completer.processing = false
          this.call_worker = true
          break
        default:break
      }
    }
  }

  enterinterrupt() {
    const command_line = [...this.command_line]
    const command_cursor = this.command_cursor
    this.displayEvent({ do: 'command_line_interrupt', command: command_line, cursor: command_cursor })
    if (this.termhistory[this.termhistory.length - 1]) {
      if (command_line.toString() !== this.termhistory[this.termhistory.length - 1].toString()) {
        const cmd = (this.command_space_reduce([...command_line])).join(' ')
        const prevcmd = this.termhistory.slice(-1)[0]
        if (cmd !== prevcmd && cmd !== ' ' && cmd !== '') {
          this.termhistory.push(cmd)
          if (this.termhistory.length > 100) this.termhistory.shift()
          this.termhistory_index = this.termhistory.length
          localStorage.setItem('.geek_history', JSON.stringify(this.termhistory))
        }
      }
    } else {
      const cmd = (this.command_space_reduce([...command_line])).join(' ')
      if (cmd !== ' ' && cmd !== '') {
        this.termhistory.push(cmd)
        this.termhistory_index = this.termhistory.length
        localStorage.setItem('.geek_history', JSON.stringify(this.termhistory))
      }
    }
    this.clearinterrupt()
  }

  clearinterrupt() {
    this.command_line_tmp.length = 0
    this.command_line.length = 0
    this.command_cursor = -1
    this.displayEvent({ do: 'command_line_change', command: this.command_line, cursor: this.command_cursor })
  }

  set_completer = (data) => {
    if (data.oldCursor < data.cursor) {
      for (let i = data.oldCommand.length; i > 0; i--) {
        if (this.command_cursor > -1) {
          this.command_line.splice(this.command_cursor, 1)
          this.command_cursor--
        }
      }
      for (let i = 0; i < data.command.length; i++) {
        this.command_cursor++
        this.command_line.splice(this.command_cursor, 0, data.command[i])
      }
      this.displayEvent({ do: 'command_line_change', command: this.command_line, cursor: this.command_cursor })
    }
  }

  completer(command_line) {
    let n = 0
    let cmd = command_line.join('')
    let params = cmd.split(' ')
    for (let i = 0; i < cmd.length; i++) {
      if (cmd[i] == ' ') n++
      if (i >= this.command_cursor) break
    }
    if (params.length === 1) {
      cmd = cmd.split(' ')[n]
      if (!cmdindex.hasOwnProperty(cmd)) return this.displayEvent({ do: 'command_line_completer_done' })
      const group = Object.keys(cmdindex[cmd])
      if (group.length < 1) return this.displayEvent({ do: 'command_line_completer_done' })
      const details = Object.values(cmdindex[cmd])
      this.displayEvent({ do: 'command_line_completer', command: cmd, options: group, details: details, cursor: this.command_cursor })
    } else {
      if (params.length > 1 && params[0] === 'sudo') {
        if (params.length > 2) {
          cmd = params[1]
          let param = params[params.length - 1]
          let prmi
          if (param.startsWith('/') || param.startsWith('.')) {
            [ prmi, param ] = pathindex(this.cwd, this.fs, param)
          } else {
            prmi = paramsindex(cmd)
          }
          //console.log(prmi, param, prmi.hasOwnProperty(param))
          if (!prmi.hasOwnProperty(param)) return this.displayEvent({ do: 'command_line_completer_done' })
          const group = Object.keys(prmi[param])
          if (group.length < 1) return this.displayEvent({ do: 'command_line_completer_done' })
          const details = Object.values(prmi[param])
          //console.log(param, group, this.command_cursor)
          this.displayEvent({ do: 'command_line_completer', command: param, options: group, details: details, cursor: this.command_cursor })
        } else {
          cmd = params[1]
          if (!cmdindex.hasOwnProperty(cmd)) return this.displayEvent({ do: 'command_line_completer_done' })
          const group = Object.keys(cmdindex[cmd])
          if (group.length < 1) return this.displayEvent({ do: 'command_line_completer_done' })
          const details = Object.values(cmdindex[cmd])
          //console.log(param, group, this.command_cursor)
          this.displayEvent({ do: 'command_line_completer', command: cmd, options: group, details: details, cursor: this.command_cursor })
        }
      } else if (params.length > 1) {
        cmd = params[0]
        let param = params[params.length - 1]
        let prmi
        if (param.startsWith('/') || param.startsWith('.')) {
          [ prmi, param ] = pathindex(this.cwd, this.fs, param)
          if (param.startsWith('./')) param = param.replace('./', '')
        } else {
          prmi = paramsindex(cmd)
        }
        //console.log(prmi, param, prmi.hasOwnProperty(param))
        if (!prmi.hasOwnProperty(param)) return this.displayEvent({ do: 'command_line_completer_done' })
        const group = Object.keys(prmi[param])
        if (group.length < 1) return this.displayEvent({ do: 'command_line_completer_done' })
        const details = Object.values(prmi[param])
        //console.log(param, group, this.command_cursor)
        this.displayEvent({ do: 'command_line_completer', command: param, options: group, details: details, cursor: this.command_cursor })
      }
    }
  }

  async randomStatusBar() {
    this.StatusBarTyping(this.terminal.childNodes[2], this.generateNonce())
    setInterval(() => this.StatusBarTyping(this.terminal.childNodes[2], this.generateNonce()), 5000)
  }

  async randomStatusBarReverse() {
    this.StatusBarTypingReverse(this.terminal.childNodes[2], this.generateNonce())
    setInterval(() => this.StatusBarTypingReverse(this.terminal.childNodes[2], this.generateNonce()), 5000)
  }

  StatusBarTyping(parent, msg, delta = 16.66) {
    const span = document.createElement('span')
    const cursor = document.createElement('span')
    cursor.setAttribute('class', 'blink-cursor')
    parent.innerHTML = ''
    parent.appendChild(span)
    parent.appendChild(cursor)
    let txt = ''
    let timeout
    const typeUpdate = async (span, txt, msg) => {
      txt = msg.substring(0, txt.length + 1)
      span.innerHTML = txt.replace(' ', '&nbsp;')
      if (txt === msg) clearTimeout(timeout)
      else timeout = setTimeout(() => typeUpdate(span, txt, msg), Math.random() * 33.33)
    }
    timeout = setTimeout(() => typeUpdate(span, txt, msg), delta)
  }

  StatusBarTypingReverse(parent, msg, delta = 16.66) {
    const span = document.createElement('span')
    const cursor = document.createElement('span')
    cursor.setAttribute('class', 'blink-cursor')
    parent.innerHTML = ''
    parent.appendChild(cursor)
    parent.appendChild(span)
    let txt = ''
    let timeout
    msg = msg.split('').reverse().join('')
    const typeUpdate = async (span, txt, msg) => {
      txt = msg.substring(msg.length - (txt.length + 1) , msg.length)
      span.innerHTML = txt.replace(' ', '&nbsp;')
      if (txt === msg) clearTimeout(timeout)
      else timeout = setTimeout(() => typeUpdate(span, txt, msg), Math.random() * 33.33)
    }
    timeout = setTimeout(() => typeUpdate(span, txt, msg), delta)
  }

  generateNonce() {
    const posible = ' ! ! ! ! ? ? & あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん '
    let text = ''
    let length = 24
    for (let i = 0; i < length; i++) text += posible.charAt(Math.floor(Math.random() * posible.length))
    return text
  }

  async command_completer(data) {
    this.call_worker = false
    if (data.options.length < 1) {
      this.call_worker = true
      this.on_completer.processing = false
      return
    }
    this.on_completer = {
      processing: true,
      data: data,
      select: -1
    }
    let newCursor = data.cursor
    if (data.options.length > 0) {
      this.on_completer.select = 0
      this.command_completer_dialog()
    }
    while (this.on_completer.processing) await this.waitfor(20)
    const el = document.getElementById('Terminal-completer')
    if (el) el.remove()
    const dl = document.getElementById('Terminal-completer-details')
    if (dl) dl.remove()
    if (this.on_completer.select > -1) {
      newCursor -= data.command.length
      newCursor += data.options[this.on_completer.select].length
      this.termEvent({
        on: 'set_completer',
        oldCursor: data.cursor,
        oldCommand: data.command,
        cursor: newCursor,
        command: data.options[this.on_completer.select]
      })
    }
  }

  command_completer_dialog() {
    const tcon = document.getElementById('Terminal-console')
    const cursor = document.getElementById('Terminal-prompt-cursor')
    let left = cursor.offsetLeft
    let top = cursor.offsetTop
    const dialog = document.getElementById('Terminal-completer') || document.createElement('div')
    const detail = document.getElementById('Terminal-completer-details') || document.createElement('div')
    dialog.id = 'Terminal-completer'
    dialog.innerHTML = ''
    this.terminal.childNodes[1].childNodes[2].appendChild(dialog)
    this.on_completer.data.options.forEach((o, i) => {
      if (i == this.on_completer.select) {
        dialog.innerHTML += `<div class="Terminal-completer-selected">${o}</div>`
        if (
          typeof this.on_completer.data.details !== 'undefined' &&
          Object.keys(this.on_completer.data.details).length > 0 &&
          this.on_completer.data.details[i] !== null &&
          this.on_completer.data.details[i] !== ''
        ) {
          detail.id = 'Terminal-completer-details'
          detail.innerHTML = `<div>${this.on_completer.data.details[i]}</div>`
          this.terminal.childNodes[1].childNodes[2].appendChild(detail)
        }
      } else dialog.innerHTML += `<div>${o}</div>`
    })
    let height = dialog.offsetHeight
    left = left + 20
    top = top - height
    if (top > tcon.offsetHeight - height - 8) top = tcon.offsetHeight - height - 8
    dialog.style.left = `${left}px`
    dialog.style.top = `${top}px`
    detail.style.left = `${left + dialog.offsetWidth + 5}px`
    detail.style.top = `${top + dialog.offsetHeight - detail.offsetHeight}px`
  }

  async command_change(data) {
    this.terminal.childNodes[1].childNodes[2].innerHTML = ''
    let before, after
    if (data.cursor < 0) { before = [''] }
    else { before = data.command.slice(0, data.cursor + 1) }
    if (data.cursor < 0) {
      if (data.command.length > 0) { after = data.command }
      else { after = [''] }
    } else { after = data.command.slice(data.cursor + 1, data.command.length) }
    before = this.command_space(before)
    after = this.command_space(after)
    this.createElement('span', [['class', 'Terminal-prompt-sign']], this.terminal.childNodes[1].childNodes[2], '<span class="Terminal-prompt-sign">∺⋗</span> ')
    if (data.command.length < 1) {
      this.createElement('span', [['id', 'Terminal-prompt-cursor']], this.terminal.childNodes[1].childNodes[2], '')
    } else {
      if (data.cursor > -1) {
        this.createElement('span', [['class', 'Terminal-prompt-interrupt-before']], this.terminal.childNodes[1].childNodes[2], before.join(''))
      }
      this.createElement('span', [['id', 'Terminal-prompt-cursor']], this.terminal.childNodes[1].childNodes[2], '')
      if (data.cursor < data.command.length) {
        this.createElement('span', [['class', 'Terminal-prompt-interrupt-after']], this.terminal.childNodes[1].childNodes[2], after.join(''))
      }
    }
    const bottom = this.console.scrollHeight - this.console.clientHeight === Math.round(this.console.scrollTop)
    if (!bottom) this.console.scrollTop = this.console.scrollHeight - this.console.clientHeight
  }

  async command_interrupt(data) {
    const logul = document.getElementById('Terminal-console-log')
    const logli = document.createElement('li')
    const std = await this.command_maping([...data.command])
    const command = (this.command_space([...data.command])).join('')
    console.log(std)
    //const cmd = (this.command_space_reduce([...data.command])).join(' ')
    //const prevcmd = this.termhistory.slice(-1)[0]
    //if (cmd !== prevcmd && cmd !== '') {
    //  this.termhistory.push(cmd)
    //  if (this.termhistory.length > 100) this.termhistory.shift()
    //  localStorage.setItem('.geek_history', JSON.stringify(this.termhistory))
    //}
    if (std) {
      if (std.message) {
        logli.innerHTML += `<span class="Terminal-prompt-sign">∺⋗</span> <span class=error>${command}</span><p class="error-message">${std.message}</p>`
      } else if (std.out) {
        logli.innerHTML += `<span class="Terminal-prompt-sign">∺⋗</span> <span class=cli>${command}</span><br/>${std.out}`
      } else if (std.clear) {
        logli.innerHTML = ''
      } else {
        logli.innerHTML = `<span class="Terminal-prompt-sign">∺⋗</span> <span class=cli>${command}</span>`
      }
    } else logli.innerHTML = `<span class="Terminal-prompt-sign">∺⋗</span> <span class=cli>${command}</span>`
    logul.appendChild(logli)
    const bottom = this.console.scrollHeight - this.console.clientHeight === Math.round(this.console.scrollTop)
    if (!bottom) this.console.scrollTop = this.console.scrollHeight - this.console.clientHeight
    this.subprocessDone = true
  }

  command_space(cmd) {
    for (let i = 0; i < cmd.length; i++) { cmd[i] = cmd[i].replace(' ', '&nbsp;') }
    return cmd
  }

  command_space_reduce(cmd) {
    const d = []
    for (let i = 0; i < cmd.length; i++) {
      if (d.length < 1) {
        if (cmd[i] != ' ') d.push(cmd[i])
      } else {
        if (cmd[i] == ' ') {
          if (d[d.length - 1] != cmd[i]) d.push(cmd[i])
        } else {
          d.push(cmd[i])
        }
      }
    }
    return d.join('').split(' ')
  }

  async command_maping(cmds) {
    return await this.windows_close(commands).then(async () => {
      this.subprocessDone = false
      const [cmd, ...arg] = this.command_space_reduce(cmds)
      let matches = commands.map((command) => ({
        // Fix Bug SyntaxError: Invalid regular expression: "\*()+[\?" : Unterminated character
        command: command.command.match(cmd.replace(/[\*\(\)\+\[\\\?]/g, '\\$&')),
        execute: command.execute,
        id: command.id
      }))
      let match = matches.find((m) => (m.command !== null && m.command.input === cmd))
      if (match) {
        // อันนี้คือพบ command ในสาระบบ
        let sudo = false
        if (cmd == 'sudo') sudo = true
        if (!sudo) {
          // เรียกใช้ command ทั่วไป
          const view = match.execute
          return await view.render(match.id, sudo, arg)
        } else {
          // เรียกใช้ command ทั่วไปโดยใช้สิทธิ์ root
          // if (arg.length > 0 && arg[0] !== undefined && arg[0] !== null && arg[0] !== '') {
          if (arg.length > 0 && arg[0] && cmd != arg[0]) {
            // สิทธิ์ root กำลังหา command ในสาระบบ
            matches = commands.map((command) => ({
              command: command.command.match(arg[0]),
              execute: command.execute,
              id: command.id
            }))
            match = matches.find((m) => (m.command !== null && m.command.input === arg[0]))
            if (match) {
              // สิทธิ์ root พบ command ในสาระบบ
              arg.shift()
              //const view = new match.execute(sudo, arg, this.worker)
              const view = match.execute
              return await view.render(match.id, sudo, arg)
            } else {
              // สิทธิ์ root ไม่พบ command ในสาระบบ (พิมพ์มั่ว)
              const [cmd, ...arg] = this.command_space_reduce(cmds)
              throw new Error(`geekshell: command "${cmd} ${arg.join(' ')}" not found`)
            }
          } else {
            const cmd = [...cmds]
            for (let i = 0; i < cmds.length; i++) { cmd[i] = cmd[i].replace(' ', '') }
            if (cmd.join('').length > 0) {
              if (cmd.join('') == 'sudo') {
                throw new Error(`usage: ${cmd.join('')} [command] [arguments]`)
              } else {
                // sudo ซ้ำ มากกว่า 1 คำสั่ง
                const [cmd, ...arg] = this.command_space_reduce(cmds)
                throw new Error(`geekshell: command "${cmd} ${arg.join(' ')}" not found`)
              }
            }
          }
        }
        // อันนี้คือสิ่งที่ไม่น่าจะเกิดขึ้น
        throw new Error()
      } else {
        // อันนี้คือไม่พบ command ในสาระบบ (พิมพ์มั่ว)'
        const cmd = [...cmds]
        for (let i = 0; i < cmds.length; i++) { cmd[i] = cmd[i].replace(' ', '') }
        if (cmd.join('').length > 0) {
          throw new Error(`geekshell: command "${cmd.join('')}" not found`)
          //const view = new commands[0].execute()
          //await view.render(commands[0].id)
        }

        // อันนี้คือ Enter ค่าว่างเปล่ามา'
        throw new Error()
      }
    }).catch(e => e)
  }

  async windows_close(commands) {
    await commands.forEach(async command => {
      const section = document.getElementById(command.id)
      if (section) {
        const id = section.id
        section.id = `${id}-removing`
        section.className = 'Windows Windows-Slide-TD'
        await this.waitfor(1000).then(() => section.parentNode.removeChild(section))
      }
    })
  }

  digit2(d) { return (d < 10 ? '0' + d : d) }

  time() {
    const d = new Date()
    return `${this.digit2(d.getHours())}:${this.digit2(d.getMinutes())}:${this.digit2(d.getSeconds())}`
  }

}
