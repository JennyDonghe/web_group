// Content: replace or extend with your own images/blurbs.
// Put the images in ./assets/ with these filenames or edit the paths below.
const DATA = [
  {
    img: "wine.png",
    alt: "Animated pour of red wine into a glass",
    poster: "Summer",
    source: "random gif; browser capture",
    ideas: ["found-media", "everyday-ritual", "loop-culture"],
    blurb: "cheers to the hard workers."
  },
  {
    img: "skin.png",
    alt: "Macro photo of a glossy skincare drop on skin with tiny watermark text",
    poster: "Marisa",
    source: "beauty blog crop",
    ideas: ["appropriation", "commerce-remix", "artifact-watermarks"],
    blurb: "this was so pretty i had to save it!"
  },
  {
    img: "human.png",
    alt: "Man in a hallway showing empty pockets",
    poster: "Travis",
    source: "webcam still",
    ideas: ["performative-self", "lo-fi", "pre-social-media"],
    blurb: "can even aford pants with pockets these days?"
  },
  {
    img: "cat.png",
    alt: "Chonky black and white cat looking through blinds",
    poster: "Guthrie",
    source: "pet forum jpg",
    ideas: ["just-below-meme", "domestic-internet", "found-media"],
    blurb: "overweight cats for the day"
  },
  {
    img: "sign.png",
    alt: "Road sign of a figure walking down steps, photographed against trees",
    poster: "Olia",
    source: "folk signage photo",
    ideas: ["web-folklore", "vernacular-design", "remixable-symbols"],
    blurb: "✅safe to use stairs!"
  },
  {
    img: "kiss.png",
    alt: "Boxer in a magenta-lit ring moving in slow motion",
    poster: "Pascual",
    source: "sports gif",
    ideas: ["time-stretch", "cinema-to-gif", "affective-loops"],
    blurb: "Lol love slow-mo boxing kisses"
  },
  {
    img: "tattoo.png",
    alt: "Person with checkerboard face tattoo on a transparent background",
    poster: "JMB",
    source: "png cutout",
    ideas: ["greenscreen-web", "browser-aesthetics", "png-culture"],
    blurb: "transparency is the new black"
  },
  {
    img: "dogface.png",
    alt: "Tiny photo of a dog with a human face composited on",
    poster: "Borna",
    source: "forum mashup",
    ideas: ["glitch-humor", "remix", "pre-deepfake"],
    blurb: "he said he wanted to be more human"
  },
  {
    img: "angle.png",
    alt: "angle with shadow",
    poster: "David",
    source: "remix resource",
    ideas: ["remix", "pre-deepfake"],
    blurb: "just and angle"
  },
  {
    img: "television.png",
    alt: "reflection of me",
    poster: "Jennifer",
    source: "glitch-humor",
    ideas: ["glitch-humor", "pre-deepfake"],
    blurb: "I always get inspired when I see my reflection on old tv screens"
  }

];

let active = 'all';
let query = '';

const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const q = document.getElementById('q');
const pills = [...document.querySelectorAll('.pill')];
const shuffleBtn = document.getElementById('shuffle');

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function render(){
  grid.innerHTML = '';
  let items = DATA.slice();
  if(active !== 'all') items = items.filter(x => (x.ideas||[]).includes(active));
  if(query){
    const ql = query.toLowerCase();
    items = items.filter(x => (x.poster+' '+x.source+' '+x.blurb+' '+(x.ideas||[]).join(' ')).toLowerCase().includes(ql));
  }
  items.forEach(x=>{
    const tile = document.createElement('article');
    tile.className = 'tile';
    tile.tabIndex = 0;
    tile.innerHTML = `
      <img src="assets/${x.img}" alt="${x.alt}">
      <div class="meta">
        <span class="who">posted by ${x.poster}</span>
        <span class="src">${x.source}</span>
      </div>
      <div class="overlay">
        <div class="idea">
          <div><strong>Idea:</strong> ${x.blurb}</div>
          <div class="tags">${(x.ideas||[]).map(t=>`<span class="tag">#${t}</span>`).join('')}</div>
        </div>
      </div>
      <span class="glow" aria-hidden="true"></span>
    `;
    grid.appendChild(tile);
  });
  empty.style.display = items.length ? 'none' : 'block';
}

pills.forEach(btn=>{
  btn.addEventListener('click',()=>{
    pills.forEach(b=>b.dataset.active='false');
    btn.dataset.active='true';
    active = btn.dataset.filter;
    render();
  });
});

q.addEventListener('input', e=>{ query = e.target.value.trim(); render(); });
shuffleBtn.addEventListener('click', ()=>{ shuffle(DATA); render(); });

shuffle(DATA);
render();
