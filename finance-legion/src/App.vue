<template>
  <div class="app">
    <!-- Navigation -->
    <header class="header" :class="{ scrolled: scrolled }">
      <nav class="container header-inner">
        <a href="#" class="logo">
          <span class="logo-icon">✦</span>
          <span>{{ lang === 'en' ? 'AI Finance Legion' : 'AI 财务军团' }}</span>
        </a>
        <button class="lang-toggle" @click="toggleLang">
          {{ lang === 'en' ? '🇨🇳 中' : '🇬🇧 EN' }}
        </button>
        <div class="nav">
          <a href="#about" :class="{ active: activeSection === 'about' }">{{ lang === 'en' ? 'Product' : '产品' }}</a>
          <a href="#pipeline" :class="{ active: activeSection === 'pipeline' }">{{ lang === 'en' ? 'Agents' : '军团' }}</a>
          <a href="#works" :class="{ active: activeSection === 'works' }">{{ lang === 'en' ? 'Reports' : '案例' }}</a>
          <a href="#cta" class="liquid-glass-btn nav-cta">{{ lang === 'en' ? 'Start Analysis' : '开始分析' }}</a>
        </div>
      </nav>
    </header>

    <!-- Hero -->
    <section class="hero" id="hero">
      <div class="container hero-content">
        <div class="hero-badge animate-fade-rise">
          <span>✦</span>
          <span>{{ lang === 'en' ? 'AI Finance Legion — 6-Agent Financial Intelligence' : 'AI 财务军团 — 6 Agent 财务智能' }}</span>
        </div>
        <h1 class="animate-fade-rise" v-if="lang === 'en'">
          Your personal<br>
          <span class="text-muted">financial empire</span>
        </h1>
        <h1 class="animate-fade-rise" v-else>
          你的专属<br>
          <span class="text-muted">财务帝国</span>
        </h1>
        <p class="animate-fade-rise-delay" v-if="lang === 'en'">
          Six specialized AI agents working 24/7 — from accounting to investment,<br>
          tax compliance to risk control. Your CFO, forever on duty.
        </p>
        <p class="animate-fade-rise-delay" v-else>
          六大专业 Agent 全年无休——记账分析、投资建议、税务合规、风控审计。<br>
          你永不下班的专属 CFO。
        </p>
        <div class="hero-actions animate-fade-rise-delay-2">
          <button class="liquid-glass-btn" @click="scrollTo('#pipeline')">
            {{ lang === 'en' ? 'Meet the Legion' : '认识军团' }} <span>→</span>
          </button>
          <button class="liquid-glass-btn" @click="scrollTo('#works')">
            {{ lang === 'en' ? 'View Sample Reports' : '查看示例报告' }}
          </button>
        </div>

        <div class="hero-demo-area animate-fade-rise-delay-3">
          <div class="demo-tabs">
            <button v-for="(tab, ti) in demoInputs" :key="ti"
              :class="['demo-tab', { active: activeDemoTab === ti }]"
              @click="activeDemoTab = ti">
              {{ lang === 'en' ? tab.label : tab.cnLabel }}
            </button>
          </div>
          <div class="liquid-glass demo-preview">
            <div class="demo-input">
              <span class="demo-prompt-label">{{ lang === 'en' ? 'Input data:' : '输入数据：' }}</span>
              <pre><code>{{ demoInputs[activeDemoTab].data }}</code></pre>
            </div>
            <button class="demo-run-btn" @click="handleAnalyze" :disabled="isLoading">
              {{ isLoading ? '⏳ Processing...' : '▶ ' + (lang === 'en' ? 'Run Pipeline' : '运行流水线') }}
            </button>
          </div>

          <div v-if="isLoading" class="hero-loading">
            <div v-for="(step, si) in agents" :key="step.name" class="loading-step"
              :class="{ active: si <= loadingStep, done: si < loadingStep }">
              <span class="loading-dot" v-if="si < loadingStep">✓</span>
              <span class="loading-dot pulse" v-else-if="si === loadingStep">●</span>
              <span class="loading-dot" v-else>○</span>
              <span>{{ lang === 'en' ? step.name : step.cnName }}</span>
              <span v-if="si < loadingStep" class="loading-status">{{ lang === 'en' ? 'done' : '完成' }}</span>
              <span v-else-if="si === loadingStep" class="loading-status active">{{ lang === 'en' ? 'working...' : '分析中...' }}</span>
            </div>
          </div>
          <div v-if="showSuccess" class="hero-success">
            <p>📊 {{ lang === 'en' ? 'Analysis complete!' : '分析完成！' }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pipeline -->
    <section class="section pipeline" id="pipeline">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">The <span class="gradient-text">Agent Legion</span></h2>
          <h2 v-else><span class="gradient-text">AI 军团</span>编制</h2>
          <p v-if="lang === 'en'">Six specialized financial agents, each with a unique mission.</p>
          <p v-else>六大财务 Agent 各司其职，无缝协作。</p>
        </div>
        <div class="pipeline-grid">
          <div v-for="(agent, i) in agents" :key="agent.name"
            class="agent-card reveal" :style="{ transitionDelay: `${i * 0.08}s` }"
            @click="toggleAgent(i)">
            <span class="agent-step">{{ lang === 'en' ? 'AGENT' : '特工' }} {{ i + 1 }}</span>
            <div class="agent-icon" :style="{ background: agent.bg }">{{ agent.icon }}</div>
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
          <div class="pipeline-flow-note reveal">
            <span class="gradient-text">{{ lang === 'en' ? '⚡ Step 3 runs in parallel (Investment + Tax)' : '⚡ 第3步并行执行（投资 + 税务）' }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Works (Sample Reports) -->
    <section class="section works" id="works">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">Sample <span class="gradient-text">Reports</span></h2>
          <h2 v-else><span class="gradient-text">示例</span>报告</h2>
          <p v-if="lang === 'en'">Real pipeline outputs from our AI agents.</p>
          <p v-else>AI 财务军团的真实输出示例。</p>
        </div>
        <div class="works-grid">
          <div v-for="(report, i) in realWorks" :key="report.title"
            class="work-card reveal" :style="{ transitionDelay: `${i * 0.1}s` }">
            <div class="work-header">
              <div class="work-icon">{{ report.icon }}</div>
              <div class="work-title">{{ lang === 'en' ? report.title : report.cnTitle }}</div>
              <span class="work-tag">{{ report.tag }}</span>
            </div>
            <div class="work-desc">{{ lang === 'en' ? report.desc : report.cnDesc }}</div>
            <div class="work-metrics">
              <div class="metric" v-for="(m, mi) in report.metrics" :key="mi">
                <div class="metric-value" :class="m.color">{{ m.value }}</div>
                <div class="metric-label">{{ lang === 'en' ? m.label : m.cnLabel }}</div>
              </div>
            </div>
            <div class="work-actions">
              <button class="liquid-glass-btn work-btn" @click="previewReport(i)">
                📄 {{ lang === 'en' ? 'View Report' : '查看报告' }}
              </button>
              <span class="work-input">{{ lang === 'en' ? 'Agents:' : '负责 Agent：' }} <em>{{ lang === 'en' ? report.agent : report.cnAgent }}</em></span>
            </div>
            <div v-if="previewIndex === i" class="report-preview">
              <div class="preview-content" v-html="lang === 'en' ? report.preview : report.cnPreview"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="section-sm capabilities" id="about">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">What the <span class="gradient-text">Legion</span> Does</h2>
          <h2 v-else><span class="gradient-text">军团</span>能做什么</h2>
          <p v-if="lang === 'en'">From raw numbers to strategic decisions — powered by real financial APIs.</p>
          <p v-else>从原始数据到战略决策——真实金融 API 驱动。</p>
        </div>
        <div class="caps-grid">
          <div v-for="(cap, i) in capabilities" :key="cap.text"
            class="cap-item reveal" :style="{ transitionDelay: `${i * 0.06}s` }">
            <div class="cap-dot" :style="{ background: cap.color }"></div>
            <div class="cap-text">{{ lang === 'en' ? cap.text : cap.cnText }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="section-sm tech-stack">
      <div class="container">
        <div class="pipeline-header reveal">
          <h2 v-if="lang === 'en'">Powered by <span class="gradient-text">Real APIs</span></h2>
          <h2 v-else><span class="gradient-text">真实数据</span>驱动</h2>
          <p v-if="lang === 'en'">Connected to real financial data sources.</p>
          <p v-else>连接真实的金融数据源。</p>
        </div>
        <div class="tech-tags reveal">
          <span class="tech-tag" v-for="tech in techs" :key="tech">{{ tech }}</span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section" id="cta">
      <div class="container reveal">
        <h2 v-if="lang === 'en'">Ready to command your <span class="gradient-text">financial legion</span>?</h2>
        <h2 v-else>准备好指挥你的<span class="gradient-text">财务军团</span>了吗？</h2>
        <p v-if="lang === 'en'">Try the demo above — our AI team handles the rest.</p>
        <p v-else>试试上方的演示——AI 军团搞定一切。</p>
        <button class="liquid-glass-btn" @click="scrollTo('#hero')">
          {{ lang === 'en' ? 'Try Demo Now →' : '立即试用 →' }}
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-copy">
          {{ lang === 'en' ? 'AI Finance Legion — multi-agent financial intelligence' : 'AI 财务军团 — 多 Agent 财务智能' }}
        </div>
        <div class="footer-links">
          <a href="https://github.com/NSIETeam/ai-game-studio" target="_blank">GitHub</a>
          <a href="https://easyclaw.link" target="_blank">EasyClaw Link</a>
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
      lang: localStorage.getItem('aiFinanceLegionLang') || 'zh',
      activeSection: 'hero',
      activeDemoTab: 0,
      expandedAgent: null,
      previewIndex: -1,
      isLoading: false,
      showSuccess: false,
      loadingStep: -1,
      demoInputs: [
        {
          label: 'Freelancer Bills',
          cnLabel: '自由职业流水',
          data: '2025-01-05,Freelance Project Alpha,Salary,+35000\n2025-01-06,Rent (Monthly),Housing,-6000\n2025-01-07,Didi Taxi,Transport,-89\n2025-01-08,Meituan Takeout (Dinner),Food,-45\n2025-01-10,Freelance Project Beta,Salary,+28000\n2025-01-12,Taobao (MacBook M4),Electronics,-15999\n2025-01-15,Tencent Cloud Payment,SaaS,-230\n2025-01-15,Unknown Company (Consulting Fee),Other,+12000'
        },
        {
          label: 'Monthly Portfolio',
          cnLabel: '月度投资组合',
          data: '2025-01-02,Buy VOO 10 shares,Investment,-5120\n2025-01-05,Buy 510300 500 shares,Investment,-1980\n2025-01-10,Sell VOO 2 shares,Investment,+1080\n2025-01-15,Fund Dividend,Bonds,+320\n2025-01-20,Transfer to Money Market,Investment,-5000'
        },
        {
          label: 'Business Audit',
          cnLabel: '企业审计',
          data: '2025-Q1 Business: Total Revenue ¥892,000\nCost of Goods: ¥341,000\nOperating Expenses: ¥276,000\nTax Paid: ¥89,200\nInvoices: 442 total, 22 flagged\nEmployee Count: 15\nCash: ¥312,000\nReceivables: ¥86,000\nPayables: ¥43,000'
        }
      ],
      agents: [
        { name: 'Finance Auditor', cnName: '财务审计官', icon: '📊', desc: 'Cleans & classifies your transaction data, flags anomalies', cnDesc: '清洗并分类交易流水，标记异常', bg: 'rgba(0, 184, 148, 0.12)', input: 'Raw transaction data, CSV', output: 'Classified ledger + anomaly list', detail: 'Imports raw data from any source, auto-detects categories, removes duplicates, flags suspicious entries (micro-transactions, integer large transfers, after-hours activity, 3+sigma outliers).', cnDetail: '从任意来源导入原始数据，自动归类、去重、标记可疑条目（高频小额、整数大额转出、夜间操作、3+sigma 异常值）。' },
        { name: 'Financial Analyst', cnName: '财报分析官', icon: '📈', desc: 'P&L, balance sheet, cash flow, key financial ratios', cnDesc: '收支表、资产负债表、现金流量表、关键比率', bg: 'rgba(255, 130, 180, 0.12)', input: 'Classified ledger', output: 'Reports + ratios + trends', detail: 'Transforms ledger into professional-grade P&L, Balance Sheet, Cash Flow, plus liquidity/profitability/efficiency ratios with trend analysis.', cnDetail: '将分类账转为专业级收支表、资产负债表、现金流量表，以及流动性/盈利能力/效率比率和趋势分析。' },
        { name: 'Investment Advisor', cnName: '投资参谋官', icon: '💡', desc: 'Real-time market research + personal portfolio', cnDesc: '实时市场数据 + 投资组合建议', bg: 'rgba(168, 130, 255, 0.12)', input: 'Financial reports + risk profile', output: 'Asset allocation + recommendations', detail: 'Uses neodata-financial-search for live stock quotes, fund NAVs, macro indicators. Recommends asset allocation with specific instruments, stop-loss levels, and projected returns.', cnDetail: '使用 neodata-financial-search 获取实时行情，推荐资产配置和具体标的。' },
        { name: 'Tax Officer', cnName: '税务合规官', icon: '⚖️', desc: 'Tax calc, invoice compliance, optimization', cnDesc: '税额计算、发票检查、税务优化', bg: 'rgba(130, 200, 255, 0.12)', input: 'Ledger + taxpayer info', output: 'Tax report + audit', detail: 'Calculates all applicable taxes (income/VAT/corporate) with deductions. Checks invoices for fraud patterns. Suggests legal optimization.', cnDetail: '计算所有适用税费，检查发票欺诈模式，建议合法优化。' },
        { name: 'Risk Controller', cnName: '风控审计官', icon: '🛡️', desc: 'Fraud detection, compliance audit, stress test', cnDesc: '欺诈检测、合规审计、压力测试', bg: 'rgba(255, 200, 80, 0.12)', input: 'All pipeline data', output: 'Risk score + audit report', detail: 'Scans for fraud, audits compliance, checks vendor pricing, runs stress tests for income interruption scenarios.', cnDetail: '扫描欺诈、审计合规、检查供应商价格、执行收入中断压力测试。' },
        { name: 'CFO', cnName: '首席财务官', icon: '🤖', desc: 'Synthesizes everything → executive summary + action plan', cnDesc: '汇总全部，输出决策摘要和行动方案', bg: 'rgba(255, 130, 130, 0.12)', input: 'All agent outputs', output: 'Executive summary + action plan', detail: 'The commander. Synthesizes 5 agent outputs into a coherent financial portrait. Executive Summary, Full Report, Action Items, 4-score Dashboard.', cnDetail: '军团指挥官。综合全部 Agent 输出为连贯财务状况画像。高管摘要、完整报告、行动项、四维评分仪表盘。' },
      ],
      realWorks: [
        { icon: '📊', title: 'Monthly Financial Review', cnTitle: '月度财务审计报告', tag: 'Case Study', agent: 'CFO + Auditor + Analyst', cnAgent: 'CFO + 审计官 + 分析师',
          desc: 'Full pipeline run on a freelancer's 3-month data (432 transactions, 9 accounts). Complete audit, analysis, tax calc, and risk review.',
          cnDesc: '自由职业者3个月数据的完整流水线运行（432笔、9个账户）。',
          metrics: [
            { value: '¥48,320', color: 'green', label: 'Income', cnLabel: '收入' },
            { value: '¥31,250', color: 'red', label: 'Expenses', cnLabel: '支出' },
            { value: '35.3%', color: 'green', label: 'Savings Rate', cnLabel: '储蓄率' },
            { value: '82/100', color: 'green', label: 'Health', cnLabel: '健康分' } ],
          preview: '<h5>📋 Executive Summary</h5><pre>Health Score: 82/100 ✅ Low Risk
Income: ¥48,320 (+12% MoM)
Top Expenses: Rent ¥6,000, Dining ¥3,240, SaaS ¥1,890
⚠️ 12 flagged transactions >3σ
✅ Tax deductions maxed out</pre>',
          cnPreview: '<h5>📋 高管摘要</h5><pre>健康分: 82/100 ✅ 低风险
收入: ¥48,320 (环比+12%)
主要支出: 房租¥6,000, 餐饮¥3,240, SaaS¥1,890
⚠️ 12笔异常交易
✅ 税务抵扣已用满</pre>'
        },
        { icon: '💡', title: 'Investment Portfolio', cnTitle: '投资组合建议', tag: 'Demo Output', agent: 'Investment Advisor + Risk Controller', cnAgent: '投资参谋 + 风控官',
          desc: 'Risk-based asset allocation using real-time data. Balanced profile with 60/40 stock/bond split.',
          cnDesc: '基于实时数据的风险偏好型资产配置。股债比 60/40 的平衡型方案。',
          metrics: [
            { value: '60/40', color: 'green', label: 'Stock/Bond', cnLabel: '股债比' },
            { value: '12-15%', color: 'green', label: 'Target Return', cnLabel: '目标收益' },
            { value: '8.2%', color: 'green', label: 'Max Drawdown', cnLabel: '最大回撤' },
            { value: 'USD,HKD', color: 'accent', label: 'Currency', cnLabel: '货币' } ],
          preview: '<h5>📈 Balanced Portfolio</h5><pre>US Equities: 35% | A-Share: 25% | Bonds: 20% | Cash: 12% | REITs: 8%
Instruments: VOO, 510300, BND, 511880
Volatility: 11.2% (Medium)
Stop-loss: -8%</pre>',
          cnPreview: '<h5>📈 平衡型投资组合</h5><pre>美股: 35% | A股: 25% | 债券: 20% | 现金: 12% | REITs: 8%
标的: VOO, 510300, BND, 511880
波动率: 11.2%（中等）
止损: -8%</pre>'
        },
        { icon: '🛡️', title: 'Risk Audit Report', cnTitle: '风险审计报告', tag: 'Compliance', agent: 'Risk Controller + Tax Officer', cnAgent: '风控官 + 税务官',
          desc: '9 months of business transactions scanned. Fraud patterns, invoice audit, and stress test results.',
          cnDesc: '9个月企业交易记录全面扫描。欺诈检测、发票审计、压力测试。',
          metrics: [
            { value: '94%', color: 'green', label: 'Compliance', cnLabel: '合规率' },
            { value: '3', color: 'red', label: 'Issues', cnLabel: '问题' },
            { value: '6.3mo', color: 'green', label: 'Runway', cnLabel: '现金跑道' },
            { value: 'B+', color: 'accent', label: 'Credit', cnLabel: '信用评级' } ],
          preview: '<h5>🛡️ Risk Report</h5><pre>Fraud: 🟢 No confirmed patterns
⚠️ 3 suspicious txn: consulting fee, personal transfer, sandbox testing
Invoice: 342/356 verified (96%) | 14 failed
Stress Test: 6.3mo cash runway if income stops</pre>',
          cnPreview: '<h5>🛡️ 风险报告</h5><pre>欺诈: 🟢 未确认
⚠️ 3笔可疑: 咨询费、个人转账、沙盒测试
发票: 342/356 通过（96%）| 14张失败
压力测试: 收入中断可维持6.3个月</pre>'
        }
      ],
      capabilities: [
        { text: 'Auto-import & classify from any source', cnText: '从任意来源自动导入和分类交易数据', color: 'var(--green)' },
        { text: 'Real-time market data (stocks, funds, macro)', cnText: '实时市场数据（股票、基金、宏观）', color: 'var(--accent)' },
        { text: 'Professional-grade financial statements & ratios', cnText: '专业级财务报表和财务比率', color: 'hsl(342, 80%, 70%)' },
        { text: 'Tax calculation + invoice compliance audit', cnText: '综合税额计算 + 发票合规审计', color: 'hsl(168, 80%, 50%)' },
        { text: 'Fraud/AML detection & stress testing', cnText: '欺诈/反洗钱检测与压力测试', color: 'hsl(252, 60%, 70%)' },
        { text: 'Executive Summary — actionable insights', cnText: 'Executive Summary——可执行的洞察', color: 'var(--pink)' }
      ],
      techs: ['OpenClaw Subagents', 'neodata-financial-search', 'multi-search-engine', 'Vue 3', 'Velorah Design', 'GitHub Pages', 'EasyClaw Link'],
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    this.(() => this.setupObserver())
  },
  beforeDestroy() { window.removeEventListener('scroll', this.onScroll) },
  methods: {
    toggleLang() {
      this.lang = this.lang === 'en' ? 'zh' : 'en'
      localStorage.setItem('aiFinanceLegionLang', this.lang)
    },
    onScroll() {
      this.scrolled = window.scrollY > 60
      const sections = ['pipeline', 'works', 'about', 'cta']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) { this.activeSection = id; break }
        }
      }
    },
    setupObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
      }, { threshold: 0.1 })
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    },
    toggleAgent(i) { this.expandedAgent = this.expandedAgent === i ? null : i },
    scrollTo(sel) {
      const el = document.querySelector(sel)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    },
    previewReport(i) { this.previewIndex = this.previewIndex === i ? -1 : i },
    handleAnalyze() {
      this.isLoading = true
      this.showSuccess = false
      this.loadingStep = -1
      const steps = this.agents.length
      const interval = setInterval(() => {
        this.loadingStep++
        if (this.loadingStep >= steps) {
          clearInterval(interval)
          setTimeout(() => {
            this.isLoading = false
            this.showSuccess = true
            this.loadingStep = -1
          }, 400)
        }
      }, 600)
    }
  }
}
</script>
