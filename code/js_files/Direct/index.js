import {allBlogPostfetch} from "../api_calls/api_fetch.js";
async function displayBlogPosts() {
    try {
        // Kall på API-funksjonen for å hente data
        const posts = await allBlogPostfetch();
        
        // Finn containeren i HTML
        const blogContainer = document.getElementById("data-container");
        blogContainer.innerHTML = ""; // Tøm containeren først

        // Gå gjennom hver bloggpost og legg dem til HTML
        posts.data.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");

            // Opprett HTML for hvert blogginnlegg
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;

            // Legg til blogginnlegget i containeren
            blogContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Det oppstod en feil ved henting av blogginnlegg:", error);
    }
}

// Kall funksjonen for å vise bloggpostene
displayBlogPosts();