// Gera favicons e a imagem de compartilhamento (og.jpg) em public/.
// Uso pontual, só quando mudar a identidade: npm run assets
// Requer Playwright (Chromium) e ImageMagick instalados na máquina.
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

// Usa o Playwright local, ou o global se não houver um no projeto
let pw;
try {
  pw = await import('playwright');
} catch {
  pw = createRequire(execFileSync('npm', ['root', '-g']).toString().trim() + '/')('playwright');
}
const { chromium } = pw;

const fontFace = async (family, file, style = 'normal', weight = '100 900') =>
  `@font-face{font-family:'${family}';src:url(data:font/woff2;base64,${(await readFile('public/fonts/' + file)).toString('base64')}) format('woff2');font-style:${style};font-weight:${weight}}`;
const fonts = `<style>${await fontFace('Bodoni Moda', 'bodoni-moda.woff2')}${await fontFace('Bodoni Moda', 'bodoni-moda-italic.woff2', 'italic')}${await fontFace('Hanken Grotesk', 'hanken-grotesk.woff2')}${await fontFace('IBM Plex Mono', 'ibm-plex-mono-500.woff2', 'normal', '500')}</style>`;
const chrome = 'linear-gradient(100deg,#77777e 0%,#f6f6f8 18%,#a6a6ad 38%,#ffffff 52%,#8a8a91 72%,#dcdce1 88%,#909097 100%)';

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#8d8d94"/><stop offset=".7" stop-color="#e9e9ed"/><stop offset="1" stop-color="#77777e"/></linearGradient></defs>
<rect width="64" height="64" rx="14" fill="#060607"/>
<text x="32" y="45" text-anchor="middle" font-family="Didot,'Bodoni 72','Bodoni Moda',Georgia,serif" font-size="34" font-weight="700" fill="url(#g)" letter-spacing="-1">LK</text>
</svg>`;
await writeFile('public/favicon.svg', favicon);

const logoB64 = (await readFile('public/img/logo-lk.jpg')).toString('base64');
const fachadaB64 = (await readFile('public/img/loja-fachada-equipe.webp')).toString('base64');

const iconHtml = (size) => `<!doctype html><html><head>${fonts}<style>
html,body{margin:0;background:#060607}
.i{width:${size}px;height:${size}px;display:grid;place-items:center;background:radial-gradient(circle at 50% 35%,#1c1c21,#060607 70%)}
.t{font:700 ${size * 0.5}px/1 'Bodoni Moda',serif;letter-spacing:-0.02em;background:${chrome};-webkit-background-clip:text;color:transparent;transform:translateY(-2%)}
</style></head><body><div class="i"><span class="t">LK</span></div></body></html>`;

const ogHtml = `<!doctype html><html><head>${fonts}<style>
html,body{margin:0}
.og{width:1200px;height:630px;box-sizing:border-box;background:radial-gradient(900px 600px at 20% 0%,#1a1a1f,#060607 65%);color:#f1f1f4;display:grid;grid-template-columns:1fr 330px;gap:56px;padding:64px 72px;font-family:'Hanken Grotesk',sans-serif;overflow:hidden}
.l{display:flex;flex-direction:column;justify-content:space-between}
.brand{display:flex;align-items:center;gap:18px}
.brand img{width:84px;height:84px;border-radius:50%;box-shadow:0 0 0 2px #34343d}
.brand b{font:600 34px/1 'Bodoni Moda',serif}
.brand small{display:block;margin-top:6px;font:500 15px/1 'IBM Plex Mono',monospace;letter-spacing:.12em;text-transform:uppercase;color:#a4a4ad}
h1{margin:0;font:500 74px/1 'Bodoni Moda',serif;letter-spacing:-.015em;background:${chrome};-webkit-background-clip:text;color:transparent}
h1 em{font-style:italic}
p{margin:0;font-size:26px;line-height:1.35;color:#c9c9cf}
.foot{font:500 20px/1.4 'IBM Plex Mono',monospace;color:#a4a4ad;letter-spacing:.02em}
.foot b{color:#fff;font-weight:500}
.ph{border-radius:22px;padding:2px;background:linear-gradient(140deg,#fff,#6d6d74 30%,#d9d9de 55%,#55555c 80%,#bdbdc3);align-self:center}
.ph img{display:block;width:326px;height:502px;object-fit:cover;border-radius:20px}
</style></head><body><div class="og">
<div class="l">
 <div class="brand"><img src="data:image/jpeg;base64,${logoB64}"><div><b>LK Cell</b><small>Consertos &amp; vendas de smartphones</small></div></div>
 <div style="display:grid;gap:22px"><h1>Celular quebrado tem <em>conserto.</em></h1><p>Tela, bateria, conector e placa de iPhone e Android em Balneário Camboriú.</p></div>
 <div class="foot">Rua 1400, 386 · Box 308 &nbsp;|&nbsp; <b>WhatsApp (47) 99785-6226</b></div>
</div>
<div class="ph"><img src="data:image/webp;base64,${fachadaB64}"></div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();

for (const [size, file] of [
  [512, 'public/icon-512.png'],
  [192, 'public/icon-192.png'],
  [180, 'public/apple-touch-icon.png'],
  [48, 'public/favicon-48.png'],
]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(iconHtml(size), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file });
}

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(ogHtml, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await browser.close();

execFileSync('convert', ['public/og.png', '-strip', '-quality', '86', 'public/og.jpg']);
execFileSync('convert', ['public/favicon-48.png', '-define', 'icon:auto-resize=48,32,16', 'public/favicon.ico']);
execFileSync('rm', ['public/og.png', 'public/favicon-48.png']);
console.log('Assets gerados em public/');
