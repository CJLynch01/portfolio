document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const cards = document.querySelectorAll('.project-card');
  const content = document.querySelector('.content');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.sidebar nav a');

  if (!track || !prevBtn || !nextBtn || cards.length === 0) {
    console.error('Carousel elements not found.');
    return;
  }

  let currentIndex = 0;

  // Carousel Update
  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);

  // Sidebar Navigation Smooth Scroll using scrollIntoView
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        e.preventDefault();

        // Force scrollIntoView to work inside .content only
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    });
  });

  // ScrollSpy Active Link Highlighting
  content.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (index === sections.length - 1) {
        if (content.scrollTop + content.offsetHeight >= content.scrollHeight - 100) {
          currentSection = section.getAttribute('id');
        }
      } else {
        if (content.scrollTop >= sectionTop - content.offsetHeight / 2) {
          currentSection = section.getAttribute('id');
        }
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentSection}`
      );
    });
  });
});
