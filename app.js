// Canvas animated grid background
const bg = document.getElementById('bg');
const ctx = bg.getContext('2d');
function resize(){ bg.width = innerWidth; bg.height = innerHeight }
addEventListener('resize', resize); resize();
let t = 0;
function draw(){
  ctx.clearRect(0,0,bg.width,bg.height);
  const s = 42, off = (Math.sin(t/20)*10);
  for(let x=-s; x<bg.width+s; x+=s){
    for(let y=-s; y<bg.height+s; y+=s){
      const nx = x + off, ny = y + off;
      ctx.strokeStyle = 'rgba(90, 255, 190, .07)';
      ctx.strokeRect(nx, ny, s, s);
    }
  }
  t++;
  requestAnimationFrame(draw);
}
draw();

// Typewriter effect
const typer = document.getElementById('typewrite');
const phrases = JSON.parse(typer.getAttribute('data-phrases'));
let p = 0, i = 0, dir = 1, pause = 0;
function typeLoop(){
  if(pause>0){ pause--; return requestAnimationFrame(typeLoop) }
  const span = typer.querySelector('span');
  span.textContent = phrases[p].slice(0,i);
  i += dir;
  if(i === phrases[p].length + 1){ dir = -1; pause = 30 }
  if(i === 0){ dir = 1; p = (p+1)%phrases.length; pause = 12 }
  requestAnimationFrame(typeLoop);
}
typeLoop();

// Glitch micro-jitter on hover
document.querySelectorAll('.glitch').forEach(g=>{
  g.addEventListener('mouseenter',()=>g.style.filter='hue-rotate(15deg) saturate(140%)');
  g.addEventListener('mouseleave',()=>g.style.filter='');
});

// Stats counter
document.querySelectorAll('.num').forEach(el=>{
  const target = +el.dataset.count;
  let c = 0;
  const step = Math.max(1, Math.floor(target/60));
  const id = setInterval(()=>{ c+=step; if(c>=target){c=target; clearInterval(id)} el.textContent=c }, 16);
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', ()=>{
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});
if(localStorage.getItem('theme')==='light'){ document.body.classList.add('light') }

// Terminal typing
const term = document.getElementById('terminal');
const lines = [
  "$ whoami",
  "ansh",
  "$ uptime",
  "system up 1337 days",
  "$ echo \"mission: build, break, secure\"",
  "mission: build, break, secure",
  "$ _"
];
let li=0;
function typeTerm(){
  if(li>=lines.length) return;
  term.textContent += (li===0?'':'\n') + lines[li];
  li++;
  setTimeout(typeTerm, li%2===0 ? 400 : 900);
}
setTimeout(typeTerm, 600);

// Projects (edit this list for your repos)
const projects = [
  {
    title:"GhostRecon",
    desc:"Recon toolkit: subdomain enum, HTTP probing, live dashboard.",
    repo:"https://github.com/Hi-TECH02/ghostrecon",
    tag:"Security"
},
  {
    title:"ZeroTrace API",
    desc:"High-performance logging pipeline with auth, rate limits, and alerts.",
    repo:"https://github.com/your-username/zerotrace",
    tag:"Backend"
  },
  {
    title:"CipherUI",
    desc:"Beautiful encryption playground (AES/RSA/Hash) with Web Workers.",
    repo:"https://github.com/your-username/cipherui",
    tag:"Frontend"
  },
  {
    title:"OpsDeck",
    desc:"Infra status panel + uptime checks + incident timelines.",
    repo:"https://github.com/your-username/opsdeck",
    tag:"DevOps"
  },
  {
    title:"BugHunt Notes",
    desc:"Curated notes and labs for OWASP Top 10 + real cases.",
    repo:"https://github.com/your-username/bughunt-notes",
    tag:"Research"
  },
  {
    title:"SecureStart",
    desc:"Template repo: Next.js + Auth + RBAC + Prisma + CI.",
    repo:"https://github.com/your-username/securestart",
    tag:"Starter"
  }
];

const grid = document.getElementById('projectGrid');
const tpl = document.getElementById('projectCard');
let shown = 0;
function renderBatch(n=3){
  for(let k=0; k<n && shown<projects.length; k++){
    const p = projects[shown++];
    const node = tpl.content.cloneNode(true);
    node.querySelector('.card-title').textContent = p.title;
    node.querySelector('.card-desc').textContent = p.desc;
    node.querySelector('.link').href = p.repo;
    node.querySelector('.pill').textContent = p.tag;
    grid.appendChild(node);
  }
  if(shown>=projects.length){ document.getElementById('loadMore').style.display='none' }
}
renderBatch(6);
document.getElementById('loadMore').addEventListener('click', ()=>renderBatch(3));

// Contact form (mailto fallback)
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(e.target);
  const subject = encodeURIComponent("Contact — Secret Army Labs");
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`
  );
  window.location.href = `mailto:anshpanwar282009@google.com?subject=${subject}&body=${body}`;
});
