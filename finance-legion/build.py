"""
Generate finance legion standalone HTML page.
"""
import os

outdir = r'C:\Users\KING\.qclaw\workspace\ai-game-studio\docs\finance-legion'
os.makedirs(outdir, exist_ok=True)

# Read the HTML template from a separate file
html_path = r'C:\Users\KING\.qclaw\workspace\ai-game-studio\finance-legion\template.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

outpath = os.path.join(outdir, 'index.html')
with open(outpath, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Written {len(html)} bytes to {outpath}')
