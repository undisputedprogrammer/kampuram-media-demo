// Shared business WhatsApp number, including India's country code.
const WHATSAPP_NUMBER = '919388002975';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const dialog = document.querySelector('#contact-dialog');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

function startConversation(message) {
  if (/^[1-9]\d{6,14}$/.test(WHATSAPP_NUMBER)) {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    return;
  }
  document.querySelector('#dialog-message').textContent = message;
  if (!dialog.open) dialog.showModal();
}

document.querySelectorAll('[data-whatsapp]').forEach(button => {
  button.addEventListener('click', () => startConversation(button.dataset.whatsapp));
});
document.querySelectorAll('[data-business]').forEach(button => {
  button.addEventListener('click', () => startConversation(`Hi, I am interested in: ${button.dataset.business}`));
});
document.querySelectorAll('.dialog-close, .dialog-done').forEach(button => {
  button.addEventListener('click', () => dialog.close());
});
dialog?.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Animate only visible content; the page remains readable without JavaScript.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const runningAnimations = new Set();

function playMotion(element, frames, options) {
  const animation = element.animate(frames, options);
  runningAnimations.add(animation);
  animation.finished.catch(() => {}).finally(() => runningAnimations.delete(animation));
  return animation;
}

let revealObserver;
if (!reducedMotion.matches && 'IntersectionObserver' in window && 'animate' in Element.prototype) {
  document.querySelectorAll('.business-grid, .values-grid').forEach(group => {
    [...group.children].forEach((item, index) => { item.dataset.revealDelay = String(index * 85); });
  });
  document.querySelectorAll('.hero-content > *').forEach((item, index) => {
    item.dataset.revealDelay = String(index * 90);
  });

  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      revealObserver.unobserve(element);
      if (reducedMotion.matches || element.contains(document.activeElement)) return;
      playMotion(element, [
        { opacity: 0, transform: 'translateY(24px) scale(.985)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], {
        duration: 720,
        delay: Number(element.dataset.revealDelay || 0),
        easing: 'cubic-bezier(.22, 1, .36, 1)',
        fill: 'backwards'
      });
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.hero-content > *, .section-heading, .business-card, .about-art, .about-copy, .value, .contact-copy, .location-card')
    .forEach(element => revealObserver.observe(element));
}

// Press feedback also works with keyboard activation, without delaying links.
document.addEventListener('click', event => {
  if (reducedMotion.matches || !('animate' in Element.prototype)) return;
  const control = event.target.closest('.button, .header-contact, .card-link, .floating-whatsapp, .menu-toggle');
  if (!control) return;
  control.querySelector('.press-ripple')?.remove();
  const bounds = control.getBoundingClientRect();
  const diameter = Math.max(bounds.width, bounds.height) * 2;
  const ripple = document.createElement('span');
  ripple.className = 'press-ripple';
  ripple.setAttribute('aria-hidden', 'true');
  const x = event.detail === 0 ? bounds.width / 2 : event.clientX - bounds.left;
  const y = event.detail === 0 ? bounds.height / 2 : event.clientY - bounds.top;
  Object.assign(ripple.style, {
    width: `${diameter}px`, height: `${diameter}px`,
    left: `${x - diameter / 2}px`, top: `${y - diameter / 2}px`
  });
  control.append(ripple);
  const animation = playMotion(ripple, [
    { transform: 'scale(0)', opacity: .18 },
    { transform: 'scale(1)', opacity: 0 }
  ], { duration: 560, easing: 'cubic-bezier(.2, .7, .3, 1)' });
  animation.finished.catch(() => {}).finally(() => ripple.remove());
});

reducedMotion.addEventListener('change', event => {
  if (!event.matches) return;
  revealObserver?.disconnect();
  runningAnimations.forEach(animation => animation.cancel());
  document.querySelectorAll('.press-ripple').forEach(ripple => ripple.remove());
});
