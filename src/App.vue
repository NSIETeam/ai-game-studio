<template>
  <div class="app">
    <!-- Header -->
    <header :class="['header', { scrolled: scrolled }]">
      <div class="container header-inner">
        <div class="logo">
          <div class="logo-icon">🎮</div>
          <span>AI Game Studio</span>
        </div>
        <nav class="nav">
          <a href="#pipeline">工作流</a>
          <a href="#features">能力</a>
          <a href="#showcase">案例</a>
          <a href="#cta" class="btn btn-primary" style="padding:8px 20px">体验 Demo</a>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg-grid"></div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>🏆</span>
            <span>傅盛 AI 战队 · 青少年黑客松参赛作品</span>
          </div>
          <h1>
            输入一个创意，
            <span class="gradient-text">AI 团队帮你做成游戏</span>
          </h1>
          <p>
            AI Game Studio 是一个由 6 个 AI Agent 组成的数字游戏制作团队。
            从策划到发布，全自动流水线——你说一句话，我们出一个小游戏。
          </p>
          <div class="hero-actions">
            <a href="#cta" class="btn btn-primary btn-lg">🎮 试试看</a>
            <a href="#pipeline" class="btn btn-outline btn-lg">看看怎么工作 →</a>
          </div>
          <div class="typing-demo-container">
            <div class="typing-input-wrapper">
              <input
                v-model="demoInput"
                placeholder="比如：一个用空格键跳跃的小恐龙跑酷游戏"
                @keyup.enter="startDemo"
              />
              <button @click="startDemo" :disabled="demoRunning">生成 🚀</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pipeline -->
    <section id="pipeline" class="section pipeline-flow">
      <div class="container">
        <div class="section-header reveal">
          <span class="tag tag-hackathon">🤖 6 Agent 协作流水线</span>
          <h2>一个创意，六个专家</h2>
          <p>从你的想法到可玩的游戏，每一位 Agent 各司其职，接力完成</p>
        </div>
        <div class="pipeline-agents reveal">
          <div
            v-for="(agent, i) in agents"
            :key="agent.name"
            :class="['agent-card', { active: activeStep === i }]"
          >
            <div class="agent-step">步骤 {{ i + 1 }}</div>
            <div class="agent-icon" :style="{ background: agent.bg }">{{ agent.icon }}</div>
            <h4>{{ agent.role }}</h4>
            <p>{{ agent.desc }}</p>
          </div>
        </div>
        <!-- Live demo status -->
        <div v-if="demoRunning || demoOutput" class="reveal visible">
          <div class="agent-flow-status">
            <div
              v-for="(step, i) in flowSteps"
              :key="step"
              :class="['flow-step', {
                active: flowState === i,
                completed: flowState > i
              }]"
            >
              {{ step }}
            </div>
          </div>
          <div v-if="demoOutput" class="flow-output">
            {{ demoOutput }}<span class="cursor"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="section">
      <div class="container">
        <div class="section-header reveal">
          <span class="tag tag-featured">✨ 核心能力</span>
          <h2>为什么选择 AI Game Studio</h2>
        </div>
        <div class="features-grid">
          <div
            v-for="(f, i) in features"
            :key="f.title"
            class="feature-card reveal"
            :style="{ transitionDelay: `${i * 0.1}s` }"
          >
            <div class="feature-icon">{{ f.icon }}</div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Showcase -->
    <section id="showcase" class="section">
      <div class="container">
        <div class="section-header reveal">
          <span class="tag tag-hackathon">🎬 作品展示</span>
          <h2>看 AI 团队的作品</h2>
          <p>这些游戏完全由 6 个 Agent 协作生成——输入创意，自动产出</p>
        </div>
        <div class="showcase-grid">
          <div
            v-for="(game, i) in showcaseGames"
            :key="game.title"
            class="showcase-card reveal"
            :style="{ transitionDelay: `${i * 0.1}s` }"
          >
            <div class="showcase-preview" v-if="game.url">
              <iframe :src="game.url" :title="game.title" loading="lazy"></iframe>
            </div>
            <div class="showcase-preview" v-else>
              <div class="demo-placeholder">
                <div class="icon">{{ game.placeholderIcon }}</div>
                <p>Demo 生成中</p>
              </div>
            </div>
            <div class="showcase-info">
              <h3>{{ game.title }}</h3>
              <p>{{ game.desc }}</p>
              <div class="showcase-tags">
                <span v-for="tag in game.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <span class="tag tag-featured">🔧 技术栈</span>
          <h2>Powered By</h2>
        </div>
        <div class="tech-list reveal">
          <div class="tech-badge" v-for="tech in techStack" :key="tech">
            {{ tech }}
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section id="cta" class="section cta-section">
      <div class="container">
        <h2 class="reveal">想要你的 AI 数字团队？</h2>
        <p class="reveal">
          AI Game Studio 只是开始。用同样的多 Agent 协作流水线，
          你可以打造自己的 AI 数字团队——适合任何行业、任何场景。
        </p>
        <div class="reveal" style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          <a href="https://easyclaw.link/zh/hackathon" target="_blank" class="btn btn-primary btn-lg">
            🏆 查看黑客松
          </a>
          <a href="https://github.com/NSIETeam/ai-game-studio" target="_blank" class="btn btn-outline btn-lg">
            📦 GitHub 源码
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-links">
          <a href="https://easyclaw.link" target="_blank">EasyClaw Link</a>
          <a href="https://github.com/NSIETeam/ai-game-studio" target="_blank">GitHub</a>
        </div>
        <p>AI Game Studio — 傅盛 AI 战队青少年黑客参赛作品 · 2026</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const scrolled = ref(false)
    const demoInput = ref('')
    const demoRunning = ref(false)
    const demoOutput = ref('')
    const activeStep = ref(-1)
    const flowState = ref(-1)

    const agents = [
      { role: '策划官 🎯', icon: '🎯', bg: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', desc: '理解你的创意，写出游戏策划文档' },
      { role: '原画师 🎨', icon: '🎨', bg: 'linear-gradient(135deg, #fd79a8, #e84393)', desc: '设计视觉风格，定配色、角色、场景' },
      { role: '架构师 🏗️', icon: '🏗️', bg: 'linear-gradient(135deg, #00b894, #00cec9)', desc: '定技术方案，拆解编码任务' },
      { role: '主程 💻', icon: '💻', bg: 'linear-gradient(135deg, #0984e3, #74b9ff)', desc: '编写完整游戏代码 (HTML/CSS/JS)' },
      { role: '测试员 🐛', icon: '🐛', bg: 'linear-gradient(135deg, #fdcb6e, #e17055)', desc: '审查代码，修复 Bug，确保可玩' },
      { role: '发布官 🚀', icon: '🚀', bg: 'linear-gradient(135deg, #e17055, #d63031)', desc: '打包发布，输出可访问的游戏链接' },
    ]

    const flowSteps = ['理解创意', '策划拆解', '视觉设计', '编码实现', '测试优化', '发布上线']

    const features = [
      { icon: '🧠', title: '创意即输入', desc: '一句话描述你的游戏创意，AI 团队自动理解、拆解、执行，无需任何技术背景。' },
      { icon: '🤖', title: '6 Agent 流水线', desc: '策划→原画→架构→编码→测试→发布，每个环节由专业 AI Agent 独立完成，环环相扣。' },
      { icon: '⚡', title: '分钟级出产', desc: '从输入创意到可玩的 HTML5 游戏，全流程自动执行，快到你不敢相信。' },
      { icon: '🎮', title: '即开即玩', desc: '输出为纯前端 HTML5 游戏，无需安装，浏览器即可打开游玩，一键分享。' },
      { icon: '🔧', title: '可定制流水线', desc: 'Agent 角色和流程可自由组合，你可以组建自己的 AI 团队，适配任何创作需求。' },
      { icon: '🌐', title: '开放平台', desc: '基于 OpenClaw 平台构建，Agent 技能可复用、可共享，社区生态持续进化。' },
    ]

    const showcaseGames = [
      {
        title: '🦖 小恐龙跑酷',
        desc: '空格跳跃，躲避障碍。经典跑酷玩法，AI 团队 6 Agent 流水线产出。',
        tags: ['跑酷', 'Canvas', '像素风', 'Demo'],
        url: 'games/dino-run/index.html',
        placeholderIcon: '🦖'
      },
      {
        title: '🚀 太空射击',
        desc: '鼠标控制飞船移动，点击开火打敌机。太空射击经典玩法。',
        tags: ['射击', '太空', 'Canvas', 'Demo'],
        url: 'games/space-shooter/index.html',
        placeholderIcon: '🚀'
      },
      {
        title: '🎯 更多作品即将上线',
        desc: 'AI Game Studio 的 Agent 流水线正在持续产出更多游戏 Demo。输入你的创意，下一个就是你的！',
        tags: ['Coming Soon'],
        url: '',
        placeholderIcon: '🛠️'
      },
    ]

    const techStack = [
      'OpenClaw', 'EasyClaw Link', 'Vue 3', 'Vite',
      'HTML5 Canvas', 'CSS3', 'JavaScript',
      'GitHub Pages', 'GitHub Actions', 'Claude AI',
      '多 Agent 协作', 'A2A 协议'
    ]

    const scrollHandler = () => {
      scrolled.value = window.scrollY > 20
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    onMounted(() => {
      window.addEventListener('scroll', scrollHandler)
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', scrollHandler)
      observer.disconnect()
    })

    const startDemo = async () => {
      if (!demoInput.value.trim() || demoRunning.value) return
      demoRunning.value = true
      demoOutput.value = ''
      flowState.value = -1

      const ideas = [
        '🎯 策划官：正在分析创意「' + demoInput.value + '」...',
        '📄  策划文档生成完成！游戏类型：平台跳跃，目标用户：休闲玩家',
        '🎨 原画师：选择像素风格配色 #2d3436 #6c5ce7 #00b894，角色待生成',
        '🏗️ 架构师：技术方案——HTML5 Canvas + 纯 JS，单文件，无依赖',
        '💻 主程：编写核心逻辑... 碰撞检测  ✅  物理引擎  ✅  关卡生成  ✅',
        '🐛 测试员：代码审查通过，无关键 Bug，优化帧率至 60fps',
        '🚀 发布官：打包完成！游戏已部署上线 🎉'
      ]

      for (let i = 0; i < ideas.length; i++) {
        flowState.value = i
        activeStep.value = Math.min(i, agents.length - 1)
        demoOutput.value = ideas[i]

        // Animate typing effect
        const lines = ideas.slice(0, i + 1)
        let displayLines = lines
        if (i < ideas.length - 1) {
          // Show partial
          demoOutput.value = displayLines.join('\n')
        } else {
          // Final output
          const finalOutput = [
            ...displayLines,
            '',
            `🎮 游戏已生成！`,
            `创意：${demoInput.value}`,
            `链接：https://nsieteam.github.io/ai-game-studio/games/${Date.now()}`,
          ]
          demoOutput.value = finalOutput.join('\n')
        }

        await new Promise(r => setTimeout(r, 800 + Math.random() * 600))
      }

      flowState.value = 7 // done
      activeStep.value = -1
      demoRunning.value = false
    }

    return {
      scrolled, demoInput, demoRunning, demoOutput,
      activeStep, flowState, agents, flowSteps,
      features, showcaseGames, techStack, startDemo,
    }
  }
}
</script>

<style scoped>
/* Pipeline agent */
.agent-card.active {
  border-color: var(--accent);
  transform: translateY(-4px);
  box-shadow: 0 8px 40px var(--accent-glow);
  background: rgba(108, 92, 231, 0.05);
}
</style>
