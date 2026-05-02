
  // CUSTOM CURSOR
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX - 18) * 0.12;
    ringY += (mouseY - ringY - 18) * 0.12;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .service-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(2)';
      cursorRing.style.opacity = '0.2';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
      cursorRing.style.opacity = '1';
    });
  });

  // NAVBAR SCROLL
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // SCROLL REVEAL
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // COUNTER ANIMATION
  function animateCounter(el, target, suffix) {
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      const span = el.querySelector('span');
      el.textContent = current;
      if (span) el.appendChild(span);
      else {
        const s = document.createElement('span');
        s.textContent = suffix;
        el.appendChild(s);
      }
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat1 = document.getElementById('stat1');
        const stat2 = document.getElementById('stat2');
        const stat3 = document.getElementById('stat3');
        animateCounter(stat1, 250, '+');
        animateCounter(stat2, 120, '+');
        animateCounter(stat3, 18, '');
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // CONTACT FORM
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById('formSuccess').style.display = 'block';
      btn.textContent = 'Mensaje Enviado';
      btn.style.background = 'rgba(200,255,0,0.3)';
      btn.style.color = 'var(--accent)';
      this.reset();
    }, 1500);
  });

  // SMOOTH SCROLL for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
// contac 

// Inicializa EmailJS con la clave pública
(function(){
  emailjs.init("vRWCkuvHnOODKrevQ");
})();

// ABRIR MODAL
document.getElementById("btnSolicitarServicio").addEventListener("click", function() {
  document.getElementById("modalSolicitud").style.display = "flex";
});

// SELECCIONAR SERVICIO
let selectedService = "";

function selectService(service) {
  selectedService = service;
  document.getElementById("selectedService").innerText = "Servicio seleccionado: " + service;
}

// ABRIR EL FORMULARIO PARA CONFIRMAR
function openForm() {
  if (selectedService === "") {
    alert("Por favor selecciona un servicio primero.");
    return;
  }

  alert("Servicio seleccionado: " + selectedService);

  enviarCorreo();

  cerrarModal();
}

// CERRAR MODAL
function cerrarModal() {
  document.getElementById("modalSolicitud").style.display = "none";
}

// ENVIAR CORREO con EmailJS
function enviarCorreo() {
  let params = {
    from_name: document.getElementById("nombre").value,
    from_email: document.getElementById("email").value,
    message: document.getElementById("mensaje").value + "\n\nServicio solicitado: " + selectedService,
  };

  emailjs.send("service_b0won14", "template_h1uy53g", params)
    .then(() => {
      alert("Solicitud enviada correctamente ✅");
      document.getElementById("contactForm").reset();
    })
    .catch((error) => {
      alert("Error al enviar ❌");
      console.log(error);
    });
}

// 👇 FUNCIÓN WHATSAPP AGREGADA
function enviarWhatsApp() {
  let numero = "50671956867"; // ajusta si es necesario

  let mensaje = "Hola, estoy interesado en el servicio de: " + selectedService;

  let url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);

  window.open(url, "_blank");
}
