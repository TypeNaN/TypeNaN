'use strict'

class FakeFSTree {
  constructor() {
    if (!FakeFSTree.instance) {
      this.initial = {
        '/': {
          type: 'dir',
          owner: 'root:root',
          permission: 0o644,
          children: [
            {
              'bin': {
                type: 'dir',
                owner: 'root:root',
                permission: 0o644,
                children: [
                  { 'clear':  { type: 'file', owner: 'root:root', permission: 0o777, size: 4085  } },
                  { 'top':    { type: 'file', owner: 'root:root', permission: 0o777, size: 10629 } },
                  { 'ls':     { type: 'file', owner: 'root:root', permission: 0o777, size: 5519  } },
                  { 'man':    { type: 'file', owner: 'root:root', permission: 0o777, size: 11622 } },
                  { 'resume': { type: 'file', owner: 'root:root', permission: 0o777, size: 5376  } },
                ]
              }
            },
            { 'etc': { type: 'dir', owner: 'root:root', permission: 0o644, children: [] } },
            { 'var': { type: 'dir', owner: 'root:root', permission: 0o644, children: [] } },
            { 'tmp': { type: 'dir', owner: 'root:root', permission: 0o644, children: [] } },
            {
              'home': {
                type: 'dir',
                owner: 'root:root',
                permission: 0o644,
                children: [
                  {
                    'deep': {
                      type: 'dir',
                      owner: 'deep:deep',
                      permission: 0o644,
                      children: [
                        { 'documents':      { type: 'dir', owner: 'deep:deep', permission: 0o600, children: [] } },
                        { '.geekrc':        { type: 'file', owner: 'deep:deep', permission: 0o600, size: 0  } },
                        { '.geek_history':  { type: 'file', owner: 'deep:deep', permission: 0o600, size: 0 } },
                      ]
                    }
                  },
                ]
              }
            },
          ]
        }
      }
      FakeFSTree.instance = this
    }
    return FakeFSTree.instance
  }

  saveCWD(path) { sessionStorage.setItem('fakefs_cwd', path) }
  loadCWD() { return sessionStorage.getItem('fakefs_cwd') || '/home/deep' }
  saveFS(fs) { localStorage.setItem('fakefs', JSON.stringify(fs)) }
  loadFS() {
    const storedFS = localStorage.getItem('fakefs')
    return storedFS ? JSON.parse(storedFS) : this.initial
  }

}

class FakeFS {
  constructor() {
    if (!FakeFS.instance) {
      this.defaultStoredFS = {
        '/': { type: 'dir', owner: 'root:root', permission: 0o644, children: [ '.', 'bin', 'home', 'etc', 'var', 'tmp' ] },

        '/bin': { type: 'dir', owner: 'root:root', permission: 0o644, children: [ '.', '..', 'clear', 'top', 'ls', 'man', 'resume' ] },
        '/bin/clear':   { type: 'file', owner: 'root:root', permission: 0o777, size: 4085},
        '/bin/top':     { type: 'file', owner: 'root:root', permission: 0o777, size: 10629},
        '/bin/ls':      { type: 'file', owner: 'root:root', permission: 0o777, size: 5519 },
        '/bin/man':     { type: 'file', owner: 'root:root', permission: 0o777, size: 11622 },
        '/bin/resume':  { type: 'file', owner: 'root:root', permission: 0o777, size: 5376 },

        '/etc': { type: 'dir', owner: 'root:root', permission: 0o644, children: [ '.', '..'] },
        '/var': { type: 'dir', owner: 'root:root', permission: 0o644, children: [ '.', '..'] },
        '/tmp': { type: 'dir', owner: 'root:root', permission: 0o644, children: [ '.', '..'] },

        '/home': { type: 'dir', owner: 'root:root', permission: 0o644, children: [ '.', '..', 'deep' ] },
        '/home/deep': { type: 'dir', owner: 'deep:deep', permission: 0o644, children: [ '.', '..', '.geekrc', '.geek_history' ] },
        '/home/deep/.geekrc': { type: 'file', owner: 'deep:deep', permission: 0o644, size: 0 },
        '/home/deep/.geek_history': { type: 'file', owner: 'deep:deep', permission: 0o644, size: 0 },
      }
      FakeFS.instance = this
    }
    return FakeFS.instance
  }

  saveCWD(path) { sessionStorage.setItem('fakefs_cwd', path) }
  loadCWD() { return sessionStorage.getItem('fakefs_cwd') || '/home/deep' }
  saveFS(fs) { localStorage.setItem('fakefs', JSON.stringify(fs)) }
  loadFS() {
    const storedFS = localStorage.getItem('fakefs')
    return storedFS ? JSON.parse(storedFS) : this.defaultStoredFS
  }

  checkPermission(currentUser, file, action) {
    const [ user, group ] = (file.owner || '').split(':')
    if (currentUser === user || currentUser === 'root') {
      if (action === 'read' && (file.permission & 0o400)) return true
      if (action === 'write' && (file.permission & 0o200)) return true
      if (action === 'execute' && (file.permission & 0o100)) return true
    }
    return false
  }

  chown(user, newuser, name) {
    const fs = this.loadFS()
    const cwd = this.loadCWD()
    if (!this.checkPermission(user, fs[`${cwd}/${name}`], 'write')) throw new Error('chown: Permission denied')
    fs[`${cwd}/${name}`][owner] = newuser
    this.saveFS(fs)
  }

  chmod(user, mod, name) {
    const fs = this.loadFS()
    const cwd = this.loadCWD()
    if (!this.checkPermission(user, fs[`${cwd}/${name}`], 'write')) throw new Error('chown: Permission denied')
    fs[`${cwd}/${name}`][permissions] = mod
    this.saveFS(fs)
  }

  resolvePath(path) {
    if (path === '' || path === '.') return this.loadCWD()
    let segments = (path.startsWith('/') ? path : `${this.loadCWD()}/${path}`).split('/').filter(Boolean)
    const resolved = []
    for (const segment of segments) {
      if (segment === '..') resolved.pop()
      else if (segment !== '.') resolved.push(segment)
    }
    return '/' + resolved.join('/')
  }

  humanReadableSize(size) {
    if (size < 1024) return `${size} B`
    if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`
    return `${(size / 1048576).toFixed(1)} MB`
  }

  humanReadablePermission(permission, isDirectory = false) {
    if (!permission) return ''
    let humanReadable = isDirectory ? 'd' : '-'
    const perms = [0o400, 0o200, 0o100, 0o040, 0o020, 0o010, 0o004, 0o002, 0o001]
    const symbols = ['r', 'w', 'x']
    perms.forEach((perm, index) => {
      humanReadable += (permission & perm) ? symbols[index % 3] : '-'
    })
    return humanReadable
  }

  list(user, path = '.') {
    const fs = this.loadFS()
    const fullPath = this.resolvePath(path)
    if (!this.checkPermission(user, fs[fullPath], 'read')) throw new Error('ls: Permission denied')
    if (!fs[fullPath]) {
      throw new Error(`ls: cannot access '${path}': No such file or directory`)
    }

    if (typeof fs[fullPath]?.children === 'undefined') {
      //let filePath = fullPath.split('/')
      //let name = filePath.slice(-1)[0]
      let file = fs[fullPath]
      return [{
        name: path,
        permission: this.humanReadablePermission(file?.permission),
        owner: file?.owner || '-',
        size: file?.size || 0,
        humanSize: file?.size ? this.humanReadableSize(file.size) : file?.type === 'dir' ? '' : '0 B',
        isDirectory: file?.type === 'dir',
        isHidden: path.startsWith('.'),
        isExecute: (file?.permission & 0o100)
      }]
    }


    return fs[fullPath].children.map(name => {
      const filePath = fullPath !== '/' ? `${fullPath}/${name}` : '/'
      let file = fs[filePath]
      if (name === '.' || name === '..') file = { type: 'dir' }
      return {
        name,
        permission: this.humanReadablePermission(file?.permission),
        owner: file?.owner || '-',
        size: file?.size || 0,
        humanSize: file?.size ? this.humanReadableSize(file.size) : file?.type === 'dir' ? '' : '0 B',
        isDirectory: file?.type === 'dir',
        isHidden: name.startsWith('.'),
        isExecute: (file?.permission & 0o100)
      }
    }).sort((a, b) => {
    // 1. จัดเรียงโฟลเดอร์ก่อนไฟล์
    if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1
    // 2. จัดเรียง hidden ก่อนปกติ
    if (a.isHidden !== b.isHidden) return a.isHidden ? -1 : 1
    // 3. จัดเรียงตามชื่อ
    return a.name.localeCompare(b.name)
  })
  }

  mkdir(user, name) {
    const fs = this.loadFS()
    const cwd = this.loadCWD()
    if (!this.checkPermission(user, fs[cwd], 'write')) throw new Error('mkdir: Permission denied')
    if (fs[`${cwd}/${name}`]) throw new Error(`mkdir: cannot create directory '${name}': File exists`)
    fs[cwd]['children'].push(name)
    fs[`${cwd}/${name}`] = { type: 'dir', owner: `${user}:${user}`, permission: 0o644, children: [ '.', '..'] }
    this.saveFS(fs)
    return
  }

  touch(name) {
    // ตรวจสอบสิทธิ์และความเป็นเจ้าของหรืออยู่ในกลุ่มที่อนุญาต
    const fs = this.loadFS()
    const cwd = this.loadCWD()
    if (!this.checkPermission(user, fs[cwd], 'write')) throw new Error('touch: Permission denied')
    if (fs[`${cwd}/${name}`]) throw new Error(`touch: cannot create file '${name}': File exists`)
    fs[cwd]['children'].push(name)
    fs[`${cwd}/${name}`] = { type: 'file', size: 0 }
    this.saveFS(fs)
  }

  rm(name) {
    // ตรวจสอบสิทธิ์และความเป็นเจ้าของหรืออยู่ในกลุ่มที่อนุญาต
    const fs = this.loadFS()
    const cwd = this.loadCWD()
    if (!this.checkPermission(user, fs[cwd], 'write')) throw new Error('rm: Permission denied')
    const index = fs[cwd]['children'].indexOf(name)
    if (index === -1) throw new Error(`rm: cannot remove '${name}': No such file or directory`)
    fs[cwd]['children'].splice(index, 1)
    delete fs[`${cwd}/${name}`]
    this.saveFS(fs)
  }

}

export default new FakeFS()

