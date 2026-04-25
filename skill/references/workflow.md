# Workflow — AI Game Studio Pipeline

## Pipeline Overview

```
User Input (1 sentence idea)
  │
  ▼
┌─────────────────────────────────────────────────────────────┐
│ 🎮 Game Designer → 🎨 Pixel Artist → 🏗️ Architect          │
│ → ⚡ Game Coder → 🔍 Game Tester → 🚀 Publisher            │
└─────────────────────────────────────────────────────────────┘
  │
  ▼
Playable HTML Game
```

## Execution Modes

### Mode A: Fully Automated (Recommended)

Use the `sessions_spawn` tool to chain all 6 agents:

```javascript
// Pseudocode — adapt to your OpenClaw environment
const idea = "your game idea here"

// Step 1: Game Designer
const prd = await sessions_spawn({
  task: `You are a Game Designer. Analyze: "${idea}". Output a complete PRD/GDD.`,
  mode: "run"
})

// Step 2: Pixel Artist  
const visualSpec = await sessions_spawn({
  task: `You are a Pixel Artist. Based on this GDD: [${prd}], create visual specs.`,
  mode: "run"
})

// Step 3: Game Architect
const archDoc = await sessions_spawn({
  task: `You are a Game Architect. Using [PRD] and [Visual Spec], design the architecture.`,
  mode: "run"
})

// Step 4: Game Coder
const gameFile = await sessions_spawn({
  task: `You are a Game Coder. Implement the game using [Architecture] and [Visual Spec]. Write complete index.html.`,
  mode: "run"
})

// Step 5: Game Tester
const bugReport = await sessions_spawn({
  task: `You are a Game Tester. Test this game: [${gameFile}]. Output bug report.`,
  mode: "run"
})

// Step 6: Game Publisher
const finalGame = await sessions_spawn({
  task: `You are a Game Publisher. Fix bugs from [${bugReport}], minify, finalize.`,
  mode: "run"
})
```

### Mode B: Semi-Automated (Interactive)

Run each step one at a time — review and approve before passing to the next agent.

1. Send the user's idea to a Game Designer prompt
2. Review the PRD
3. Send PRD to Pixel Artist
4. Review visuals
5. ... continue through each stage

### Mode C: Manual (Full Control)

Read the individual agent definitions in `references/agent-definitions.md` and use each system prompt manually with `sessions_spawn`.

## Artifact Passing

Each agent's output is passed as context to the next:

| Step | Agent | Passes |
|------|-------|--------|
| 1 | Game Designer | PRD → Pixel Artist |
| 2 | Pixel Artist | Visual Spec → Architect |
| 3 | Game Architect | Architecture Doc → Coder |
| 4 | Game Coder | index.html → Tester |
| 5 | Game Tester | Bug Report → Publisher |
| 6 | Game Publisher | Final index.html + metadata |

## Pipeline Variants

### Fast Track (3 Agent)
For simple games, skip Architect and Tester:
`Designer → Artist → Coder → Publisher`

### Debug Mode
If Coder output has bugs, loop back to Coder with bug report:
`Tester → Coder (with bug fix instructions) → Tester (re-test) → Publisher`

## Quality Gates

| Gate | Check | Accept Criteria |
|------|-------|-----------------|
| GDD Review | Creative Director | Mechanics make sense, scope appropriate |
| Visual Review | Art Director | Colors match genre, dimensions feasible |
| Code Review | Lead Developer | Architecture clean, no dead code |
| QA Pass | Tester | No critical bugs, performance OK |
| Release | Publisher | Minified, metadata complete |

## File Organization

```
ai-game-studio/
├── skill/
│   ├── SKILL.md                          # This skill's main file
│   ├── references/
│   │   ├── agent-definitions.md           # Full agent prompts & specs
│   │   └── workflow.md                    # This file
│   └── scripts/
│       └── (future: automation scripts)
├── games/
│   ├── dino-run/index.html
│   ├── space-shooter/index.html
│   └── breakout/index.html
├── src/                                   # Vue 3 landing page
├── docs/                                  # Build output for GitHub Pages
└── README.md
```
