document.addEventListener('DOMContentLoaded', () => {
  // Destacar link ativo no menu lateral
  const path = window.location.pathname.split('/').pop();
  const links = document.querySelectorAll('.sidebar nav a');

  links.forEach(link => {
    if (link.getAttribute('href') === path || (path === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Adicionar animação suave e resetar formulário no submit com mensagem
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.style.opacity = 0;
    form.style.transform = 'translateY(15px)';

    setTimeout(() => {
      form.style.transition = 'all 0.6s ease';
      form.style.opacity = 1;
      form.style.transform = 'translateY(0)';
    }, 100);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      showMessage("✔️ Dados enviados com sucesso!");

      form.reset();
    });
  });

  // Função para mostrar mensagem de feedback
  function showMessage(msg) {
    const alert = document.createElement('div');
    alert.textContent = msg;
    alert.className = 'alert';
    document.body.appendChild(alert);

    setTimeout(() => alert.classList.add('visible'), 10);
    setTimeout(() => {
      alert.classList.remove('visible');
      setTimeout(() => document.body.removeChild(alert), 300);
    }, 3000);
  }
});
