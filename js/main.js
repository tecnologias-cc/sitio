const header=document.querySelector('#header');addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30));
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú')}));
const track=document.querySelector('.track');let slide=0;const slides=[...track.children],dots=[...document.querySelectorAll('.gallery-dots button')];
function galleryMode(){return innerWidth<=800?'mobile':'desktop'}
function show(n,animate=true){slide=(n+slides.length)%slides.length;slides.forEach((el,i)=>el.classList.toggle('active',i===slide));dots.forEach((el,i)=>el.classList.toggle('active',i===slide));const pct=galleryMode()==='mobile'?slide*100:slide*80;track.style.transition=animate?'transform .55s cubic-bezier(.22,.61,.36,1)':'none';track.style.transform=`translateX(-${pct}%)`}
document.querySelector('.next').onclick=()=>show(slide+1);document.querySelector('.prev').onclick=()=>show(slide-1);dots.forEach(d=>d.addEventListener('click',()=>show(+d.dataset.slide)));
let startX=null;track.addEventListener('pointerdown',e=>{if(galleryMode()==='mobile')startX=e.clientX});track.addEventListener('pointerup',e=>{if(startX===null)return;const dx=e.clientX-startX;if(Math.abs(dx)>45)show(slide+(dx<0?1:-1));startX=null});addEventListener('resize',()=>show(slide,false));show(0,false);
document.querySelectorAll('.brand-card').forEach(card=>card.addEventListener('click',()=>{document.querySelectorAll('.brand-card').forEach(c=>c!==card&&c.classList.remove('active'));card.classList.toggle('active')}));
const info=document.querySelector('.country-info');document.querySelectorAll('.map-buttons button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.map-buttons button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');info.innerHTML=`<strong>${btn.dataset.country}</strong><span>${btn.dataset.info}</span>`}));


// V8 — confirmación de mayoría de edad para todo el sitio
(()=>{
  const gate=document.querySelector('#ageGate');
  const yes=document.querySelector('#ageYes');
  const no=document.querySelector('#ageNo');
  if(!gate||!yes||!no)return;
  const key='casaCortesAgeVerified';
  let verified=false;
  try{verified=localStorage.getItem(key)==='yes'}catch(e){}
  const closeGate=()=>{gate.hidden=true;document.body.classList.remove('age-locked')};
  if(verified){closeGate();return}
  requestAnimationFrame(()=>yes.focus());
  yes.addEventListener('click',()=>{try{localStorage.setItem(key,'yes')}catch(e){}closeGate()});
  no.addEventListener('click',()=>{
    window.location.href='https://www.google.com/';
  });
})();

// V13 — transición horizontal entre portada internacional y mapa
(()=>{
  const world=document.querySelector('#mundo');
  const next=document.querySelector('#worldNext');
  const back=document.querySelector('#worldBack');
  if(!world||!next||!back)return;
  next.addEventListener('click',()=>world.classList.add('show-map'));
  back.addEventListener('click',()=>world.classList.remove('show-map'));
})();
