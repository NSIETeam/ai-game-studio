# -*- coding: utf-8 -*-
"""Fix MiniCraft 3D — Overseer-identified bugs."""
import os

os.chdir(r'C:\Users\KING\.qclaw\workspace\ai-game-studio\games\minecraft-3d')

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

changes = []

# Fix 1+6+7: clear waterBlocks on generateWorld
old = 'function generateWorld(){'
new = '''function generateWorld(){
  // Clear old water meshes
  for(const w of waterBlocks){if(w.mesh.parent)w.mesh.parent.remove(w.mesh);w.mesh.geometry.dispose();w.mesh.material.dispose();}
  waterBlocks=[];'''
assert old in c, f"Cant find: {old[:50]}"
c = c.replace(old, new)
changes.append('1+6+7: water cleanup on generateWorld')

# Fix 2: check player position before destroying
old = 'function hitBlock(){'
new = '''function hitBlock(){
  // Player standing position
  const standX=Math.floor(player.position.x),standZ=Math.floor(player.position.z);
  const standY=Math.floor(player.position.y-0.1);'''
assert old in c
c = c.replace(old, new)
changes.append('2: player stand pos added')

old = '  if(bestBlock&&bestDist<6){'
new = '''  if(bestBlock&&bestDist<6){
    // Dont break block under feet
    if(bestBlock.x===standX&&bestBlock.z===standZ&&(bestBlock.y===standY||bestBlock.y===standY+1))return;'''
assert old in c
c = c.replace(old, new)
changes.append('2b: block under feet check added')

# Fix 3: grass exempt from inventory
old = "if(inventory[selType]>0||selType==='dirt'||selType==='stone'){"
new = "if(inventory[selType]>0||selType==='dirt'||selType==='stone'||selType==='grass'){"
assert old in c
c = c.replace(old, new)
changes.append('3: grass exempt from inventory')

# Fix 5: void detection
old = '  // Clamp to world'
new = '''  // Void detection - respawn if fallen out
  if(player.position.y<-16){
    player.position.set(8,12,8);velocity.set(0,0,0);onGround=false;
  }
  // Clamp to world'''
assert old in c
c = c.replace(old, new)
changes.append('5: void respawn added')

# Fix 8: leaf render order
old = "const lMat=new THREE.MeshLambertMaterial({map:TEX.leaves,transparent:true,opacity:.85,depthWrite:false});"
new = "const lMat=new THREE.MeshLambertMaterial({map:TEX.leaves,transparent:true,opacity:.85,depthWrite:false,renderOrder:1});"
assert old in c
c = c.replace(old, new)
changes.append('8: leaf renderOrder=1')

# Fix game title
old = '<h1>[' + '+] MiniCraft 3D</h1>'
new = '<h1>MiniCraft 3D</h1>'
c = c.replace(old, new)
changes.append('title cleaned')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print(f'Written {len(c)} bytes')
for ch in changes:
    print(f'  [OK] {ch}')
