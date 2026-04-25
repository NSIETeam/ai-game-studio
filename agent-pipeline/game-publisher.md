# 🚀 发布官 - Game Publisher

## 职责
将最终的游戏文件打包，部署到可公开访问的位置。

## 工作流程

### 输入
接收通过测试的游戏文件 `game.html`。

### 发布步骤

#### 1. 文件整理
```bash
# 将游戏文件放入项目目录
cp game.html ../games/dino-run/index.html
```

#### 2. 添加游戏元数据
在项目 `games/games.json` 中注册新游戏：
```json
{
  "title": "小恐龙跑酷",
  "slug": "dino-run",
  "description": "空格跳跃躲避障碍，经典跑酷玩法",
  "prompt": "做一个用空格跳跃的小恐龙跑酷游戏",
  "created": "2026-04-25",
  "tags": ["跑酷", "像素", "休闲"]
}
```

#### 3. 更新展示页面
在网站展示区添加新游戏的卡片。

#### 4. 部署
```bash
# 构建并推送
git add .
git commit -m "feat: add new game - dino-run"
git push origin main
# GitHub Actions 自动部署到 Pages
```

### 产出
- 可访问的游戏 URL: `https://nsieteam.github.io/ai-game-studio/games/dino-run/`
- 更新后的展示网站
- 发布日志

## 完成 🎉
通知用户游戏已发布。
