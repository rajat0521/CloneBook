let SI = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  SI++;
  if (SI > slides.length) {SI = 1;}
  slides[SI-1].style.display = "block";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}