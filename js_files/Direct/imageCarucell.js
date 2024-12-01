import { allBlogPostfetch } from "../api_calls/api_fetch.js";

let slideIndex = 1;


const plusSlides = (currentSlideIndex) => {
  showSlides(slideIndex += currentSlideIndex);
};

const currentSlide = (currentSlideIndex) => {
  showSlides(slideIndex = currentSlideIndex);
};

async function displayCarucel() {
    try {
      const posts = await allBlogPostfetch();
      const postsToDisplay = posts.data.slice(0, 3);
  
      const blogContainer = document.getElementById("image-crucell");
      blogContainer.innerHTML = `
        <div class="slideshow-container">
          ${postsToDisplay.map(
            (carucel) =>
              `<div class="mySlides fade post">
                <img src="${carucel.media.url}" alt="${carucel.media.alt}">
                <h3>${carucel.title}</h3>
              </div>`
          ).join('')}    
          <a class="prev" onclick="plusSlides(-1)">❮</a>
          <a class="next" onclick="plusSlides(1)">❯</a>
        </div>
        <br />
      `;

      const slides = document.querySelectorAll(".mySlides");
      postsToDisplay.forEach((post, index) => {
        const slide = slides[index];
        slide.addEventListener("click", () => {
          window.location.href = `HTML_files/blogpost.html?id=${post.id}`;
        });
      });
      showSlides(slideIndex);
    } catch (error) {
      console.error(
        "coud not get the slides for the carucel:",
        error
      );
    }
  }

function showSlides(currentSlideIndex) {
  let imagecarucel;
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('dot');
  
  if (currentSlideIndex > slides.length) {
    slideIndex = 1;
  }
  if (currentSlideIndex < 1) {
    slideIndex = slides.length;
  }
  for (imagecarucel = 0; imagecarucel < slides.length; imagecarucel++) {
    slides[imagecarucel].style.display = 'none';
  }

  for (imagecarucel = 0; imagecarucel < dots.length; imagecarucel++) {
    dots[imagecarucel].className = dots[imagecarucel].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
}

window.plusSlides = plusSlides;
window.currentSlide = currentSlide;

displayCarucel();
