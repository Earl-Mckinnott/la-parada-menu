
// home splash screen

document.addEventListener('DOMContentLoaded', () => {
  // Preload gallery images while splash is visible
const galleryImages = [
  'images/gallery7.webp',
  'images/gallery1.webp',
  'images/gallery2.jpg',
  'images/gallery9.webp',
  'images/gallery6.jpg',
  'images/gallery4.jpg',
  'images/gallery5.jpg',
  'images/gallery8.webp'
];
galleryImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

  const splash = document.getElementById('splash-screen');
  const enter = document.querySelector('.enter-text');
  
if (sessionStorage.getItem('splashDone')) {
    splash.style.display = 'none';
    return;
  }

  if (splash && enter) {
    enter.addEventListener('click', () => {
      console.log('enter clicked')
      splash.classList.add('reveal');

      window.galleryShouldStart = true;

      if (typeof window.startGallery === 'function') {
        window.startGallery();
      }

 sessionStorage.setItem('splashDone', 'true');
      // optional: preload images for your gallery here

      setTimeout(() => {
        splash.style.display = 'none';
      }, 1600); // matches transition duration
    });
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('#main-nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.getAttribute('href');

      // fade out nav
      nav.classList.add('fade-out');

      // wait for fade-out animation before navigating
      setTimeout(() => {
        window.location.href = url;
      }, 500); // match the transition duration
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) {
    // ensure it starts invisible
    homeBtn.style.opacity = '0';
    // wait one frame, then fade in
    requestAnimationFrame(() => {
      homeBtn.style.opacity = '1';
    });
  }
});





// home gallery

window.addEventListener('load', () => {
  const track = document.querySelector('.gallery-track');
  if (!track) return;

  let position = 0;
  const speed = 0.5; // adjust speed

const totalWidth = track.scrollWidth / 2; 
console.log("track total width:", track.scrollWidth)

  function animate() {
    position -= speed;
    track.style.transform = `translate3d(${position}px, 0, 0)`;

// soft reset: when one full set has scrolled past
    if (Math.abs(position) >= totalWidth) {
      position = 0; // jump back to start (off-screen)
      track.style.transform = `translate3d(${position}px, 0, 0)`;
    }

    requestAnimationFrame(animate);

  }
  window.startGallery = ()=> {
    console.log('starting gallery animation');
    requestAnimationFrame(animate)
  }
  // if no splash exists at all, start immediately
  if (!document.getElementById('splash-screen') || window.galleryShouldStart) {
    window.startGallery();
  }
});





// home rotating messages

document.addEventListener('DOMContentLoaded', () => {
  const rotatingSpan = document.getElementById('rotating-span');

  const phrases = [
  "Bienvenido a",
  "la Parada del Sabor",
  "Comida casera.",
  "Tu lugar favorito",
  "está en Allentown.",
  "Haz la fila",
  "o toma asiento.",
  "¡llámanos!",
  "hacemos delivery.",
  "Sancocho el fin de semana",
  "...",
  "Hacemos catering.",
  "..."
];

  let index = 0;

  function showNextPhrase() {
    // fade out
    rotatingSpan.style.opacity = 0;

    setTimeout(() => {
      // change text
      index = (index + 1) % phrases.length;
      rotatingSpan.textContent = phrases[index];

      // fade in
      rotatingSpan.style.opacity = 1;
    },300); // matches transition time in CSS
  }

  setInterval(showNextPhrase, 2700); // change every 3 seconds
});




// map button 

document.addEventListener('DOMContentLoaded', () => {
  const mapBtn = document.getElementById('map-button');
  if (!mapBtn) return;

  mapBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const address = encodeURIComponent('102 W Susquehanna St, Allentown, PA');

    // simple device detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    const url = isIOS
      ? `maps://maps.apple.com/?q=${address}`
      : `https://www.google.com/maps/search/?api=1&query=${address}`;

    window.open(url, '_blank');
  });
});




const menuBtn = document.querySelector('.menu-dropdown');

let lastScrollY=0;
let ticking=false;
function updateMenuBtnPosition() {
  const startTop = 17.6; // same as CSS top
  const endTop = 0.5;      // final resting position
  const scrollDistance = 410; // how far the effect lasts (px)

  // how far along (0 → 1)
  let progress = Math.min(lastScrollY / scrollDistance, 1);

  // ease it a bit (optional, makes it smoother)
  progress = progress * (2 - progress); // easeOutQuad

  const newTop = startTop - (startTop - endTop) * progress;

  menuBtn.style.top = `${newTop}rem`;
  menuBtn.style.left= '50%';
  menuBtn.style.transform = 'translateX(-50%)';

  ticking = false;
}
window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(updateMenuBtnPosition);
    ticking = true;
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.menu-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 }); // trigger when 10% of the section is visible

  sections.forEach(section => observer.observe(section));
});