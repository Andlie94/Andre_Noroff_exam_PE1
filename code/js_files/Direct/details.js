async function displayBlogPost() {
    // Hent spørringsstrengen fra URL-en
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    // Hent postId fra URL-parametrene
    const postId = urlParams.get('id'); 
    
    try {
   
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/andre_lier${postId}`); 
        

        if (!response.ok) {
            throw new Error("Feil ved henting av innlegg");
        }

        const post = await response.json(); 

        if (!post || !post.data) {
            throw new Error("Innlegget ble ikke funnet.");
        }


        const blogContainer = document.getElementById("blogginlegg");
        blogContainer.innerHTML = "";

        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <img src="${post.data.media.url}" alt="${post.data.media.alt}">
            <h3>${post.data.title}</h3>
            <p>${post.data.body}</p>
            <p><small>Forfatter: ${post.data.author.name}</small></p>
        `;

        blogContainer.appendChild(postElement);
    } catch (error) {
        console.error("Det oppstod en feil ved henting av blogginnlegg:", error);
        const blogContainer = document.getElementById("blogginlegg");
        blogContainer.innerHTML = "Noe gikk galt, prøv på nytt senere.";
    }
}
