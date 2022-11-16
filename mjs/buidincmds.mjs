'use strict'


import Helper     from './help.mjs'
import Blog       from './blog.mjs'
import Setting    from './setting.mjs'


export const Commands = [
  { command: 'help'         , execute: Helper     , id: 'Helper' },
  
  { command: 'bl'           , execute: Blog       , id: 'Blog' },
  { command: 'blog'         , execute: Blog       , id: 'Blog' },
  
  { command: 'conf'         , execute: Setting    , id: null },
  { command: 'sudo'         , execute: null       , id: null },
]


export function CmdsIndex() {
  const index = {}
  for (let i = 0; i < Commands.length; i++) {
    let letter = ''
    const cmd = Commands[i].command
    if (!index.hasOwnProperty(cmd)) index[cmd] = { [cmd]: {} }
    for (let n = 0; n < cmd.length; n++) {
      letter += cmd[n]
      if (!index.hasOwnProperty(letter)) index[letter] = { [cmd]: {} }
      else if (!index[letter].hasOwnProperty(cmd)) index[letter][cmd] = {}
    }
  }
  return index
}