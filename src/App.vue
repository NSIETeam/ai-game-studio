<template>
  <div class="app">
    <header class="header" :class="{ scrolled: scrolled }">
      <nav class="container header-inner">
        <a href="#" class="logo" @click.prevent="goHome">
          <span class="logo-icon" style="opacity:.6;font-size:18px;font-family:var(--font-mono)">[+]</span>
          <span>{{ t('AI Game Studio','AI 游戏工作室') }}</span>
        </a>
        <button class="lang-toggle" @click="toggleLang">{{ lang==='en'?'[CN] zh':'[EN] EN' }}</button>
        <div class="nav">
          <a v-if="v!='home'" href="#" @click.prevent="goHome">{{ t('Home','首页') }}</a>
          <a href="#" @click.prevent="setView('games')" :class="{active:v==='games'}">{{ t('Games','游戏') }}</a>
          <a href="#" @click.prevent="setView('pipeline')" :class="{active:v==='pipeline'}">{{ t('Pipeline','流水线') }}</a>
          <a href="#" @click.prevent="setView('discussion')" :class="{active:v==='discussion'}">{{ t('Discussion','讨论') }}</a>
          <a href="#" @click.prevent="setView('about')" :class="{active:v==='about'}">{{ t('About','关于') }}</a>
          <a href="https://nsieteam.github.io/ai-finance-legion/" class="liquid-glass-btn nav-cta" style="gap:4px;font-size:11px"><span style="font-size:14px">[#]</span>{{ t('Finance Legion','财务军团') }}</a>
        </div>
      </nav>
    </header>

    <template v-if="v==='home'">
      <section class="hero" id="hero">
        <div class="container hero-content">
          <div class="hero-badge animate-fade-rise"><span>//</span><span>{{ t('AI Game Studio — multi-agent AI','AI 游戏工作室 — 多 Agent AI 驱动') }}</span></div>
          <h1 class="animate-fade-rise">{{ t('Ideas to Games,','创意到游戏，') }}<br><span class="text-muted">{{ t('Agent to Agent.','Agent 到 Agent。') }}</span></h1>
          <p class="animate-fade-rise-delay">{{ t('A multi-agent AI team that transforms your game ideas into playable creations.','一个多 Agent AI 团队，把你的游戏创意变成可玩的游戏。') }}</p>
          <div class="wip-banner animate-fade-rise-delay-2"><span class="wip-dot">●</span><span>{{ t('We are continuously developing new features. More modules coming soon!','我们正在持续开发新功能。更多模块即将上线！') }}</span></div>
        </div>
      </section>

      <section class="section" id="modules">
        <div class="container">
          <div class="pipeline-header reveal">
            <h2 v-html="t('Explore <span class=__gtext__>Modules</span>','<span class=__gtext__>功能模块</span>')"></h2>
            <p>{{ t('Each module is powered by a dedicated multi-agent pipeline.','每个模块由专属的多 Agent 流水线驱动。') }}</p>
          </div>
          <div class="modules-grid">

            <div class="module-card reveal" @click="setView('games')" >
              <div class="module-badge wip">WIP</div>
              <div class="module-icon">[🎮]</div>
              <h3>{{ t('Game Pipeline','游戏流水线') }}</h3>
              <p>{{ t('6 agents collaborate to turn one sentence into a playable web game.','6 个 Agent 协作，一句话变成可玩网页游戏。') }}</p>
              <div class="module-agents"><span v-for="a in ['Designer','Artist','Architect','Coder','Tester','Publisher']" :key="a">{{ a }}</span></div>
              <div class="module-footer"><span class="module-action">{{ t('View Games →','查看游戏 →') }}</span><span class="module-status">4 games live</span></div>
            </div>

            <div class="module-card reveal" @click="setView('discussion')" style="transition-delay:.1s">
              <div class="module-badge wip">WIP</div>
              <div class="module-icon">[💬]</div>
              <h3>{{ t('Agent Discussion','Agent 讨论区') }}</h3>
              <p>{{ t('Topics, threaded replies, upvotes — with multi-agent moderation.','话题、嵌套回复、点赞——多 Agent 审核。') }}</p>
              <div class="module-agents"><span v-for="a in ['Moderator','Validator','Summarizer']" :key="a">{{ a }}</span></div>
              <div class="module-footer"><span class="module-action">{{ t('Join →','参与 →') }}</span><span class="module-status">0 topics</span></div>
            </div>

            <div class="module-card reveal" @click="window.open('https://nsieteam.github.io/ai-finance-legion/','_blank')" style="transition-delay:.2s">
              <div class="module-badge live">LIVE</div>
              <div class="module-icon">[📈]</div>
              <h3>{{ t('Finance Legion','财务军团') }}</h3>
              <p>{{ t('6 financial AI agents analyze your personal finances.','6 个财务 AI Agent 分析个人财务。') }}</p>
              <div class="module-agents"><span v-for="a in ['Auditor','Analyst','Advisor','Tax','Risk','CFO']" :key="a">{{ a }}</span></div>
              <div class="module-footer"><span class="module-action">Try →</span><span class="module-status">External</span></div>
            </div>

            <div class="module-card reveal" @click="setView('pipeline')" style="transition-delay:.3s">
              <div class="module-badge wip">WIP</div>
              <div class="module-icon">[⚙️]</div>
              <h3>{{ t('Agent Pipeline','Agent 流水线') }}</h3>
              <p>{{ t('8 agents in a production pipeline.','8 个 Agent 在生产流水线上协作。') }}</p>
              <div class="module-agents"><span v-for="a in ['Designer','Artist','Architect','Coder','Tester','Publisher']" :key="a">{{ a }}</span></div>
              <div class="module-footer"><span class="module-action">{{ t('View →','查看 →') }}</span><span class="module-status">8 agents</span></div>
            </div>

          </div>
        </div>
      </section>

      <section class="section works" id="works">
        <div class="container">
          <div class="pipeline-header reveal">
            <h2 v-html="t('Game <span class=__gtext__>Library</span>','游戏<span class=__gtext__>库</span>')"></h2>
            <p>{ t('4 games created by our 6-agent pipeline.','6 Agent 流水线产出的 4 款游戏。') }</p>
          </div>
          <div class="works-grid">

            <div class="work-card reveal">
              <div class="work-header">
                <div class="work-icon">[C]</div>
                <div class="work-title">MiniCraft 3D</div>
                <span class="work-tag">New</span>
              </div>
              <div class="work-desc">{{ t('First-person sandbox in Three.js','Three.js 第一人称沙盒') }}</div>
              <div class="work-actions">
                <a :href="'/ai-game-studio/games/minecraft-3d/'" target="_blank" class="liquid-glass-btn work-btn" @click.prevent="openGame('/ai-game-studio/games/minecraft-3d/')"><span>[&gt;]</span>{ t('Play Now','立即试玩') }</a>
                <span class="work-input">Prompt: <em>一个超小的 3D 网页版 Minecraft</em></span>
              </div>
            </div>

            <div class="work-card reveal">
              <div class="work-header">
                <div class="work-icon">[D]</div>
                <div class="work-title">Dino Run</div>
                <span class="work-tag">Demo</span>
              </div>
              <div class="work-desc">{{ t('Endless runner with T-Rex','萌系小恐龙无限跑酷') }}</div>
              <div class="work-actions">
                <a :href="'/ai-game-studio/games/dino-run/'" target="_blank" class="liquid-glass-btn work-btn" @click.prevent="openGame('/ai-game-studio/games/dino-run/')"><span>[&gt;]</span>{ t('Play Now','立即试玩') }</a>
                <span class="work-input">Prompt: <em>做一个用空格跳跃的小恐龙跑酷游戏</em></span>
              </div>
            </div>

            <div class="work-card reveal">
              <div class="work-header">
                <div class="work-icon">[S]</div>
                <div class="work-title">Space Shooter</div>
                <span class="work-tag">Demo</span>
              </div>
              <div class="work-desc">{{ t('Top-down space shooter','俯视角太空射击') }}</div>
              <div class="work-actions">
                <a :href="'/ai-game-studio/games/space-shooter/'" target="_blank" class="liquid-glass-btn work-btn" @click.prevent="openGame('/ai-game-studio/games/space-shooter/')"><span>[&gt;]</span>{ t('Play Now','立即试玩') }</a>
                <span class="work-input">Prompt: <em>帮我做一个太空射击游戏</em></span>
              </div>
            </div>

            <div class="work-card reveal">
              <div class="work-header">
                <div class="work-icon">[B]</div>
                <div class="work-title">Star Shatter</div>
                <span class="work-tag">Demo</span>
              </div>
              <div class="work-desc">{{ t('Neon cyberpunk Breakout','霓虹赛博朋克打砖块') }}</div>
              <div class="work-actions">
                <a :href="'/ai-game-studio/games/breakout/'" target="_blank" class="liquid-glass-btn work-btn" @click.prevent="openGame('/ai-game-studio/games/breakout/')"><span>[&gt;]</span>{ t('Play Now','立即试玩') }</a>
                <span class="work-input">Prompt: <em>做一个打砖块 Breakout 游戏</em></span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section class="section pipeline" id="pipeline-home">
        <div class="container">
          <div class="pipeline-header reveal">
            <h2 v-html="t('The <span class=__gtext__>Agent Assembly</span> Line','<span class=__gtext__>Agent 流水线</span>')"></h2>
            <p>{{ t('Eight specialized AI agents, each with a unique craft.','八个专属 AI Agent，各司其职。') }}</p>
          </div>
          <div class="pipeline-flow">
            <div class="pipeline-stage" v-for="(st,si) in stages" :key="si">
              <div class="stage-label">{{ st.l }}</div>
              <div class="stage-agents">
                <div v-for="(a,i) in st.a" :key="a.n" class="agent-card reveal" :style="{transitionDelay:(si*4+i)*.05+'s'}" @click="toggleAgent(a.n)">
                  <div class="agent-icon" :style="{background:a.bg}">{{ a.i }}</div>
                  <div class="agent-info"><div class="agent-name">{{ t(a.n,a.cn) }}</div><div class="agent-desc">{{ t(a.d,a.cd) }}</div></div>
                  <div v-if="expanded===a.n" class="agent-detail">
                    <div class="agent-detail-inner">
                      <p>{{ t(a.dt,a.cdt) }}</p>
                      <div class="agent-detail-tags">
                        <span class="agent-detail-tag"><span class="tag-label">{{ t('INPUT','输入') }}</span><span>{{ a.inp }}</span></span>
                        <span class="agent-detail-tag"><span class="tag-label">{{ t('OUTPUT','输出') }}</span><span>{{ a.out }}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="si<stages.length-1" class="stage-connector"><span class="connector-arrow">▼</span></div>
            </div>
          </div>
          <div class="pipeline-stats reveal" style="margin-top:60px;display:flex;gap:32px;justify-content:center;flex-wrap:wrap">
            <div class="stat-card" v-for="s in stats" :key="s.l"><div class="stat-value">{{ s.v }}</div><div class="stat-label">{{ s.l }}</div></div>
          </div>
        </div>
      </section>
    </template>
test

    <template v-if="v==='games'">
      <section class="section" style="padding-top:140px">
        <div class="container">
          <div class="pipeline-header reveal">
            <h2 v-html="t('Game <span class=__gtext__>Library</span>','游戏<span class=__gtext__>库</span>')"></h2>
            <p>{{ t('4 games created by our 6-agent pipeline.','6 Agent 流水线产出的 4 款游戏。') }}</p>
          </div>
          <div class="works-grid">
            <div class="work-card reveal">
              <div class="work-header">
                <div class="work-icon">[C]</div>
                <div class="work-title">MiniCraft 3D</div>
                <span class="work-tag">New</span>
              </div>
              <div class="work-desc">{{ t('First-person sandbox in Three.js','Three.js 第一人称沙盒') }}</div>
              <div class="work-actions">
                <a :href="'/ai-game-studio/games/minecraft-3d/'" target="_blank" class="liquid-glass-btn work-btn" @click.prevent="openGame('/ai-game-studio/games/minecraft-3d/')"><span>[&gt;]</span>{{ t('Play Now','立即试玩') }}</a>
                <span class="work-input">Prompt: <em>一个超小的 3D 网页版 Minecraft</em></span>
              </div>
            </div>
            <div class="work-card reveal">
              <div class="work-header">
                <div class="work-icon">[D]</div>
                <div class="work-title">Dino Run</div>
                <span class="work-tag">Demo</span>
              </div>
              <div class="work-desc">{{ t('Endless runner with T-Rex','萌系小恐龙无限跑酷') }}</div>
              <div class="work-actions">
                <a :href="'/ai-game-studio/games/dino-run/'" target="_blank" class="liquid-glass-btn work-btn" @click.prevent="openGame('/ai-game-studio/games/dino-run/')"><span>[&gt;]</span>{{ t('Play Now','立即试玩') }}</a>
                <span class="work-input">Prompt: <em>做一个用空格跳跃的小恐龙跑酷游戏</em></span>
              </div>
            </div>
            <div class="work-card reveal">
              <div class="work-header">
                <div class="work-icon">[S]</div>
                <div class="work-title">Space Shooter</div>
                <span class="work-tag">Demo</span>
              </div>
              <div class="work-desc">{{ t('Top-down space shooter','俯视角太空射击') }}</div>
              <div class="work-actions">
                <a :href="'/ai-game-studio/games/space-shooter/'" target="_blank" class="liquid-glass-btn work-btn" @click.prevent="openGame('/ai-game-studio/games/space-shooter/')"><span>[&gt;]</span>{{ t('Play Now','立即试玩') }}</a>
                <span class="work-input">Prompt: <em>帮我做一个太空射击游戏</em></span>
              </div>
            </div>
            <div class="work-card reveal">
              <div class="work-header">
                <div class="work-icon">[B]</div>
                <div class="work-title">Star Shatter</div>
                <span class="work-tag">Demo</span>
              </div>
              <div class="work-desc">{{ t('Neon cyberpunk Breakout','霓虹赛博朋克打砖块') }}</div>
              <div class="work-actions">
                <a :href="'/ai-game-studio/games/breakout/'" target="_blank" class="liquid-glass-btn work-btn" @click.prevent="openGame('/ai-game-studio/games/breakout/')"><span>[&gt;]</span>{{ t('Play Now','立即试玩') }}</a>
                <span class="work-input">Prompt: <em>做一个打砖块 Breakout 游戏</em></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
    <template v-if="v==='pipeline'">
      <section class="section pipeline" style="padding-top:140px">
        <div class="container">
          <div class="pipeline-header reveal">
            <h2 v-html="t('The <span class=__gtext__>Agent Assembly</span> Line','<span class=__gtext__>Agent 流水线</span>')"></h2>
            <p>{{ t('Eight specialized AI agents, each with a unique craft.','八个专属 AI Agent，各司其职。') }}</p>
          </div>
          <div class="pipeline-flow">
            <div class="pipeline-stage" v-for="(st,si) in stages" :key="si">
              <div class="stage-label">{{ st.l }}</div>
              <div class="stage-agents">
                <div v-for="(a,i) in st.a" :key="a.n" class="agent-card reveal" :style="{transitionDelay:(si*4+i)*.05+'s'}" @click="toggleAgent(a.n)">
                  <div class="agent-icon" :style="{background:a.bg}">{{ a.i }}</div>
                  <div class="agent-info"><div class="agent-name">{{ t(a.n,a.cn) }}</div><div class="agent-desc">{{ t(a.d,a.cd) }}</div></div>
                  <div v-if="expanded===a.n" class="agent-detail">
                    <div class="agent-detail-inner">
                      <p>{{ t(a.dt,a.cdt) }}</p>
                      <div class="agent-detail-tags">
                        <span class="agent-detail-tag"><span class="tag-label">{{ t('INPUT','输入') }}</span><span>{{ a.inp }}</span></span>
                        <span class="agent-detail-tag"><span class="tag-label">{{ t('OUTPUT','输出') }}</span><span>{{ a.out }}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="si<stages.length-1" class="stage-connector"><span class="connector-arrow">▼</span></div>
            </div>
          </div>
          <div class="pipeline-stats reveal" style="margin-top:60px;display:flex;gap:32px;justify-content:center;flex-wrap:wrap">
            <div class="stat-card" v-for="s in stats" :key="s.l"><div class="stat-value">{{ s.v }}</div><div class="stat-label">{{ s.l }}</div></div>
          </div>
        </div>
      </section>
    </template>
    <template v-if="v==='discussion' && !activeTopic">
      <section class="section" style="padding-top:140px">
        <div class="container">
          <div class="pipeline-header reveal">
            <h2 v-html="t('Multi-Agent <span class=__gtext__>Discussion</span>','多 Agent <span class=__gtext__>讨论区</span>')"></h2>
            <p>{{ t('Topics, threaded replies, community moderation — 3 agents.','话题、嵌套回复、社区审核——3 Agent。') }}</p>
          </div>
          <div class="discussion-layout" style="max-width:800px;margin:0 auto">
            <div class="glass" style="padding:24px;border-radius:24px;margin-bottom:24px">
              <div v-if="!showForm">
                <button class="liquid-glass-btn" @click="showForm=true" style="padding:12px 28px;border-radius:100px;font-size:14px">[+] {{ t('New Topic','创建新话题') }}</button>
                <div style="margin-top:8px;font-size:11px;color:var(--muted);opacity:.5">{{ t('Moderated by Validator, Moderator, Summarizer agents','由验证器、主持人、摘要师三个 Agent 审核') }}</div>
              </div>
              <div v-if="showForm">
                <input v-model="newT" :placeholder="t('Topic title...','话题标题...')" style="width:100%;padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);color:#fff;font-size:15px;margin-bottom:10px" />
                <textarea v-model="newB" :placeholder="t('Describe your topic...','描述话题...')" rows="3" style="width:100%;padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);color:#fff;font-size:14px;resize:vertical;margin-bottom:10px"></textarea>
                <div style="display:flex;gap:10px">
                  <button class="liquid-glass-btn" @click="createTopic" :disabled="!newT.trim()" style="padding:10px 24px;border-radius:100px;font-size:13px">{{ t('Create','创建') }}</button>
                  <button class="liquid-glass-btn" @click="showForm=false;newT='';newB=''" style="padding:10px 24px;border-radius:100px;font-size:13px;opacity:.5">{{ t('Cancel','取消') }}</button>
                </div>
                <div v-if="validation" style="margin-top:8px;padding:8px 14px;border-radius:8px;font-size:12px" :class="validation.ok?'pass-msg':'fail-msg'">
                  <span v-if="validation.ok">✅ [Validator] {{ validation.msg }}</span>
                  <span v-else>🛡️ [Moderator] {{ validation.msg }}</span>
                </div>
              </div>
            </div>
            <div v-if="topics.length===0" class="glass" style="padding:48px;border-radius:24px;text-align:center">
              <div style="font-size:36px">[💬]</div>
              <p style="color:var(--muted);font-size:14px">{{ t('No topics yet. Create the first one!','还没有话题。创建第一个吧！') }}</p>
            </div>
            <div v-for="top in topics" :key="top.id" class="topic-card glass" style="padding:24px;border-radius:20px;margin-bottom:16px;cursor:pointer" @click="activeTopic=top">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px">
                <div style="flex:1">
                  <h3 style="font-family:var(--font-display);font-size:20px;margin-bottom:4px">{{ top.title }}</h3>
                  <p v-if="top.body" style="font-size:13px;color:var(--muted);margin-bottom:8px">{{ top.body }}</p>
                  <div style="display:flex;gap:16px;font-size:11px;color:var(--muted);opacity:.6">
                    <span>{{ top.author||'Anonymous' }}</span><span>{{ top.time }}</span>
                    <span>{{ top.r.length }} {{ t('replies','回复') }}</span><span>{{ top.up }} {{ t('upvotes','点赞') }}</span>
                  </div>
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
                  <button class="vote-btn" @click.stop="upvote(top.id)">▲</button>
                  <span style="font-size:13px;font-family:var(--font-mono)">{{ top.up }}</span>
                </div>
              </div>
              <div v-if="top.summary" style="margin-top:12px;padding:10px 14px;background:rgba(168,130,255,.06);border-radius:10px;font-size:12px;color:hsl(252,50%,75%)"><span style="opacity:.6">[Summarizer]</span> {{ top.summary }}</div>
            </div>
          </div>
        </div>
      </section>
    </template>
    <template v-if="activeTopic">
      <section class="section" style="padding-top:140px">
        <div class="container" style="max-width:800px">
          <button class="liquid-glass-btn" @click="activeTopic=null" style="padding:8px 20px;border-radius:100px;font-size:12px;margin-bottom:24px">← {{ t('Back','返回') }}</button>
          <div class="glass" style="padding:32px;border-radius:24px;margin-bottom:24px">
            <h2 style="font-family:var(--font-display);font-size:28px;margin-bottom:8px">{{ activeTopic.title }}</h2>
            <p v-if="activeTopic.body" style="font-size:14px;color:var(--muted);margin-bottom:12px">{{ activeTopic.body }}</p>
            <div style="display:flex;gap:16px;font-size:12px;color:var(--muted);opacity:.6">
              <span>{{ activeTopic.author||'Anonymous' }}</span><span>{{ activeTopic.time }}</span>
              <button class="vote-btn-sm" @click="upvote(activeTopic.id)">▲ {{ activeTopic.up }}</button>
            </div>
          </div>
          <div class="glass" style="padding:24px;border-radius:24px;margin-bottom:24px">
            <input v-model="rName" :placeholder="t('Your name','你的名字')" style="width:100%;padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);color:#fff;font-size:14px;margin-bottom:8px" />
            <textarea v-model="rText" :placeholder="t('Write a reply...','写下回复...')" rows="2" style="width:100%;padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);color:#fff;font-size:14px;resize:vertical;margin-bottom:8px"></textarea>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
              <button class="liquid-glass-btn" @click="addReply" :disabled="!rText.trim()" style="padding:8px 20px;border-radius:100px;font-size:13px">{{ t('Post Reply','发表回复') }}</button>
              <span style="font-size:11px;color:var(--muted);opacity:.5">[Moderator] {{ t('auto-moderated','自动审核') }}</span>
            </div>
          </div>
          <div v-if="activeTopic.r.length===0" class="glass" style="padding:32px;border-radius:24px;text-align:center;color:var(--muted);font-size:13px;opacity:.5">{{ t('No replies yet.','暂无回复。') }}</div>
          <div v-for="(rp,ri) in activeTopic.r" :key="ri" class="glass" style="padding:20px;border-radius:20px;margin-bottom:12px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-size:13px;color:var(--green);font-family:var(--font-mono)">[#{{ ri+1 }}]</span>
              <span style="font-size:13px;font-weight:500">{{ rp.n||'Anonymous' }}</span>
              <span style="font-size:11px;color:var(--muted);opacity:.5">{{ rp.t }}</span>
              <div style="margin-left:auto"><button class="vote-btn-xs" @click.stop="upvoteReply(activeTopic.id,ri)">▲ {{ rp.up||0 }}</button></div>
            </div>
            <p style="font-size:13px;color:var(--muted);line-height:1.6;white-space:pre-wrap">{{ rp.text }}</p>
            <div v-if="rp.rr&&rp.rr.length>0" style="margin-top:12px;margin-left:24px;padding-left:16px;border-left:1px solid rgba(255,255,255,.06)">
              <div v-for="(nr,nri) in rp.rr" :key="nri" style="padding:10px 0;border-top:1px solid rgba(255,255,255,.03)">
                <div><span style="font-size:12px;font-weight:500;color:var(--accent)">{{ nr.n||'Anonymous' }}</span><span style="font-size:10px;color:var(--muted);opacity:.4"> {{ nr.t }}</span></div>
                <p style="font-size:12px;color:var(--muted);line-height:1.5">{{ nr.text }}</p>
              </div>
            </div>
            <div v-if="rp.showNest" style="margin-top:10px;margin-left:24px">
              <textarea v-model="nestT" :placeholder="t('Write a nested reply...','写下嵌套回复...')" rows="1" style="width:100%;padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);color:#fff;font-size:12px;resize:vertical;margin-bottom:6px"></textarea>
              <div style="display:flex;gap:8px">
                <button class="liquid-glass-btn" @click="addNest(ri)" :disabled="!nestT.trim()" style="padding:6px 16px;border-radius:100px;font-size:11px">{{ t('Reply','回复') }}</button>
                <button class="liquid-glass-btn" @click="rp.showNest=false;nestT=''" style="padding:6px 16px;border-radius:100px;font-size:11px;opacity:.5">{{ t('Cancel','取消') }}</button>
              </div>
            </div>
            <button v-if="!rp.showNest" @click.stop="rp.showNest=true" style="margin-top:8px;margin-left:24px;padding:4px 12px;border-radius:100px;border:none;background:rgba(255,255,255,.03);color:var(--muted);font-size:11px;cursor:pointer">⤶ {{ t('Reply','回复') }}</button>
          </div>
        </div>
      </section>
    </template>
    <template v-if="v==='about'">
      <section class="section" style="padding-top:140px">
        <div class="container">
          <div class="pipeline-header reveal">
            <h2 v-html="t('About <span class=__gtext__>AI Game Studio</span>','关于<span class=__gtext__>AI 游戏工作室</span>')"></h2>
            <p>{{ t('Built for the 2025 Fosun AI Hackathon.','为 2025 复星 AI 黑客松打造。') }}</p>
          </div>
          <div class="glass" style="padding:40px;border-radius:24px;max-width:700px;margin:0 auto">
            <div class="caps-grid">
              <div v-for="(c,i) in caps" :key="c.en" class="cap-item reveal" :style="{transitionDelay:i*.06+'s'}">
                <div class="cap-dot" :style="{background:c.c}"></div>
                <div class="cap-text">{{ t(c.en,c.cn) }}</div>
              </div>
            </div>
            <div class="tech-tags" style="margin-top:32px;justify-content:flex-start">
              <span class="tech-tag" v-for="t in techs" :key="t">{{ t }}</span>
            </div>
          </div>
        </div>
      </section>
    </template>
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-copy">{{ t('AI Game Studio — multi-agent AI. Continuously developing.','AI 游戏工作室 — 多 Agent AI。持续开发中。') }}</div>
        <div class="footer-links">
          <a href="https://github.com/NSIETeam/ai-game-studio" target="_blank">GitHub</a>
          <a href="https://nsieteam.github.io/ai-finance-legion/" target="_blank">Finance Legion</a>
          <a href="https://easyclaw.link" target="_blank">EasyClaw</a>
          <span style="font-size:11px;color:rgba(255,255,255,.2)">{{ t('WIP','开发中') }}</span>
        </div>
      </div>
    </footer>
  </div>
</template><script>
var BASE = "/ai-game-studio";
export default {
  name: "App",
  data() {
    var d = {
      lang: localStorage.getItem('aiGameStudioLang') || 'en',
      v: 'home', scrolled: false, expanded: null,
      showForm: false, newT: '', newB: '', validation: null,
      rName: '', rText: '', nestT: '', activeTopic: null,
      topics: [], topId: 1,
      stats: [
        {l:'Active Agents',v:'8'},{l:'Games Created',v:'4'},{l:'Stages',v:'2'},{l:'Agent Logic',v:'840+'}
      ],
      stages: [{l:"Creation Pipeline",a:[
   {n:"Game Designer",cn:"\u7b56\u5212\u5b98",i:"[D]",d:"Defines mechanics",cd:"\u5b9a\u4e49\u73a9\u6cd5",bg:"rgba(168,130,255,.12)",dt:"Analyzes idea into GDD.",cdt:"\u5206\u6790\u521b\u610f\u4e3a\u5b8c\u6574GDD\u3002",inp:"Idea",out:"GDD"},
   {n:"Pixel Artist",cn:"\u7f8e\u672f\u5e08",i:"[A]",d:"Creates sprites",cd:"\u521b\u4f5c\u7cbe\u7075\u56fe",bg:"rgba(255,130,180,.12)",dt:"GDD to visual specs.",cdt:"GDD\u8f6c\u89c6\u89c9\u89c4\u8303\u3002",inp:"GDD",out:"Visual Spec"},
   {n:"Game Architect",cn:"\u67b6\u6784\u5e08",i:"[+]",d:"Designs structure",cd:"\u8bbe\u8ba1\u7ed3\u6784",bg:"rgba(130,200,255,.12)",dt:"Module decomposition, state machine.",cdt:"\u6a21\u5757\u62c6\u5206\u3001\u72b6\u6001\u673a\u3002",inp:"GDD+Spec",out:"Arch Doc"},
   {n:"Game Coder",cn:"\u5de5\u7a0b\u5e08",i:"[C]",d:"Writes game code",cd:"\u7f16\u5199\u4ee3\u7801",bg:"rgba(100,220,180,.12)",dt:"Writes self-contained HTML game.",cdt:"\u7f16\u5199\u5355\u4e00HTML\u6e38\u620f\u3002",inp:"Arch Doc",out:"index.html"},
   {n:"Game Tester",cn:"\u6d4b\u8bd5\u5b98",i:"[T]",d:"Finds bugs",cd:"\u53d1\u73b0Bug",bg:"rgba(255,200,80,.12)",dt:"Tests and bugs report.",cdt:"\u6d4b\u8bd5\u5e76\u8f93\u51faBug\u62a5\u544a\u3002",inp:"index.html",out:"Bug Report"},
   {n:"Game Publisher",cn:"\u53d1\u884c\u5b98",i:"[P]",d:"Deploys game",cd:"\u90e8\u7f72\u6e38\u620f",bg:"rgba(255,130,130,.12)",dt:"Deployable artifact + gallery entry.",cdt:"\u53ef\u90e8\u7f72\u4ea7\u7269\u548c\u753b\u5eca\u3002",inp:"Final code",out:"URL"},
   ]},{l:"QA & Deploy",a:[
   {n:"Web Fixer",cn:"\u4fee\u590d\u4e13\u5bb6",i:"[W]",d:"Verifies rendering",cd:"\u9a8c\u8bc1\u6e32\u67d3",bg:"rgba(255,150,50,.12)",dt:"Checks CDN/404/SPA issues.",cdt:"\u68c0\u67e5CDN/404/SPA\u95ee\u9898\u3002",inp:"URL",out:"Verification"},
   {n:"Project Overseer",cn:"\u76d1\u7763\u4eba",i:"[O]",d:"Quality review",cd:"\u8d28\u91cf\u5ba1\u67e5",bg:"rgba(200,200,255,.15)",dt:"Multi-dimensional QA: completeness, links.",cdt:"\u591a\u7ef4\u5ea6\u5ba1\u67e5: \u5b8c\u6574\u6027\u3001\u94fe\u63a5\u3002",inp:"All outputs",out:"Report"},
   ]}],
      works: [
   {t:'MiniCraft 3D',tag:'New',d:'First-person sandbox in Three.js',cd:'Three.js \u7b2c\u4e00\u4eba\u79f0\u6c99\u76d2',u:BASE+'/games/minecraft-3d/',i:'[C]',p:'\u8d85\u5c0f 3D \u7f51\u9875\u7248 Minecraft'},
   {t:'Dino Run',tag:'Demo',d:'Endless runner with T-Rex',cd:'\u5c0f\u6050\u9f99\u65e0\u9650\u8dd1\u9177',u:BASE+'/games/dino-run/',i:'[D]',p:'\u7528\u7a7a\u683c\u8df3\u8dc3\u7684\u5c0f\u6050\u9f99\u8dd1\u9177\u6e38\u620f'},
   {t:'Space Shooter',tag:'Demo',d:'Top-down space shooter',cd:'\u4fef\u89c6\u89d2\u592a\u7a7a\u5c04\u51fb',u:BASE+'/games/space-shooter/',i:'[S]',p:'\u592a\u7a7a\u5c04\u51fb\u6e38\u620f'},
   {t:'Star Shatter',tag:'Demo',d:'Neon cyberpunk Breakout',cd:'\u9713\u8679\u8d5b\u535a\u670b\u514b\u6253\u7816\u5757',u:BASE+'/games/breakout/',i:'[B]',p:'\u6253\u7816\u5757 Breakout \u6e38\u620f'},
      ],
      caps: [
   {en:'Single-sentence concept to playable web game',cn:'\u4e00\u53e5\u8bdd\u5230\u53ef\u73a9\u6e38\u620f',c:'var(--pink)'},
   {en:'Canvas 2D, DOM, or hybrid rendering',cn:'Canvas/DOM\u6df7\u5408\u6e32\u67d3',c:'var(--accent)'},
   {en:'Procedural content generation',cn:'\u7a0b\u5e8f\u5316\u5185\u5bb9\u751f\u6210',c:'hsl(342,80%,70%)'},
   {en:'Mobile-responsive, touch-friendly',cn:'\u79fb\u52a8\u7aef\u54cd\u5e94\u5f0f',c:'hsl(168,80%,50%)'},
   {en:'Instant deploy - share URL',cn:'\u5373\u65f6\u90e8\u7f72\u5206\u4eabURL',c:'hsl(252,60%,70%)'},
   {en:'Infinite iteration cycles',cn:'\u65e0\u9650\u6b21\u8fed\u4ee3',c:'var(--pink)'},
      ],
      techs: ['Vue 3','HTML5 Canvas','JavaScript','CSS Animations','OpenClaw','GitHub Pages','EasyClaw'],
    };
    try { var s = JSON.parse(localStorage.getItem("gsTopics")); if (s && Array.isArray(s)) d.topics = s; } catch(e) {}
    return d;
  },
  computed: {
    t() { return function(en, zh) { return this.lang === "en" ? en : zh; }; }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    this.$nextTick(() => {
      var ob = new IntersectionObserver((es) => {
        es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, {threshold:0.1});
      document.querySelectorAll('.reveal').forEach(el => ob.observe(el));
    });
  },
  beforeDestroy() { window.removeEventListener('scroll', this.onScroll); },
  methods: {
    toggleLang() { this.lang = this.lang === 'en' ? 'zh' : 'en'; localStorage.setItem('aiGameStudioLang', this.lang); },
    setView(v) { this.v = v; window.scrollTo(0,0); },
    goHome() { this.v = 'home'; this.activeTopic = null; window.scrollTo(0,0); },
    openGame(url) { window.open(url, '_blank'); },
    toggleAgent(n) { this.expanded = this.expanded === n ? null : n; },
    onScroll() { this.scrolled = window.scrollY > 60; },
    createTopic() {
      var title = this.newT.trim();
      if (!title) return;
      if (title.length < 3) { this.validation = {ok:false, msg:'Title too short (min 3 chars).'}; return; }
      if (title.length > 100) { this.validation = {ok:false, msg:'Title too long (max 100 chars).'}; return; }
      var topic = {
        id: this.topId++, title: title, body: this.newB.trim(),
        author: 'Guest',
        time: new Date().toLocaleDateString('en-US', {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}),
        up: 1, r: [],
        summary: 'Topic approved. ' + (title.length > 50 ? 'Consider shorter title.' : 'Good title length.')
      };
      this.topics.unshift(topic);
      this.saveTopics();
      this.showForm = false; this.newT = ''; this.newB = ''; this.validation = null;
    },
    upvote(id) { var t = this.topics.find(x => x.id === id); if (t) t.up++; },
    upvoteReply(id, ri) { var t = this.topics.find(x => x.id === id); if (t && t.r[ri]) { t.r[ri].up = (t.r[ri].up || 0) + 1; } },
    addReply() {
      if (!this.rText.trim() || !this.activeTopic) return;
      this.activeTopic.r.push({
        n: this.rName.trim() || 'Guest', text: this.rText.trim(),
        t: new Date().toLocaleDateString('en-US', {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}),
        up: 0, rr: [], showNest: false
      });
      this.rText = ''; this.saveTopics();
    },
    addNest(ri) {
      if (!this.nestT.trim() || !this.activeTopic || !this.activeTopic.r[ri]) return;
      this.activeTopic.r[ri].rr.push({
        n: this.rName.trim() || 'Guest', text: this.nestT.trim(),
        t: new Date().toLocaleDateString('en-US', {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})
      });
      this.nestT = ''; this.activeTopic.r[ri].showNest = false; this.saveTopics();
    },
    saveTopics() { try { localStorage.setItem("gsTopics", JSON.stringify(this.topics)); } catch(e) {} },
  }
}
</script>
