document.addEventListener("mousemove", (event) => {
    const eye = document.querySelector(".eye");
    const pupil = document.querySelector(".pupil");
    const eye2 = document.querySelector(".eye2");
    const pupil2 = document.querySelector(".pupil2");

    const eyeRect = eye.getBoundingClientRect();
    const eyeRect2 = eye2.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    const eyeCenterX2 = eyeRect2.left + eyeRect2.width / 2;
    const eyeCenterY2 = eyeRect2.top + eyeRect2.height / 2;

    const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
    const angle2 = Math.atan2(event.clientY - eyeCenterY2, event.clientX - eyeCenterX2);
    
    const distance = Math.min(eyeRect.width / 4, eyeRect.height / 4); // Limitando o movimento da pupila
    const distance2 = Math.min(eyeRect2.width / 4, eyeRect2.height / 4); // Limitando o movimento da pupila

    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;
    const pupilX2 = Math.cos(angle2) * distance2;
    const pupilY2 = Math.sin(angle2) * distance2;

    pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
    pupil2.style.transform = `translate(-50%, -50%) translate(${pupilX2}px, ${pupilY2}px)`;
});



let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  let currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop) {
    // Descendo
    navbar.style.top = "-60px"; // Esconde a navbar (ajuste conforme necessário)
  } else {
    // Subindo
    navbar.style.top = "0";
  }

  lastScrollTop = currentScroll;
});

let currentIndex = 0;
const totalSlides = 2;
const container = document.getElementById("carouselContainer");

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function updateCarousel() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
}

const myObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show'); // Adiciona a classe 'show' quando o elemento entra na tela
      observer.unobserve(entry.target); // Para de observar esse elemento, garantindo que não volte a ser 'hidden'
    }
  });
});

const elements = document.querySelectorAll('.hidden');

elements.forEach((element) => myObserver.observe(element));

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o redirecionamento padrão

  const formData = {
    accessKey: "381aa9a1-88be-4c4c-b4d4-3351a0b26ab8",
    name: this.name.value,
    email: this.email.value,
    message: this.message.value
  };

  fetch(this.action, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Obrigado! Sua mensagem foi enviada com sucesso.");
      this.reset();
    } else {
      alert("Erro: " + (data.message || "Não foi possível enviar a mensagem."));
    }
  })
  .catch(() => alert("Erro ao enviar a mensagem. Verifique sua conexão."));
});