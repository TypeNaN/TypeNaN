import {} from '../3rd/three.min.js'

class TheMatrix {
  constructor(parent) {
    if (!TheMatrix.instance) {
      if (typeof THREE === 'undefined') {
        console.error('Three.js failed to load')
        return
      }

      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.z = 0
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.domElement.id = 'TheMatrix'
      parent = parent || document.body
      parent.appendChild(this.renderer.domElement)

      this.Column = new Column()
      this.Column.Create(this.scene, this.camera)

      TheMatrix.instance = this

      //this.LastTime = performance.now()
      //this.CPUIdleTime = 0
      //this.CPULastIdleTime = 0
      //
      //this.mperfrom = document.createElement('div')
      //this.mperfrom.style.position = 'absolute'
      //this.mperfrom.style.opacity = '0.3'
      //this.mperfrom.style.right = '10px'
      //this.mperfrom.style.top = '10px'
      //this.mperfrom.id = '3d-perfrom'
      //document.body.appendChild(this.mperfrom)
      //
      //this.mperfrom.innerHTML += `<div id="3d-fps"></div><div id="3d-ram"></div><div id="3d-cpu"></div>`
      //
      //this.mfps = document.getElementById('3d-fps')
      //this.mram = document.getElementById('3d-ram')
      //this.mcpu = document.getElementById('3d-cpu')

      this.renderer.render(this.scene, this.camera)
      this.Animate()
      window.onresize = this.onWindowResize
    }
    return TheMatrix.instance
  }

  onWindowResize() {
    TheMatrix.instance.camera.aspect = window.innerWidth / window.innerHeight
    TheMatrix.instance.camera.updateProjectionMatrix()
    TheMatrix.instance.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  Animate() {
    const m = TheMatrix.instance
    requestAnimationFrame(m.Animate)
    m.Column.Update(m.scene, m.camera)
    m.renderer.render(m.scene, m.camera)

    //m.Time = performance.now()
    //m.DeltaTime = m.Time - m.LastTime
    //m.LastTime = m.Time
    //
    //m.FPS = Math.floor(1000 / m.DeltaTime)
    //
    //m.CPUUsage = m.DeltaTime - (m.CPUIdleTime - m.CPULastIdleTime)
    //m.CPUIdleTime = m.CPUIdleTime + (m.DeltaTime - m.CPUUsage)
    //m.CPULastIdleTime = m.CPUIdleTime
    //
    //m.mfps.innerText = `FPS: ${m.FPS}`
    //m.mram.innerText = `RAM: ${(performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`
    //m.mcpu.innerText = `CPU: ${m.CPUUsage.toFixed(2)} %`
  }
}

class Column {
  constructor() {
    if (!Column.instance) {
      this.maxColumns = Math.floor(window.innerWidth / 16)
      this.columns = []
      this.space = 0.1
      this.fallSpeed = 0.05
      this.farSpeed = 1
      this.near = 5
      this.far = 100
      this.maxLetter = 26
      this.blinkSpeed = 0.005
      this.Letter = new Letter()
      Column.instance = this
    }
    return Column.instance
  }

  Create(scene, camera) {
    for (let i = -(this.maxColumns); i < this.maxColumns ; i++) {
      const x = i * this.space
      const y = Math.random() * 5
      const z = camera.position.z - ((this.near * 10) + (Math.random() * this.far))
      const column = this.CreateInitColumn(scene, x, y, z)
      this.columns.push(column)
    }
  }

  CreateInitColumn(scene, x, y, z) {
    const column = {
      letters: [],
      x: x,
      y: y,
      z: z,
      fallSpeed: Math.random() * this.fallSpeed,
      farSpeed: Math.random() * this.farSpeed,
      count: Math.floor(Math.random() * this.maxLetter)
    }
    for (let i = 0; i < column.count; i++) {
      const letter = this.Letter.Create(x, y + (i * 0.5), z)
      scene.add(letter)
      column.letters.push(letter)
    }
    return column
  }

  ResponseColumn(scene, camera, column) {
    column.letters = this.ClearLetter(scene, column.letters)
    column.x = (-(window.innerWidth / 16) + (Math.random() * ((window.innerWidth / 16) * 2))) * this.space
    column.y = Math.random() * 5
    column.z = camera.position.z - ((this.near * 10) + (Math.random() * this.far))
    column.farSpeed = Math.random() * this.farSpeed
    column.fallSpeed = Math.random() * this.fallSpeed
    column.count = Math.floor(Math.random() * this.maxLetter)

    for (let i = 0; i < column.count; i++) {
      const letter = this.Letter.Create(column.x, column.y + (i * 0.5), column.z)
      scene.add(letter)
      column.letters.push(letter)
    }
  }

  ClearLetter(scene, letters) {
    letters.forEach(letter => {
      letter.material.map.dispose()
      letter.material.dispose()
      scene.remove(letter)
    })
    letters = []
    return letters
  }

  Update(scene, camera) {
    this.columns.forEach((column, index) => {
      if (column.z > camera.position.z) {
        this.ResponseColumn(scene, camera, column)
      } else {
        if (column.z > camera.position.z - (this.near * 10)) {
          column.farSpeed *= 0.98
          if (column.farSpeed < column.fallSpeed / 2) {
            column.z += column.fallSpeed / 2
          } else {
            column.z += column.farSpeed
          }
        } else {
          column.z += column.farSpeed
        }
      }

      const tall = column.letters.length * 0.5
      column.letters.forEach(letter => {
        letter.position.y -= column.fallSpeed
        letter.position.z = column.z
        if (Math.random() < this.blinkSpeed) this.Letter.ChangeLetter(letter)
        if (letter.position.y < -(column.y + tall)) {
          letter.position.y = 5
          this.Letter.UpdateTexture(letter)
        }
      })
    })
  }
}

class Letter {
  constructor() {
    if (!Letter.instance) {
      this.th = 'กขคงจฉชซญฐฑณดตถทธนบปผพฟมยรลวศษสหอฮะาิีึืุูเแโใไๆํ์๐๑๒๓๔๕๖๗๘๙'
      this.en = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      this.jp1 = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン一二三四五六七八九十'
      this.jp2 = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'
      this.number = '1234567890'
      this.spacial = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`|\\\"'"
        + "$€£¥₹§¶†‡ˆ"
        + "αβγδεζηθικλμνξοπρστυφχψω"
        + "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ"
        + "‰←↑→↓↔↕↖↗↘↙↚↛↜↝↞↟↠↡↢↣↤↥↦↧↨↩↪↫↬↭↮↯↰↱↲↳↴↵↶↷↸↹↺↻↼↽↾↿⇀⇁⇂⇃⇄⇅⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇚⇛⇜⇝⇞⇟⇠⇡⇢⇣⇤⇥⇦⇧⇨⇩⇪⇫⇬⇭⇮⇯⇰⇱⇲⇳⇴⇵⇶⇷⇸⇹⇺⇻⇼⇽⇾⇿⇀⇁⇂⇃⇄⇅⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏"
        + "±∓∑∫∬∭∮∯∰∱∲∳∴∵∶∷∸∹∺∻∼∽∾∿≀≁≂≃≄≅≆≇≈≉≊≋≌≍≎≏≐≑≒≓≔≕≖≗≘≙≚≛≜≝≞≟≠≡≢≣≤≥≦≧≨≩≪≫≬≭≮≯≰≱≲≳≴≵≶≷≸≹≺≻≼≽≾≿⊀⊁⊂⊃⊄⊅⊆⊇⊈⊉⊊⊋⊌⊍⊎⊏⊐⊑⊒⊓⊔⊕⊖⊗⊘⊙⊚⊛⊜⊝⊞⊟⊠⊡⊢⊣⊤⊥⊦⊧⊨⊩⊪⊫⊬⊭⊮⊯⊰⊱⊲⊳⊴⊵⊶⊷⊸⊹⊺⊻⊼⊽⊾⊿⋀⋁⋂⋃⋄⋅⋆⋇⋈⋉⋊⋋⋌⋍⋎⋏⋐⋑⋒⋓⋔⋕⋖⋗⋘⋙⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋪⋫⋬⋭⋮⋯⋰⋱⋲⋳⋴⋵⋶⋷"

      this.charSet = [ this.th, this.en, this.jp1, this.jp2, this.number, this.spacial ].join('')
      Letter.instance = this
    }
    return Letter.instance
  }

  Create(x, y, z) {
    const char = this.RanChar()

    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#f00'
    if (this.th.split("").includes(char)) ctx.font = "bold 48px Srisakdi"
    else ctx.font = "bold 48px K2D"
    ctx.fillText(char, 10, 50)

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.SpriteMaterial({ map: texture })
    const sprite = new THREE.Sprite(material)
    sprite.name = char
    sprite.position.set(x, y, z)
    sprite.scale.set(0.5, 0.5, 1)
    sprite.originalChar = char
    sprite.lastChange = Date.now()
    return sprite
  }

  RanChar() {
    return this.charSet[Math.floor(Math.random() * this.charSet.length)]
  }

  ChangeLetter(letter) {
    letter.originalChar = this.RanChar()
    this.UpdateTexture(letter)
  }

  UpdateTexture(letter) {
    const ctx = letter.material.map.image.getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = `rgb(0, ${Math.floor(Math.random() * 255)}, 0)`
    if (this.th.split("").includes(letter.originalChar)) ctx.font = "bold 48px Srisakdi"
    else ctx.font = "bold 48px K2D"
    ctx.fillText(letter.originalChar, 10, 50)
    letter.material.map.needsUpdate = true
  }
}


export default TheMatrix

