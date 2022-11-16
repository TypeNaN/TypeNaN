'use strict'


import { Commands } from './buidincmds.mjs'

const commands = Commands


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

const welcome_logo = `
##########################################################################################
##########################################################################################
###                     ##########################    ########     ###    ########     ###
###                     ##########################     #######     ###     #######     ###
########     #####################################      ######     ###      ######     ###
########  ########################################       ################### #####     ###
########  ##     ###   #            ###         ##        ####              # ####     ###
########  ##     ###   #     ####    ##         ##         ##     ######     # ###     ###
########  ##     ###   #     ####    ##     ######    #    ##     ######     #  ##     ###
########   ##     #    #            ###     ######    ##   #############     #   #     ###
########    ##         #     ##########        ###    ###   ##               #         ###
########     ##       ##     ##########     ######    #### ##     ######     ##        ###
########     ###     ###     ##########     ######    #######     ######     ###       ###
########     ###     ###     ##########         ##    #######                ####      ###
########     ###     ###     ##########         ##    ########        ##     #####     ###
##########################################################################################
##########################################################################################

              LL      OOOO   GGGGGG  GGGGGG  EEEEE  DDDD      II  NN  NN
              LL     OO  OO  GG      GG      EE     DD DD     II  NN  NN
              LL     OO  OO  GG GGG  GG GGG  EEEE   DD  DD    II  NNN NN
              LL     OO  OO  GG  GG  GG  GG  EE     DD DD     II  NN NNN
              LLLLL   OOOO   GGGGGG  GGGGGG  EEEEE  DDDD      II  NN  NN

              TTTTTT  EEEEE  RRRRRR  MM    MM  II  NN  NN   AAAA   LL
                TT    EE     RR  RR  MM    MM  II  NN  NN  AA  AA  LL
                TT    EEE    RRRRRR  MMM  MMM  II  NNN NN  AA  AA  LL
                TT    EE     RR RR   MM MM MM  II  NN NNN  AAAAAA  LL
                TT    EEEEE  RR  RR  MM    MM  II  NN  NN  AA  AA  LLLLLL

`
const welcome_en = `
      If you are new to LINUX operating system and having troublen dealing with the
      command-line utilities provided by LINUX then you really need to know first of
      all about the "help" command which as its name says "help" you to learn about
      any built-in command. "help" command as told before just displays information
      about shell built-in commands.
`
const welcome_th = `
      หากคุณไม่คุ้นเคยกับระบบปฏิบัติการ LINUX และไม่ทราบว่าต้องจัดการอย่างไรดีกับการป้อนคำสั่งต่างๆ
      คุณจำเป็นต้องเรียนรู้เกี่ยวกับยูทิลิตี้หรือคำสั่งที่ใช้ในระบบปฏิบัติการ LINUX ก่อน ส่วนคำสั่งสำหรับใช้ใน
      ที่นี่คุณสามารถเริ่มต้นด้วยคำสั่ง "help" ซึ่งตามชื่อของมันบอกว่า "help" เพื่อให้คุณได้เรียนรู้เกี่ยวกับ
      คำสั่งทั้งหมด ตามที่บอกไว้ข้างต้น คำสั่ง "help" เพียงแค่แสดงข้อมูลเกี่ยวกับคำสั่งที่มีใช้ในที่นี้เท่านั้น
      ไม่ได้เป็นคำสั่งที่ใช้ในระบบปฏิบัติการ LINUX จริงๆ
`

export default class {
  constructor(parent) {
    this.parent = parent || document.body
    this.call_worker = true

    this.on_completer = {
      processing: false,
      data: {},
      select: -1
    }

    const worker = new Worker('./mjs/worker-terminal.mjs', { type: 'module', name: `worker-terminal-${this.time()}` })
    this.worker = worker

    this.render()

    window.onkeydown = async (e) => {
      let code = e.keyCode ? e.keyCode : e.which
      let key = e.key
      if (disabledKeys.indexOf(code) > -1) e.preventDefault()
      if (this.call_worker) {
        worker.postMessage({ on: 'keydown', code: code, ascii: String.fromCharCode(code), key: key })
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
              this.on_completer.processing = false
              this.call_worker = true
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
              worker.postMessage({ on: 'keydown', code: code, ascii: String.fromCharCode(code), key: key })
              break
            case 38: // Arrow Up
              if (this.on_completer.select > 0) this.on_completer.select--
              else this.on_completer.select = this.on_completer.data.options.length - 1
              this.command_completer_dialog()
              break
            case 39: // Arrow Right
              this.on_completer.select = -1
              this.on_completer.processing = false
              this.call_worker = true
              worker.postMessage({ on: 'keydown', code: code, ascii: String.fromCharCode(code), key: key })
              break
            case 40: // Arrow Down
              if (this.on_completer.select < this.on_completer.data.options.length - 1) this.on_completer.select++
              else this.on_completer.select = 0
              this.command_completer_dialog()
              break
            default:
              this.on_completer.select = -1
              this.on_completer.processing = false
              this.on_completer.data.cursor += 1
              this.on_completer.data.command += key
              worker.postMessage({ on: 'keydown', code: code, ascii: String.fromCharCode(code), key: key })
              await this.waitfor(50)
              worker.postMessage({ on: 'get_completer' })
              break
          }
        }
      }
    }

    window.onkeyup = (e) => {
      if (this.call_worker) {
        let code = e.keyCode ? e.keyCode : e.which
        let key = e.key
        if (disabledKeys.indexOf(code) > -1) e.preventDefault()
        worker.postMessage({ on: 'keyup', code: code, ascii: String.fromCharCode(code), key: key })
      }
    }

    worker.onmessage = async (event) => {
      if (event.data.do !== undefined) {
        switch (event.data.do) {
          case 'command_line_change':
            this.command_change(event.data)
            break
          case 'command_line_interrupt':
            this.command_interrupt(event.data)
            break
          case 'command_line_completer':
            this.command_completer(event.data)
            break
          case 'command_line_completer_done':
            this.on_completer.processing = false
            this.call_worker = true
            break
          default:break
        }
      }
    }
  }

  waitfor = (millisecond) => new Promise(resolve => setTimeout(() => resolve(), millisecond))
  createElement = (n, a = [], p = false, t = false) => {
    const e = document.createElement(n)
    a.forEach((v) => e.setAttribute(v[0], v[1]))
    if (t) {
      const v = document.createElement('span')
      v.innerHTML = t
      e.appendChild(v)
    }
    let parent
    if (p instanceof HTMLElement) parent = p
    else if (typeof p === 'string') {
      if (document.getElementById(p)) parent = document.getElementById(p)
      else parent = document.body
    } else parent = document.body
    parent.appendChild(e)
    return e
  }

  render = async () => {
    const welcome = welcome_logo + (document.documentElement.lang === 'th' ? welcome_th : welcome_en)
    this.terminal = document.createElement('section')
    this.terminal.id = 'Terminal'
    this.parent.appendChild(this.terminal)
    this.createElement('div',  [['id', 'Terminal-Title']], this.terminal, 'DEEP TERMINAL')
    this.createElement('div',  [['id', 'Terminal-console']], this.terminal)
    this.createElement('div',  [['id', 'Terminal-console-foot']], this.terminal, 'Server performance : ')

    this.createElement('pre',  [['id', 'welcome']], this.terminal.childNodes[1], welcome)
    this.createElement('ul',   [['id', 'Terminal-console-log']], this.terminal.childNodes[1])
    this.createElement('div',  [['id', 'Terminal-prompt']], this.terminal.childNodes[1])
    this.createElement('span', [['id', 'Terminal-prompt-sign']], this.terminal.childNodes[1].childNodes[2], '<span class="Terminal-prompt-sign">$></span> ')
    this.createElement('span', [['id', 'Terminal-prompt-interrupt']], this.terminal.childNodes[1].childNodes[2])
    this.createElement('span', [['id', 'Terminal-prompt-cursor']], this.terminal.childNodes[1].childNodes[2], '')
    this.createElement('span', [['id', 'Terminal-foot-status']], this.terminal.childNodes[2].childNodes[0], 'High')
    this.console = this.terminal.childNodes[1]

    if ('virtualKeyboard' in navigator) {
      navigator.virtualKeyboard.overlaysContent = true
      this.terminal.onclick = (e) => navigator.virtualKeyboard.show()
    }
  }

  command_completer = async (data) => {
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
    if (el) this.terminal.childNodes[1].childNodes[2].removeChild(el)
    if (this.on_completer.select > -1) {
      newCursor -= data.command.length
      newCursor += data.options[this.on_completer.select].length
      this.worker.postMessage({
        on: 'set_completer',
        oldCursor: data.cursor,
        oldCommand: data.command,
        cursor: newCursor,
        command: data.options[this.on_completer.select]
      })
    }
  }

  command_completer_dialog = () => {
    const cursor = document.getElementById('Terminal-prompt-cursor')
    let left = cursor.offsetLeft
    let top = cursor.offsetTop
    const dialog = document.getElementById('Terminal-completer') || document.createElement('div')
    dialog.id = 'Terminal-completer'
    dialog.innerHTML = ''
    this.on_completer.data.options.forEach((o, i) => {
      if (i == this.on_completer.select) dialog.innerHTML += `<div class="Terminal-completer-selected">${o}</div>`
      else dialog.innerHTML += `<div>${o}</div>`
    })
    this.terminal.childNodes[1].childNodes[2].appendChild(dialog)
    let height = dialog.offsetHeight
    left = left + 20
    top = top - height - 60
    dialog.left = left
    dialog.top = top
    dialog.style.left = `${left}px`
    dialog.style.top = `${top}px`
  }

  command_change = async (data) => {
    this.terminal.childNodes[1].childNodes[2].innerHTML = ''
    let before, after
    if (data.cursor < 0) { before = [''] }
    else { before = data.command.slice(0, data.cursor + 1) }
    if (data.cursor < 0) {
      if (data.command.length > 0) { after = data.command }
      else { after = [''] }
    } else { after = data.command.slice(data.cursor + 1, data.command.length) }
    // before = this.command_space(before)
    // after = this.command_space(after)
    this.createElement('span', [['class', 'Terminal-prompt-sign']], this.terminal.childNodes[1].childNodes[2], '<span class="Terminal-prompt-sign">$></span> ')
    
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

  command_interrupt = async (data) => {
    const logul = document.getElementById('Terminal-console-log')
    const logli = document.createElement('li')
    const error = await this.command_maping(data.command)
    // data.command = this.command_space(data.command)
    if (error) logli.innerHTML = `<span class="Terminal-prompt-sign">$></span> <span class=error>${data.command.join('')}</span>`
    else logli.innerHTML = `<span class="Terminal-prompt-sign">$></span> <span class=cli>${data.command.join('')}</span>`
    logul.appendChild(logli)
    const bottom = this.console.scrollHeight - this.console.clientHeight === Math.round(this.console.scrollTop)
    if (!bottom) this.console.scrollTop = this.console.scrollHeight - this.console.clientHeight
  }

  command_space_reduce = (cmd) => {
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

  command_maping = async (cmds) => {
    return await this.windows_close(commands).then(() => {
      const [cmd, ...arg] = this.command_space_reduce(cmds)
      let matches = commands.map((command) => ({
        // Fix Bug SyntaxError: Invalid regular expression: "\*()+[\?" : Unterminated character 
        command: command.command.match(cmd.replace(/[\*\(\)\+\[\\\?]/g, '\\$&')),
        execute: command.execute,
        id: command.id
      }))
      let match = matches.find((m) => (m.command !== null && m.command.input === cmd))
      if (match) {
        let sudo = false
        if (cmd == 'sudo') sudo = true
        if (!sudo) {
          const view = new match.execute(sudo, arg)
          view.render(match.id)
          return false
        } else {
          if (arg.length > 0 && arg[0] !== undefined && arg[0] !== null && arg[0] !== '') {
            matches = commands.map((command) => ({
              command: command.command.match(arg[0]),
              execute: command.execute,
              id: command.id
            }))
            match = matches.find((m) => (m.command !== null && m.command.input === arg[0]))
            if (match) {
              arg.shift()
              const view = new match.execute(sudo, arg, this.worker)
              view.render(match.id)
              return false
            } else {
              const cmd = [...cmds]
              for (let i = 0; i < cmds.length; i++) { cmd[i] = cmd[i].replace(' ', '') }
              if (cmd.join('').length > 0) {
                const view = new commands[0].execute()
                view.render(commands[0].id)
              }
            }
          } else {
            const cmd = [...cmds]
            for (let i = 0; i < cmds.length; i++) { cmd[i] = cmd[i].replace(' ', '') }
            if (cmd.join('').length > 0) {
              const view = new commands[0].execute()
              view.render(commands[0].id)
            }
          }
        }
        return true
      } else {
        const cmd = [...cmds]
        for (let i = 0; i < cmds.length; i++) { cmd[i] = cmd[i].replace(' ', '') }
        if (cmd.join('').length > 0) {
          const view = new commands[0].execute()
          view.render(commands[0].id)
        }
        return true
      }
    })
  }

  windows_close = async (commands) => {
    await commands.forEach(async command => {
      const section = document.getElementById(command.id)
      if (section) {
        const id = section.id
        section.id = `${id}-removing`
        section.className = 'Windows Windows-Slide-TD'
        await this.waitfor(1000)
        section.parentNode.removeChild(section)
      }
    })
  }

  digit2 = (d) => (d < 10 ? '0' + d : d)

  time = () => {
    const d = new Date()
    return `${this.digit2(d.getHours())}:${this.digit2(d.getMinutes())}:${this.digit2(d.getSeconds())}`
  }
}

