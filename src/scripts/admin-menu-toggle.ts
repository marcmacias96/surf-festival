// Toggle menu mobile admin
const adminMenuToggle = document.getElementById('admin-menu-toggle');
const adminMobileMenu = document.getElementById('admin-mobile-menu');
const adminMenuLinks = document.querySelectorAll('#admin-mobile-menu a, #admin-mobile-menu button');

adminMenuToggle?.addEventListener('click', () => {
  const isOpen = !adminMobileMenu?.classList.contains('hidden');
  adminMobileMenu?.classList.toggle('hidden');
  adminMenuToggle?.setAttribute('aria-expanded', String(!isOpen));
  
  // Animar hamburger
  adminMenuToggle?.classList.toggle('active');
});

// Cerrar menú al hacer click en link
adminMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    adminMobileMenu?.classList.add('hidden');
    adminMenuToggle?.setAttribute('aria-expanded', 'false');
    adminMenuToggle?.classList.remove('active');
  });
});

