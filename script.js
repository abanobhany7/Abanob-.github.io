// Year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// Typewriter effect
class Typewriter {
  constructor(el, words, period=2200){
    this.el = el; this.words = words; this.txt = ''; this.wordIndex = 0; this.period = period; this.isDeleting = false;
    this.tick();
  }
  tick(){
    const i = this.wordIndex % this.words.length;
    const full = this.words[i];
    this.txt = this.isDeleting ? full.substring(0, this.txt.length - 1) : full.substring(0, this.txt.length + 1);
    this.el.innerHTML = `<span class="cursor">${this.txt}</span>`;
    let delta = 90 + Math.random()*80;
    if(this.isDeleting) delta /= 2;
    if(!this.isDeleting && this.txt === full){ delta = this.period; this.isDeleting = true; }
    else if(this.isDeleting && this.txt === ''){ this.isDeleting = false; this.wordIndex++; delta = 350; }
    setTimeout(() => this.tick(), delta);
  }
}
window.addEventListener('load', () => {
  const el = document.querySelector('.typewriter');
  if (el){
    const words = JSON.parse(el.getAttribute('data-words') || '[]');
    new Typewriter(el, words);
  }
});

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal-visible'); });
}, {threshold: .15});
document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right').forEach(el => io.observe(el));

// Matrix background (lightweight)
(function matrix(){
  const c = document.getElementById('matrix'); if (!c) return;
  const ctx = c.getContext('2d');
  const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; cols = Math.floor(c.width/14); drops = Array(cols).fill(1); };
  let cols = 0, drops = [];
  const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+-/<=>?'.split('');
  function draw(){
    ctx.fillStyle = 'rgba(7,11,18,0.09)';
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = '#00e5ff';
    ctx.font = '14px IBM Plex Mono, monospace';
    for (let i=0; i<drops.length; i++){
      const text = chars[Math.floor(Math.random()*chars.length)];
      ctx.fillText(text, i*14, drops[i]*14);
      if (drops[i]*14 > c.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize(); draw();
})();
