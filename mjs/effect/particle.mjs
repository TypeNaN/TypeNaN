'use strict'


class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect
    this.x = Math.random() * this.effect.width
    this.y = Math.random() * this.effect.height
    this.oriX = Math.floor(x)
    this.oriY = Math.floor(y)
    this.color = color
    this.size = this.effect.radius
    this.vx = 0
    this.vy = 0
    this.ease = 0.1
    this.friction = 0.95
    this.dx = 0
    this.dy = 0
    this.distance = 0
    this.force = 0
    this.angle = 0
  }
  draw = (ctx) => {
    // ctx.fillStyle = this.color
    // ctx.fillRect(this.x,this.y,this.size,this.size)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.lineWidth = 1
    ctx.strokeStyle = this.color
    ctx.stroke()
  }

  update = () => {
    this.dx = this.effect.mouse.x - this.x
    this.dy = this.effect.mouse.y - this.y
    this.distance = this.dx * this.dx + this.dy * this.dy
    this.force = -this.effect.mouse.radius / this.distance
    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx)
      this.vx += this.force * Math.cos(this.angle)
      this.vy += this.force * Math.sin(this.angle)
    }
    this.x += (this.vx *= this.friction) + (this.oriX - this.x) * this.ease
    this.y += (this.vy *= this.friction) + (this.oriY - this.y) * this.ease
  }

  wrap = () => {
    this.x = Math.random() * this.effect.width
    this.y = Math.random() * this.effect.height
    this.ease = 0.1
  }
}


class Effect {
  constructor(canvas, img, gap=3, radius=3) {
    this.width = canvas.width
    this.height = canvas.height
    this.particleArray = []
    this.img = img
    this.centerX = this.width * .5
    this.centerY = this.height * .5
    this.x = this.centerX - this.img.width * .5
    this.y = this.centerY - this.img.height * .5
    this.gap = gap
    this.radius = radius
    this.mouse = {
      radius: 3000,
      x: undefined,
      y: undefined
    }
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x
      this.mouse.y = e.y
    })
  }

  init = (ctx) => {
    ctx.drawImage(this.img, this.x, this.y)
    const pixels = ctx.getImageData(0, 0, this.width, this.height).data
    for (let y = 0; y < this.height; y += this.gap) {
      for (let x = 0; x < this.width; x += this.gap) {
        const index = (y * this.width + x) * 4
        const red = pixels[index]
        const green = pixels[index + 1]
        const blue = pixels[index + 2]
        const alpha = pixels[index + 3]
        const color = `rgb(${red},${green},${blue},${alpha})`
        if (alpha > 0) this.particleArray.push(new Particle(this, x, y, color))
      }
    }
  }

  draw = (ctx) => this.particleArray.forEach(particle => particle.draw(ctx))
  update = () => this.particleArray.forEach(particle => particle.update())
  wrap = () => this.particleArray.forEach(particle => particle.wrap())
}


export default class {
  constructor(parent, width, height, src) {
    this.render(parent, width, height, src)
  }

  render = async (parent, width, height, src) => {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = width
    this.canvas.height = height
    parent.appendChild(this.canvas)

    this.image = new Image()
    this.image.src = src
    this.image.onload = (e) => {
      let im = this.resize(e.target, width)
      this.effect = new Effect(this.canvas, im, 40, 20)
      this.effect.init(this.ctx)
      this.animate()
      
      this.canvas.onclick = () => this.effect.wrap()
      
      const resizeObserver = new ResizeObserver((entries) => {
        if (this.canvas.width != entries[0].target.clientWidth) {
          this.canvas.width = entries[0].target.clientWidth
          this.canvas.height = entries[0].target.clientWidth
          im = this.resize(this.image, entries[0].target.clientWidth)
          this.effect = undefined
          this.effect = new Effect(this.canvas, im, 40, 20)
          this.effect.init(this.ctx)
        }
      })
      resizeObserver.observe(parent)
    }
  }

  resize = (src, width = 0, height = 0) => {
    const crop = width == 0 || height == 0
    if (src.width <= width && height == 0) {
      width = src.width
      height = src.height
    }
    if (src.width > width && height == 0) height = src.height * (width / src.width)
    const xscale = width / src.width
    const yscale = height / src.height
    const scale = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
    const canvas = document.createElement('canvas')
    canvas.width = width ? width : Math.round(src.width * scale)
    canvas.height = height ? height : Math.round(src.height * scale)
    canvas.getContext("2d").scale(scale, scale)
    canvas.getContext("2d").drawImage(src,
      - ((src.width * .5) + ((canvas.width * -.5) / scale)),
      - ((src.height * .5) + ((canvas.height * -.5) / scale))
    )
    return canvas
  }

  animate = () => {
    if (this.effect) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.effect.draw(this.ctx)
      this.effect.update()
    }
    requestAnimationFrame(this.animate)
  }
}
