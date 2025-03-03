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