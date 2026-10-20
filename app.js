'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
menu.hidden = false;
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#draft-button').disabled = false;
document.querySelector('#inquiry').addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(e.currentTarget);
  const subject = 'Dotson Labs inquiry: ' + d.get('service');
  const body = [
    'Name: ' + d.get('name'),
    'Reply email: ' + d.get('email'),
    'Business/project: ' + (d.get('business') || 'Not provided'),
    'Service: ' + d.get('service'), '', 'Project details:', d.get('details')
  ].join('\n');
  window.location.href = 'mailto:dotsond873@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  document.querySelector('#status').textContent = 'Your email draft is ready to open. If your email app did not open, use the email link beside this form.';
});
