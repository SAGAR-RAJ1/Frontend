// For bubble background
const bubbles = document.querySelectorAll('.bubble');

bubbles.forEach(bubble => {
  const randomTop = Math.random();     
  const randomLeft = Math.random();      
  const randomSize = `${30 + Math.random() * 70}px`; 

  bubble.style.setProperty('--top', randomTop);
  bubble.style.setProperty('--left', randomLeft);
  bubble.style.setProperty('--size', randomSize);

  bubble.addEventListener('mousemove', (e) => {
    const rect = bubble.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    bubble.style.transform = `translate(${x / 8}px, ${y / 8}px) scale(1.1)`;
  });

  bubble.addEventListener('mouseleave', () => {
    bubble.style.transform = 'scale(1)';
  });
});

//for ripple effect
document.addEventListener('mousemove', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.clientX - 5}px`;
    ripple.style.top = `${e.clientY - 5}px`;
  
    document.body.appendChild(ripple);
  
    setTimeout(() => {
      ripple.remove();
    }, 600); // matches animation duration
});

// Tab button activation effect
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Highlight the clicked tab
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const content = document.getElementById('page-content') || document.body;

    const triggerRedirect = () => {
      if (filter === 'makeup') {
        window.location.href = 'Makeup.html';
      } else if (filter === 'all') {
        window.location.href = 'index.html';
      }
    };

    if (content) {
      content.style.transition = 'opacity 0.5s ease';
      content.style.opacity = 0;
      setTimeout(triggerRedirect, 500);
    } else {
      triggerRedirect();
    }
  });
});

// Set initial active tab based on current page
window.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('page-content') || document.body;

  const pathname = window.location.pathname.toLowerCase();
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const filter = btn.dataset.filter;
    const filename = pathname.split('/').pop();
    if ((filename === 'makeup.html' && filter === 'makeup') ||
        ((filename === 'index.html' || filename === '' || pathname.endsWith('/')) && filter === 'all')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (content) {
    content.style.opacity = 0;
    content.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
      content.style.opacity = 1;
    });
  }
});

