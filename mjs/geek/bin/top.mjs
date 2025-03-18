'use strict'


import Subprocess from '../subprocess.mjs'


const subprocessName = 'top'
const version = `${subprocessName} : versiont 0.0.1 build from kernel deep#0.0.1`

const help = {
  manual: `Command ${version}

Pattern     : ${subprocessName} [...arguments]
Arguments   : look below
Exit Status : void

`,
  sudo: {
    th: '<p class="no-sudo">คำสั่งนี้ไม่ต้องการสิทธิ์พิเศษใดๆ เพื่อดำเนิดการ</p>',
    en: '<p class="no-sudo">Do not need super user permission</p>',
  },
  description: {
    th: `<p>\tคำสั่ง "${subprocessName}" คือคำสั่งเพื่อแสดงรายละเอียดข้อมูลการใช้ทรัพยากรของ JavaScript ซึ่งจะแสดงข้อมูลทั้ง ข้อความ ตัวเลข ความคืบหน้า และกราฟ </p>\n`,
    en: `<p>\tThe "${subprocessName}" command is a command to display detailed information about JavaScript resource usage, which can display information such as text, numbers, progress bars, and graphs.</p>\n`
  },
  label: {
    th: '<p>ชุดคำสั่ง :</p>',
    en: '<p>Arguments :</p>'
  },
  parameters: {
    th: [
      [ '-h', '--help', [ [ '', 'แสดงข้อมูลวิธีใช้'] ] ],
      [ '-v', '--version', [ [ '', 'แสดงเลชรุ่น' ] ] ],
      [ '', '', [ [ '', '' ] ] ],
    ],
    en: [
      [ '-h', '--help', [ [ '', 'show help message'] ] ],
      [ '-v', '--version', [ [ '', 'show version' ] ] ],
      [ '', '', [ [ '', '' ] ] ],
    ]
  },
  tips: {
    th: '<p>\tคุณสามารถค้นหาคำสั่งที่เคยใช้ก่อนหน้าได้โดยการใช้ปุ่ม Arrow key Up/Down เพื่อเลื่อนหาคำสั่งที่คุณเคยใช้ได้ หรือกด tab เพื่อเติมคำอัติโนมัติ เช่น กดปุ่ม t แล้วตามด้วยปุ่ม tab แล้วคำสั่งที่ขึ้นต้นด้วย t จะแสดงออกมาเป็นตัวเลือกให้คุณ</p>\n',
    en: '<p>\tYou can search for previously used commands by using the arrow key Up/Down to scroll through commands you\'ve used before, or pressing tab to autocomplete.For example, press t followed by tab.Commands starting with t will show you options.</p>\n'
  },
  backtohelp: {
    th: `<p>* คุณสามารถกลับมาเรียกดูรายละเอียดนี้ได้ทุกเมื่อด้วยคำสั่ง "${subprocessName} --help"</p>`,
    en: `<p>* You can return to this detail at any time with the "${subprocessName} --help" command.</p>`
  }
}

class Top extends Subprocess {
  constructor() {
    if (!Top.instance) {
      super()
      this._help = help
      this._version = version
      this.parameters = help.parameters.th
      this.prmi = this.ParamsIndex()
      Top.instance = this
    }
    return Top.instance
  }

  async render(id, sudo, params) {
    this.sudo = sudo
    for (const param of params) {
      const [key, value] = param.split(/=| +/)
      switch (key) {
        case '-h':
        case '--help': return this.help(key, value)
        case '-v':
        case '--version': return this.version()
        default: throw new Error(`${subprocessName}: unkonw parameter "${arg}"`)
      }
    }
    return await super.render(id)
  }

  version() { return super.version(this._version) }
  help(param, option) { return super.help(this._help, param, option) }

  async processing() {
    let dataPoints
    let lastDataPoints
    let limit, total, used

    if (!performance.memory) {
      this.done = true
      return { error: 'Memory API not supported' }
    }

    const numCores = navigator.hardwareConcurrency
    const maxMembers = 50

    let Time = performance.now()
    let LastTime = performance.now()
    let DeltaTime = 0
    let CPUIdleTime = 0
    let CPULastIdleTime = 0
    let CPUUsage = 0

    let FPS = 30
    const FPSs = [...Array(maxMembers)].map(e => FPS)

    limit = performance.memory.jsHeapSizeLimit
    total = performance.memory.totalJSHeapSize
    used = performance.memory.usedJSHeapSize
    dataPoints = [...Array(maxMembers)].map(e => ({ total: total, used: used, cpu: CPUUsage }))
    lastDataPoints = [...Array(maxMembers)].map(e => ({ total: total, used: used, cpu: CPUUsage }))


    this.body.innerHTML = `
      <div id="heap-container">
        <div><label for="heap-limit">JS Heap Size Limit : </label><progress id="heap-limit" value="${limit}" max="${limit}"></progress><span id="heap-limit-span"> ${(limit / 1024 / 1024).toFixed(2)} MB</span></div>
        <div><label for="heap-total">Total JS Heap Size : </label><progress id="heap-total" value="${total}" max="${limit}"></progress><span id="heap-total-span"> ${(total / 1024 / 1024).toFixed(2)} / ${(limit / 1024 / 1024).toFixed(2)} MB</span></div>
        <div><label for="heap-used">Used JS Heap Size: </label><progress id="heap-used" value="${used}" max="${total}"></progress><span id="heap-used-span"> ${(used / 1024 / 1024).toFixed(2)} / ${(total / 1024 / 1024).toFixed(2)} MB</span></div>
        <div><label for="top-cpu">CPU ${numCores} Core(s) : </label><progress id="top-cpu" value="${CPUUsage}" max="100"></progress><span id="top-cpu-span"> ${CPUUsage.toFixed(2)} %</span></div>
      </div>
    `

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    this.body.appendChild(canvas)

    const updateprogress = (limit, total, used) => {
      const hl = document.getElementById('heap-limit')
      hl.value = limit
      document.getElementById('heap-limit-span').innerHTML = ` ${(limit / 1024 / 1024).toFixed(2)} MB`

      const ht = document.getElementById('heap-total')
      ht.value = total
      document.getElementById('heap-total-span').innerHTML = ` ${(total / 1024 / 1024).toFixed(2)} / ${(limit / 1024 / 1024).toFixed(2)} MB`

      const hu = document.getElementById('heap-used')
      hu.value = used
      hu.max = total
      document.getElementById('heap-used-span').innerHTML = ` ${(used / 1024 / 1024).toFixed(2)} / ${(total / 1024 / 1024).toFixed(2)} MB`

      const cu = document.getElementById('top-cpu')
      cu.value = CPUUsage
      document.getElementById('top-cpu-span').innerHTML = ` ${CPUUsage.toFixed(2)} %`
    }


    let offsetX = 0
    let spacing

    let dt0
    let du0
    let dc0

    let maxT = Math.max(...dataPoints.map(p => p.total))
    let maxU = Math.max(...dataPoints.map(p => p.used))
    let maxC = Math.max(...dataPoints.map(p => p.cpu))
    let maxY = Math.max(...[maxT, maxU, maxC]) * 1.25


    const updatecanvas = () => {
      if (!this.done) {
        requestAnimationFrame(updatecanvas)
      }

      Time = performance.now()
      DeltaTime = Time - LastTime
      LastTime = Time

      FPSs.push(1000 / DeltaTime)
      FPSs.shift()
      FPS = FPSs.reduce((a, b) => a + b, 0) / FPSs.length

      CPUUsage = DeltaTime - (CPUIdleTime - CPULastIdleTime)
      CPUIdleTime = CPUIdleTime + (DeltaTime - CPUUsage)
      CPULastIdleTime = CPUIdleTime

      const width = canvas.width = this.body.offsetWidth
      const height = canvas.height = 200
      const padding = 2
      const graphWidth = width - 2 * padding
      const graphHeight = height - 2 * padding
      spacing = graphWidth / dataPoints.length

      ctx.clearRect(0, 0, width, height)

      drawgrid(padding, width, height, graphWidth, graphHeight)

      const speed = spacing / FPS
      offsetX += speed

      if (offsetX >= spacing) {
        offsetX = 0
        let { total, used, cpu } = lastDataPoints[0]
        dt0 = total
        du0 = used
        dc0 = cpu
        lastDataPoints.shift()
        lastDataPoints.push({ ...dataPoints[dataPoints.length - 1] })
        maxT = Math.max(...dataPoints.map(p => p.total))
        maxU = Math.max(...dataPoints.map(p => p.used))
        maxC = Math.max(...dataPoints.map(p => p.cpu))
        maxY = Math.max(...[maxT, maxU, maxC]) * 1.25
      }

      lastDataPoints.forEach((p, i) => {
        p.total += Math.sign((dataPoints[i].total - p.total) * 0.02)
        p.used += Math.sign((dataPoints[i].used - p.used) * 0.02)
        p.cpu += Math.sign((dataPoints[i].cpu - p.cpu) * 0.02)
      })

      drawLine(dt0, lastDataPoints.map(p => p.total), "blue", padding, graphWidth, graphHeight, maxY)
      drawLine(du0, lastDataPoints.map(p => p.used), "#87074f", padding, graphWidth, graphHeight, maxY)
      drawLine(dc0, lastDataPoints.map(p => p.cpu), "#d7872f", padding, graphWidth, graphHeight, maxY)

      //ctx.textAlign = 'left'
      ctx.fillStyle = '#00c300'
      ctx.fillText(`${FPS.toFixed(2)} FPS`, padding + 10, padding + 20)
    }

    const drawgrid = (padding, width, height, graphWidth, graphHeight) => {
      ctx.strokeStyle = "#666"
      ctx.lineWidth = 1
      for (let i = 0; i <= 6; i++) {
        let y = padding + (i * graphHeight) / 6
        let x = padding + (i * graphWidth) / 6
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(width - padding, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, height - padding)
        ctx.stroke()
      }
    }

    const drawLine = (first, last, color, padding, graphWidth, graphHeight, maxY) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()
      let x = padding
      let y = padding + (1 - first / maxY) * graphHeight || 1
      ctx.moveTo(x, y)
      last.forEach((p, i) => {
        x = spacing + padding + (i / (last.length - 1)) * graphWidth - offsetX
        y = padding + (1 - p / maxY) * graphHeight
        ctx.lineTo(x, y)
      })
      ctx.stroke()
    }

    updatecanvas()

    let heapLoopStart = 0, heapLoopEnd = 0
    heapLoopStart = performance.now()

    while (!this.done) {
      await this.waitfor(100)
      heapLoopEnd = performance.now()
      if (heapLoopEnd - heapLoopStart > 2000) {
        heapLoopStart = heapLoopEnd
        limit = performance.memory.jsHeapSizeLimit
        total = performance.memory.totalJSHeapSize
        used = performance.memory.usedJSHeapSize

        updateprogress(limit, total, used)

        dataPoints.push({ total, used, cpu: CPUUsage * 1024 * 1024 })
        dataPoints.shift()
      }
    }
  }

}

export default new Top()

