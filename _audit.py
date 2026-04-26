# -*- coding: utf-8 -*-
import os, re, unicodedata

os.chdir(r'C:\Users\KING\.qclaw\workspace\ai-game-studio\src')

with open('App.vue', 'r', encoding='utf-8') as f:
    app = f.read()
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()
with open('main.js', 'r', encoding='utf-8') as f:
    main = f.read()

issues = []

# 1. CSS class mismatch
template_classes = re.findall(r'class="([\w-]+)"', app)
template_classes += re.findall(r"class='([\w-]+)'", app)
template_classes += re.findall(r'\.([\w-]+)\s*{', css, re.DOTALL)

template_set = set(template_classes)
css_classes = set(re.findall(r'\.([\w-]+)\s*\{', css))

for cls in sorted(template_set):
    if cls in ('app','nav','header','footer','section','h1','h2','p','a','button','img','input','span','div'):
        continue
    if cls in css_classes:
        continue
    # Check if it's used in template
    if f'class="{cls}' in app or f"class='{cls}" in app or f'.{cls}' in app:
        if cls not in css_classes:
            issues.append(f'MISSING CSS: class="{cls}" used in template but .{cls} not in CSS')

# 2. Dead CSS check
for cls in sorted(css_classes):
    if cls in ('app','nav','header','footer','h1','h2','h3','p','a','button','img','input','span','div','section','body','html','root','reveal'):
        continue
    if cls not in app:
        issues.append(f'DEAD CSS: .{cls} in CSS but not used in template')

# 3. Emoji scan in template
emoji_found = []
for i, ch in enumerate(app):
    cp = ord(ch)
    if 0x1F300 <= cp <= 0x1F9FF:
        ctx = app[max(0,i-30):i+30].replace(ch, '?')
        emoji_found.append(f'  pos {i}: ...{ctx}...')
if emoji_found:
    issues.append(f'EMOJI FOUND ({len(emoji_found)}):')
    for e in emoji_found[:10]:
        issues.append(e)

# 4. Check flag emoji specifically
if '\U0001f1e8\U0001f1f3' in app or '\U0001f1ec\U0001f1e7' in app:
    issues.append('FLAG EMOJI in lang toggle')

# 5. Check all @click handlers have proper methods
# Simple check: openGame, handleIdea, toggleAgent, toggleLang, scrollTo
handlers = ['openGame', 'handleIdea', 'toggleAgent', 'toggleLang', 'scrollTo']
for h in handlers:
    if h not in app:
        issues.append(f'MISSING HANDLER: {h} not in template')

# 6. Check Vue methods match
methods_section = app[app.find('methods:'):]
for h in handlers:
    if h not in methods_section:
        issues.append(f'MISSING METHOD: {h} not in methods section')

# 7. Check that pipeline-stages data uses agent names that exist
agent_names = set(re.findall(r"name:\s+'([^']+)'", app))
pipeline_refs = set(re.findall(r"'([^']+)'", app[app.find('pipelineStages'):app.find('agents:')]))
for ref in pipeline_refs:
    if ref not in agent_names and ref not in ('Creation Pipeline', 'QA & Deploy Gate'):
        issues.append(f'REF: "{ref}" in pipelineStages but no matching agent name')

# 8. Check games.json exists and is valid
import json
games_path = os.path.join(os.path.dirname(os.getcwd()), 'games', 'games.json')
with open(games_path, 'r', encoding='utf-8') as f:
    games = json.load(f)
if len(games) < 4:
    issues.append(f'GAMES: only {len(games)} games in games.json')

# 9. Check download links
if '/downloads/agent-pack-v1.zip' not in app:
    issues.append('DOWNLOAD: agent-pack-v1.zip link not found')

# 10. Check the game URLs match real files
work_urls = re.findall(r"url:\s+'([^']+)'", app[app.find('realWorks'):])
for url in work_urls:
    full_path = url.replace('/ai-game-studio/', '')
    file_path = os.path.join('..', full_path, 'index.html')
    if not os.path.exists(file_path):
        issues.append(f'GAME URL: {url} -> {file_path} NOT FOUND')

# 11. Check font loading
if 'fonts.googleapis.com' not in app:
    issues.append('FONTS: Google Fonts not loaded')

# 12. Check favicon
if 'favicon.svg' not in app:
    issues.append('FAVICON: not referenced')

# Summary
print(f'App.vue: {len(app)} chars')
print(f'style.css: {len(css)} chars')
print(f'main.js: {len(main)} chars')
print()

for issue in issues:
    print(f'  [ISSUE] {issue}')

if not issues:
    print('  NO ISSUES FOUND')
