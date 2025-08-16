// Typewriter Effect
const typewriter = document.querySelector('.typewriter');
let text = "Information Security Analyst";
let i = 0;

function typeEffect() {
  if (i < text.length) {
    typewriter.textContent = text.substring(0, i+1);
    i++;
    setTimeout(typeEffect, 100);
  }
}
typeEffect();

// Scroll Reveal
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    let top = sec.getBoundingClientRect().top;
    if(top < window.innerHeight - 100) {
      sec.classList.add('reveal');
    }
  });
});
