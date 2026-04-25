// AI Finance Legion — main entry point
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Starfield background canvas (same as main site)
const canvas = document.createElement('canvas')
canvas.id = 'bg-canvas'
document.body.prepend(canvas)

const ctx = canvas.getContext('2d')
let stars = []
let W, H

function resize() {
  W = window.innerWidth
  H = window.innerHeight
  canvas.width = W
  canvas.height = H
}

window.addEventListener('resize', resize)
resize()

// Generate stars
const starCount = Math.floor((W * H) / 8000)
for (let i = 0; i < Math.max(180, starCount); i++) {
  stars.push({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.2 + 0.3,
    a: Math.random() * 0.6 + 0.2,
    s: Math.random() * 0.2 + 0.05
  })
}

function draw() {
  ctx.clearRect(0, 0, W, H)
  for (const star of stars) {
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${star.a})`
    ctx.fill()
    star.a += (Math.random() - 0.48) * 0.02
    if (star.a < 0.1) star.a = 0.1
    if (star.a > 0.9) star.a = 0.9
  }
  requestAnimationFrame(draw)
}
draw()

// Mount Vue
const app = createApp(App)
app.mount('#app')
