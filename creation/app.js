const EXT = "png";
const COUNTS = { lefteye: 4, righteye: 4, nose: 4, mouth: 4 };

const $ = (s) => document.querySelector(s);
const r  = (n) => Math.floor(Math.random() * n);
const r1 = (n) => r(n) + 1;

const $left  = $(".feature.eye.left");
const $right = $(".feature.eye.right");
const $nose  = $(".feature.nose");
const $mouth = $(".feature.mouth");
const $btn   = $("#shuffle");

function src(feature, i){ return `assets/${feature}${i}.${EXT}`; }
function preload(u){ const im=new Image(); im.src=u; }

// --- face shuffle ---
function shuffle(){
  const li=r1(COUNTS.lefteye), ri=r1(COUNTS.righteye), ni=r1(COUNTS.nose), mi=r1(COUNTS.mouth);
  const leftSrc  = src("lefteye",  li);
  const rightSrc = src("righteye", ri);
  const noseSrc  = src("nose",     ni);
  const mouthSrc = src("mouth",    mi);
  [leftSrc, rightSrc, noseSrc, mouthSrc].forEach(preload);
  $left.src=leftSrc; $right.src=rightSrc; $nose.src=noseSrc; $mouth.src=mouthSrc;

  cycleButtonStyle();          // <— force color change every time
}

// --- colorful button styles ---
const PALETTES = [
  ["#ff4b1f","#1fddff"],
  ["#f857a6","#ff5858"],
  ["#43e97b","#38f9d7"],
  ["#30cfd0","#330867"],
  ["#f6d365","#fda085"],
  ["#667eea","#764ba2"],
  ["#ff9966","#ff5e62"],
  ["#8e2de2","#4a00e0"],
  ["#00c9ff","#92fe9d"],
  ["#ff6a00","#ee0979"]
];
let idx = -1;

function cycleButtonStyle(){
  // step through palettes (no repeat), also randomize angle
  idx = (idx + 1) % PALETTES.length;
  const [a,b] = PALETTES[idx];
  const angle = r(360);
  const grad  = `linear-gradient(${angle}deg, ${a}, ${b})`;

  // IMPORTANT: override any external CSS (even with !important)
  $btn.style.setProperty("background", grad, "important");
  $btn.style.setProperty("box-shadow", `0 10px 26px ${a}66`, "important");
  $btn.style.color = "#fff";

  // little click animation
  $btn.style.transform = "scale(1.06)";
  setTimeout(()=>{ $btn.style.transform = "scale(1)"; }, 150);
}

$btn.addEventListener("click", shuffle);
document.addEventListener("keydown", e=>{ if(e.code==="Space"){ e.preventDefault(); shuffle(); }});
shuffle();   // initial render
