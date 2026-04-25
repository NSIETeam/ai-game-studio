---
name: ai-game-studio-agent-pack
description: "AI Game Studio - 6-Agent game development pipeline. Input a one-sentence game idea, outputs a fully playable web game."
author: "NSIETeam"
version: "1.0.0"
trigger: |
  Keywords: game, game development, game idea, game design, AI game, game studio, game pipeline, 游戏, 游戏创作, 游戏设计
  When user says: "make me a game", "I have a game idea", "create a game", "帮我做个游戏", "写个游戏"
tools:
  - sessions_spawn
  - write
  - exec
  - read
---

# AI Game Studio — 6-Agent Game Development Pipeline

## 🎯 What is this?

AI Game Studio is a **6-Agent AI game development pipeline** for OpenClaw. 
Give it a one-sentence game idea, and 6 specialized AI agents work in sequence to produce a fully playable web game.

## 🤖 The Six Agents

| # | Agent | Role |
|---|-------|------|
| 1 | 🎮 Game Designer | Analyzes your idea → writes PRD/GDD |
| 2 | 🎨 Pixel Artist | Creates visual specs (colors, sprites, UI) |
| 3 | 🏗️ Game Architect | Designs code structure & state machine |
| 4 | ⚡ Game Coder | Writes the complete HTML game |
| 5 | 🔍 Game Tester | Finds bugs & suggests improvements |
| 6 | 🚀 Game Publisher | Packages & finalizes |

## 📥 How to Use

### Quick Start (One Command)

Paste this in OpenClaw:

> "make me a game where [describe your idea in one sentence]"

Example:
> "make me a game where a dinosaur runs and jumps over cacti"

### Manual Pipeline (Step by Step)

If you want full control, run these commands in sequence:

**Step 1 - Game Designer:**
\\\
Spawn a subagent with: "You are a Game Designer. User wants: [paste idea]. Write a PRD with core mechanics, rules, difficulty curve, control scheme, and target audience."
\\\

**Step 2 - Pixel Artist:**
\\\
Pass the PRD to a Pixel Artist agent: "You are a Pixel Artist. Based on this GDD [paste], define color palette, sprite dimensions, UI mockups, animation frames, and tilemap layout."
\\\

**Step 3 - Game Architect:**
\\\
Pass PRD + Visual Spec to Architect: "You are a Game Architect. Design the code architecture: module decomposition, state machine, game loop, collision detection, scoring, data flow."
\\\

**Step 4 - Game Coder:**
\\\
Pass Architecture + Visual Spec to Coder: "You are a Game Coder. Write a complete, self-contained HTML game. Implement all mechanics, rendering, input, sound, and optimizations."
\\\

**Step 5 - Game Tester:**
\\\
Pass the game HTML to Tester: "You are a Game Tester. Load and test this game. Check: boundary conditions, input edge cases, collision accuracy, performance, balance. Output structured bug report."
\\\

**Step 6 - Game Publisher:**
\\\
Pass final game + bug report to Publisher: "You are a Game Publisher. Apply bug fixes, minify code, generate metadata (thumbnail, title, desc), create deployable artifact."
\\\

### Automated Pipeline Script

Create a file \pipeline.sh\ (Linux/Mac) with:

\\\ash
#!/bin/bash
# AI Game Studio Automated Pipeline
# Usage: ./pipeline.sh "your game idea in one sentence"

IDEA=\\"\\\"
echo "🎮 Step 1: Game Designer analyzing..."
# ... (use sessions_spawn sequentially)
echo "🎨 Step 2: Pixel Artist creating visuals..."
echo "🏗️ Step 3: Game Architect designing structure..."
echo "⚡ Step 4: Game Coder writing code..."
echo "🔍 Step 5: Game Tester validating..."
echo "🚀 Step 6: Game Publisher finalizing..."
echo "✅ Game complete!"
\\\

## 🎯 Example Outputs

The pipeline has already produced these games:
- 🦖 **Dino Run** - https://nsieteam.github.io/ai-game-studio/games/dino-run/
- 🚀 **Space Shooter** - https://nsieteam.github.io/ai-game-studio/games/space-shooter/
- 🧱 **星碎 Breakout** - https://nsieteam.github.io/ai-game-studio/games/breakout/

## 📁 Output Format

Each agent passes artifacts to the next via \sessions_spawn\. 
The final output is a **single HTML file** containing the complete playable game.

## 🔧 Requirements

- OpenClaw with \sessions_spawn\ capability
- Internet connection for AI model access

## 🌐 Learn More

- Website: https://nsieteam.github.io/ai-game-studio/
- GitHub: https://github.com/NSIETeam/ai-game-studio
- Hackathon: Fu Sheng AI Teenager Hackathon (Apr 24 - May 10, 2026)
