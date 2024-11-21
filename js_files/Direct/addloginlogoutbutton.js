function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    console.log(localStorage.getItem('token'));
    location.reload();
  }
  
  function addLoginLogoutButton() {
    if (localStorage.getItem('token') !== null) {
      const logoutContainer = document.getElementById('loginlogout-container');
      logoutContainer.innerHTML = '';
      const button = document.createElement('button');
  
      button.textContent = 'LOGOUT';
  
      button.id = 'logout-button';
      button.className = 'loggut';
  
      button.addEventListener('click', logout);
  
      logoutContainer.appendChild(button);
    } else {
      const blogContainer = document.getElementById('loginlogout-container');
      blogContainer.innerHTML = '';
      const loginButton = document.createElement('a');
  
      loginButton.textContent = 'LOGIN';
  
      loginButton.id = 'login-button';
      loginButton.className = 'logginn';
      loginButton.href = 'login.html';
  
      blogContainer.appendChild(loginButton);
    }
  }
  
  document.addEventListener('DOMContentLoaded', addLoginLogoutButton);

  