<template>
  <div class="app">
    <!-- Navigation -->
    <header class="header" :class="{ scrolled: scrolled }">
      <nav class="container header-inner">
        <a href="#" class="logo">
          <span class="logo-icon">✦</span>
          <span>{{ lang === 'en' ? 'AI Game Studio' : 'AI 游戏工作室' }}</span>
        </a>
        <button class="lang-toggle" @click="toggleLang">
          {{ lang === 'en' ? '🇨🇳 中' : '🇬🇧 EN' }}
        </button>
        <div class="nav">
          <a href="#pipeline" :class="{ active: activeSection === 'pipeline' }">{{ lang === 'en' ? 'Pipeline' : '流水线' }}</a>
          <a href="#works" :class="{ active: activeSection === 'works' }">{{ lang === 'en' ? 'Works' : '作品' }}</a>
          <a href="#about" :class="{ active: activeSection === 'about' }">{{ lang === 'en' ? 'About' : '关于' }}</a>
          <a href="#cta" :class="{ active: activeSection === 'cta' }">{{ lang === 'en' ? 'Reach Us' : '联系我们' }}</a>
          <a href="https://nsieteam.github.io/ai-finance-legion/" class="liquid-glass-btn nav-cta" style="gap:4px;font-size:11px;">
            <span style="font-size:14px;">✦</span>
            {{ lang === 'en' ? 'Finance Legion' : '财务军团' }}
          </a>
          <a href="#cta" class="liquid-glass-btn nav-cta">{{ lang === 'en' ? 'Start Creating' : '开始创作' }}</a>
        </div>
      </nav>
    </header>

    <!-- Hero -->
    <section class="hero" id="hero">
      <div class="container hero-content">
        <div class="hero-badge animate-fade-rise">
          <span>✦</span>
          <span>{{ lang === 'en' ? 'AI Game Studio — powered by multi-agent AI' : 'AI 游戏工作室 — 多 Agent AI 驱动' }}</span>
        </div>
        <h1 class="animate-fade-rise" v-if="lang === 'en'">
          Your imagination,<br>
          <span class="text-muted">brought to life.</span>
        </h1>
        <h1 class="animate-fade-rise" v-else>
          你的想象，<br>
          <span class="text-muted">化为现实。</span>
        </h1>
        <p class="animate-fade-rise-delay" v-if="lang === 'en'">
          A multi-agent AI team that transforms your game ideas into playable creations.
          Describe what you want — watch it come alive.
        </p>
        <p class="animate-fade-rise-delay" v-else>
          一个多 Agent AI 团队，把你的游戏创意变成可玩的游戏。描述你的想法——看它活起来。
        </p>
        <div class="hero-actions animate-fade-rise-delay-2">
          <button class="liquid-glass-btn" @click="scrollTo('#pipeline')">
            {{ lang === 'en' ? 'Meet the Team' : '认识团队' }}
            <span style="font-size: 18px;">→</span>
          </button>
          <button class="liquid-glass-btn" @click="scrollTo('#cta')">
            {{ lang === 'en' ? 'Create Game' : '创作游戏' }}
          </button>
          <button class="glass-btn" style="padding:14px 36px;font-size:15px;border-radius:100px;color:#fff;background:rgba(0,184,148,0.06);" @click="window.open('https://nsieteam.github.io/ai-finance-legion/','_blank')">
            ✦ {{ lang === 'en' ? 'Try Finance Legion' : '体验财务军团' }}
          </button>
        </div>
        <div class="hero-input-area animate-fade-rise-delay-3">
          <p style="margin-bottom:8px;font-size:11px;color:rgba(255,255,255,0.2);text-align:center;">{{ lang === 'en' ? '✨ Try typing an idea — backend integration coming soon' : '✨ 输入创意试试——后端接入即将上线，当前为演示预览' }}</p>
          <div class="liquid-glass">
            <input
              v-model="ideaInput"
              :disabled="isLoading"
              :placeholder="lang === 'en' ? 'e.g., a pixel-art platformer where you play as a magical cat...' : '例如：一个像素风平台跳跃游戏，扮演一只魔法猫...'"
              @keyup.enter="handleIdea"
            />
            <button @click="handleIdea" :disabled="isLoading">{{ isLoading ? '⌛...' : (lang === 'en' ? 'Generate →' : '生成 →') }}</button>
          </div>
          <div v-if="isLoading" class="hero-loading">
            <div v-for="(step, si) in ['Game Designer', 'Pixel Artist', 'Game Architect', 'Game Coder', 'Game Tester', 'Game Publisher']" :key="step" class="loading-step" :class="{ active: si <= loadingStep, done: si < loadingStep }">
              <span class="loading-dot" v-if="si < loadingStep">✓</span>
              <span class="loading-dot pulse" v-else-if="si === loadingStep">●</span>
              <span class="loading-dot" v-else>○</span>
              <span>{{ lang === 'en' ? step : ['游戏策划官','像素美术师','游戏架构师','游戏工程师','游戏测试官','游戏发行官'][si] }}</span>
              <span v-if="si < loadingStep" class="loading-status">{{ lang === 'en' ? 'done' : '完成' }}</span>
              <span v-else-if="si === loadingStep" class="loading-status active">{{ lang === 'en' ? 'working...' : '工作中...' }}</span>
            </div>
          </div>
          <p style="margin-top:8px;font-size:11px;color:rgba(255,255,255,0.2);text-align:center;">{{ lang === 'en' ? '🚧 Under continuous improvement — backend integration coming soon' : '🚧 本网站在持续优化中 — 后端接入即将上线' }}</p>
        <div v-if="showSuccess" class="hero-success">
            <p>{{ lang === 'en' ? '✨ Game created successfully! Try our demos:' : '✨ 游戏创作完成！试试我们的演示：' }}</p>
            <div class="success-links">
              <a v-for="work in realWorks" :key="work.title" :href="work.url" target="_blank" class="liquid-glass-btn success-game-btn" @click.prevent="openGame(work.url)">
                {{ work.icon }} {{ work.title }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pipeline -->
    <section class="section pipeline" id="pipeline">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">The <span class="gradient-text">Agent Assembly</span> Line</h2>
          <h2 v-else><span class="gradient-text">Agent 流水线</span></h2>
          <p v-if="lang === 'en'">Six specialized AI agents, each bringing a unique craft to your game.</p>
          <p v-else>六个专属 AI Agent，各司其职。</p>
        </div>
        <div class="pipeline-grid">
          <div
            v-for="(agent, i) in agents"
            :key="agent.name"
            class="agent-card reveal"
            :style="{ transitionDelay: `${i * 0.08}s` }"
            @click="toggleAgent(i)"
          >
            <span class="agent-step">{{ lang === 'en' ? 'STEP' : '步骤' }} {{ i + 1 }}</span>
            <div
              class="agent-icon"
              :style="{ background: agent.bg }"
            >{{ agent.icon }}</div>
            <div class="agent-info">
              <div class="agent-name">{{ lang === 'en' ? agent.name : agent.cnName }}</div>
              <div class="agent-desc">{{ lang === 'en' ? agent.desc : agent.cnDesc }}</div>
            </div>
            <span v-if="i < agents.length - 1" class="agent-arrow">→</span>
            <div v-if="expandedAgent === i" class="agent-detail">
              <p>{{ lang === 'en' ? agent.detail : agent.cnDetail }}</p>
              <span class="agent-detail-tag">{{ lang === 'en' ? 'Input' : '输入' }}: {{ agent.input }}</span>
              <span class="agent-detail-tag">{{ lang === 'en' ? 'Output' : '输出' }}: {{ agent.output }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Works -->
    <section class="section works" id="works">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">From <span class="gradient-text">Ideas</span> to Reality</h2>
          <h2 v-else>从<span class="gradient-text">创意</span>到现实</h2>
          <p v-if="lang === 'en'">Play the games our pipeline has produced.</p>
          <p v-else>玩一玩流水线产出的游戏。</p>
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
            <div class="work-desc">{{ lang === 'en' ? work.desc : work.cnDesc }}</div>
            <div class="work-actions">
              <a :href="work.url" target="_blank" class="liquid-glass-btn work-btn" @click.prevent="openGame(work.url)">
                <span>▶</span> {{ lang === 'en' ? 'Play Demo' : '试玩演示' }}
              </a>
              <span class="work-input">{{ lang === 'en' ? 'Prompt:' : '提示词：' }} <em>{{ work.prompt }}</em></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="section-sm capabilities" id="about">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">What <span class="gradient-text">We Build</span></h2>
          <h2 v-else>我们的<span class="gradient-text">能力</span></h2>
          <p v-if="lang === 'en'">Every output is a complete, playable web game.</p>
          <p v-else>每个输出都是完整可玩的网页游戏。</p>
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
            <div class="cap-text">{{ lang === 'en' ? cap.text : cap.cnText }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="section-sm tech-stack">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">Built <span class="gradient-text">Different</span></h2>
          <h2 v-else>与众<span class="gradient-text">不同</span></h2>
          <p v-if="lang === 'en'">No heavy engines. No downloads. Instant web games.</p>
          <p v-else>无需重型引擎，无需下载，即时可玩的网页游戏。</p>
        </div>
        <div class="tech-tags reveal">
          <span class="tech-tag" v-for="tech in techs" :key="tech">{{ tech }}</span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section" id="cta">
      <div class="container reveal">
        <h2 v-if="lang === 'en'">Ready to create your <span class="gradient-text">first game</span>?</h2>
        <h2 v-else>准备好创作你的<span class="gradient-text">第一款游戏</span>了吗？</h2>
        <p v-if="lang === 'en'">Tell us your idea in a sentence. Our AI team will handle the rest.</p>
        <p v-else>用一句话告诉我们你的创意。我们的 AI 团队搞定剩下的一切。</p>
        <button class="liquid-glass-btn" @click="scrollTo('#hero')">
          {{ lang === 'en' ? 'Start Creating Now →' : '开始创作 →' }}
        </button>
        <p style="margin-top:20px;font-size:12px;color:rgba(255,255,255,0.25);">
          {{ lang === 'en' ? '🚧 This site is under continuous improvement' : '🚧 本网站在持续优化中' }}
        </p>
        <div style="margin-top:16px;font-size:13px;color:var(--muted)">
          {{ lang === 'en' ? 'Or try our' : '或体验' }}
          <a href="https://nsieteam.github.io/ai-finance-legion/" style="color:var(--green);text-decoration:underline" target="_blank">
            {{ lang === 'en' ? 'AI Finance Legion' : 'AI 财务军团' }}
          </a>
          {{ lang === 'en' ? '— 6-agent financial intelligence pipeline' : '— 6 Agent 财务智能流水线' }}
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-copy">
          {{ lang === 'en' ? 'AI Game Studio — multi-agent AI game creation' : 'AI 游戏工作室 — 多 Agent AI 游戏创作' }}
        </div>
        <div class="footer-links">
          <a href="https://github.com/NSIETeam/ai-game-studio" target="_blank">GitHub</a>
          <a href="https://easyclaw.link" target="_blank">EasyClaw</a>
          <span style="font-size:11px;color:rgba(255,255,255,0.2);">🚧 {{ lang === 'en' ? 'Continuously improving' : '持续优化中' }}</span>
        </div>
      </div>
      <div class="container footer-skill">
        <a :href="downloadUrl" class="liquid-glass-btn" download>
          ⬇ {{ lang === 'en' ? 'Download Agent Pack' : '下载 Agent 工具包' }}
        </a>
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
      lang: localStorage.getItem('aiGameStudioLang') || 'en',
      ideaInput: '',
      activeSection: 'hero',
      expandedAgent: null,
      isLoading: false,
      showSuccess: false,
      loadingStep: -1,
      downloadUrl: `${BASE}/downloads/ai-game-studio-agent-pack-v1.zip`,
      agents: [
        { name: 'Game Designer', cnName: '游戏策划官', icon: '🎮', desc: 'Defines mechanics, rules, and player experience from your prompt', cnDesc: '从你的提示词中定义玩法、规则和玩家体验', bg: 'rgba(168, 130, 255, 0.12)', detail: 'Analyzes your one-sentence idea, expands it into a full Game Design Document (GDD) including core mechanics, win/lose conditions, difficulty curve, control scheme, and target audience.', cnDetail: '分析你的一句话创意，扩展为完整游戏设计文档(GDD)，包括核心玩法、胜负条件、难度曲线、操作方案和目标受众。', input: 'Your game idea (1 sentence)', output: 'PRD / Game Design Document' },
        { name: 'Pixel Artist', cnName: '像素美术师', icon: '🎨', desc: 'Creates all visual assets — sprites, backgrounds, UI elements', cnDesc: '创作所有视觉资源——精灵图、背景、UI 元素', bg: 'rgba(255, 130, 180, 0.12)', detail: 'Translates the GDD into visual specifications: color palette, sprite dimensions, UI mockups, animation frames, tilemap layout, and parallax layer composition.', cnDetail: '将游戏设计文档转化为视觉规范：配色方案、精灵尺寸、UI 原型、动画帧、瓦片地图布局和视差层构成。', input: 'Game Design Document', output: 'Visual Design Spec (color, sprites, tiles, UI)' },
        { name: 'Game Architect', cnName: '游戏架构师', icon: '🏗️', desc: 'Designs the code structure, state management, and game loop', cnDesc: '设计代码结构、状态管理和游戏循环', bg: 'rgba(130, 200, 255, 0.12)', detail: 'Designs the software architecture: module decomposition, state machine, game loop structure, collision detection strategy, scoring system, and data flow between components.', cnDetail: '设计软件架构：模块拆分、状态机、游戏循环结构、碰撞检测策略、计分系统和组件间数据流。', input: 'GDD + Visual Spec', output: 'Technical Architecture Doc' },
        { name: 'Game Coder', cnName: '游戏工程师', icon: '⚡', desc: 'Writes clean, performant game code — HTML, Canvas, CSS animations', cnDesc: '编写干净高性能的游戏代码——HTML, Canvas, CSS 动画', bg: 'rgba(100, 220, 180, 0.12)', detail: 'Writes production-ready game code in a single self-contained HTML file. Implements all mechanics, rendering, input handling, sound effects (Web Audio API), and performance optimization.', cnDetail: '编写可直接运行的单一 HTML 游戏文件。实现所有玩法、渲染、输入处理、音效（Web Audio API）和性能优化。', input: 'Architecture Doc + Visual Spec', output: 'index.html (playable game)' },
        { name: 'Game Tester', cnName: '游戏测试官', icon: '🔍', desc: 'Runs the game, finds bugs, suggests balance and polish tweaks', cnDesc: '运行游戏、发现 bug、建议平衡性和润色调整', bg: 'rgba(255, 200, 80, 0.12)', detail: 'Loads and plays the game, performing systematic test cases: boundary conditions, input edge cases, collision edge cases, performance profiling, balance validation. Outputs a structured bug report with severity levels and fix recommendations.', cnDetail: '加载并试玩游戏，执行系统性测试用例：边界条件、输入边缘情况、碰撞边缘情况、性能分析和平衡性验证。输出结构化 Bug 报告，附带严重等级和修复建议。', input: 'index.html + Architecture Doc', output: 'Bug Report + Polish Suggestions' },
        { name: 'Game Publisher', cnName: '游戏发行官', icon: '🚀', desc: 'Packages and deploys the final game — shareable, playable URL', cnDesc: '打包并部署最终游戏——生成可分享、可玩的 URL', bg: 'rgba(255, 130, 130, 0.12)', detail: 'Finalizes the game package: minifies code, generates metadata (thumbnail, title, description), creates the deployable artifact, and writes the entry to the game gallery JSON.', cnDetail: '完成游戏打包：代码压缩、生成元数据（缩略图、标题、描述）、创建可部署产物、将条目写入游戏画廊 JSON。', input: 'Final index.html + Bug Report', output: 'Deployed URL + games.json entry' },
      ],
      realWorks: [
        {
          icon: '🦖', title: 'Dino Run', tag: 'Demo',
          desc: 'Endless runner with a cute T-Rex — jump over cacti, dodge flying birds, and see how far you can go. Procedural terrain, parallax stars, and particle effects.',
          cnDesc: '萌系小恐龙无限跑酷——跳跃躲避仙人掌和飞鸟，看你能跑多远。程序化地形、视差星空、粒子特效。',
          url: `${BASE}/games/dino-run/`,
          prompt: '做一个用空格跳跃的小恐龙跑酷游戏',
        },
        {
          icon: '🚀', title: 'Space Shooter', tag: 'Demo',
          desc: 'Top-down space shooter — mouse to fly, click to fire. Three enemy types with different movement patterns, shield system, and explosive particle effects.',
          cnDesc: '俯视角太空射击——鼠标飞行、点击开火。三种敌人类型各有不同移动模式，护盾系统和爆炸粒子特效。',
          url: `${BASE}/games/space-shooter/`,
          prompt: '帮我做一个太空射击游戏，鼠标控制飞船移动、点击发射子弹、打敌机',
        },
        {
          icon: '🧱', title: '星碎 Breakout', tag: 'Demo',
          desc: 'Neon cyberpunk Breakout — rainbow bricks, particle explosions, combo scoring, 8 progressive stages, metal bricks, and floating challenges.',
          cnDesc: '霓虹赛博朋克打砖块——彩虹砖块、粒子爆炸、连击计分、8 个难度递进关卡、金属砖块、浮动挑战。',
          url: `${BASE}/games/breakout/`,
          prompt: '做一个打砖块 Breakout 游戏',
        },
      ],
      capabilities: [
        { text: 'Single-sentence game concept → fully playable web game', cnText: '一句话游戏概念 → 完整可玩的网页游戏', color: 'var(--pink)' },
        { text: 'Canvas 2D, DOM-based, or hybrid rendering engine', cnText: 'Canvas 2D、DOM 或混合渲染引擎', color: 'var(--accent)' },
        { text: 'Procedural content generation (levels, items, enemies)', cnText: '程序化内容生成（关卡、道具、敌人）', color: 'hsl(342, 80%, 70%)' },
        { text: 'Mobile-responsive, touch-friendly controls', cnText: '移动端响应式、触屏友好操作', color: 'hsl(168, 80%, 50%)' },
        { text: 'Instant deploy — share a URL to your finished game', cnText: '即时部署——分享 URL 即可畅玩成品游戏', color: 'hsl(252, 60%, 70%)' },
        { text: 'Iterate as many times as you want — refine the output', cnText: '无限次迭代——反复打磨输出成果', color: 'var(--pink)' },
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
    toggleLang() {
      this.lang = this.lang === 'en' ? 'zh' : 'en'
      localStorage.setItem('aiGameStudioLang', this.lang)
    },
    onScroll() {
      this.scrolled = window.scrollY > 60
      // Update active nav section based on scroll position
      const sections = ['pipeline', 'works', 'about', 'cta']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            this.activeSection = id
            break
          }
        }
      }
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

      // IntersectionObserver for nav highlight
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id
          }
        })
      }, { threshold: 0.3 })
      document.querySelectorAll('section[id]').forEach(el => navObserver.observe(el))
    },
    toggleAgent(i) {
      this.expandedAgent = this.expandedAgent === i ? null : i
    },
    scrollTo(sel) {
      const el = document.querySelector(sel)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      // If scrolling to hero, focus the input
      if (sel === '#hero') {
        setTimeout(() => {
          document.querySelector('.hero-input-area input')?.focus()
        }, 500)
      }
    },
    openGame(url) {
      window.open(url, '_blank')
    },
    handleIdea() {
      const idea = this.ideaInput.trim()
      if (!idea) {
        this.showSuccess = false
        this.ideaInput = ''
        const msg = this.lang === 'en' ? 'Please enter an idea' : '请输入想法'
        const input = document.querySelector('.hero-input-area input')
        const orig = input?.placeholder
        if (input) {
          input.placeholder = msg
          setTimeout(() => { if (input) input.placeholder = orig }, 1500)
        }
        return
      }
      this.isLoading = true
      this.showSuccess = false
      this.loadingStep = -1
      const steps = ['Game Designer', 'Pixel Artist', 'Game Architect', 'Game Coder', 'Game Tester', 'Game Publisher']
      const interval = setInterval(() => {
        this.loadingStep++
        if (this.loadingStep >= steps.length) {
          clearInterval(interval)
          setTimeout(() => {
            this.isLoading = false
            this.showSuccess = true
            this.loadingStep = -1
          }, 300)
        }
      }, 500)
    },
  }
}
</script>
