const token = localStorage.getItem("token");

import { allBlogPostfetch } from "../api_calls/api_fetch.js";

async function displayBlogPosts() {
    try {
        const posts = await allBlogPostfetch();
        
        const blogContainer = document.getElementById("data-container");
        blogContainer.innerHTML = ""; 

        posts.data.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");

            const firstSentence = post.body.split(".")[0] + ".";

            postElement.innerHTML = `
                <img src="${post.media.url}" alt="${post.media.alt}">
                <h2>${post.title}</h2>
                <p>${firstSentence}</p>
            `;

            blogContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Det oppstod en feil ved henting av blogginnlegg:", error);
    }
}

displayBlogPosts();