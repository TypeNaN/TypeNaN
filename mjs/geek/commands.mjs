'use strict'


import Setting    from '../setting.mjs'

import Clear      from './bin/clear.mjs'
import Top        from './bin/top.mjs'
import Ls         from './bin/ls.mjs'
import MKDir      from './bin/mkdir.mjs'
import Manual     from './bin/manual.mjs'
import Resume     from './bin/resume.mjs'
import Blog       from './bin/blog.mjs'

import Wblog      from './blog.mjs'
import Wresume    from './resume.mjs'



export const Commands = [
  { command: 'sudo'       , description: '' },
  { command: 'setting'    , execute: Setting    , description: Setting._help.description.th   , parameters: Setting.parameters  },

  { command: 'man'        , execute: Manual     , description: Manual._help.description.th    , parameters: Manual.parameters   },
  { command: 'clear'      , execute: Clear      , description: Clear._help.description.th     , parameters: Clear.parameters    },
  { command: 'top'        , execute: Top        , description: Top._help.description.th       , parameters: Top.parameters      },
  { command: 'ls'         , execute: Ls         , description: Ls._help.description.th        , parameters: Ls.parameters       },
  { command: 'mkdir'      , execute: MKDir      , description: MKDir._help.description.th     , parameters: MKDir.parameters    },

  { command: 're'         , execute: Resume     , description: Resume._help.description.th    , parameters: Resume.parameters   },
  { command: 'resume'     , execute: Wresume    , description: Resume._help.description.th    , parameters: []  , id: 'Window-Resume' },

  { command: 'bl'         , execute: Blog       , description: Blog._help.description.th      , parameters: Blog.parameters },
  { command: 'blog'       , execute: Wblog      , description: Blog._help.description.th      , parameters: []  , id: 'Window-Blog' },
]


export function CmdsIndex() {
  const index = {}
  for (let i = 0; i < Commands.length; i++) {
    let letter = ''
    const cmd = Commands[i].command
    if (!index.hasOwnProperty(cmd)) index[cmd] = { [cmd]: Commands[i].description }
    for (let n = 0; n < cmd.length; n++) {
      letter += cmd[n]
      if (!index.hasOwnProperty(letter)) index[letter] = { [cmd]: Commands[i].description }
      else if (!index[letter].hasOwnProperty(cmd)) index[letter][cmd] = Commands[i].description
    }
  }
  return index
}

export function ParamsIndex(command) {
  const index = {}
  let letter = ''
  for (let c = 0; c < Commands.length; c++) {
    const cmd = Commands[c].command
    if (cmd !== command) continue
    if (!Commands[c].parameters) continue
    const parameters = Commands[c].parameters
    for (let p = 0; p < parameters.length; p++) {
      const param1 = parameters[p][0]
      const param2 = parameters[p][1]
      const param3 = parameters[p][2]
      letter = ''
      for (let p1 = 0; p1 < param1.length; p1++) {
        letter += param1[p1]
        if (!index.hasOwnProperty(letter)) index[letter] = { [param1]: param3[0][1] }
        else if (!index[letter].hasOwnProperty(param1)) index[letter][param1] = param3[0][1]
      }
      letter = ''
      for (let p2 = 0; p2 < param2.length; p2++) {
        letter += param2[p2]
        if (!index.hasOwnProperty(letter)) index[letter] = { [param2]: param3[0][1] }
        else if (!index[letter].hasOwnProperty(param2)) index[letter][param2] = param3[0][1]
      }
      for (let p3 = 0; p3 < param3.length; p3++) {
        letter = ''
        let param4 = param3[p3][0]
        for (let p4 = 0; p4 < param4.length; p4++) {
          letter += param4[p4]
          if (!index.hasOwnProperty(letter)) index[letter] = { [param3[p3][0]]: param3[p3][1] }
          else if (!index[letter].hasOwnProperty(param3)) index[letter][param3[p3][0]] = param3[p3][1]
        }
      }
    }
  }
  return index
}

export function PathIndex(cwd, fs, path) {
  const index = {}
  //const fullpath = resolvePath(cwd, path)
  if (path.startsWith('./')) path = path.replace('./', '')
  for (const key in fs) {
    let letter = ''
    let ki = path.startsWith('.') ? key.replace(`${cwd}/`, '') : key
    //const { root, first, remaining, last } = parsePath(ki)
    //ki = `${root}${last}`
    const char = ki.split('')
    for (let i = 0; i < char.length; i++) {
      const l = char[i]
      letter += l
      if (!index.hasOwnProperty(letter)) index[letter] = { [ki]: ''}
      else if (!index[letter].hasOwnProperty(ki)) index[letter][ki] = ''
    }
  }
  return [ index, path ]
}

const resolvePath = (cwd, path) => {
  if (path === '' || path === '.') return cwd
  let segments = (path.startsWith('/') ? path : `${cwd}/${path}`).split('/').filter(Boolean)
  const resolved = []
  for (const segment of segments) {
    if (segment === '..') resolved.pop()
    else if (segment !== '.') resolved.push(segment)
  }
  return '/' + resolved.join('/')
}

function parsePath(path) {
  let root = ''
  let first = ''
  let remaining = ''
  let last = ''

  if (path.startsWith('/')) {
    root = '/';
    path = path.slice(1);
  } else if (path.startsWith('~')) {
    root = '~'
    path = path.slice(1)
    if (path.startsWith('/')) path = path.slice(1)
  } else if (path.startsWith('./')) {
    root = '.'
    path = path.slice(2)
  } else if (path.startsWith('.')) {
    if (path === '.') {
      root = '.'
      path = ''
    } else if (path.startsWith('..')) {
      root = '..'
      path = path.slice(2)
      if (path.startsWith('/')) path = path.slice(1)
    } else {
      first = path
      last = path
      path = ''
    }
  }

  if (!first && path) {
    const parts = path.split('/')
    first = parts[0]
    remaining = parts.slice(1).join('/')
    last = parts[parts.length - 1]
  } else if (!last && first) {
    last = first
  }

  return { root, first, remaining, last }
}
