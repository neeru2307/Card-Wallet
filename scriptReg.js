document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.getElementById('registrationForm');

  registrationForm.addEventListener('submit', function (event) {
      const usernameInput = document.getElementById('username').value;
      const storedUser = localStorage.getItem(usernameInput);
      event.preventDefault();


      if (storedUser) {
          alert('User already exists');
      } else {
          saveUserDetails();
      }
  });

  function saveUserDetails() {
      const fname = document.getElementById('fname').value;
      const username = document.getElementById('username').value;
      const contact = document.getElementById('contact').value;
      const address = document.getElementById('address').value;
      const gender = document.getElementById('gender').value;
      const dob = document.getElementById('dob').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (password === confirmPassword) {
          const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

          existingUsers.push({
              username,
              password,
              fname,
              contact,
              address,
              gender,
              dob,
          });

          localStorage.setItem('users', JSON.stringify(existingUsers));
          
          alert('Registration successful');
          registrationForm.reset();
          window.location.href = 'index.html';
      } else {
          const passwordMismatch = document.querySelector('.passwordMismatch');
          passwordMismatch.style.display = 'block';
          
      }
  }
});
