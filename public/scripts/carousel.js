let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach((slide, index) => {
    slide.style.display = "none";
    slide.classList.remove("active");
  });
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].style.display = "block";
  slides[slideIndex].classList.add("active");
  setTimeout(showSlides, 3000); 
}

document.addEventListener("DOMContentLoaded", showSlides);
