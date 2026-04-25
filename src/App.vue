<template>
  <div class="app">
    <!-- Navigation -->
    <header class="header" :class="{ scrolled: scrolled }">
      <nav class="container header-inner">
        <a href="#" class="logo">
          <span class="logo-icon">✦</span>
          <span>AI Game Studio</span>
        </a>
        <div class="nav">
          <a href="#pipeline" class="active">Pipeline</a>
          <a href="#works">Works</a>
          <a href="#about">About</a>
          <a href="#cta">Reach Us</a>
          <a href="#cta" class="liquid-glass-btn nav-cta">Start Creating</a>
        </div>
      </nav>
    </header>

    <!-- Hero -->
    <section class="hero" id="hero">
      <div class="container hero-content">
        <div class="hero-badge animate-fade-rise">
          <span>✦</span>
          <span>AI Game Studio — powered by multi-agent AI</span>
        </div>
        <h1 class="animate-fade-rise">
          Your imagination,<br>
          <span class="text-muted">brought to life.</span>
        </h1>
        <p class="animate-fade-rise-delay">
          A multi-agent AI team that transforms your game ideas into playable creations.
          Describe what you want — watch it come alive.
        </p>
        <div class="hero-actions animate-fade-rise-delay-2">
          <button class="liquid-glass-btn" @click="scrollTo('#pipeline')">
            Meet the Team
            <span style="font-size: 18px;">→</span>
          </button>
          <button class="liquid-glass-btn" @click="scrollTo('#cta')">
            Start Creating
          </button>
        </div>
        <div class="hero-input-area animate-fade-rise-delay-3">
          <div class="liquid-glass">
            <input
              v-model="ideaInput"
              placeholder="e.g., a pixel-art platformer where you play as a magical cat..."
              @keyup.enter="handleIdea"
            />
            <button @click="handleIdea">Generate →</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Pipeline -->
    <section class="section pipeline" id="pipeline">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2>The <span class="gradient-text">Agent Assembly</span> Line</h2>
          <p>Six specialized AI agents, each bringing a unique craft to your game.</p>
        </div>
        <div class="pipeline-grid">
          <div
            v-for="(agent, i) in agents"
            :key="agent.name"
            class="agent-card reveal"
            :style="{ transitionDelay: `${i * 0.08}s` }"
          >
            <span class="agent-step">STEP {{ i + 1 }}</span>
            <div
              class="agent-icon"
              :style="{ background: agent.bg }"
            >{{ agent.icon }}</div>
            <div class="agent-info">
              <div class="agent-name">{{ agent.name }}</div>
              <div class="agent-desc">{{ agent.desc }}</div>
            </div>
            <span v-if="i < agents.length - 1" class="agent-arrow">→</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Works -->
    <section class="section works" id="works">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2>From <span class="gradient-text">Ideas</span> to Reality</h2>
          <p>Play the games our pipeline has produced.</p>
        </div>
        <div class="works-grid">
          <div
            v-for="(work, i) in realWorks"
            :key="work.title"
            class="work-card reveal"
            :style="{ transitionDelay: `${i * 0.1}s` }"
          >
            <div class="work-header">
              <div class="work-icon">{{ work.icon }}</div>
              <div class="work-title">{{ work.title }}</div>
              <span class="work-tag">{{ work.tag }}</span>
            </div>
            <div class="work-desc">{{ work.desc }}</div>
            <div class="work-actions">
              <a :href="work.url" target="_blank" class="liquid-glass-btn work-btn" @click.prevent="openGame(work.url)">
                <span>▶</span> Play Demo
              </a>
              <span class="work-input">Prompt: <em>{{ work.prompt }}</em></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="section-sm capabilities" id="about">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2>What <span class="gradient-text">We Build</span></h2>
          <p>Every output is a complete, playable web game.</p>
        </div>
        <div class="caps-grid">
          <div
            v-for="(cap, i) in capabilities"
            :key="cap.text"
            class="cap-item reveal"
            :style="{ transitionDelay: `${i * 0.06}s` }"
          >
            <div
              class="cap-dot"
              :style="{ background: cap.color }"
            ></div>
            <div class="cap-text">{{ cap.text }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="section-sm tech-stack">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2>Built <span class="gradient-text">Different</span></h2>
          <p>No heavy engines. No downloads. Instant web games.</p>
        </div>
        <div class="tech-tags reveal">
          <span class="tech-tag" v-for="tech in techs" :key="tech">{{ tech }}</span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section" id="cta">
      <div class="container reveal">
        <h2>Ready to create your <span class="gradient-text">first game</span>?</h2>
        <p>Tell us your idea in a sentence. Our AI team will handle the rest.</p>
        <button class="liquid-glass-btn" @click="scrollTo('#hero')">
          Start Creating Now →
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-copy">
          AI Game Studio — multi-agent AI game creation
        </div>
        <div class="footer-links">
          <a href="https://github.com/NSIETeam/ai-game-studio" target="_blank">GitHub</a>
          <a href="https://easyclaw.link" target="_blank">EasyClaw</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
const BASE = '/ai-game-studio'

export default {
  name: 'App',
  data() {
    return {
      scrolled: false,
      ideaInput: '',
      agents: [
        { name: 'Game Designer', icon: '🎮', desc: 'Defines mechanics, rules, and player experience from your prompt', bg: 'rgba(168, 130, 255, 0.12)' },
        { name: 'Pixel Artist', icon: '🎨', desc: 'Creates all visual assets — sprites, backgrounds, UI elements', bg: 'rgba(255, 130, 180, 0.12)' },
        { name: 'Game Architect', icon: '🏗️', desc: 'Designs the code structure, state management, and game loop', bg: 'rgba(130, 200, 255, 0.12)' },
        { name: 'Game Coder', icon: '⚡', desc: 'Writes clean, performant game code — HTML, Canvas, CSS animations', bg: 'rgba(100, 220, 180, 0.12)' },
        { name: 'Game Tester', icon: '🔍', desc: 'Runs the game, finds bugs, suggests balance and polish tweaks', bg: 'rgba(255, 200, 80, 0.12)' },
        { name: 'Game Publisher', icon: '🚀', desc: 'Packages and deploys the final game — shareable, playable URL', bg: 'rgba(255, 130, 130, 0.12)' },
      ],
      realWorks: [
        {
          icon: '🦖', title: 'Dino Run', tag: 'Demo',
          desc: 'Endless runner with a cute T-Rex — jump over cacti, dodge flying birds, and see how far you can go. Procedural terrain, parallax stars, and particle effects.',
          url: `${BASE}/games/dino-run/`,
          prompt: '做一个用空格跳跃的小恐龙跑酷游戏',
        },
        {
          icon: '🚀', title: 'Space Shooter', tag: 'Demo',
          desc: 'Top-down space shooter — mouse to fly, click to fire. Three enemy types with different movement patterns, shield system, and explosive particle effects.',
          url: `${BASE}/games/space-shooter/`,
          prompt: '帮我做一个太空射击游戏，鼠标控制飞船移动、点击发射子弹、打敌机',
        },
        {
          icon: '🧱', title: '星碎 Breakout', tag: 'Demo',
          desc: 'Neon cyberpunk Breakout — rainbow bricks, particle explosions, combo scoring, 8 progressive stages, metal bricks, and floating challenges.',
          url: `${BASE}/games/breakout/`,
          prompt: '做一个打砖块 Breakout 游戏',
        },
      ],
      capabilities: [
        { text: 'Single-sentence game concept → fully playable web game', color: 'var(--pink)' },
        { text: 'Canvas 2D, DOM-based, or hybrid rendering engine', color: 'var(--accent)' },
        { text: 'Procedural content generation (levels, items, enemies)', color: 'hsl(342, 80%, 70%)' },
        { text: 'Mobile-responsive, touch-friendly controls', color: 'hsl(168, 80%, 50%)' },
        { text: 'Instant deploy — share a URL to your finished game', color: 'hsl(252, 60%, 70%)' },
        { text: 'Iterate as many times as you want — refine the output', color: 'var(--pink)' },
      ],
      techs: ['Vue 3', 'HTML5 Canvas', 'JavaScript', 'CSS Animations', 'OpenClaw Subagents', 'GitHub Pages', 'EasyClaw Link'],
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    this.$nextTick(() => this.setupObserver())
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      this.scrolled = window.scrollY > 60
    },
    setupObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      }, { threshold: 0.1 })
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    },
    scrollTo(sel) {
      const el = document.querySelector(sel)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    },
    openGame(url) {
      window.open(url, '_blank')
    },
    handleIdea() {
      const idea = this.ideaInput.trim()
      if (!idea) {
        this.scrollTo('#cta')
        return
      }
      this.ideaInput = 'The multi-agent pipeline is being built for the hackathon...'
      setTimeout(() => { this.ideaInput = '' }, 2000)
    }
  }
}
</script>
