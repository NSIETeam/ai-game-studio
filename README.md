# 🎮 AI Game Studio

**傅盛 AI 战队 · 青少年黑客松参赛作品**

> 输入一个创意，AI 团队帮你做成游戏

AI Game Studio 是一个由 **6 个 AI Agent** 组成的数字游戏制作团队。从策划到发布，全自动流水线——你说一句话，我们出一个小游戏。

## 🧠 核心创意

多 Agent AI 数字团队的核心竞争力在于 **分工协作**：

```
用户输入创意 → 一句话描述你想要什么游戏
    ↓
🎯 策划官 (Game Designer) → 理解创意，输出游戏策划文档
🎨 原画师 (Pixel Artist) → 设计视觉风格和素材方案
🏗️ 架构师 (Game Architect) → 制定技术方案，拆解编码任务
💻 主 程 (Game Coder) → 编写完整游戏代码
🐛 测试员 (Game Tester) → 审查代码，修复 Bug
🚀 发布官 (Game Publisher) → 打包并部署上线
    ↓
可玩的 HTML5 游戏
```

**关键创新：** 每个 Agent 基于 OpenClaw 平台的 Subagent 机制，前一个 Agent 的输出自动成为下一个 Agent 的输入，形成完整的 AI 游戏开发流水线。

## 📊 黑客松提交内容

### 1. 项目展示网站
[https://NSIETeam.github.io/ai-game-studio/](https://NSIETeam.github.io/ai-game-studio/)

### 2. Demo 游戏

| 游戏 | 描述 | 试玩链接 |
|------|------|---------|
| 🦖 **Dino Run** | 小恐龙跑酷 — 空格跳跃躲避障碍，速度递增，粒子特效 | [试玩 →](https://NSIETeam.github.io/ai-game-studio/games/dino-run/) |
| 🚀 **Space Shooter** | 太空射击 — 鼠标控制飞船，三种敌机 AI 模式 | [试玩 →](https://NSIETeam.github.io/ai-game-studio/games/space-shooter/) |

### 3. Agent Pipeline 定义
6 个 Agent 的角色定义、职责划分、输入输出格式和工作流程文档位于 [`agent-pipeline/`](./agent-pipeline/) 目录。

## 🔧 技术栈

- **前端展示**: Vue 3 + Vite 构建的 Velorah 风格单页应用
- **Agent 平台**: 基于 [OpenClaw](https://openclaw.ai) / [EasyClaw Link](https://easyclaw.link) 构建
- **多 Agent 协作**: OpenClaw Subagent 流水线（`sessions_spawn` 接力）
- **部署**: GitHub Pages（Vite build → `docs/`）
- **游戏输出**: 纯前端 HTML5 Canvas 游戏，无外部依赖

## 📁 项目结构

```
ai-game-studio/
├── src/                  # Vue 3 展示网站源码
│   ├── App.vue          # 主页面（Velorah 风格）
│   ├── style.css        # 全局样式系统
│   └── main.js          # 入口 + Canvas 粒子背景
├── games/                # Demo 游戏
│   ├── dino-run/        # 小恐龙跑酷
│   ├── space-shooter/   # 太空射击
│   └── games.json       # 游戏元数据索引
├── agent-pipeline/       # AI Agent 定义文档
│   ├── game-designer.md       # 策划官
│   ├── pixel-artist.md        # 原画师
│   ├── game-architect.md      # 架构师
│   ├── game-coder.md          # 主程
│   ├── game-tester.md         # 测试员
│   └── game-publisher.md      # 发布官
├── docs/                 # 构建产物（GitHub Pages）
└── .github/workflows/    # CI/CD 自动部署
```

## 🚀 本地开发

```bash
npm install
npm run dev      # 开发服务器 (localhost:5173)
npm run build    # 构建到 docs/ 目录
```

## 🏆 黑客松信息

- **赛事**: 傅盛 AI 战队青少年黑客松
- **主题**: 打造多 Agent AI 数字团队
- **时间**: 2026年4月24日 — 5月10日
- **技术平台**: EasyClaw Link + OpenClaw
- **团队成员**: NSIETeam

## 📄 License

MIT
