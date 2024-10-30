import {allBlogPostfetch} from "../api_calls/api_fetch.js";
async function displayBlogPosts() {
    try {
        // Kall på API-funksjonen for å hente data
        const posts = await allBlogPostfetch();
        
        const blogContainer = document.getElementById("data-container");
        blogContainer.innerHTML = ""; 

        posts.data.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");

            
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;

            
            blogContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Det oppstod en feil ved henting av blogginnlegg:", error);
    }
}

displayBlogPosts();