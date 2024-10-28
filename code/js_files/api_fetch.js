export async function allBlogPostfetch() {
    try {
      const response = await fetch("https://v2.api.noroff.dev/blog/posts/Stifinneren_blogg_innlegg?sort=created&sortOrder=asc&limit=12&page=1&_tag=difficulty");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }