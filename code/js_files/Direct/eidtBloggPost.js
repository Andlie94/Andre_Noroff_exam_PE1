const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
console.log(postId);

async function fetchPostData() {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/andre_lier/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch post data");
    }

    const post = await response.json();
    document.getElementById("titleBloggEdit").value = post.title;
    document.getElementById("editBloggContent").value = post.body;
    document.getElementById("urlPictureEdit").value = post.media;
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
}

document.getElementById("editPost").addEventListener("submit", async (event) => { 
  event.preventDefault();

  const title = document.getElementById("titleBloggEdit").value;
  const body = document.getElementById("editBloggContent").value; 
  const media = document.getElementById("urlPictureEdit").value; 

  const updatedContent = {
    title: title,
    body: body,
    media: {
        url: media
    }
  };

  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/andre_lier/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedContent),
    });

    if (!response.ok) {
      throw new Error("Failed to update blog post");
    }

    alert("Post updated successfully!");
    window.location.reload(); 
  } catch (error) {
    console.error("Failed to update blog post:", error);
    alert("An error occurred while updating the post: " + error.message);
  }
});


fetchPostData();