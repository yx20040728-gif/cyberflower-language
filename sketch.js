/*
  CyberFlower Language / 未来花语
  原生 Canvas 实现，可离线运行。
  成品界面仅呈现最终交互系统，阶段实验保存在 experiments/ 与 process_evidence/。
*/

const emotions = {
  joy: {
    zh: '喜悦', en: 'JOY', displayEn: 'Joy', code: 'CF-01',
    colors: ['#ffd56f', '#ff8f7d', '#fff1c4', '#ffbf5e'],
    layers: 5, petals: 14, shape: 'round', speed: 1.28, particle: 'spark', symmetry: 1,
    desc: '饱满花瓣快速舒展，金色光粒以跳跃轨迹向外扩散。',
    poem: '快乐不是静止的颜色，而是一束不断向外传递的光。',
    grammar: ['圆润放射', '暖金与珊瑚橙', '快速舒展', '跳跃闪光'],
    tone: '明亮 · 轻盈', energy: '高频 · 外放', response: '跳跃 · 扩散',
    messages: ['喜悦像晨光，越过花瓣，把温度送向更远的地方。','此刻的光正在盛开，并邀请世界一起靠近。','快乐从花心溢出，变成一场轻盈而明亮的扩散。']
  },
  lonely: {
    zh: '孤独', en: 'LONELINESS', displayEn: 'Loneliness', code: 'CF-02',
    colors: ['#7790d8', '#28345f', '#c4d1ff', '#475a9e'],
    layers: 3, petals: 5, shape: 'droop', speed: .26, particle: 'fall', symmetry: .72,
    desc: '稀疏长瓣向下垂落，冷色微粒像无声的雨缓慢下沉。',
    poem: '孤独不是空白，而是声音抵达自己之前，漫长的回声。',
    grammar: ['稀疏垂落', '深蓝与灰紫', '缓慢内收', '下坠微粒'],
    tone: '克制 · 疏离', energy: '低频 · 内收', response: '下坠 · 回声',
    messages: ['孤独把声音折回花心，只留下安静的蓝色回声。','有些距离没有形状，却让每一片花瓣缓慢垂落。','当世界退远，花仍在沉默中保存自己的微光。']
  },
  anxiety: {
    zh: '焦虑', en: 'ANXIETY', displayEn: 'Anxiety', code: 'CF-03',
    colors: ['#ef4fa6', '#7a285f', '#c8ff84', '#7e5cff'],
    layers: 6, petals: 19, shape: 'fracture', speed: 2.1, particle: 'noise', symmetry: .5,
    desc: '碎裂尖瓣高频震颤，荧光噪点在边缘聚集又突然散开。',
    poem: '念头同时向许多方向生长，彼此碰撞，难以停下。',
    grammar: ['碎裂尖瓣', '紫红与荧光绿', '高频震颤', '噪点聚散'],
    tone: '紧绷 · 不确定', energy: '高频 · 波动', response: '震颤 · 断续',
    messages: ['思绪在边缘反复碰撞，像一朵无法停止震颤的花。','不安把每一条路径同时点亮，却没有一条真正抵达。','焦虑沿着花瓣裂隙蔓延，急促、明亮，又难以安静。']
  },
  calm: {
    zh: '平静', en: 'CALM', displayEn: 'Calm', code: 'CF-04',
    colors: ['#77e3d4', '#5287b6', '#d9fff8', '#8cc7ff'],
    layers: 6, petals: 12, shape: 'lotus', speed: .36, particle: 'wave', symmetry: 1,
    desc: '对称花瓣以呼吸节奏开合，透明水波从中心持续扩散。',
    poem: '当节奏变慢，情绪不再需要证明自己，只需要存在。',
    grammar: ['对称莲瓣', '青绿与浅蓝', '呼吸开合', '环形水波'],
    tone: '平和 · 清澈', energy: '低频 · 稳定', response: '呼吸 · 扩散',
    messages: ['平静是一圈缓慢扩散的水波，让所有声音重新找到距离。','花瓣随着呼吸轻轻开合，世界因此变得清晰。','此刻无需追赶，光在安静中完成自己的生长。']
  },
  longing: {
    zh: '思念', en: 'LONGING', displayEn: 'Longing', code: 'CF-05',
    colors: ['#b982ff', '#6655b7', '#ffd0ef', '#8f79e8'],
    layers: 7, petals: 11, shape: 'curve', speed: .54, particle: 'orbit', symmetry: .9,
    desc: '弧形花瓣向中心回望，长尾光粒沿轨道缓慢绕行。',
    poem: '记忆没有褪色，它只是沿着时间的轨道，反复回到同一个方向。',
    grammar: ['回旋弧瓣', '紫罗兰与柔粉', '缓慢旋转', '长尾轨道'],
    tone: '温柔 · 怀旧', energy: '柔和 · 流动', response: '回旋 · 延迟',
    messages: ['思念如光，穿越距离，在沉默里持续靠近。','记忆沿着花瓣回旋，最终停在仍被珍惜的位置。','有些人不在眼前，却一直存在于光的方向。']
  },
  anger: {
    zh: '愤怒', en: 'ANGER', displayEn: 'Anger', code: 'CF-06',
    colors: ['#ff4b45', '#7b0f24', '#ffb34f', '#ff6a2f'],
    layers: 5, petals: 15, shape: 'flame', speed: 1.72, particle: 'burst', symmetry: .65,
    desc: '火焰尖瓣急促外扩，炽热粒子以短促冲击穿透边缘。',
    poem: '愤怒是被压缩的力量，它要求边界重新被看见。',
    grammar: ['爆裂火焰', '赤红与灼金', '急促膨胀', '冲击喷发'],
    tone: '强烈 · 直接', energy: '爆发 · 外冲', response: '脉冲 · 喷发',
    messages: ['愤怒把沉默点燃，让被忽略的边界重新发光。','炽热从花心冲出，它不是毁灭，而是拒绝继续退让。','红色脉冲穿过花瓣，要求世界正视这份力量。']
  },
  healing: {
    zh: '治愈', en: 'HEALING', displayEn: 'Healing', code: 'CF-07',
    colors: ['#9de6b0', '#5aa18a', '#f2ffe9', '#c9f2c8'],
    layers: 8, petals: 13, shape: 'soft', speed: .42, particle: 'glow', symmetry: 1,
    desc: '柔软花瓣层层包裹，乳白微光从裂隙中持续修复。',
    poem: '治愈不是抹去痕迹，而是让破损之处重新能够透光。',
    grammar: ['层叠包裹', '嫩绿与乳白', '逐层舒展', '柔光修复'],
    tone: '柔软 · 安定', energy: '缓慢 · 回升', response: '包裹 · 修复',
    messages: ['光从裂隙里生长，把疼痛慢慢改写成新的纹理。','治愈不是忘记，而是让旧伤也能成为花瓣的一部分。','柔光一层层展开，重新包住那些曾经脆弱的地方。']
  },
  anticipation: {
    zh: '期待', en: 'ANTICIPATION', displayEn: 'Anticipation', code: 'CF-08',
    colors: ['#9d73ff', '#4f79d9', '#ff9fd1', '#b7d7ff'],
    layers: 6, petals: 12, shape: 'upward', speed: .76, particle: 'rise', symmetry: .85,
    desc: '细长花瓣沿螺旋方向向上生长，光点持续升起并聚向未来。',
    poem: '期待让尚未发生的事，提前拥有了一点温度。',
    grammar: ['向上生长', '蓝紫与玫粉', '螺旋抬升', '上升光点'],
    tone: '明亮 · 未完成', energy: '渐强 · 向上', response: '抬升 · 聚集',
    messages: ['未来尚未抵达，花已经先朝它的方向生长。','期待把未知点亮，让每一次上升都接近新的可能。','光点沿着花瓣聚拢，像明天正在缓慢形成。']
  }
};

const state = {
  emotionKey: 'longing', intensity: .78, duration: .64, expression: .72,
  mouseOpen: .52, audioLevel: 0, particles: [], rings: [], time: 0,
  view: 'generator', micActive: false, analyser: null, audioData: null,
  archive: [], generatedMessage: ''
};

const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');
const host = document.getElementById('canvasHost');
let dpr = Math.min(window.devicePixelRatio || 1, 2);
let mouse = { x: 0, y: 0, inside: false };

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const hexToRgb = hex => {
  const value = hex.replace('#', '');
  const n = parseInt(value.length === 3 ? value.split('').map(x => x + x).join('') : value, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};
const rgba = (hex, a) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
};

function resizeCanvas() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = host.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function iconSvg(key) {
  const common = 'fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"';
  const paths = {
    joy: `<circle cx="12" cy="12" r="2.5"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8"/>`,
    lonely: `<path d="M7 4c1.5 3.2 1.4 6.2 0 9.4M12 2c1 4.2 1 8.4 0 12.6M17 5c-1.2 3.3-1.2 6.4 0 9.2"/><circle cx="12" cy="18.5" r="1.2"/>`,
    anxiety: `<path d="M4 13l4-8 3 6 3-7 6 10-5-2-3 7-3-6-5 3z"/>`,
    calm: `<circle cx="12" cy="12" r="8"/><path d="M5 11c2 1.4 4 1.4 6 0s4-1.4 8 0M5 14c2 1.4 4 1.4 6 0s4-1.4 8 0"/>`,
    longing: `<path d="M12 20c-5-3.2-7-6.2-7-9.2A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 7 4.8c0 3-2 6-7 9.2z"/><path d="M12 6V3"/>`,
    anger: `<path d="M13 2c1 4-2 5-1 8 1.2-1.4 2.8-2.2 4.5-3.1 2.6 4 3.2 8.2.5 11-2.8 2.9-7.5 2.7-10.2-.2C3 13.7 6 8.7 9 6c-.1 2 0 3.3 1.4 4.7C10.8 7 12.4 5.1 13 2z"/>`,
    healing: `<path d="M12 20C6.7 18.1 4 14.6 4 10.8 4 7.4 6.3 5 9.2 5c1.4 0 2.4.5 2.8 1.3C12.4 5.5 13.4 5 14.8 5 17.7 5 20 7.4 20 10.8c0 3.8-2.7 7.3-8 9.2z"/><path d="M12 9v7M8.5 12.5h7"/>`,
    anticipation: `<path d="M12 21V4M7.5 9.5L12 4l4.5 5.5M5 15c3-1.8 5-1.8 7 0s4 1.8 7 0"/>`
  };
  return `<svg class="emotion-icon" viewBox="0 0 24 24" aria-hidden="true" ${common}>${paths[key]}</svg>`;
}

function buildEmotionButtons() {
  const root = document.getElementById('emotionButtons');
  root.innerHTML = '';
  Object.entries(emotions).forEach(([key, e]) => {
    const button = document.createElement('button');
    button.className = 'emotion-button';
    button.style.setProperty('--emotion-color', e.colors[0]);
    button.innerHTML = `${iconSvg(key)}<b>${e.zh}</b><small>${e.en}</small>`;
    button.addEventListener('click', () => selectEmotion(key));
    root.appendChild(button);
    e.button = button;
  });
}

function selectEmotion(key) {
  state.emotionKey = key;
  state.particles.length = 0;
  state.rings.length = 0;
  Object.entries(emotions).forEach(([k, e]) => e.button.classList.toggle('active', k === key));
  updateUI();
}

function bindControls() {
  const map = [
    ['intensity', 'intensityValue', 'intensity'],
    ['duration', 'durationValue', 'duration'],
    ['expression', 'expressionValue', 'expression']
  ];
  map.forEach(([id, valueId, stateKey]) => {
    const input = document.getElementById(id);
    input.addEventListener('input', () => {
      state[stateKey] = Number(input.value) / 100;
      document.getElementById(valueId).textContent = id === 'duration' ? `${input.value}s` : `${input.value}%`;
      updateGrammar();
    });
  });

  document.querySelectorAll('.view-tab').forEach(tab => tab.addEventListener('click', () => {
    state.view = tab.dataset.view;
    document.querySelectorAll('.view-tab').forEach(x => x.classList.toggle('active', x === tab));
    document.getElementById('archiveOverlay').classList.toggle('hidden', state.view !== 'archive');
  }));

  document.getElementById('generateButton').addEventListener('click', generateLanguage);
  document.getElementById('archiveButton').addEventListener('click', archiveCurrent);
  document.getElementById('saveButton').addEventListener('click', exportCard);
  document.getElementById('clearArchive').addEventListener('click', clearArchive);
  document.getElementById('micButton').addEventListener('click', enableMic);

  host.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) * dpr;
    mouse.y = (e.clientY - r.top) * dpr;
    mouse.inside = true;
  });
  host.addEventListener('mouseleave', () => mouse.inside = false);
  host.addEventListener('touchmove', e => {
    const t = e.touches[0]; if (!t) return;
    const r = canvas.getBoundingClientRect();
    mouse.x = (t.clientX - r.left) * dpr;
    mouse.y = (t.clientY - r.top) * dpr;
    mouse.inside = true;
  }, { passive: true });
}

function updateUI() {
  const e = emotions[state.emotionKey];
  document.getElementById('flowerCode').textContent = e.code;
  document.getElementById('emotionName').textContent = `${e.zh} / ${e.en}`;
  document.getElementById('emotionDescription').textContent = e.desc;
  document.getElementById('infoEmotionEn').textContent = e.displayEn;
  document.getElementById('infoEmotionZh').textContent = e.zh;
  document.getElementById('infoPoem').textContent = e.poem;
  document.getElementById('toneValue').textContent = e.tone;
  document.getElementById('energyValue').textContent = e.energy;
  document.getElementById('responseValue').textContent = e.response;
  document.documentElement.style.setProperty('--accent', e.colors[0]);
  updateGrammar();
  updateWaveform();
  if (!state.generatedMessage) {
    state.generatedMessage = e.messages[0];
    updateMessageText();
  } else {
    state.generatedMessage = e.messages[0];
    updateMessageText();
  }
}

function updateGrammar() {
  const e = emotions[state.emotionKey];
  const labels = ['花瓣形态', '色彩倾向', '运动节奏', '粒子反馈'];
  const list = document.getElementById('grammarList');
  list.innerHTML = '';
  e.grammar.forEach((value, i) => {
    const row = document.createElement('div');
    row.innerHTML = `<dt>${labels[i]}</dt><dd>${value}</dd>`;
    list.appendChild(row);
  });
}

function updateWaveform() {
  const e = emotions[state.emotionKey];
  const amp = state.intensity * 12 + 5;
  const points = Array.from({ length: 13 }, (_, i) => {
    const x = i * 8.33;
    const decay = Math.exp(-Math.abs(i - 6) * .23);
    const y = 50 + Math.sin(i * (e.speed + .72)) * amp * decay;
    return `${x},${y}`;
  }).join(' ');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="${e.colors[0]}" stop-opacity="0"/><stop offset=".5" stop-color="${e.colors[2]}"/><stop offset="1" stop-color="${e.colors[0]}" stop-opacity="0"/></linearGradient></defs><polyline points="${points}" fill="none" stroke="url(#g)" stroke-width="1.25"/><circle cx="50" cy="50" r="1.8" fill="${e.colors[2]}"/></svg>`;
  document.getElementById('waveform').style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function generateLanguage() {
  const e = emotions[state.emotionKey];
  const input = document.getElementById('messageInput').value.trim();
  const tier = state.intensity > .78 ? 2 : state.expression > .6 ? 1 : 0;
  state.generatedMessage = input || e.messages[tier];
  if (input) {
    const tail = e.messages[tier];
    state.generatedMessage = `${input} ${tail}`;
  }
  updateMessageText();
  const btn = document.getElementById('generateButton');
  const old = btn.textContent;
  btn.textContent = '花语已生成';
  setTimeout(() => btn.textContent = old, 900);
}

function updateMessageText() {
  const text = state.generatedMessage || emotions[state.emotionKey].messages[0];
  document.getElementById('generatedMessage').textContent = text;
  document.getElementById('languageQuote').textContent = text;
}

async function enableMic() {
  const button = document.getElementById('micButton');
  if (state.micActive) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const source = ac.createMediaStreamSource(stream);
    const analyser = ac.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    state.analyser = analyser;
    state.audioData = new Uint8Array(analyser.frequencyBinCount);
    state.micActive = true;
    button.textContent = '声音感应已启用';
  } catch (err) {
    button.textContent = '麦克风权限未开启';
  }
}

function updateAudio() {
  if (!state.analyser) {
    state.audioLevel = lerp(state.audioLevel, 0, .08);
  } else {
    state.analyser.getByteFrequencyData(state.audioData);
    let sum = 0;
    for (const value of state.audioData) sum += value;
    const raw = sum / state.audioData.length / 255;
    state.audioLevel = lerp(state.audioLevel, clamp(raw * 2.5, 0, 1), .2);
  }
  document.getElementById('micMeter').style.width = `${Math.round(state.audioLevel * 100)}%`;
}

function drawBackground(c, w, h, e, time, seed = 0) {
  c.clearRect(0, 0, w, h);
  const centerX = w * .5, centerY = h * .48;
  const glow = c.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(w, h) * .62);
  glow.addColorStop(0, rgba(e.colors[1], .20));
  glow.addColorStop(.28, rgba(e.colors[0], .055));
  glow.addColorStop(.68, 'rgba(8,7,15,.62)');
  glow.addColorStop(1, 'rgba(3,3,7,1)');
  c.fillStyle = glow;
  c.fillRect(0, 0, w, h);

  c.save();
  c.globalCompositeOperation = 'screen';
  for (let i = 0; i < 42; i++) {
    const angle = i * 2.399 + seed;
    const radius = (Math.sin(i * 12.17 + seed) * .5 + .5) * Math.min(w, h) * .58;
    const x = centerX + Math.cos(angle) * radius * 1.35;
    const y = centerY + Math.sin(angle) * radius * .72;
    const alpha = .025 + ((i * 7) % 9) / 240;
    c.beginPath();
    c.arc(x, y, (i % 4 === 0 ? 1.1 : .65) * dpr, 0, Math.PI * 2);
    c.fillStyle = rgba(i % 3 === 0 ? e.colors[2] : '#ffffff', alpha);
    c.fill();
  }
  c.restore();

  const floorY = h * .81;
  const floor = c.createRadialGradient(centerX, floorY, 0, centerX, floorY, w * .37);
  floor.addColorStop(0, rgba(e.colors[0], .13));
  floor.addColorStop(.55, rgba(e.colors[1], .035));
  floor.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = floor;
  c.fillRect(0, floorY - h * .12, w, h * .24);

  c.save();
  c.translate(centerX, floorY);
  c.strokeStyle = rgba(e.colors[2], .09);
  for (let i = 0; i < 5; i++) {
    c.beginPath();
    c.ellipse(0, 0, w * (.10 + i * .045), h * (.012 + i * .006), 0, 0, Math.PI * 2);
    c.stroke();
  }
  c.restore();
}

function buildPetalPath(c, shape, length, width, bend, asymmetry = 0) {
  c.beginPath();
  c.moveTo(0, 0);
  if (shape === 'round') {
    c.bezierCurveTo(width * 1.05, -length * .24, width * .82, -length * .82, bend, -length);
    c.bezierCurveTo(-width * .82, -length * .82, -width * .98, -length * .22, 0, 0);
  } else if (shape === 'droop') {
    c.bezierCurveTo(width * .52, -length * .22, width * .35 + bend, -length * .72, bend, -length);
    c.bezierCurveTo(-width * .22 + bend, -length * .82, -width * .42, -length * .22, 0, 0);
  } else if (shape === 'fracture') {
    c.lineTo(width * .44, -length * .20);
    c.lineTo(width * .20, -length * .43);
    c.lineTo(width * .50, -length * .58);
    c.lineTo(width * .08 + bend, -length);
    c.lineTo(-width * .18, -length * .70);
    c.lineTo(-width * .48, -length * .54);
    c.lineTo(-width * .24, -length * .28);
    c.closePath();
  } else if (shape === 'lotus') {
    c.bezierCurveTo(width * .72, -length * .24, width * .42, -length * .83, bend, -length);
    c.bezierCurveTo(-width * .42, -length * .83, -width * .72, -length * .24, 0, 0);
  } else if (shape === 'curve') {
    c.bezierCurveTo(width * .98, -length * .20, width * .58 + bend, -length * .82, bend, -length);
    c.bezierCurveTo(-width * .26 + bend, -length * .70, -width * .73, -length * .18, 0, 0);
  } else if (shape === 'flame') {
    c.bezierCurveTo(width * .42, -length * .20, width * .32, -length * .48, width * .12 + bend, -length * .73);
    c.lineTo(bend, -length);
    c.bezierCurveTo(-width * .06, -length * .70, -width * .52, -length * .50, -width * .34, -length * .20);
    c.closePath();
  } else if (shape === 'soft') {
    c.bezierCurveTo(width * .92, -length * .28, width * .70, -length * .72, bend, -length);
    c.bezierCurveTo(-width * .70, -length * .72, -width * .92, -length * .28, 0, 0);
  } else if (shape === 'upward') {
    c.bezierCurveTo(width * .55, -length * .24, width * .30 + bend, -length * .84, bend, -length);
    c.bezierCurveTo(-width * .30 + bend, -length * .84, -width * .55, -length * .24, 0, 0);
  }
  if (asymmetry) c.transform(1, asymmetry * .04, 0, 1, 0, 0);
  c.closePath();
}

function drawPetal(c, e, layer, index, count, length, width, angle, time, mini) {
  const jitter = e.shape === 'fracture' ? Math.sin(index * 17.13 + time * 11) * .065 : 0;
  const flutter = e.shape === 'flame' ? Math.sin(time * 6 + index) * .055 : e.shape === 'droop' ? Math.sin(time * .8 + index) * .025 : 0;
  const bend = e.shape === 'curve' ? width * (.34 + Math.sin(index * 1.7) * .12) : e.shape === 'upward' ? Math.sin(index * 2.1) * width * .18 : 0;
  c.save();
  c.rotate(angle + jitter + flutter);
  if (e.shape === 'upward') c.scale(.82 + Math.max(0, Math.cos(angle)) * .30, 1.04);
  if (e.shape === 'droop') c.scale(.82, 1 + Math.max(0, -Math.cos(angle)) * .30);

  buildPetalPath(c, e.shape, length, width, bend, 1 - e.symmetry);
  const grad = c.createLinearGradient(0, 0, bend, -length);
  grad.addColorStop(0, rgba(e.colors[1], .16 + layer * .02));
  grad.addColorStop(.34, rgba(e.colors[(layer + 1) % e.colors.length], .44));
  grad.addColorStop(.74, rgba(e.colors[0], .70));
  grad.addColorStop(1, rgba(e.colors[2], .90));
  c.fillStyle = grad;
  c.shadowColor = rgba(e.colors[0], mini ? .36 : .55);
  c.shadowBlur = (mini ? 8 : 18) * dpr;
  c.globalAlpha = .74 - layer * .025;
  c.fill();

  c.globalAlpha = .48;
  c.lineWidth = (mini ? .55 : .9) * dpr;
  c.strokeStyle = rgba(e.colors[2], .74);
  c.stroke();

  c.globalAlpha = .28;
  c.beginPath();
  c.moveTo(0, -length * .05);
  c.bezierCurveTo(bend * .2, -length * .30, bend * .65, -length * .66, bend, -length * .92);
  c.strokeStyle = rgba('#ffffff', .62);
  c.lineWidth = (mini ? .45 : .7) * dpr;
  c.stroke();

  if (!mini && layer < 3 && index % 2 === 0) {
    c.globalAlpha = .18;
    for (let v = 0; v < 3; v++) {
      const side = v % 2 ? -1 : 1;
      c.beginPath();
      c.moveTo(bend * .15, -length * (.32 + v * .12));
      c.quadraticCurveTo(side * width * .25, -length * (.40 + v * .11), side * width * .42, -length * (.48 + v * .10));
      c.stroke();
    }
  }
  c.restore();
}

function drawAura(c, cx, cy, radius, e, time, openness, mini) {
  c.save();
  c.globalCompositeOperation = 'screen';
  const aura = c.createRadialGradient(cx, cy, radius * .06, cx, cy, radius * 1.35);
  aura.addColorStop(0, rgba(e.colors[2], mini ? .30 : .42));
  aura.addColorStop(.28, rgba(e.colors[0], mini ? .14 : .22));
  aura.addColorStop(.67, rgba(e.colors[1], .04));
  aura.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = aura;
  c.beginPath();
  c.arc(cx, cy, radius * 1.42, 0, Math.PI * 2);
  c.fill();

  if (!mini) {
    c.translate(cx, cy);
    for (let i = 0; i < 3; i++) {
      c.rotate(time * (.025 + i * .008) * (i % 2 ? -1 : 1));
      c.beginPath();
      c.ellipse(0, 0, radius * (1.10 + i * .16), radius * (.58 + i * .06), i * .42, 0, Math.PI * 2);
      c.strokeStyle = rgba(i === 1 ? e.colors[2] : e.colors[0], .10 + openness * .035);
      c.lineWidth = .65 * dpr;
      c.stroke();
    }
  }
  c.restore();
}


function drawEmotionField(c, cx, cy, radius, e, time, mini) {
  if (mini) return;
  c.save();
  c.globalCompositeOperation = 'screen';
  c.lineCap = 'round';
  const alpha = .12 + state.intensity * .05;

  if (e.particle === 'spark') {
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * Math.PI * 2 + time * .08;
      const r1 = radius * (1.05 + (i % 3) * .05);
      const r2 = radius * (1.26 + (i % 4) * .05);
      c.beginPath();
      c.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      c.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      c.strokeStyle = rgba(i % 2 ? e.colors[2] : e.colors[0], alpha);
      c.lineWidth = (i % 4 === 0 ? 1.1 : .55) * dpr;
      c.stroke();
    }
  } else if (e.particle === 'fall') {
    for (let i = 0; i < 6; i++) {
      const x = cx + (i - 2.5) * radius * .28;
      const top = cy - radius * (.45 + (i % 2) * .16);
      c.beginPath();
      c.moveTo(x, top);
      c.bezierCurveTo(x - radius * .10, cy, x + radius * .08, cy + radius * .70, x - radius * .02, cy + radius * 1.10);
      c.strokeStyle = rgba(e.colors[2], alpha * .72);
      c.lineWidth = .65 * dpr;
      c.stroke();
      c.beginPath();
      c.arc(x - radius * .02, cy + radius * 1.10, (1.5 + i % 2) * dpr, 0, Math.PI * 2);
      c.fillStyle = rgba(e.colors[2], .35);
      c.fill();
    }
  } else if (e.particle === 'noise') {
    for (let i = 0; i < 18; i++) {
      const a = i / 18 * Math.PI * 2 + Math.sin(time * 5 + i) * .05;
      const r = radius * (1.05 + (i % 4) * .07);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      c.beginPath();
      c.moveTo(x - Math.sin(a) * radius * .07, y + Math.cos(a) * radius * .07);
      c.lineTo(x + Math.sin(a) * radius * .10, y - Math.cos(a) * radius * .10);
      c.strokeStyle = rgba(i % 3 ? e.colors[0] : e.colors[2], alpha * .9);
      c.lineWidth = (i % 5 === 0 ? 1.1 : .6) * dpr;
      c.stroke();
    }
  } else if (e.particle === 'wave') {
    for (let i = 0; i < 5; i++) {
      c.beginPath();
      c.ellipse(cx, cy + radius * .72, radius * (1.0 + i * .18), radius * (.14 + i * .025), 0, 0, Math.PI * 2);
      c.strokeStyle = rgba(e.colors[2], alpha * (1 - i * .12));
      c.lineWidth = .65 * dpr;
      c.stroke();
    }
  } else if (e.particle === 'orbit') {
    for (let i = 0; i < 4; i++) {
      const rot = time * (.025 + i * .005) * (i % 2 ? -1 : 1) + i * .42;
      c.save(); c.translate(cx, cy); c.rotate(rot);
      c.beginPath();
      c.ellipse(0, 0, radius * (1.18 + i * .12), radius * (.52 + i * .04), i * .18, -2.45, .75);
      c.strokeStyle = rgba(i % 2 ? e.colors[2] : e.colors[0], alpha * .82);
      c.lineWidth = .7 * dpr; c.stroke();
      const a = time * (.45 + i * .08) + i;
      const nx = Math.cos(a) * radius * (1.18 + i * .12);
      const ny = Math.sin(a) * radius * (.52 + i * .04);
      c.beginPath(); c.arc(nx, ny, (1.2 + i * .2) * dpr, 0, Math.PI * 2);
      c.fillStyle = rgba(e.colors[2], .55); c.fill(); c.restore();
    }
  } else if (e.particle === 'burst') {
    for (let i = 0; i < 16; i++) {
      const a = i / 16 * Math.PI * 2 + time * .025;
      const inner = radius * (1.02 + (i % 3) * .03);
      const outer = radius * (1.30 + (i % 5) * .08);
      c.beginPath();
      c.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      c.lineTo(cx + Math.cos(a + .015) * outer, cy + Math.sin(a + .015) * outer);
      c.strokeStyle = rgba(i % 2 ? e.colors[2] : e.colors[0], alpha * 1.05);
      c.lineWidth = (i % 4 === 0 ? 1.2 : .7) * dpr; c.stroke();
    }
  } else if (e.particle === 'glow') {
    for (let i = 0; i < 6; i++) {
      c.beginPath();
      c.arc(cx, cy, radius * (.94 + i * .10), -1.15 + i * .18, .15 + i * .15);
      c.strokeStyle = rgba(e.colors[2], alpha * (1 - i * .10));
      c.lineWidth = (1.1 - i * .08) * dpr; c.stroke();
    }
  } else if (e.particle === 'rise') {
    for (let i = 0; i < 7; i++) {
      const x = cx + (i - 3) * radius * .22;
      c.beginPath();
      c.moveTo(x, cy + radius * .72);
      c.bezierCurveTo(x - radius * .16, cy + radius * .25, x + radius * .12, cy - radius * .48, x, cy - radius * 1.25);
      c.strokeStyle = rgba(i % 2 ? e.colors[2] : e.colors[0], alpha * .85);
      c.lineWidth = .65 * dpr; c.stroke();
      c.beginPath(); c.arc(x, cy - radius * (1.02 + (i % 3) * .12), (1.2 + i % 2) * dpr, 0, Math.PI * 2);
      c.fillStyle = rgba(e.colors[2], .42); c.fill();
    }
  }
  c.restore();
}

function drawCore(c, cx, cy, radius, e, time, mini) {
  c.save();
  c.translate(cx, cy);
  c.globalCompositeOperation = 'screen';
  const core = c.createRadialGradient(0, 0, 0, 0, 0, radius * .42);
  core.addColorStop(0, '#fff9e8');
  core.addColorStop(.18, rgba(e.colors[2], .98));
  core.addColorStop(.48, rgba(e.colors[0], .56));
  core.addColorStop(1, rgba(e.colors[1], 0));
  c.fillStyle = core;
  c.beginPath();
  c.arc(0, 0, radius * .34, 0, Math.PI * 2);
  c.fill();

  const stamens = mini ? 10 : 24;
  for (let i = 0; i < stamens; i++) {
    const a = i / stamens * Math.PI * 2 + time * .08;
    const r = radius * (.08 + (i % 5) / 28);
    const len = radius * (.16 + (i % 7) / 32);
    c.beginPath();
    c.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    c.quadraticCurveTo(Math.cos(a + .15) * len * .62, Math.sin(a + .15) * len * .62, Math.cos(a) * len, Math.sin(a) * len);
    c.strokeStyle = rgba(i % 3 === 0 ? '#ffd59b' : e.colors[2], .55);
    c.lineWidth = (mini ? .5 : .8) * dpr;
    c.stroke();
    c.beginPath();
    c.arc(Math.cos(a) * len, Math.sin(a) * len, (mini ? .7 : 1.15) * dpr, 0, Math.PI * 2);
    c.fillStyle = rgba('#fff2c8', .82);
    c.fill();
  }
  c.restore();
}

function drawFlower(c, w, h, e, params, time, mini = false, seed = 0) {
  const cx = w * .5;
  const cy = h * (mini ? .51 : .47);
  const base = Math.min(w, h) * (mini ? .23 : .265);
  const pointerDist = mouse.inside ? Math.hypot(mouse.x - cx, mouse.y - cy) / (Math.min(w, h) * .58) : .72;
  const targetOpen = mouse.inside ? 1 - clamp(pointerDist, 0, 1) : .47;
  state.mouseOpen = lerp(state.mouseOpen, targetOpen, .045);
  const open = clamp(.38 + params.expression * .43 + state.mouseOpen * .25 + state.audioLevel * .12, .38, 1.08);
  const breath = 1 + Math.sin(time * e.speed * 1.7 + seed) * (.018 + params.intensity * .024);
  const overall = base * (.70 + params.intensity * .48) * breath;

  drawAura(c, cx, cy, overall, e, time + seed, open, mini);
  drawEmotionField(c, cx, cy, overall, e, time + seed, mini);

  c.save();
  c.translate(cx, cy);
  c.globalCompositeOperation = 'source-over';
  const baseRotation = e.shape === 'fracture' ? Math.sin(time * 8.5) * .025 : time * e.speed * .035;
  c.rotate(baseRotation + seed * .4);

  for (let layer = e.layers - 1; layer >= 0; layer--) {
    const layerNorm = layer / Math.max(1, e.layers - 1);
    const count = Math.max(5, e.petals - Math.floor(layerNorm * (e.shape === 'soft' ? 1 : 3)));
    const layerScale = 1 - layerNorm * .48;
    const layerOpen = open * (.78 + (1 - layerNorm) * .26);
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2 + layer * .115 + (e.shape === 'upward' ? Math.sin(i * 1.5) * .055 : 0);
      let length = overall * layerScale * layerOpen;
      if (e.shape === 'upward') length *= .68 + Math.max(0, Math.cos(angle)) * .72;
      if (e.shape === 'droop') length *= .58 + Math.max(0, -Math.cos(angle)) * .92;
      if (e.shape === 'flame') length *= .88 + ((i + layer) % 4) * .07;
      const widthFactor = ({ round:.34, droop:.20, fracture:.29, lotus:.28, curve:.34, flame:.24, soft:.38, upward:.22 })[e.shape];
      const width = overall * widthFactor * layerScale * (.9 + Math.sin(i * 2.4 + seed) * .05);
      drawPetal(c, e, layer, i, count, length, width, angle, time, mini);
    }
  }
  c.restore();

  drawCore(c, cx, cy, overall, e, time, mini);
  if (!mini) drawParticles(c, w, h, e, params, time, cx, cy, overall);
}

function spawnParticle(e, cx, cy, overall) {
  const a = Math.random() * Math.PI * 2;
  const ring = overall * (.35 + Math.random() * .85);
  const speed = (.18 + Math.random() * .75) * (1 + state.intensity * .65) * dpr;
  let vx = Math.cos(a) * speed;
  let vy = Math.sin(a) * speed;
  if (e.particle === 'fall') { vx *= .25; vy = Math.abs(vy) + .18 * dpr; }
  if (e.particle === 'rise') { vx *= .32; vy = -Math.abs(vy) - .25 * dpr; }
  if (e.particle === 'burst') { vx *= 1.8; vy *= 1.8; }
  return {
    x: cx + Math.cos(a) * ring * .38,
    y: cy + Math.sin(a) * ring * .38,
    vx, vy, angle: a, radius: ring, life: 1,
    size: (.7 + Math.random() * 2.2) * dpr,
    color: Math.random() > .55 ? e.colors[2] : e.colors[0],
    trail: []
  };
}

function drawParticles(c, w, h, e, params, time, cx, cy, overall) {
  const target = Math.round(24 + params.intensity * 42 + state.audioLevel * 58);
  if (state.particles.length < target && Math.random() < .78) state.particles.push(spawnParticle(e, cx, cy, overall));

  if (e.particle === 'wave' && (state.rings.length < 4) && Math.random() < .018 + state.audioLevel * .04) {
    state.rings.push({ r: overall * .30, life: .65 });
  }

  c.save();
  c.globalCompositeOperation = 'screen';
  state.particles.forEach(p => {
    p.trail.push([p.x, p.y]);
    const trailLength = Math.round(3 + params.duration * (e.particle === 'orbit' ? 24 : 13));
    if (p.trail.length > trailLength) p.trail.shift();

    if (e.particle === 'orbit') {
      p.angle += .006 + params.intensity * .012;
      p.radius += Math.sin(time * .4 + p.angle) * .06 * dpr;
      p.x = cx + Math.cos(p.angle) * p.radius;
      p.y = cy + Math.sin(p.angle) * p.radius * .58;
    } else {
      p.x += p.vx * (1 + state.audioLevel * 2.4);
      p.y += p.vy * (1 + state.audioLevel * 2.4);
    }
    if (e.particle === 'noise') {
      p.x += Math.sin(time * 21 + p.y * .02) * 1.7 * dpr;
      p.y += Math.cos(time * 18 + p.x * .02) * 1.4 * dpr;
    }
    if (e.particle === 'glow') {
      p.vx *= .985; p.vy *= .985;
    }

    p.life -= .0035 + (1 - params.duration) * .009;
    if (p.trail.length > 1) {
      c.beginPath();
      p.trail.forEach((point, idx) => idx ? c.lineTo(point[0], point[1]) : c.moveTo(point[0], point[1]));
      c.strokeStyle = rgba(p.color, p.life * (e.particle === 'orbit' ? .26 : .13));
      c.lineWidth = p.size * .35;
      c.stroke();
    }
    c.beginPath();
    c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    c.fillStyle = rgba(p.color, p.life * .86);
    c.shadowColor = p.color;
    c.shadowBlur = 12 * dpr;
    c.fill();
  });
  state.particles = state.particles.filter(p => p.life > 0 && p.x > -100 && p.x < w + 100 && p.y > -100 && p.y < h + 100);

  state.rings.forEach(r => {
    r.r += .75 * dpr;
    r.life -= .006;
    c.beginPath();
    c.ellipse(cx, cy, r.r * 1.6, r.r * .48, 0, 0, Math.PI * 2);
    c.strokeStyle = rgba(e.colors[2], r.life * .20);
    c.lineWidth = .8 * dpr;
    c.stroke();
  });
  state.rings = state.rings.filter(r => r.life > 0);
  c.restore();
}

function frame() {
  updateAudio();
  state.time += .016;
  if (state.view === 'generator') {
    const e = emotions[state.emotionKey];
    drawBackground(ctx, canvas.width, canvas.height, e, state.time);
    drawFlower(ctx, canvas.width, canvas.height, e, state, state.time, false);
  }
  requestAnimationFrame(frame);
}

function archiveCurrent() {
  const e = emotions[state.emotionKey];
  const message = state.generatedMessage || e.messages[0];
  state.archive.unshift({
    key: state.emotionKey, intensity: state.intensity, duration: state.duration,
    expression: state.expression, message, created: new Date().toLocaleString('zh-CN'), seed: Math.random()
  });
  state.archive = state.archive.slice(0, 30);
  saveArchive();
  renderArchive();
  const btn = document.getElementById('archiveButton');
  const old = btn.textContent;
  btn.textContent = '已存入档案';
  setTimeout(() => btn.textContent = old, 900);
}

function saveArchive() {
  try { localStorage.setItem('cyberflower-language-archive', JSON.stringify(state.archive)); } catch (e) {}
}
function loadArchive() {
  try { state.archive = JSON.parse(localStorage.getItem('cyberflower-language-archive') || '[]'); } catch (e) { state.archive = []; }
  renderArchive();
}
function clearArchive() {
  state.archive = [];
  saveArchive();
  renderArchive();
}

function renderArchive() {
  const grid = document.getElementById('archiveGrid');
  grid.innerHTML = '';
  state.archive.forEach(item => {
    const e = emotions[item.key];
    const card = document.createElement('article');
    card.className = 'archive-card';
    const mini = document.createElement('canvas');
    mini.width = 300; mini.height = 300;
    card.appendChild(mini);
    const mc = mini.getContext('2d');
    drawBackground(mc, 300, 300, e, item.seed * 10, item.seed * 5);
    drawFlower(mc, 300, 300, e, item, item.seed * 10, true, item.seed);
    const title = document.createElement('b');
    title.textContent = `${e.code}  ${e.zh}`;
    const copy = document.createElement('small');
    copy.textContent = item.message;
    card.append(title, copy);
    grid.appendChild(card);
  });
  document.getElementById('archiveCount').textContent = state.archive.length;
}

function exportCard() {
  const out = document.createElement('canvas');
  out.width = 1500; out.height = 1900;
  const c = out.getContext('2d');
  const e = emotions[state.emotionKey];
  drawBackground(c, out.width, out.height, e, state.time);
  const params = { intensity: state.intensity, duration: state.duration, expression: state.expression };
  drawFlower(c, out.width, 1280, e, params, state.time, true, .37);

  c.fillStyle = 'rgba(255,255,255,.12)';
  c.fillRect(100, 1260, 1300, 1);
  c.fillStyle = '#f6f0f5';
  c.font = '500 62px Georgia, serif';
  c.fillText('CyberFlower Language', 100, 1370);
  c.fillStyle = e.colors[2];
  c.font = '500 43px sans-serif';
  c.fillText(`${e.code}  ${e.zh} / ${e.en}`, 100, 1450);
  c.fillStyle = '#a39ca8';
  c.font = '28px sans-serif';
  wrapText(c, state.generatedMessage || e.messages[0], 100, 1550, 1220, 48);
  c.fillStyle = '#766f7d';
  c.font = '22px monospace';
  c.fillText(`INTENSITY ${Math.round(state.intensity * 100)}   DURATION ${Math.round(state.duration * 100)}   OPENNESS ${Math.round(state.expression * 100)}`, 100, 1790);
  c.fillText('FUTURE EMOTIONAL COMMUNICATION PROTOTYPE', 100, 1840);

  const a = document.createElement('a');
  a.download = `${e.code}_${e.zh}_未来花语卡.png`;
  a.href = out.toDataURL('image/png');
  a.click();
}

function wrapText(c, text, x, y, maxWidth, lineHeight) {
  let line = '';
  for (const char of text) {
    const test = line + char;
    if (c.measureText(test).width > maxWidth && line) {
      c.fillText(line, x, y);
      line = char;
      y += lineHeight;
    } else line = test;
  }
  c.fillText(line, x, y);
}

buildEmotionButtons();
bindControls();
selectEmotion('longing');
loadArchive();
frame();
