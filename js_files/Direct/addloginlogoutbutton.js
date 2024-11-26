function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  console.log(localStorage.getItem("token"));
  location.reload();
}

function showAndHideEditPage() {
  const edit = document.getElementById("editPage");

  if (localStorage.getItem("token") !== null) {
    edit.style.display = "block";
  } else {
    edit.style.display = "none";
  }
}

function addLoginLogoutButton() {
  if (localStorage.getItem("token") !== null) {
    const logoutContainer = document.getElementById("loginlogout-container");
    logoutContainer.innerHTML = "";
    const button = document.createElement("button");

    button.textContent = "LOGOUT";

    button.id = "logout-button";
    button.className = "logg_button";

    button.addEventListener("click", logout);

    logoutContainer.appendChild(button);
  } else {
    const blogContainer = document.getElementById("loginlogout-container");
    blogContainer.innerHTML = "";
    const loginButton = document.createElement("a");

    loginButton.textContent = "LOGIN";

    loginButton.id = "login-button";
    loginButton.className = "logg_button";
    loginButton.href =
      window.location.pathname === '/index.html' ||
      window.location.pathname === '/index' ||
      window.location.pathname === '/' ||
      window.location.pathname === '/Andre_Noroff_exam_PE1/' ||
      window.location.pathname === '/Andre_Noroff_exam_PE1/index.html' ||
      window.location.pathname === '/Andre_Noroff_exam_PE1/index'
        ? 'HTML_files/login.html'
        : 'login.html';

    blogContainer.appendChild(loginButton);
  }
}
document.addEventListener("DOMContentLoaded", showAndHideEditPage);
document.addEventListener("DOMContentLoaded", addLoginLogoutButton);
