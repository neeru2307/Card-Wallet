document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const usernameInput = document.getElementById('username').value;
      const passwordInput = document.getElementById('password').value;

      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    //   console.log(storedUsers);
      const currentUser = storedUsers.find(user => user.username === usernameInput);

      if (currentUser && passwordInput === currentUser.password) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          alert('Login successful');
          window.location.href = 'home.html';
      } else {
          displayError("Incorrect username or password");
      }
  });

  function displayError(message) {
      const passErrorDiv = document.querySelector('.error');
      passErrorDiv.textContent = message;
      passErrorDiv.style.display = 'block';

      
  }
});
