// Generate YallaEat favicon and PWA icons as SVG
// Logo: "YE" monogram in brand green (#008a00) on white background
const fs = require('fs');
const path = require('path');

// SVG favicon (YE monogram matching the brand logo style)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#008a00"/>
  <text x="256" y="340" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="280" fill="#fff" letter-spacing="-15">YE</text>
</svg>`;

// Write SVG versions
fs.writeFileSync(path.join(__dirname, 'assets', 'favicon.svg'), faviconSvg);
console.log('Created assets/favicon.svg');

// Create a simple HTML page to convert SVG to PNG (manual step)
const converterHtml = `<!DOCTYPE html>
<html><head><title>Icon Generator</title></head>
<body style="margin:0;background:#eee;display:flex;flex-direction:column;align-items:center;padding:40px;font-family:sans-serif">
<h2>YallaEat Icon Generator</h2>
<p>Right-click each icon below and "Save image as..." to save the PNG files.</p>

<h3>Favicon 32x32</h3>
<canvas id="c32" width="32" height="32"></canvas>

<h3>Icon 192x192</h3>
<canvas id="c192" width="192" height="192"></canvas>

<h3>Icon 512x512</h3>
<canvas id="c512" width="512" height="512"></canvas>

<h3>OG Image 1200x630</h3>
<canvas id="cog" width="1200" height="630"></canvas>

<script>
function drawIcon(canvas, size) {
  const ctx = canvas.getContext('2d');
  const r = size * 0.1875; // border radius ratio

  // Rounded rectangle background
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size - r);
  ctx.quadraticCurveTo(size, size, size - r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fillStyle = '#008a00';
  ctx.fill();

  // YE text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold ' + (size * 0.55) + 'px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('YE', size/2, size/2 + size*0.03);
}

function drawOG(canvas) {
  const ctx = canvas.getContext('2d');
  const w = 1200, h = 630;

  // Green background
  ctx.fillStyle = '#008a00';
  ctx.fillRect(0, 0, w, h);

  // Subtle gradient overlay
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.2)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // YALLA text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 160px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('YALLA', w/2, h/2 - 40);

  // EAT text
  ctx.font = 'bold 100px "Arial Black", Impact, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText('EAT', w/2, h/2 + 80);

  // Subtitle
  ctx.font = '24px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText('Restaurant Libanais Lyon 9 | Bowls, Wraps & Mezzes', w/2, h - 60);
}

// Draw all sizes
drawIcon(document.getElementById('c32'), 32);
drawIcon(document.getElementById('c192'), 192);
drawIcon(document.getElementById('c512'), 512);
drawOG(document.getElementById('cog'));

// Auto-download PNGs
function downloadCanvas(canvasId, filename) {
  const canvas = document.getElementById(canvasId);
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Add download buttons
document.querySelectorAll('canvas').forEach(c => {
  const btn = document.createElement('button');
  btn.textContent = 'Download ' + c.id;
  btn.style.cssText = 'margin:10px;padding:8px 20px;cursor:pointer;font-size:14px';
  const names = {c32:'favicon-32.png', c192:'icon-192.png', c512:'icon-512.png', cog:'og-yallaeat.jpg'};
  btn.onclick = () => downloadCanvas(c.id, names[c.id]);
  c.after(btn);
});
</script>
</body></html>`;

fs.writeFileSync(path.join(__dirname, 'generate-icons.html'), converterHtml);
console.log('Created generate-icons.html — open in browser to download PNG icons');

// Also create the SVG favicon that can be used directly
const faviconSvgLink = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#008a00"/>
  <text x="16" y="22" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="18" fill="#fff">YE</text>
</svg>`;
fs.writeFileSync(path.join(__dirname, 'favicon.svg'), faviconSvgLink);
console.log('Created favicon.svg (can be used as <link rel="icon" type="image/svg+xml">)');
