export function displayAndHideLoadingScreen(isLoading) {
    const loadingScreen = document.getElementById("loading-message");
    if (isLoading) {
      loadingScreen.style.display = "block";
    } else {
      loadingScreen.style.display = "none";
    }
  }