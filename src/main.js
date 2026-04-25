import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')

// --- Canvas particle background ---
const canvas = document.createElement('canvas')
canvas.id = 'bg-canvas'
document.body.prepend(canvas)

const ctx = canvas.getContext('2d')
let w, h, stars, layerCount = 3

function resize() {
  w = canvas.width = window.innerWidth
  h = canvas.height = window.innerHeight
}
window.addEventListener('resize', resize)
resize()

function createStars(count, depth) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: (0.3 + Math.random() * 0.7) * (depth / layerCount + 0.3),
    a: 0.3 + Math.random() * 0.7,
    speed: 0.00015 + Math.random() * 0.00035 * depth
  }))
}

const layers = [
  createStars(180, 1),
  createStars(120, 2),
  createStars(60, 3)
]

function draw(time) {
  ctx.clearRect(0, 0, w, h)

  layers.forEach((stars, li) => {
    stars.forEach(s => {
      s.y -= s.speed * 0.2
      if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w }
      const pulse = 0.6 + 0.4 * Math.sin(time * s.speed * 0.3 + s.x * 0.01)
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(0, 0%, ${70 + li * 15}%, ${s.a * pulse * 0.5})`
      ctx.fill()
    })
  })

  // faint nebula blobs
  const t = time * 0.00003
  for (let i = 0; i < 3; i++) {
    const cx = w * 0.3 + Math.sin(t + i * 2.1) * w * 0.25
    const cy = h * 0.4 + Math.cos(t * 0.7 + i * 1.7) * h * 0.2
    const r = 200 + Math.sin(t * 0.5 + i) * 60
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
    grad.addColorStop(0, `hsla(252, 40%, 50%, ${0.03 + i * 0.01})`)
    grad.addColorStop(0.6, `hsla(342, 30%, 40%, ${0.02})`)
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  }

  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)
