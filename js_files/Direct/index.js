const token = localStorage.getItem("token");

import {
  allBlogPostfetch,
  filterbloggpostFetch,
} from "../api_calls/api_fetch.js";

async function displayOstlandetBlogPosts() {
  try {
    const posts = await allBlogPostfetch();

    const ostlandetContainer = document.getElementById("Ostlandet-container");
    ostlandetContainer.innerHTML = "";

    const postsToDisplay = posts.data.slice(0, 3);

    postsToDisplay.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      postElement.innerHTML = `
                <img src="${post.media.url}" alt="${post.media.alt}">
                <h3>${post.title}</h3>
                <p>${post.body.split(".")[0]}</p>
                <p><small>Author: ${post.author.name}</small></p>
            `;

      postElement.addEventListener("click", () => {
        window.location.href = `blogpost.html?id=${post.id}`;
      });

      ostlandetContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error(
      "Det oppstod en feil ved henting av blogginnlegg for Ostlandet:",
      error
    );
  }
}

async function displayBlogPosts() {
  try {
    const posts = await allBlogPostfetch();

    const blogContainer = document.getElementById("data-container");
    blogContainer.innerHTML = "";

    posts.data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      postElement.innerHTML = `
                <img src="${post.media.url}" alt="${post.media.alt}">
                <h3>${post.title}</h3>
                <p>${post.body.split(".")[0]}</p>
                <p><small>Author: ${post.author.name}</small></p>
            `;

      postElement.addEventListener("click", () => {
        window.location.href = `blogpost.html?id=${post.id}`;
      });

      blogContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Det oppstod en feil ved henting av blogginnlegg:", error);
  }
}

async function displayByFilters(selectregion) {
  try {
    const posts = await filterbloggpostFetch(selectregion);
const ostlandetContainer = document.getElementById("data-container");
ostlandetContainer.innerHTML = "";
    posts.data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        postElement.innerHTML = `
          <img src="${post.media.url}" alt="${post.media.alt}">
          <h3>${post.title}</h3>
          <p>${post.body.split(".")[0]}</p>  <!-- Kun første setning -->
          <p><small>Author: ${post.author.name}</small></p>
        `;
  

        postElement.addEventListener("click", () => {
          window.location.href = `blogpost.html?id=${post.id}`;  
        });

        ostlandetContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error(
      "Det oppstod en feil ved henting av blogginnlegg for Ostlandet:",
      error
    );
  }
}

const filter = document.querySelector(".filterByPlace");
if (filter) {
  filter.addEventListener("change", () => {
    const selectregion = filter.value;
    if (selectregion !== "all") {
      displayByFilters(selectregion);
    } else {
      displayBlogPosts();
    }
  });
}

const stifinnerenHead = document.getElementById("fjellregel_image");
const stifinnerentext = document.getElementById("fjellregel_regel");

stifinnerenHead.addEventListener("click", function() {
    if (stifinnerentext.style.display === "none" || stifinnerentext.style.display === "") {
        stifinnerentext.style.display = "block";
    } else {
        stifinnerentext.style.display = "none";
    }
});

imageCarousel();
const imageContainer = document.getElementById("image-crucell");
const images = imageContainer.getElementsByTagName("img");
let currentIndex = 0;

function imageCarousel() {
    setInterval(() => {
        images[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = "block";
    }, 3000);
}


displayOstlandetBlogPosts();
displayBlogPosts();