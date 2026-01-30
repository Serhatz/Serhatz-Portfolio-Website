const toggle=document.getElementById('menuToggle')
const menu=document.getElementById('mobileMenu')
const icon=document.getElementById('menuIcon')
if(toggle&&menu&&icon){toggle.addEventListener('click',()=>{const isOpen=!menu.classList.contains('hidden');menu.classList.toggle('hidden');toggle.setAttribute('aria-expanded',String(!isOpen));icon.classList.toggle('fa-bars');icon.classList.toggle('fa-xmark')});menu.querySelectorAll('a').forEach(a=>{a.addEventListener('click',()=>{menu.classList.add('hidden');toggle.setAttribute('aria-expanded','false');icon.classList.add('fa-bars');icon.classList.remove('fa-xmark')})})}
const langToggle=document.getElementById('langToggle')
const langMenu=document.getElementById('langMenu')
if(langToggle&&langMenu){langToggle.addEventListener('click',()=>{langMenu.classList.toggle('hidden')});document.addEventListener('click',e=>{if(!langToggle.contains(e.target)&&!langMenu.contains(e.target)){langMenu.classList.add('hidden')}})}
const langToggleM=document.getElementById('langToggleMobile')
const langMenuM=document.getElementById('langMenuMobile')
if(langToggleM&&langMenuM){langToggleM.addEventListener('click',()=>{langMenuM.classList.toggle('hidden')})}

if(window.AOS){AOS.init({duration:700,once:true,offset:40})}

const typing=document.getElementById('typing')
if(typing){const text=typing.getAttribute('data-text')||'';let i=0;const speed=40;function type(){if(i<=text.length){typing.textContent=text.slice(0,i);i++;setTimeout(type,speed)}}type()}

function spawnConfetti(x,y){const container=document.getElementById('confetti');if(!container)return;for(let i=0;i<30;i++){const piece=document.createElement('span');piece.className='confetti';piece.style.left=x+Math.random()*40-20+'px';piece.style.top=y+'px';piece.style.setProperty('--rx',Math.random()*720+'deg');piece.style.setProperty('--dx',Math.random()*200-100+'px');piece.style.setProperty('--dur',0.8+Math.random()*0.6+'s');container.appendChild(piece);setTimeout(()=>piece.remove(),1200)}}
document.querySelectorAll('.btn-confetti').forEach(btn=>{btn.addEventListener('click',e=>{const rect=btn.getBoundingClientRect();spawnConfetti(rect.left+rect.width/2,rect.top+window.scrollY);pop()})})

const grid=document.getElementById('projectGrid')
const search=document.getElementById('projectSearch')
const chips=document.querySelectorAll('.filter-chip')
let active='all'
function applyFilter(){if(!grid)return;const q=(search&&search.value||'').toLowerCase();grid.querySelectorAll('.project-card').forEach(card=>{const cat=card.getAttribute('data-category')||'';const tags=card.getAttribute('data-tags')||'';const text=(card.textContent||'').toLowerCase();const inCat=active==='all'||cat===active;const inText=!q||text.includes(q)||tags.includes(q);card.style.display=inCat&&inText?'block':'none'})}
if(chips.length){chips.forEach(c=>c.addEventListener('click',()=>{chips.forEach(x=>{x.classList.remove('bg-black','text-white');x.classList.add('bg-white','text-black')});c.classList.remove('bg-white','text-black');c.classList.add('bg-black','text-white');active=c.getAttribute('data-filter')||'all';applyFilter()}))}
if(search){search.addEventListener('input',applyFilter)}

const socials=document.querySelectorAll('.social-bounce')
socials.forEach(s=>{s.addEventListener('mouseenter',()=>s.classList.add('pop'));s.addEventListener('mouseleave',()=>s.classList.remove('pop'))})

const bodyRoot=document.getElementById('bodyRoot')
const themeToggle=document.getElementById('themeToggle')
const themeToggleMobile=document.getElementById('themeToggleMobile')
const themeIcon=document.getElementById('themeIcon')
const themeLabel=document.getElementById('themeLabel')
const themeLabelMobile=document.getElementById('themeLabelMobile')

function setTheme(mode){if(mode==='dark'){bodyRoot.classList.add('theme-dark');bodyRoot.classList.remove('theme-light');if(themeIcon){themeIcon.classList.remove('fa-sun');themeIcon.classList.add('fa-moon')}if(themeLabel){themeLabel.textContent='Koyu'}if(themeLabelMobile){themeLabelMobile.textContent='Koyu'}localStorage.setItem('sv_theme','dark')}else{bodyRoot.classList.remove('theme-dark');bodyRoot.classList.add('theme-light');if(themeIcon){themeIcon.classList.remove('fa-moon');themeIcon.classList.add('fa-sun')}if(themeLabel){themeLabel.textContent='Açık'}if(themeLabelMobile){themeLabelMobile.textContent='Açık'}localStorage.setItem('sv_theme','light')}}
const savedTheme=localStorage.getItem('sv_theme')
if(savedTheme){setTheme(savedTheme)}else{if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){setTheme('dark')}else{setTheme('light')}}
function toggleTheme(){const isDark=bodyRoot.classList.contains('theme-dark');setTheme(isDark?'light':'dark')}
if(themeToggle){themeToggle.addEventListener('click',toggleTheme)}
if(themeToggleMobile){themeToggleMobile.addEventListener('click',toggleTheme)}

function parallax(e){const hero=document.querySelector('.hero');if(!hero)return;const rect=hero.getBoundingClientRect();const cx=e.clientX-rect.left-rect.width/2;const cy=e.clientY-rect.top-rect.height/2;document.querySelectorAll('.deco').forEach((el,i)=>{const factor=(i+1)*0.02;el.style.transform=`translate(${cx*factor}px,${cy*factor}px)`})}
if(document.querySelector('.hero')){document.addEventListener('mousemove',parallax)}

const counters=document.querySelectorAll('.counter')
if(counters.length){const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const el=entry.target;const max=parseInt(el.getAttribute('data-count')||'0',10);let n=0;const step=Math.ceil(max/60);const t=setInterval(()=>{n+=step;if(n>=max){n=max;clearInterval(t)}el.textContent=el.getAttribute('data-count')==='100'?n+'%':n+'+'},16);io.unobserve(el)}})},{threshold:0.6});counters.forEach(el=>io.observe(el))}

const tip=document.getElementById('skillTooltip')
document.querySelectorAll('#skillTree .skill-node').forEach(n=>{n.addEventListener('mouseenter',e=>{const c=n.querySelector('circle');const r=parseFloat(c.getAttribute('r'));const cx=parseFloat(c.getAttribute('cx'));const cy=parseFloat(c.getAttribute('cy'));const box=n.closest('svg').getBoundingClientRect();tip.classList.remove('hidden');const name=n.getAttribute('data-skill');const lvl=n.getAttribute('data-level');tip.textContent=name+' • '+lvl;tip.style.left=box.left+window.scrollX+cx+'px';tip.style.top=box.top+window.scrollY+cy-r-10+'px'});n.addEventListener('mouseleave',()=>{tip.classList.add('hidden')})})

function pop(){try{const ctx=new (window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator();const g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.type='triangle';o.frequency.value=220;g.gain.setValueAtTime(0.0001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.2,ctx.currentTime+0.01);g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.12);o.start();o.stop(ctx.currentTime+0.13)}catch(e){}}

;(function(){
  const buffer=[]
  function pushKey(k){
    if(k.length===1) buffer.push(k.toLowerCase())
    if(buffer.length>8) buffer.shift()
    const s=buffer.join('')
    if(s.endsWith('gravity')) __triggerGravity()
    if(s.endsWith('rain')) __triggerRain()
    if(s.endsWith('snow')) __triggerSnow()
  }
  document.addEventListener('keydown',e=>{
    if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='m'){__triggerMirror()}
    if(e.ctrlKey&&!e.shiftKey&&e.key.toLowerCase()==='g'){__triggerGlitch()}
    if(e.key==='F12'){__triggerDev()}
    pushKey(e.key)
  })
})()

window.__triggerMirror=function(){
  document.body.classList.add('mirror-on')
  setTimeout(()=>document.body.classList.remove('mirror-on'),10000)
}

window.__triggerGravity=function(){
  const items=[...document.querySelectorAll('.neo-brutalist, img, h1, h2, h3, p, a')]
  document.body.classList.add('gravity-on')
  items.forEach((el,i)=>{const y=20+Math.random()*120;el.style.transform='translateY('+y+'px)'})
  setTimeout(()=>{items.forEach(el=>{el.style.transform='translateY(0)'});document.body.classList.remove('gravity-on')},2200)
}

window.__triggerGlitch=function(){
  document.body.classList.add('glitch')
  setTimeout(()=>document.body.classList.remove('glitch'),2000)
}

window.__triggerRain=function(){
  const layer=document.createElement('div')
  layer.className='weather-layer'
  document.body.appendChild(layer)
  for(let i=0;i<120;i++){const d=document.createElement('div');d.className='drop';d.style.left=Math.random()*100+'vw';d.style.animationDuration=(0.8+Math.random()*0.8)+'s';layer.appendChild(d)}
  setTimeout(()=>layer.remove(),1800)
}

window.__triggerSnow=function(){
  const layer=document.createElement('div')
  layer.className='weather-layer'
  document.body.appendChild(layer)
  for(let i=0;i<90;i++){const f=document.createElement('div');f.className='flake';f.style.left=Math.random()*100+'vw';f.style.setProperty('--dx',(Math.random()*80-40)+'px');f.style.animationDuration=(2.5+Math.random()*1.5)+'s';layer.appendChild(f)}
  setTimeout(()=>layer.remove(),4000)
}

window.__triggerDev=function(){
  console.log('Developer mode aktif')
  const centerX=window.innerWidth/2
  const centerY=window.scrollY+window.innerHeight/2
  spawnConfetti(centerX,centerY)
  pop()
}

const loader=document.getElementById('loader')
const skip=document.getElementById('skipLoader')
if(loader){const lines=[...loader.querySelectorAll('.line')];let i=0;const t=setInterval(()=>{if(i<lines.length){lines[i].classList.add('show');i++}else{clearInterval(t);loader.style.opacity='1';loader.style.transition='opacity .35s';loader.style.opacity='0';setTimeout(()=>loader.remove(),360)}},260);if(skip){skip.addEventListener('click',()=>{loader.remove()})}}
