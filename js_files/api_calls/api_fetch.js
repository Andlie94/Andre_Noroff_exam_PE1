export async function allBlogPostfetch() {
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/blog/posts/andre_lier"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export async function filterbloggpostFetch(selectregion) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/andre_lier?_tag=${selectregion}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
