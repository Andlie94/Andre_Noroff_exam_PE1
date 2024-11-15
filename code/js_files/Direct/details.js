const token = localStorage.getItem("token");

import {
  allBlogPostfetch,
} from "../api_calls/api_fetch.js";

async function displayBlogPost() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    const postId = urlParams.get("id"); 
    
    try {
        const response = await fetch(
          `https://v2.api.noroff.dev/blog/posts/andre_lier/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5kcmVfbGllciIsImVtYWlsIjoiYW5kbGllMDIxNzRAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzEwMDQyNjd9.VTkDBUpQPgFpauw6Qvp-KFiFUplT3Q71tFm9nHn2Ce0",
              'X-Noroff-API-Key': "0ce68424-2b01-48d9-871d-b9e4c13166d2",
            },
          }
        );
        

        if (!response.ok) {
            throw new Error("Feil ved henting av innlegg");
        }

        const artikel = await response.json(); 

        if (!artikel || !artikel.data) {
            throw new Error("Innlegget ble ikke funnet.");
        }


        const blogContainer = document.getElementById("blogginnlegg");
        blogContainer.innerHTML = "";

        const postElement = document.createElement("div");
        postElement.classList.add("artikel");
        postElement.innerHTML = `
            <img src="${artikel.data.media.url}" alt="${artikel.data.media.alt}">
            <h1>${artikel.data.title}</h1>
            <time><small>Publisert: ${artikel.data.updated.split("T")[0]}</small></time>
            <span><small>Forfatter: ${artikel.data.author.name}</span></p>
            <p>${artikel.data.body}</p>
        `;

        blogContainer.appendChild(postElement);
    } catch (error) {
        console.error("Det oppstod en feil ved henting av blogginnlegg:", error);
        const blogContainer = document.getElementById("blogginlegg");
        blogContainer.innerHTML = "Noe gikk galt, prøv på nytt senere.";
    }
}
async function displayOstlandetBlogPosts() {
  try {
    const posts = await allBlogPostfetch();

    const ostlandetContainer = document.getElementById("otherBlogg");
    ostlandetContainer.innerHTML = "";

    const postsToDisplay = posts.data.slice(0, 3);

    postsToDisplay.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      postElement.innerHTML = `
                <img src="${post.media.url}" alt="${post.media.alt}">
                <h3>${post.title}</h3>
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

displayOstlandetBlogPosts();
displayBlogPost();