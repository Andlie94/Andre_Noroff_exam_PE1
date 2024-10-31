const token = localStorage.getitem("token");

if (!token) {
  window.location.href = "login.html";
}