// Set the client's shared WhatsApp number here, in international digits only.
// Leave empty during the demo so no enquiry goes to an invented number.
const WHATSAPP_NUMBER = '';

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
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
document.querySelector('#year').textContent = new Date().getFullYear();
