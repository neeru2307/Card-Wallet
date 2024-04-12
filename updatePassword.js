document.addEventListener('DOMContentLoaded', function () {
    const updatePasswordForm = document.getElementById('update-password-form');
    const passwordMismatchError = document.getElementById('passwordMismatch');
    const currentPasswordError = document.getElementById('currentPasswordError');
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    // const currentPasswordInput = document.getElementById('currentPassword').value;
    // const newPasswordInput = document.getElementById('newPassword').value;
    // const confirmPasswordInput = document.getElementById('confirmPassword').value;

    updatePasswordForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const currentPasswordInput = document.getElementById('currentPassword').value;
        const newPasswordInput = document.getElementById('newPassword').value;
        const confirmPasswordInput = document.getElementById('confirmPassword').value;
        
        // console.log("dddd",currentPasswordInput);
        
        if (currentPasswordInput === currentUser.password && newPasswordInput !== currentPasswordInput && newPasswordInput === confirmPasswordInput ) {
            console.log(currentPasswordInput);
            currentUser.password = newPasswordInput;
            console.log(currentUser.password);
            updateExistingUsers();
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            alert('Password updated successfully');
            
            window.location.href = 'home.html';
                        
        } 
        else if(newPasswordInput !== confirmPasswordInput) {
            passwordMismatchError.style.display = 'block';
            currentPasswordError.style.display = 'none';

            // updatePasswordForm.reset();
        }
        else{
            currentPasswordError.style.display = 'block';
            passwordMismatchError.style.display = 'none';

            // updatePasswordForm.reset();
        }
    });
    
    function updateExistingUsers(){
        const existingUsers = JSON.parse(localStorage.getItem('users'))||[];
        const newPasswordInput = document.getElementById('newPassword').value;

        const user = existingUsers.reduce((acc, curr) =>{
            if(curr.username === currentUser.username){
                return curr;
            }
        },{})

        // console.log(user);
        if(user){
            user.password = newPasswordInput;
            localStorage.setItem('users', JSON.stringify(existingUsers) );
        }
    }
});
