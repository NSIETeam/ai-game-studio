# 🎮 AI Game Studio

**傅盛 AI 战队 · 青少年黑客松参赛作品**

> 输入一个创意，AI 团队帮你做成游戏

AI Game Studio 是一个由 **6 个 AI Agent** 组成的数字游戏制作团队。从策划到发布，全自动流水线——你说一句话，我们出一个小游戏。

## 🧠 核心创意

多 Agent AI 数字团队的核心竞争力在于 **分工协作**：

```
用户输入创意
    ↓
🎯 策划官 → 理解创意，输出游戏策划文档
🎨 原画师 → 设计视觉风格和素材方案
🏗️ 架构师 → 制定技术方案，拆解编码任务
💻 主 程 → 编写完整游戏代码
🐛 测试员 → 审查代码，修复 Bug
🚀 发布官 → 打包并部署上线
    ↓
可玩的 HTML5 游戏
```

## 🔧 技术栈

- **前端展示**: Vue 3 + Vite
- **Agent 平台**: 基于 [OpenClaw](https://openclaw.ai) / [EasyClaw Link](https://easyclaw.link) 构建
- **多 Agent 协作**: OpenClaw 平台 Agent 流水线
- **部署**: GitHub Pages (Vite build → docs/)
- **游戏输出**: 纯前端 HTML5 Canvas 游戏

## 🏗️ 项目结构

```
ai-game-studio/
├── src/              # Vue 3 展示网站源码
│   ├── App.vue       # 主页面（包含全部展示区块）
│   ├── style.css     # 全局样式
│   └── main.js       # 入口
├── docs/             # 构建产物（GitHub Pages）
├── .github/workflows # CI/CD 自动部署
└── agent-pipeline/   # Agent Skill 定义
    ├── game-designer.md   # 策划官 Skill
    ├── pixel-artist.md    # 原画师 Skill
    ├── game-architect.md  # 架构师 Skill
    ├── game-coder.md      # 主程 Skill
    ├── game-tester.md     # 测试员 Skill
    └── game-publisher.md  # 发布官 Skill
```

## 🚀 本地开发

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 构建到 docs/
```

## 📦 提交要求

黑客松提交所需:
- [x] 项目展示网站: `https://NSIETeam.github.io/ai-game-studio/`
- [ ] 代码压缩包 (ZIP)

## 📄 License

MIT
