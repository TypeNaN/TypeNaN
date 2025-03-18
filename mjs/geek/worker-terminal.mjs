//'use strict'
//
//
//import { CmdsIndex, ParamsIndex, PathIndex } from './commands.mjs'
//
//const cmdi = CmdsIndex()
//const pathFS = {}
//let CWD = ''
//
//const command_line = []
//const command_line_tmp = []
//const history = []
//
//let command_cursor = -1
//let history_index = -1
//const keypress = {}
//
//
//class Terminal {
//  constructor() {
//    if (!Terminal.instance) {
//      Terminal.instance = this
//    }
//    return Terminal.instance
//  }
//
//  enterinterrupt = () => {
//    postMessage({ do: 'command_line_interrupt', command: command_line, cursor: command_cursor })
//
//    if (history[history.length - 1]) {
//      if (command_line.toString() !== history[history.length - 1].toString()) {
//        if (history.length > 100) history.shift()
//        history.push([...command_line])
//        history_index = history.length
//      }
//    } else {
//      history.push([...command_line])
//      history_index = history.length
//    }
//    this.clearinterrupt()
//  }
//
//  clearinterrupt = () => {
//    command_line_tmp.length = 0
//    command_line.length = 0
//    command_cursor = -1
//    postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//  }
//
//  completer = (command_line) => {
//    let n = 0
//    let cmd = command_line.join('')
//    let params = cmd.split(' ')
//    for (let i = 0; i < cmd.length; i++) {
//      if (cmd[i] == ' ') n++
//      if (i >= command_cursor) break
//    }
//    if (params.length === 1) {
//      cmd = cmd.split(' ')[n]
//      if (!cmdi.hasOwnProperty(cmd)) return postMessage({ do: 'command_line_completer_done' })
//      const group = Object.keys(cmdi[cmd])
//      if (group.length < 1) return postMessage({ do: 'command_line_completer_done' })
//      const details = Object.values(cmdi[cmd])
//      postMessage({ do: 'command_line_completer', command: cmd, options: group, details: details, cursor: command_cursor })
//    } else {
//      if (params.length > 1 && params[0] === 'sudo') {
//        if (params.length > 2) {
//          cmd = params[1]
//          let param = params[params.length - 1]
//          let prmi
//          if (param.startsWith('/') || param.startsWith('.')) {
//            [ prmi, param ] = PathIndex(CWD, pathFS, param)
//          } else {
//            prmi = ParamsIndex(cmd)
//          }
//          //console.log(prmi, param, prmi.hasOwnProperty(param))
//          if (!prmi.hasOwnProperty(param)) return postMessage({ do: 'command_line_completer_done' })
//          const group = Object.keys(prmi[param])
//          if (group.length < 1) return postMessage({ do: 'command_line_completer_done' })
//          const details = Object.values(prmi[param])
//          postMessage({ do: 'command_line_completer', command: param, options: group, details: details, cursor: command_cursor })
//        } else {
//          cmd = params[1]
//          if (!cmdi.hasOwnProperty(cmd)) return postMessage({ do: 'command_line_completer_done' })
//          const group = Object.keys(cmdi[cmd])
//          if (group.length < 1) return postMessage({ do: 'command_line_completer_done' })
//          const details = Object.values(cmdi[cmd])
//          postMessage({ do: 'command_line_completer', command: cmd, options: group, details: details, cursor: command_cursor })
//        }
//      } else if (params.length > 1) {
//        cmd = params[0]
//        let param = params[params.length - 1]
//        let prmi
//        if (param.startsWith('/') || param.startsWith('.')) {
//          [ prmi, param ] = PathIndex(CWD, pathFS, param)
//          if (param.startsWith('./')) param = param.replace('./', '')
//        } else {
//          prmi = ParamsIndex(cmd)
//        }
//        //console.log(prmi, param, prmi.hasOwnProperty(param))
//        if (!prmi.hasOwnProperty(param)) return postMessage({ do: 'command_line_completer_done' })
//        const group = Object.keys(prmi[param])
//        if (group.length < 1) return postMessage({ do: 'command_line_completer_done' })
//        const details = Object.values(prmi[param])
//        //console.log(param, group, command_cursor)
//        postMessage({ do: 'command_line_completer', command: param, options: group, details: details, cursor: command_cursor })
//      }
//    }
//  }
//
//  set_completer = (data) => {
//    if (data.oldCursor < data.cursor) {
//      for (let i = data.oldCommand.length; i > 0; i--) {
//        if (command_cursor > -1) {
//          command_line.splice(command_cursor, 1)
//          command_cursor--
//        }
//      }
//      for (let i = 0; i < data.command.length; i++) {
//        command_cursor++
//        command_line.splice(command_cursor, 0, data.command[i])
//      }
//      postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//    }
//  }
//
//  keyup = (e) => { keypress[e.code] = { ascii: e.ascii, key: e.key, press: false } }
//
//  keydown = (e) => {
//    keypress[e.code] = { ascii: e.ascii, key: e.key, press: true }
//    let code = e.code
//    let key = e.key
//
//    if (keypress[17] && keypress[67]) {
//      if (keypress[17].press && keypress[67].press) {
//        command_line.length = 0
//        command_line_tmp. length = 0
//        command_cursor = -1
//        postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//        return
//      }
//    }
//    switch (code) {
//      case 9: // Tab
//        if (command_cursor > -1) this.completer(command_line)
//        break
//
//      // [Shift, Control, Alt]
//      case 16: case 17: case 18: break
//
//      // [Pause, CapsLock, Escape]
//      case 19: case 20: case 27: break
//
//      // [PageUp, PageDown, Insert]
//      case 33: case 34: case 45: break
//
//      // [ContextMenu, NumLock, ScrollLock]
//      case 93: case 144: case 145: break
//
//      // [F1-F12]
//      case 112: case 113: case 114: case 115: case 116: case 117: break
//      case 118: case 119: case 120: case 121: case 122: case 123: break
//
//      case 8: // Back space
//        if (command_cursor > -1) {
//          command_line.splice(command_cursor, 1)
//          command_cursor--
//          postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//        }
//        break
//      case 13: // Enter
//        // if (command_line.length > 0) this.enterinterrupt()
//        this.enterinterrupt()
//        break
//      case 35: // End
//        if (command_cursor < command_line.length - 1) command_cursor = command_line.length - 1
//        postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//        break
//      case 36: // home
//        if (command_cursor > -1) command_cursor = -1
//        postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//        break
//      case 37: // Arrow Left
//        if (command_line.length > 0) if (command_cursor > -1) command_cursor--
//        postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//        break
//      case 39: // Arrow Right
//        if (command_line.length > 0) if (command_cursor < command_line.length - 1) command_cursor++
//        postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//        break
//      case 38: // Arrow Up
//        if (history_index == history.length) {
//          command_line_tmp.length = 0
//          command_line_tmp.push(...command_line)
//        }
//        if (history_index > 0) {
//          if (history_index > history.length) history_index = history.length
//          history_index--
//          command_line.length = 0
//          command_line.push(...history[history_index])
//          command_cursor = history[history_index].length
//          postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//        }
//        break
//      case 40: // Arrow Down
//        if (history_index < history.length) {
//          history_index++
//          if (history_index <= history.length - 1) {
//            command_line.length = 0
//            command_line.push(...history[history_index])
//            command_cursor = history[history_index].length
//            postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//          } else {
//            command_line.length = 0
//            command_line.push(...command_line_tmp)
//            command_cursor = command_line.length
//            postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//          }
//        } else {
//          command_line.length = 0
//          command_line.push(...command_line_tmp)
//          command_cursor = command_line.length
//          postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//        }
//        break
//      case 46: // Delete
//        if (command_line.length > 0) if (command_cursor < command_line.length) command_line.splice(command_cursor + 1, 1)
//        postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//        break
//      default:
//        command_cursor++
//        command_line.splice(command_cursor, 0, key)
//        postMessage({ do: 'command_line_change', command: command_line, cursor: command_cursor })
//        break
//    }
//  }
//}
//
//
//const terminal = new Terminal()
//
//
//onerror = async (event) => console.error(event)
//
//onmessage = async (event) => {
//  switch (event.data.on) {
//    case 'keydown':
//      terminal.keydown({
//        code  : event.data.code,
//        ascii : event.data.ascii,
//        key   : event.data.key
//      })
//      //terminal.completer(command_line)
//      break
//    case 'keyup':
//      terminal.keyup({
//        code  : event.data.code,
//        ascii : event.data.ascii,
//        key   : event.data.key
//      })
//      break
//    case 'get_completer':
//      if (command_cursor > -1) terminal.completer(command_line)
//      break
//    case 'set_completer':
//      terminal.set_completer({
//        oldCursor : event.data.oldCursor,
//        oldCommand: event.data.oldCommand,
//        cursor    : event.data.cursor,
//        command   : event.data.command,
//      })
//      break
//    case 'add_path_completer':
//      //Object.assign(cmdi, PathIndex(event.data.path))
//      Object.assign(pathFS, event.data.path)
//      CWD = event.data.cwd
//      break
//    case 'load_command_history':
//      history.push(...event.data.history)
//      history_index = history.length
//      break
//    default: break
//  }
//}






// const keyschart = {
//   8: { ascii: "\b", key: "Backspace", press: false },
//   9: { ascii: "\t", key: "Tab", press: true },
//   13: { ascii: "\r", key: "Enter", press: false },
//   16: { ascii: "\u0010", key: "Shift", press: false },
//   17: { ascii: "\u0011", key: "Control", press: false },
//   18: { ascii: "\u0012", key: "Alt", press: false },
//   19: { ascii: "\u0013", key: "Pause", press: false },
//   20: { ascii: "\u0014", key: "CapsLock", press: false },
//   27: { ascii: "\u001b", key: "Escape", press: false },
//   32: { ascii: " ", key: " ", press: false },
//   33: { ascii: "!", key: "PageUp", press: false },
//   34: { ascii: "\"", key: "PageDown", press: false },
//   35: { ascii: "#", key: "End", press: false },
//   36: { ascii: "$", key: "Home", press: false },
//   37: { ascii: "%", key: "ArrowLeft", press: false },
//   38: { ascii: "&", key: "ArrowUp", press: false },
//   39: { ascii: "'", key: "ArrowRight", press: false },
//   40: { ascii: "(", key: "ArrowDown", press: false },
//   45: { ascii: "-", key: "Insert", press: false },
//   46: { ascii: ".", key: "Delete", press: false },
//   48: { ascii: "0", key: "0", press: false },
//   49: { ascii: "1", key: "1", press: false },
//   50: { ascii: "2", key: "2", press: false },
//   51: { ascii: "3", key: "3", press: false },
//   52: { ascii: "4", key: "4", press: false },
//   53: { ascii: "5", key: "5", press: false },
//   54: { ascii: "6", key: "6", press: false },
//   55: { ascii: "7", key: "7", press: false },
//   56: { ascii: "8", key: "8", press: false },
//   57: { ascii: "9", key: "9", press: false },
//   65: { ascii: "A", key: "a", press: false },
//   66: { ascii: "B", key: "b", press: false },
//   67: { ascii: "C", key: "c", press: false },
//   68: { ascii: "D", key: "d", press: false },
//   69: { ascii: "E", key: "e", press: false },
//   70: { ascii: "F", key: "f", press: false },
//   71: { ascii: "G", key: "g", press: false },
//   72: { ascii: "H", key: "h", press: false },
//   73: { ascii: "I", key: "i", press: false },
//   74: { ascii: "J", key: "j", press: false },
//   75: { ascii: "K", key: "k", press: false },
//   76: { ascii: "L", key: "l", press: false },
//   77: { ascii: "M", key: "m", press: false },
//   78: { ascii: "N", key: "n", press: false },
//   79: { ascii: "O", key: "o", press: false },
//   80: { ascii: "P", key: "p", press: false },
//   81: { ascii: "Q", key: "q", press: false },
//   82: { ascii: "R", key: "r", press: false },
//   83: { ascii: "S", key: "s", press: false },
//   84: { ascii: "T", key: "t", press: false },
//   85: { ascii: "U", key: "u", press: false },
//   86: { ascii: "V", key: "v", press: false },
//   87: { ascii: "W", key: "w", press: false },
//   88: { ascii: "X", key: "x", press: false },
//   89: { ascii: "Y", key: "y", press: false },
//   90: { ascii: "Z", key: "z", press: false },
//   93: { ascii: "]", key: "ContextMenu", press: false },
//   96: { ascii: "`", key: "0", press: false },
//   97: { ascii: "a", key: "1", press: false },
//   98: { ascii: "b", key: "2", press: false },
//   99: { ascii: "c", key: "3", press: false },
//   100: { ascii: "d", key: "4", press: false },
//   101: { ascii: "e", key: "5", press: false },
//   102: { ascii: "f", key: "6", press: false },
//   103: { ascii: "g", key: "7", press: false },
//   104: { ascii: "h", key: "8", press: false },
//   105: { ascii: "i", key: "9", press: false },
//   106: { ascii: "j", key: "*", press: false },
//   107: { ascii: "k", key: "+", press: false },
//   109: { ascii: "m", key: "-", press: false },
//   110: { ascii: "n", key: ".", press: false },
//   111: { ascii: "o", key: "/", press: false },
//   112: { ascii: "p", key: "F1", press: false },
//   113: { ascii: "q", key: "F2", press: false },
//   114: { ascii: "r", key: "F3", press: false },
//   115: { ascii: "s", key: "F4", press: false },
//   116: { ascii: "t", key: "F5", press: false },
//   117: { ascii: "u", key: "F6", press: false },
//   118: { ascii: "v", key: "F7", press: false },
//   119: { ascii: "w", key: "F8", press: false },
//   120: { ascii: "x", key: "F9", press: false },
//   121: { ascii: "y", key: "F10", press: false },
//   122: { ascii: "z", key: "F11", press: false },
//   123: { ascii: "{", key: "F12", press: false },
//   144: { ascii: "", key: "NumLock", press: false },
//   145: { ascii: "", key: "ScrollLock", press: false },
//   187: { ascii: "»", key: "=", press: false },
//   189: { ascii: "½", key: "-", press: false },
//   186: { ascii: "º", key: ";", press: false },
//   188: { ascii: "¼", key: ",", press: false },
//   190: { ascii: "¾", key: ".", press: false },
//   191: { ascii: "¿", key: "/", press: false },
//   192: { ascii: "À", key: "`", press: false },
//   219: { ascii: "Û", key: "[", press: false },
//   220: { ascii: "Ü", key: "\\", press: false },
//   221: { ascii: "Ý", key: "]", press: false },
//   222: { ascii: "Þ", key: "'", press: false },
// }
