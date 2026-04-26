# MiniCraft 3D Review

## 严重问题

1. **`leaves` 类型不可被破坏** — `hitBlock()` 中有 `if(b.type==='leaves')continue;`，导致树叶方块完全无法通过左键破坏。玩家会在放置树叶后无法拆除。

2. **树叶方块不可被拾取/选中** — 当准心对准树叶时，`hitBlock()` 直接跳过，`placeBlock()` 中也没有跳过树叶（但没有树叶 type 的检查，反而树叶会被作为放置位置选中，但放上去后永远拆不掉）。

3. **`leaves` 方块未注册在 `BLOCKS` 字典中** — `BLOCKS` 只定义了 grass/dirt/stone/wood，没有 `leaves` 条目。这意味着 `getBlockMat('leaves')` 或 `getSingleSideMat('leaves')` 会返回 undefined 导致 runtime 错误。幸运的是树叶使用了单独的材质逻辑，但 `BLOCKS` 不一致是隐患。

4. **Chunk.rebuild() 中当 solid 数量为 0 时内存泄漏** — `rebuild()` 内将 `this.mesh` 直接赋值为新的 `InstancedMesh`，但没有释放原 mesh 的 GPU 资源（`dispose()`）。长期运行会累积废弃 geometry/material。

## 中等问题

1. **碰撞检测不够精确** — `canMoveTo()` 使用硬编码的 `hw=.3` 和 `hh=.9`，但玩家的 bounding box 判断仅靠取整后 8 个角点采样，存在缝隙穿越风险。对于 1x1 的方块世界，这种采样法足以应付地面行走，但快速移动或紧贴墙壁时可能穿模。

2. **跳跃实现有瑕疵** — `onGround=false` 只有在 `velocity.y<0` 时才在落地时设置为 true。但初始状态下 `onGround=false`，导致第一帧按下空格不会跳跃（需要先下落触地一次）。站在地面边缘时也可能出现跳跃失败。

3. **放置方块时 player 位置检查有 Bug** — `placeBlock()` 中的 player 碰撞检查：
   ```js
   const px=Math.floor(player.position.x);
   const py=Math.floor(player.position.y-1.5);
   const pz=Math.floor(player.position.z);
   if(nx===px&&ny===py&&nz===pz)return;
   ```
   `player.position.y-1.5` 取值偏下（玩家的脚底），但 `ny===py+1` 只检查了头部一层。这种简化的 AABB 检查会漏掉玩家身体中间的位置，导致方块可能放置在玩家体内。

4. **破坏/放置后全量重建** — `hitBlock()` 和 `placeBlock()` 中对所有 chunk 设置 `needsRebuild=true` 并调用 `rebuildAll()`。即使只改变了一个方块，也会全量重建所有 chunk 的 InstancedMesh，性能浪费严重。

5. **树叶方块透明度渲染顺序问题** — `depthWrite:false` 解决了部分透明排序，但 `leaves` mesh 总是在 solid mesh 之后添加到场景中，没有做 painter's algorithm 排序。当玩家从特定角度观察时，树叶图层可能被 solid 方块遮盖。

6. **世界不可堆叠高度** — `H=6` 是硬编码，树頂在 y=7，但底部 stone 只到 y=5。tree trunk 第一块在 y=1（grass 之上），合理，但树叶分布在 y=5~7，恰好用完了整个世界高度，导致树的位置没有上方空间。

## 改进建议

1. **注册 `leaves` 到 `BLOCKS` 中** — 即使树叶用独立材质，也应保持 `BLOCKS` 数据结构完整，确保 `getBlockMat` 等函数不会因缺失 key 而崩溃。

2. **在 `hitBlock()` 中移除 `leaves` 跳过逻辑** — 让树叶可以被正常破坏。如果需要树叶有不同的破坏行为，应由 `BLOCKS` 属性控制而非硬编码跳过。

3. **增量重建（Dirty Region）** — 只重建被修改的 chunk，而不是全部 chunk。当前每个破坏/放置操作都调用 `rebuildAll()`，16x16 世界下影响不大，但如果世界扩大将显著拖慢。

4. **改进碰撞检测** — 使用完整的 AABB 扫掠（swept AABB）或连续碰撞检测，而不是角点采样，消除穿模风险。

5. **修复初始跳跃延迟** — 在玩家生成时设置 `onGround=true`，确保首次按下空格立即跳跃。

6. **优化 `placeBlock()` 中的玩家冲突检测** — 使用玩家 AABB（宽 0.6、高 1.8、中心偏移 y=0.9）与放置位置的 1x1x1 box 做真正的相交检测，而不是简单的取整坐标判断。

7. **添加 Footsteps/音效** — 当前完全没有音频反馈。行走、跳跃、破坏/放置方块时添加简单音效能极大提升沉浸感。

8. **UI 改进** — 当前 UI 只显示了操作提示，没有显示：
   - 当前选中的方块名称（目前只显示了 slot，但没有文字 label）
   - 准心对准的方块类型提示
   - FPS 计数器/QoL 调试信息

9. **内存管理** — 在 `rebuild()` 中将旧 mesh 从 scene 移除时，应调用 `geometry.dispose()`、`material.dispose()` 以释放 GPU 内存。特别是 `_transparent` 的 leaves mesh。

10. **Chunk 缺失检查** — `rebuildAll()` 中如果 chunk 已被 scene 移除但还在 Object.keys 中，scene.remove(this.mesh) 不会报错，但应该检查 `this.mesh.parent` 避免不必要的操作。

11. **方块高亮** — 添加准心对准方块的 outline/highlight 效果，让玩家明确知道将要破坏/放置的是哪个方块。这在视觉反馈上非常重要。

12. **移除 `leaves` 的 `depthWrite:false`** — 改为使用 `alphaTest: 0.1` 或保留 `transparent:true` 但开启 `depthWrite:true`，避免透明排序导致的视觉问题。

13. **空格跳跃冒泡问题** — `keydown` 事件中 `e.preventDefault()` 只在 `pointerLocked` 时对 Space 执行 preventDefault，但当 pointer 未锁定时按空格会导致页面滚动。建议始终 preventDefault Space 的默认行为。
