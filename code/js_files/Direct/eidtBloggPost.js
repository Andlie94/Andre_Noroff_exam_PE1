const token = localStorage.getItem("token");
const email = localStorage.getItem("userEmail");

if (!token) {
  window.location.href = "login.html";
}
if (email !== "andlie02174@stud.noroff.no") {
  window.location.href = "index.html";
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function fetchPostData() {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/andre_lier/${postId}`,
      {
        headers: {
          Authorization: "Bearer ${token}",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post data");
    }

    const post = await response.json();

    document.getElementById("titleBloggEdit").value = post.data.title;
    document.getElementById("editBloggContent").value = post.data.body;
    document.getElementById("urlPictureUrlEdit").value = post.data.media.url;
    document.getElementById("urlPictureAltEdit").value = post.data.media.alt;
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
}

document
  .getElementById("editPost")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("titleBloggEdit").value;
    const body = document.getElementById("editBloggContent").value;
    const mediaUrl = document.getElementById("urlPictureUrlEdit").value;
    const mediaAlt = document.getElementById("urlPictureAltEdit").value;

    const updatedContent = {
      title: title,
      body: body,
      media: {
        url: mediaUrl,
        alt: mediaAlt,
      },
    };

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/blog/posts/andre_lier/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": "0ce68424-2b01-48d9-871d-b9e4c13166d2",
          },
          body: JSON.stringify(updatedContent),
        }
      );

      if (!response.ok) {
        throw Error("Failed to update blog post");
      }
      alert("Posten ble oppdatert");
      window.location.href = "edit.html";
    } catch (error) {
      console.error("Failed to update blog post:", error);
      alert("An error occurred while updating the post: " + error.message);
    }
  });

fetchPostData();
