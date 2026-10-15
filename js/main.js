// Navbar com fundo ao rolar
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll);
onScroll();

// Fecha o menu mobile ao clicar em um link
document.querySelectorAll('#menu .nav-link, #menu .btn').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('menu');
    if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});

// Contador animado
const animateCounter = el => {
  const target = +el.dataset.target;
  const duration = 1800;
  const start = performance.now();
  const step = now => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

// Animações ao entrar na tela
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('visible');
    el.querySelectorAll('.counter').forEach(animateCounter);
    el.querySelectorAll('.bar').forEach(bar => bar.classList.add('animate'));
    observer.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Formulário de contato (validação Bootstrap + abre o e-mail)
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }
  const nome = form.nome.value;
  const assunto = encodeURIComponent(`Contato pelo site - ${nome}`);
  const corpo = encodeURIComponent(
    `Nome: ${nome}\nE-mail: ${form.email.value}\nPerfil: ${form.perfil.value}\n\n${form.mensagem.value}`
  );
  window.location.href = `mailto:contato@ademireducacao.com.br?subject=${assunto}&body=${corpo}`;

  bootstrap.Toast.getOrCreateInstance(document.getElementById('sentToast')).show();
  form.reset();
  form.classList.remove('was-validated');
});

document.getElementById('year').textContent = new Date().getFullYear();
