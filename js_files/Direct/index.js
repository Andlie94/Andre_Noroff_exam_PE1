import {
  allBlogPostfetch,
  filterbloggpostFetch,
} from "../api_calls/api_fetch.js";

import { displayAndHideLoadingScreen } from '../loading/loadingfunction.js';

async function displayOstlandetBlogPosts() {
  try {
    displayAndHideLoadingScreen(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const posts = await allBlogPostfetch();

    const ostlandetContainer = document.getElementById("Ostlandet-container");
    ostlandetContainer.innerHTML = "";

    const postsToDisplayost = posts.data.slice(0, 3);

    postsToDisplayost.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      postElement.innerHTML = `
                <img src="${post.media.url}" alt="${post.media.alt}">
                <h3>${post.title}</h3>
                <p>${post.body.split(".")[0]}</p>
                <p><small>Author: ${post.author.name}</small></p>
            `;

      postElement.addEventListener("click", () => {
        window.location.href = `HTML_files/blogpost.html?id=${post.id}`;
      });

      ostlandetContainer.appendChild(postElement);
    });
    displayAndHideLoadingScreen(false);
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
    displayAndHideLoadingScreen(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!posts || !posts.data) {
      throw new Error("did not find blog posts");
    }

    if(!posts.data.length || posts.data.length === 0) {
      throw new Error("no blog posts found");
    }

    const blogContainer = document.getElementById("data-container");
    blogContainer.innerHTML = "";

    const postsToDisplay = posts.data.slice(0, 12);

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
        window.location.href = `HTML_files/blogpost.html?id=${post.id}`;
      });

      blogContainer.appendChild(postElement);
    });
    displayAndHideLoadingScreen(false);
  } catch (error) {
    console.error("An error occurred while fetching blog posts:", error);
    alert("error:" + error.message);
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
          <p>${post.body.split(".")[0]}</p> 
          <p><small>Author: ${post.author.name}</small></p>
        `;
      postElement.addEventListener("click", () => {
        window.location.href = `blogpost.html?id=${post.id}`;
      });

      ostlandetContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("An error occurred while fetching blog posts:", error);
    alert("error:" + error.message);
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

stifinnerenHead.addEventListener("click", function () {
  if (
    stifinnerentext.style.display === "none" ||
    stifinnerentext.style.display === ""
  ) {
    stifinnerentext.style.display = "block";
  } else {
    stifinnerentext.style.display = "none";
  }
});

displayOstlandetBlogPosts();
displayBlogPosts();
