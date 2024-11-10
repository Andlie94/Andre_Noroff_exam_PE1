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
            <h3>${artikel.data.title}</h3>
            <p><small>Publisert: ${artikel.data.updated.split("T")[0]}</small></p>
            <p><small>Forfatter: ${artikel.data.author.name}</small></p>
            <p>${artikel.data.body}</p>
        `;

        blogContainer.appendChild(postElement);
    } catch (error) {
        console.error("Det oppstod en feil ved henting av blogginnlegg:", error);
        const blogContainer = document.getElementById("blogginlegg");
        blogContainer.innerHTML = "Noe gikk galt, prøv på nytt senere.";
    }
}

displayBlogPost();