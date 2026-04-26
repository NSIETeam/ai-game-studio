const url = process.argv[2];
const n = Number(process.argv[3] || 80);
if (!url) { console.error('Usage: node scripts/check-head.mjs <url> [lines]'); process.exit(2); }
const html = await (await fetch(url)).text();
console.log(html.split(/\r?\n/).slice(0,n).join('\n'));
