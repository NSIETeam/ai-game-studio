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
          {{ lang === 'en' ? '中' : 'EN' }}
        </button>
        <div class="nav">
          <a href="#pipeline">{{ lang === 'en' ? 'Pipeline' : '流水线' }}</a>
          <a href="#team">{{ lang === 'en' ? 'Workflow' : '流程' }}</a>
          <a href="#works">{{ lang === 'en' ? 'Works' : '作品' }}</a>
          <a href="#skill-pack">{{ lang === 'en' ? 'Skill Pack' : 'Skill 包' }}</a>
          <a href="#about">{{ lang === 'en' ? 'About' : '关于' }}</a>
          <a href="#benchmark">{{ lang === 'en' ? 'Benchmark' : '对比' }}</a>
        </div>
      </nav>
    </header>

    <section class="hero" id="hero">
      <div class="container hero-content">
        <div class="hero-badge animate-fade-rise">
          <span>✦</span>
          <span>{{ lang === 'en' ? 'AI Game Studio — 6-agent AI game creation pipeline' : 'AI 游戏工作室 — 6 Agent AI 游戏流水线' }}</span>
        </div>
        <h1 class="animate-fade-rise" v-if="lang === 'en'">
          Your game idea →<br>
          <span class="text-muted">playable code. Zero handoffs.</span>
        </h1>
        <h1 class="animate-fade-rise" v-else>
          从你的创意<br>
          <span class="text-muted">到可玩的游戏。零人工交接。</span>
        </h1>
        <p class="animate-fade-rise-delay" v-if="lang === 'en'">
          6 specialized AI agents — Game Designer, Pixel Artist, Architect, Coder, Tester, Publisher.
          They design, build, review, test, and ship your game. You just describe it.
        </p>
        <p class="animate-fade-rise-delay" v-else>
          6 个专业 AI Agent——策划、原画、架构、编码、测试、发布。自动完成设计、开发、审查、测试和上线。你只需描述想法。
        </p>

        <p class="animate-fade-rise-delay" style="margin-top: 14px; color: rgba(255,255,255,.78)" v-if="lang === 'en'">
          <b>L3 Strong + Stable</b>: not “it runs”, but “it ships and stays shippable”.
          <b>Quality Gate</b> (review + E2E + CI) blocks bad releases.
          <b>Two-track</b> <code>stable</code>/<code>latest</code>, one-click rollback, offline-friendly deps.
        </p>
        <p class="animate-fade-rise-delay" style="margin-top: 14px; color: rgba(255,255,255,.78)" v-else>
          <b>L3 强 + 稳</b>：不是“能跑就行”，而是“可发布、可维护”。
          <b>质量闸门</b>（审查 + E2E 自动化 + CI）拦截带病上线。
          <b>双通道</b> <code>stable</code>/<code>latest</code>，支持一键回滚，依赖可离线。
        </p>
        <div class="hero-actions animate-fade-rise-delay-2">
          <button class="liquid-glass-btn" @click="openGame(BASE + '/games/zero-fighter/')">
            {{ lang === 'en' ? 'Play Zero Fighter Demo' : '试玩零式空战 Demo' }}
            <span style="font-size: 18px;">▶</span>
          </button>
          <button class="liquid-glass-btn" @click="scrollTo('#pipeline')">
            {{ lang === 'en' ? 'Meet the Team' : '认识团队' }}
            <span style="font-size: 18px;">→</span>
          </button>
          <button class="liquid-glass-btn" @click="scrollTo('#works')">
            {{ lang === 'en' ? 'Play More Demos' : '更多 Demo' }}
          </button>
          <button class="liquid-glass-btn" style="background: linear-gradient(135deg, #56f2a5, #38e89f); color: #000;" @click="downloadSkillPack">
            {{ lang === 'en' ? 'Download Agent Legion Skill Pack' : '下载 Agent 军团 Skill 包' }}
            <span style="font-size: 16px;">⬇</span>
          </button>
        </div>
        <div class="hero-input-area animate-fade-rise-delay-3">
          <div class="liquid-glass">
            <input v-model="ideaInput"
              :placeholder="lang === 'en' ? 'e.g., a pixel-art platformer where you play as a magical cat...' : '例如：一个像素风平台跳跃游戏...'"
              @keyup.enter="handleIdea"/>
            <button @click="handleIdea">{{ lang === 'en' ? 'Generate →' : '生成 →' }}</button>
          </div>
        </div>
        
        <!-- Hero Demo Embedding -->
        <div class="hero-demo animate-fade-rise-delay-4">
          <div class="demo-header">
            <span>🎮</span>
            <span>{{ lang === 'en' ? 'Play the Demo Directly' : '直接试玩 Demo' }}</span>
          </div>
          <div class="demo-frame liquid-glass">
            <iframe :src="BASE + '/games/zero-fighter/'" title="Zero Fighter Demo" frameborder="0" allowfullscreen></iframe>
          </div>
          <div class="demo-controls">
            <span class="control-label">{{ lang === 'en' ? 'Controls' : '操作说明' }}:</span>
            <span class="control-item">W/S {{ lang === 'en' ? 'Pitch' : '俯仰' }}</span>
            <span class="control-item">A/D {{ lang === 'en' ? 'Roll' : '滚转' }}</span>
            <span class="control-item">Shift {{ lang === 'en' ? 'Boost' : '加速' }}</span>
            <span class="control-item">Space {{ lang === 'en' ? 'Fire' : '射击' }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section pipeline" id="pipeline">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">The <span class="gradient-text">Agent Assembly</span> Line</h2>
          <h2 v-else><span class="gradient-text">Agent 流水线</span></h2>
          <p v-if="lang === 'en'">Six specialized AI agents, each bringing a unique craft to your game.</p>
          <p v-else>六个专属 AI Agent，各司其职。</p>
        </div>
        <div class="pipeline-grid reveal">
          <div v-for="(agent, i) in agents" :key="agent.name" class="agent-card" :style="{ transitionDelay: `${i * 0.08}s` }">
            <span class="agent-step">{{ lang === 'en' ? 'STEP' : '步骤' }} {{ i + 1 }}</span>
            <div class="agent-icon" :style="{ background: agent.bg }">{{ agent.icon }}</div>
            <div class="agent-info">
              <div class="agent-name">{{ lang === 'en' ? agent.name : agent.cnName }}</div>
              <div class="agent-desc">{{ lang === 'en' ? agent.desc : agent.cnDesc }}</div>
              <div class="agent-detail" v-if="agent.ioEn"><span class="detail-label">→</span> {{ lang === 'en' ? agent.ioEn : agent.ioCn }}</div>
            </div>
            <span v-if="i < agents.length - 1" class="agent-arrow">↓</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section-sm capabilities" id="team">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'"><span class="gradient-text">Interactive</span> Workflow</h2>
          <h2 v-else><span class="gradient-text">协作</span>流程</h2>
          <p v-if="lang === 'en'">Click a scenario to see how the AI pipeline flows automatically.</p>
          <p v-else>点击场景，查看 AI 流水线如何自动流转。</p>
        </div>
        <div class="workflow-tabs reveal">
          <button v-for="tab in workflowTabs" :key="tab.key" :class="['workflow-tab', { active: activeWorkflow === tab.key }]" @click="activeWorkflow = tab.key">{{ lang === 'en' ? tab.enLabel : tab.cnLabel }}</button>
        </div>
        <div class="workflow-flow reveal" :key="activeWorkflow">
          <div v-for="(step, i) in currentFlow" :key="i" class="wf-step">
            <div class="wf-step-num">{{ i + 1 }}</div>
            <div class="wf-step-icon">{{ step.icon }}</div>
            <div class="wf-step-info">
              <div class="wf-step-title">{{ lang === 'en' ? step.titleEn : step.titleCn }}</div>
              <div class="wf-step-detail" v-for="(item, j) in step.items" :key="j">{{ item }}</div>
            </div>
            <div class="wf-arrow" v-if="i < currentFlow.length - 1">↓</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section works" id="works">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">From <span class="gradient-text">Ideas</span> to Reality</h2>
          <h2 v-else>从 <span class="gradient-text">创意</span>到现实</h2>
          <p v-if="lang === 'en'">Play the games our pipeline has produced.</p>
          <p v-else>玩一玩流水线产出的游戏。</p>
        </div>
        <div class="works-grid">
          <div v-for="(work, i) in realWorks" :key="work.title" class="work-card reveal" :style="{ transitionDelay: `${i * 0.1}s` }">
            <div class="work-header">
              <div class="work-icon">{{ work.icon }}</div>
              <div class="work-title">{{ work.title }}</div>
              <span class="work-tag">{{ work.tag }}</span>
            </div>
            <div class="work-desc">{{ lang === 'en' ? work.desc : work.cnDesc }}</div>
            <div class="work-actions">
              <a :href="work.url" target="_blank" class="liquid-glass-btn work-btn" @click.prevent="openGame(work.url)"><span>▶</span> {{ lang === 'en' ? 'Play Demo' : '试玩演示' }}</a>
              <span class="work-input">{{ lang === 'en' ? 'Prompt:' : '提示词：' }} <em>{{ work.prompt }}</em></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-sm" id="skill-pack">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">Download <span class="gradient-text">Agent Legion Skill Pack</span></h2>
          <h2 v-else>下载 <span class="gradient-text">Agent 军团 Skill 包</span></h2>
          <p v-if="lang === 'en'">Get all 6 specialized AI agents as EasyClaw skills. Install once, use forever.</p>
          <p v-else>获取 6 个专业 AI Agent 的 EasyClaw Skill 包。一次安装，永久使用。</p>
        </div>
        <div class="caps-grid" style="max-width: 800px; margin: 0 auto;">
          <div class="cap-item reveal" v-for="(skill, i) in skillPackSkills" :key="skill.name" :style="{ transitionDelay: `${i * 0.06}s` }">
            <div class="cap-dot" :style="{ background: skill.color }"></div>
            <div class="cap-text">
              <strong>{{ lang === 'en' ? skill.name : skill.cnName }}</strong>
              <br>
              <small>{{ lang === 'en' ? skill.desc : skill.cnDesc }}</small>
            </div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 32px;" class="reveal">
          <button class="liquid-glass-btn" style="background: linear-gradient(135deg, #56f2a5, #38e89f); color: #000;" @click="downloadSkillPack">
            {{ lang === 'en' ? 'Download Agent Legion Skill Pack' : '下载 Agent 军团 Skill 包' }}
            <span style="font-size: 16px;">⬇</span>
          </button>
          <div style="margin-top: 12px; font-size: 13px; color: hsl(var(--muted-foreground));">
            {{ lang === 'en' ? 'File size: ~250KB' : '文件大小：~250KB' }}
          </div>
        </div>
      </div>
    </section>

    <section class="section-sm capabilities" id="about">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">What <span class="gradient-text">We Build</span></h2>
          <h2 v-else>我们的 <span class="gradient-text">能力</span></h2>
          <p v-if="lang === 'en'">Every output is a complete, playable web game.</p>
          <p v-else>每个输出都是完整可玩的网页游戏。</p>
        </div>
        <div class="caps-grid">
          <div v-for="(cap, i) in capabilities" :key="cap.text" class="cap-item reveal" :style="{ transitionDelay: `${i * 0.06}s` }">
            <div class="cap-dot" :style="{ background: cap.color }"></div>
            <div class="cap-text">{{ lang === 'en' ? cap.text : cap.cnText }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-sm" id="benchmark" style="position:relative;z-index:1;">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">Traditional vs <span class="gradient-text">AI Pipeline</span></h2>
          <h2 v-else>传统研发 vs <span class="gradient-text">AI 流水线</span></h2>
          <p v-if="lang === 'en'">8 key metrics that quantify the AI-driven efficiency leap.</p>
          <p v-else>8 项核心指标，量化 AI 带来的效率跃迁。</p>
        </div>
        <div class="benchmark-table reveal">
          <div class="bm-row bm-header">
            <div class="bm-cell bm-metric">{{ lang === 'en' ? 'Metric' : '维度' }}</div>
            <div class="bm-cell bm-trad">{{ lang === 'en' ? 'Traditional' : '传统团队' }}</div>
            <div class="bm-cell bm-ai">{{ lang === 'en' ? 'AI Pipeline' : 'AI 流水线' }}</div>
          </div>
          <div class="bm-row" v-for="row in benchmarkData" :key="row.enMetric">
            <div class="bm-cell bm-metric">{{ lang === 'en' ? row.enMetric : row.cnMetric }}</div>
            <div class="bm-cell bm-trad">{{ lang === 'en' ? row.enTrad : row.cnTrad }}</div>
            <div class="bm-cell bm-ai">{{ lang === 'en' ? row.enAi : row.cnAi }}</div>
          </div>
        </div>
      </div>
    </section>

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

    <section class="section cta-section">
      <div class="container reveal">
        <h2 v-if="lang === 'en'">Ready to create your <span class="gradient-text">first game</span>?</h2>
        <h2 v-else>准备好创作你的 <span class="gradient-text">第一款游戏</span> 了吗？</h2>
        <p v-if="lang === 'en'">Tell us your idea in a sentence. Our AI team will handle the rest.</p>
        <p v-else>用一句话告诉我们你的创意。我们的 AI 团队搞定剩下的一切。</p>
        <button class="liquid-glass-btn" @click="scrollTo('#hero')">{{ lang === 'en' ? 'Start Creating Now →' : '开始创作 →' }}</button>
      </div>
    </section>

    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-copy">{{ lang === 'en' ? 'AI Game Studio — multi-agent AI game creation' : 'AI 游戏工作室 — 多 Agent AI 游戏创作' }}</div>
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
      BASE,
      scrolled: false, lang: 'en', ideaInput: '', activeWorkflow: 'feature',
      agents: [
        { name: 'Game Designer', cnName: '游戏策划师', icon: '🎪', desc: 'Defines mechanics, rules, and player experience from your prompt', cnDesc: '从你的提示词中定义玩法、规则和玩家体验', bg: 'rgba(168,130,255,0.12)', ioEn: 'Idea prompt → PRD + user stories', ioCn: '创意描述 → PRD + 用户故事' },
        { name: 'Pixel Artist', cnName: '像素美术师', icon: '🎨', desc: 'Creates all visual assets — sprites, backgrounds, UI elements', cnDesc: '创建所有视觉资源', bg: 'rgba(255,130,180,0.12)', ioEn: 'Game style → Visual assets + style guide', ioCn: '游戏风格 → 视觉资源' },
        { name: 'Game Architect', cnName: '游戏架构师', icon: '🏗️', desc: 'Designs the code structure, state management, and game loop', cnDesc: '设计代码结构、状态管理和游戏循环', bg: 'rgba(130,200,255,0.12)', ioEn: 'PRD + constraints → Architecture + API spec', ioCn: 'PRD + 约束 → 架构 + 接口' },
        { name: 'Game Coder', cnName: '游戏工程师', icon: '💻', desc: 'Writes clean, performant game code', cnDesc: '编写干净高性能的游戏代码', bg: 'rgba(100,220,180,0.12)', ioEn: 'Architecture docs → Runnable code + tests', ioCn: '架构文档 → 可运行代码' },
        { name: 'Game Tester', cnName: '游戏测试师', icon: '🔳', desc: 'Runs the game, finds bugs, suggests balance and polish tweaks', cnDesc: '运行游戏、发现 bug、建议调整', bg: 'rgba(255,200,80,0.12)', ioEn: 'Build + PRD → Test report + bug list', ioCn: '构建 + PRD → 测试报告' },
        { name: 'Game Publisher', cnName: '游戏发行师', icon: '🚀', desc: 'Packages and deploys the final game', cnDesc: '打包并部署最终游戏', bg: 'rgba(255,130,130,0.12)', ioEn: 'Build + report → Published URL + changelog', ioCn: '构建 + 报告 → 上线 URL' },
      ],
      workflowTabs: [
        { key: 'feature', enLabel: 'New Feature', cnLabel: '新功能开发' },
        { key: 'bugfix', enLabel: 'Bug Fix', cnLabel: 'Bug 紧急修复' },
        { key: 'release', enLabel: 'Release', cnLabel: '版本发布' },
      ],
      workflows: {
        feature: [
          { icon: '🎪', titleEn: 'PM / Game Designer', titleCn: 'PM 游戏策划', items: ['Input: Business requirement', 'Output: PRD + User Stories'] },
          { icon: '🏗️', titleEn: 'Architect', titleCn: '架构师', items: ['Input: PRD + Constraints', 'Output: Architecture + API spec'] },
          { icon: '💻', titleEn: 'Developer / Game Coder', titleCn: '开发工程师', items: ['Input: API spec + Design', 'Output: Runnable code'] },
          { icon: '🔍', titleEn: 'Code Reviewer', titleCn: '代码审查员', items: ['Input: Code PR/MR', 'Output: Review report'] },
          { icon: '🔳', titleEn: 'Tester', titleCn: '测试师', items: ['Input: Code + PRD criteria', 'Output: Test report'] },
          { icon: '📚', titleEn: 'Publisher / Docs', titleCn: '文档/发行', items: ['Input: Changes + Test report', 'Output: API docs + Changelog'] },
        ],
        bugfix: [
          { icon: '💻', titleEn: 'Developer', titleCn: '开发工程师', items: ['Input: Bug report + logs', 'Output: Fix code'] },
          { icon: '🔳', titleEn: 'Tester', titleCn: '测试师', items: ['Input: Fix code', 'Output: Regression test'] },
          { icon: '🔍', titleEn: 'Code Reviewer', titleCn: '代码审查员', items: ['Input: Fix PR', 'Output: Security pass'] },
          { icon: '📚', titleEn: 'Publisher', titleCn: '文档/发行', items: ['Input: Fix records', 'Output: KB update'] },
        ],
        release: [
          { icon: '🎪', titleEn: 'PM', titleCn: 'PM', items: ['Input: Feature list', 'Output: Release scope + Release notes'] },
          { icon: '🔳', titleEn: 'Tester', titleCn: '测试师', items: ['Input: Release candidate', 'Output: Full regression report'] },
          { icon: '📚', titleEn: 'Publisher', titleCn: '文档/发行', items: ['Input: Report + Changes', 'Output: Changelog + Version docs'] },
        ],
      },
      realWorks: [
        { icon: '✦', title: 'Zero Fighter', tag: 'Featured', desc: '3D Krigger-style process shaded dogfighter', cnDesc: 'Krigger 风格 3D 空战游戏', url: BASE + '/games/zero-fighter/', prompt: '模仿 Krigger 游戏，做一个 3D 空战游戏，用零式战斗机' },
        { icon: 'T-Rex', title: 'Dino Run', tag: 'Demo', desc: 'Endless runner with a cute T-Rex', cnDesc: '萌系小恐龙无限跑酷', url: BASE + '/games/dino-run/', prompt: '做一个用空格跳跃的小恐龙跑酷游戏' },
        { icon: 'Rocket', title: 'Space Shooter', tag: 'Demo', desc: 'Top-down space shooter', cnDesc: '俯视角太空射击', url: BASE + '/games/space-shooter/', prompt: '帮我做一个太空射击游戏' },
        { icon: 'Bricks', title: 'Star Shatter', tag: 'Demo', desc: 'Neon cyberpunk Breakout', cnDesc: '霓虹赛博朋克打砖块', url: BASE + '/games/breakout/', prompt: '做一个打方块 Breakout 游戏' },
        { icon: 'Pick', title: 'MiniCraft 3D', tag: 'New', desc: 'First-person sandbox in Three.js', cnDesc: 'Three.js 第一人称沙盒', url: BASE + '/games/minecraft-3d/', prompt: '一个超小的 3D 网页版 Minecraft' },
      ],
      skillPackSkills: [
        { name: 'Planner Agent', cnName: '游戏策划师', desc: 'Defines mechanics, rules, and player experience', cnDesc: '定义玩法、规则和玩家体验', color: 'rgba(168,130,255,0.6)' },
        { name: 'Level Designer Agent', cnName: '关卡设计师', desc: 'Creates level structures, enemy waves, and difficulty curves', cnDesc: '创建关卡结构、敌人波次和难度曲线', color: 'rgba(255,130,180,0.6)' },
        { name: 'Game Coder Agent', cnName: '游戏工程师', desc: 'Writes clean, performant game code', cnDesc: '编写干净高性能的游戏代码', color: 'rgba(130,200,255,0.6)' },
        { name: 'Artist Agent', cnName: '美术师', desc: 'Creates visual assets and defines art style', cnDesc: '创建视觉资源和定义美术风格', color: 'rgba(100,220,180,0.6)' },
        { name: 'Tester Agent', cnName: '测试师', desc: 'Finds bugs, tests balance, and suggests improvements', cnDesc: '发现 bug、测试平衡性和提出改进建议', color: 'rgba(255,200,80,0.6)' },
        { name: 'Director Agent', cnName: '总监 Agent', desc: 'Coordinates all agents and delivers final output', cnDesc: '协调所有 Agent 并交付最终输出', color: 'rgba(255,130,130,0.6)' },
      ],
      capabilities: [
        { text: 'Single-sentence game concept → fully playable web game', cnText: '一句话游戏概念 → 完整可玩的网页游戏', color: 'var(--pink)' },
        { text: 'Canvas 2D, DOM-based, or hybrid rendering engine', cnText: 'Canvas 2D、DOM 或混合渲染引擎', color: 'var(--accent)' },
        { text: 'Procedural content generation (levels, items, enemies)', cnText: '程序化内容生成', color: 'hsl(342,80%,70%)' },
        { text: 'Mobile-responsive, touch-friendly controls', cnText: '移动端响应式、触屏友好操作', color: 'hsl(168,80%,50%)' },
        { text: 'Instant deploy — share a URL to your finished game', cnText: '即时部署——分享 URL 即可畅玩', color: 'hsl(252,60%,70%)' },
        { text: 'Iterate as many times as you want', cnText: '无限次迭代', color: 'var(--pink)' },
      ],
      benchmarkData: [
        { enMetric: 'Idea → Game Design', cnMetric: '需求到游戏设计', enTrad: '2-5 days', cnTrad: '2-5 天', enAi: 'Auto, same day', cnAi: '自动，当天' },
        { enMetric: 'Architecture', cnMetric: '架构设计', enTrad: '1-3 days', cnTrad: '1-3 天', enAi: '< 1 hour', cnAi: '< 1 小时' },
        { enMetric: 'Code Review', cnMetric: 'Code Review', enTrad: '30-60%', cnTrad: '30-60%', enAi: '100%', cnAi: '100%' },
        { enMetric: 'Security Bugs', cnMetric: '安全漏洞', enTrad: 'Found in test/prod', cnTrad: '测试/生产阶段', enAi: 'Blocked at review', cnAi: 'Review 拦截' },
        { enMetric: 'Regression Testing', cnMetric: '回归测试', enTrad: 'Hours manually', cnTrad: '手动数小时', enAi: 'Minutes automated', cnAi: '自动化分钟' },
        { enMetric: 'Doc Sync', cnMetric: '文档同步', enTrad: 'Weeks behind', cnTrad: '滞后数周', enAi: 'Auto on merge', cnAi: '代码合并即更新' },
        { enMetric: 'Onboarding', cnMetric: '上手周期', enTrad: '2-4 weeks', cnTrad: '2-4 周', enAi: '< 1 week', cnAi: '< 1 周' },
        { enMetric: 'Iteration Cycle', cnMetric: '迭代周期', enTrad: '2-4 weeks', cnTrad: '2-4 周', enAi: '3-7 days', cnAi: '3-7 天' },
      ],
      techs: ['Vue 3', 'HTML5 Canvas', 'JavaScript', 'CSS Animations', 'OpenClaw Subagents', 'GitHub Pages', 'EasyClaw Link'],
    }
  },
  computed: {
    currentFlow() { return this.workflows[this.activeWorkflow] || this.workflows.feature }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    this.$nextTick(() => this.setupObserver())
  },
  beforeDestroy() { window.removeEventListener('scroll', this.onScroll) },
  methods: {
    toggleLang() { this.lang = this.lang === 'en' ? 'zh' : 'en' },
    onScroll() { this.scrolled = window.scrollY > 60 },
    setupObserver() {
      const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible') }) }, { threshold: 0.1 })
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    },
    scrollTo(sel) { const el = document.querySelector(sel); if (el) el.scrollIntoView({ behavior: 'smooth' }) },
    openGame(url) { window.open(url, '_blank') },
    handleIdea() {
      const idea = this.ideaInput.trim()
      if (!idea) { this.scrollTo('#cta'); return }
      this.ideaInput = this.lang === 'en' ? 'Pipeline building...' : '流水线构建中...'
      setTimeout(() => { this.ideaInput = '' }, 2000)
    },
    downloadSkillPack() {
      const link = document.createElement('a')
      link.href = BASE + '/downloads/agent-legion-skill-pack.zip'
      link.download = 'agent-legion-skill-pack.zip'
      link.click()
    },
    downloadSkillPack() {
      const link = document.createElement('a')
      link.href = BASE + '/downloads/agent-legion-skill-pack.zip'
      link.download = 'agent-legion-skill-pack.zip'
      link.click()
      this.$nextTick(() => { link.remove() })
    }
  }
}
</script>

<style>
.pain-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; max-width: 900px; margin: 0 auto 48px; }
.pain-card { padding: 14px 18px; border-radius: 12px; background: rgba(255,255,255,.02); backdrop-filter: blur(4px); box-shadow: inset 0 1px 1px rgba(255,255,255,.08); font-size: 13px; color: hsl(var(--muted-foreground)); display: flex; align-items: center; gap: 10px; }
.pain-card span { font-size: 16px; }
@media(max-width:640px){.pain-cards{grid-template-columns:1fr}}
.agent-detail { font-size: 12px; color: hsl(var(--muted-foreground)); opacity: 0.7; margin-top: 4px; }
.agent-detail .detail-label { color: var(--accent); opacity: 0.8; }
.agent-arrow { font-size: 20px; color: hsl(var(--muted-foreground)); opacity: 0.3; flex-shrink: 0; }
.workflow-tabs { display: flex; gap: 12px; justify-content: center; margin-bottom: 40px; flex-wrap: wrap; }
.workflow-tab { padding: 10px 24px; border-radius: 100px; background: rgba(255,255,255,.03); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,.06); color: hsl(var(--muted-foreground)); font-size: 14px; cursor: pointer; font-family: var(--font-body); transition: all .3s; }
.workflow-tab:hover { background: rgba(255,255,255,.06); color: hsl(var(--foreground)); }
.workflow-tab.active { background: rgba(168,130,255,.12); border-color: var(--accent); color: hsl(var(--foreground)); }
.workflow-flow { display: flex; flex-direction: column; align-items: center; gap: 0; max-width: 640px; margin: 0 auto; }
.wf-step { display: flex; align-items: center; gap: 16px; padding: 16px 24px; border-radius: 12px; background: rgba(255,255,255,.02); backdrop-filter: blur(4px); box-shadow: inset 0 1px 1px rgba(255,255,255,.08); width: 100%; }
.wf-step-num { width: 28px; height: 28px; border-radius: 50%; background: rgba(168,130,255,.15); display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 12px; color: var(--accent); flex-shrink: 0; }
.wf-step-icon { font-size: 22px; flex-shrink: 0; }
.wf-step-info { flex: 1; }
.wf-step-title { font-family: var(--font-display); font-size: 17px; letter-spacing: -.2px; }
.wf-step-detail { font-size: 12px; color: hsl(var(--muted-foreground)); opacity: .7; }
.wf-arrow { color: hsl(var(--muted-foreground)); opacity: .3; font-size: 18px; padding: 4px 0; }
.benchmark-table { max-width: 860px; margin: 0 auto; border-radius: var(--radius-lg); overflow: hidden; background: rgba(255,255,255,.02); backdrop-filter: blur(4px); box-shadow: inset 0 1px 1px rgba(255,255,255,.08); }
.bm-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border-bottom: 1px solid rgba(255,255,255,.04); }
.bm-row:last-child { border-bottom: none; }
.bm-header { background: rgba(168,130,255,.06); font-family: var(--font-mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; }
.bm-cell { padding: 14px 20px; font-size: 13px; color: hsl(var(--muted-foreground)); }
.bm-metric { color: hsl(var(--foreground)); font-weight: 500; }
.bm-trad { color: hsla(0,80%,70%,.7); }
.bm-ai { color: hsla(168,80%,60%,.9); font-weight: 500; }

/* Hero Demo */
.hero-demo { margin-top: 36px; padding: 12px; border-radius: var(--radius-lg); background: rgba(255,255,255,.02); backdrop-filter: blur(4px); box-shadow: inset 0 1px 1px rgba(255,255,255,.08); }
.demo-header { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; margin-bottom: 12px; }
.demo-frame { border-radius: var(--radius-md); overflow: hidden; background: #000; aspect-ratio: 16 / 9; }
.demo-frame iframe { width: 100%; height: 100%; border: 0; }
.demo-controls { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 10px; font-size: 12px; color: hsl(var(--muted-foreground)); }
.control-label { font-weight: 500; color: hsl(var(--foreground)); }
.control-item { padding: 4px 10px; border-radius: 8px; background: rgba(255,255,255,.04); }
@media (max-width: 768px) {
  .hero-demo { margin-top: 24px; padding: 8px; }
  .demo-controls { gap: 8px; font-size: 11px; }
}
</style>
