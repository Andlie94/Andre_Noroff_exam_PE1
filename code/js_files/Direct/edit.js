const token = localStorage.getItem("token");
const email = localStorage.getItem("userEmail");

if (!token) {
  window.location.href = "login.html";
}
if (email !== "andlie02174@stud.noroff.no") {
  window.location.href = "index.html";
}

import { allBlogPostfetch } from "../api_calls/api_fetch.js";

async function displayBlogPosts() {
  try {
    const posts = await allBlogPostfetch();

    posts.data.forEach((edit) => {
      const postElement = document.createElement("div");
      postElement.classList.add("edit");

      postElement.innerHTML = `
          <div class="edit-div">
                <img src="${edit.media.url}" alt="${edit.media.alt}">
            <div class="edit-info-div">
                <h3>${edit.title}</h3>
                <p><small>Author: ${edit.author.name}</small></p>
               <div class="edit-body">    
                <button class="delete-button" data-id="${edit.id}">DELETE</button>
                <button class="edit-buttton" data-id="${edit.id}">EDIT</button>
              </div>
            </div>
          </div>  
            `;

      document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", async () => {
          const id = button.getAttribute("data-id");

          await deleteBlogPost(id);
          displayBlogPosts();
        });
        document.querySelectorAll(".edit-buttton").forEach((button) => {
          button.addEventListener("click", async () => {
            const id = button.getAttribute("data-id");
            window.location.href = `editpost.html?id=${id}`;
          });
        });
      });
      blogginnlegg.appendChild(postElement);
    });
  } catch (error) {
    console.error("Det oppstod en feil ved henting av blogginnlegg:", error);
  }
}
async function deleteBlogPost(id) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/andre_lier/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete blog post");
    }

    console.log("Blog post deleted successfully");

    window.location.reload();
  } catch (error) {
    console.error("Failed to delete blog post:", error);
  }
}

document
  .getElementById("newPostForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("titleBlogg").value;
    const body = document.getElementById("bloggContent").value;
    const media = document.getElementById("url_picture").value;

    const postContent = {
      title: title,
      body: body,
      media: {
        url: media,
      },
    };
    await createBlogPost(postContent);
  });

async function createBlogPost(postContent) {
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/blog/posts/andre_lier",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postContent),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create blog post");
    }

    window.location.reload();
  } catch (error) {
    console.error("Failed to create blog post:", error);
    alert("An error occurred while creating the blog post: " + error.message);
  }
}

displayBlogPosts();
