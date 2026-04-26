const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/extract-icon.mjs <url>');
  process.exit(2);
}
const html = await (await fetch(url)).text();
const m = html.match(/href=\"([^\"]*)\"\s+rel=\"icon\"/i);
console.log(m ? m[1] : '(no icon tag found)');
