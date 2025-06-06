document.addEventListener('DOMContentLoaded', () => {
const body= document.body;

  // Preload Ensaladas background image
  const ensaladasImage = new Image();
  ensaladasImage.src = 'images/salad-background.jpg';

  if (document.body.classList.contains('menu-view')) {
    document.body.classList.add('initial-load');

    setTimeout(() => {
      document.body.classList.remove('initial-load');
      document.body.classList.add('shrunk');
    }, 600); // match animation duration
  }
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    const navHeight = document.querySelector('.menu-nav-container').offsetHeight;
    const y = section.getBoundingClientRect().top + window.scrollY - navHeight - 20;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}


//menu stuff

// Step 1: Get all the buttons and pages
const menuButtons = document.querySelectorAll('.menu-btn');
const menuPages = document.querySelectorAll('.menu-page');
const backButtons = document.querySelectorAll('.back-btn');

menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const targetPage = document.getElementById(targetId);

    // hide all pages
    menuPages.forEach(page => page.classList.remove('active'));

    // show the selected one
    if (targetPage) {
      // Handle unique classes for banners and backgrounds
      if (targetId === 'antojitos') {
        document.body.classList.add('antojitos-open');
      } else {
        document.body.classList.remove('antojitos-open');
      }

      if (targetId === 'ensaladas') {
        document.body.classList.add('ensaladas-open');
        targetPage.classList.add('ensaladas-bg');
        setTimeout(() => {
          targetPage.classList.add('fade-in');
        }, 50);
      } else {
        document.body.classList.remove('ensaladas-open');
      }

      // desayuno menu page block
      if (targetId === 'desayuno') {
        targetPage.classList.add('desayuno-bg');
        setTimeout(() => {
          targetPage.classList.add('fade-in');
        }, 50);
      } else {
        targetPage.classList.remove('desayuno-bg', 'fade-in');
      }

      // sopas menu page block
      if (targetId === 'sopas') {
        document.body.classList.add('sopas-open');
        const banner = document.getElementById('sopas-banner');
        if (banner) {
          banner.classList.add('active');
        }
      } else {
        document.body.classList.remove('sopas-open');
        const banner = document.getElementById('sopas-banner');
        if (banner) {
          banner.classList.remove('active');
        }
      }

      if (targetId === 'almuerzo') {
        document.body.classList.add('almuerzo-open');
      } else {
        document.body.classList.remove('almuerzo-open');
      }

      if (targetId === 'carnes') {
  document.body.classList.add('carnes-open');
} else {
  document.body.classList.remove('carnes-open');
}

      if (targetId === 'antojitos') {
        const banner = document.getElementById('antojitos-banner');
        if (banner) {
          banner.classList.add('active');
        }
      } else {
        const banner = document.getElementById('antojitos-banner');
        if (banner) {
          banner.classList.remove('active');
        }
      }
  targetPage.classList.add('active');
  checkScrollVisibility(); // update arrow visibility on open
  document.body.classList.add('menu-view');
  document.body.style.overflow = 'hidden'; // 🔒 prevent background scrolling
}
  });
});

backButtons.forEach(button => {
  button.addEventListener('click', () => {
    menuPages.forEach(page => {
      page.classList.remove('active', 'ensaladas-bg', 'desayuno-bg', 'fade-in');
    });
    const banner = document.getElementById('antojitos-banner');
    if (banner) {
      banner.classList.remove('active');
    }
    // Remove sopas banner and class
    const sopasBanner = document.getElementById('sopas-banner');
    if (sopasBanner) {
      sopasBanner.classList.remove('active');
    }
    document.body.classList.remove('antojitos-open', 'sopas-open', 'almuerzo-open');
    menuPages.forEach(page => page.classList.remove('ensaladas-bg', 'desayuno-bg', 'fade-in'));
    document.body.classList.remove('ensaladas-open');
    // Hide scroll arrow when closing menu
    if (scrollArrow) {
      scrollArrow.style.opacity = '0';
      scrollArrow.style.visibility = 'hidden';
      scrollArrow.style.animation = 'none';
    }
    document.body.style.overflow = ''; // ✅ re-enable scrolling
  });
});

// Hide scroll-down arrow on scroll
const scrollArrow = document.querySelector('.scroll-down-arrow');

function checkScrollVisibility() {
  const activePage = document.querySelector('.menu-page.active');
  if (!activePage || !scrollArrow) return;

  const scrollTop = activePage.scrollTop;
  const scrollHeight = activePage.scrollHeight;
  const clientHeight = activePage.clientHeight;

  console.log({ scrollTop, scrollHeight, clientHeight });
  console.log('totalScrolled:', scrollTop + clientHeight, 'vs scrollHeight:', scrollHeight);

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    scrollArrow.style.opacity = '0';
    scrollArrow.style.visibility = 'hidden';
    scrollArrow.style.animation = 'none';
  } else {
    scrollArrow.style.opacity = '1';
    scrollArrow.style.visibility = 'visible';
    scrollArrow.style.animation = 'blinkScrollArrow 1.5s ease-in-out infinite';
  }
}

document.querySelectorAll('.menu-page').forEach(page => {
  page.addEventListener('scroll', checkScrollVisibility);
});

// Swipe down to close menu page (like clicking "Volver")
const menuPagesAll = document.querySelectorAll('.menu-page');
let startY = 0;
let endY = 0;

menuPagesAll.forEach(menuPage => {
  menuPage.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });

  menuPage.addEventListener('touchmove', (e) => {
  endY = e.touches[0].clientY;
  // don't block scrolling anymore
}, { passive: true }); // let the browser handle scrolling naturally

  menuPage.addEventListener('touchend', () => {
    if (endY - startY > 180) {
      const backBtn = menuPage.querySelector('.back-btn');
      if (backBtn) {
        backBtn.click();
        document.body.style.overflow = ''; // ✅ re-enable scrolling after swipe
      }
    }
  });
});



// update arrow visibility when scrolling any menu page
document.querySelectorAll('.menu-page').forEach(page => {
  page.addEventListener('scroll', checkScrollVisibility);
});


document.addEventListener('click', (e) => {
  const openMenuPage = document.querySelector('.menu-page.active');
  if (
    openMenuPage &&
    !openMenuPage.contains(e.target) &&
    !e.target.classList.contains('menu-btn')
  ) {
    openMenuPage.classList.remove('active');
    const banner = document.getElementById('antojitos-banner');
    if (banner) {
      banner.classList.remove('active');
    }
    menuPages.forEach(page => page.classList.remove('ensaladas-bg', 'desayuno-bg', 'fade-in'));
    document.body.classList.remove(
      'antojitos-open',
      'ensaladas-open',
      'sopas-open',
      'almuerzo-open',
      'carnes-open',
      'bebidas-open'
    );

    const sopasBanner = document.getElementById('sopas-banner');
    if (sopasBanner) {
      sopasBanner.classList.remove('active');
    }

    // Hide scroll arrow when closing menu
    if (scrollArrow) {
      scrollArrow.style.opacity = '0';
      scrollArrow.style.visibility = 'hidden';
      scrollArrow.style.animation = 'none';
    }
    document.body.style.overflow = ''; // ✅ re-enable scrolling

    // Do not reset nav animation unless swipe or volver button is used
    // So we skip removing the 'shrunk' class here
  }
});
});
