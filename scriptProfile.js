document.addEventListener('DOMContentLoaded', function () {
    const userIcon = document.getElementById('user-icon');
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};


    window.onload = function(){
        userIcon.addEventListener('click', clickhandler);
        document.getElementById('username').innerHTML = currentUser.username;
        document.getElementById('name').innerHTML = currentUser.fname;
        document.getElementById('contact').innerHTML = currentUser.contact;
        document.getElementById('address').innerHTML = currentUser.address;
        document.getElementById('gender').innerHTML = currentUser.gender;
        document.getElementById('dob').innerHTML = currentUser.dob;

    }

    function clickhandler(){
        let dropDownContent = document.getElementById('dropdown-content');
        dropDownContent.style.display = dropDownContent.style.display === 'block' ? 'none': 'block';
    }

    document.getElementById('logout').addEventListener('click', () =>{
        localStorage.removeItem('currentUser');
        window.location.replace('index.html');
    })
    
})
// window.onload = function(){
//     const storedUser = localStorage.getItem('username');
//     console.log(storedUser);

// }

// document.getElementById('name').innerHTML = currentUser.name;
// document.getElementById('contact').innerHTML = currentUser.contact;
// document.getElementById('address').innerHTML = currentUser.address;
// document.getElementById('gender').innerHTML = currentUser.gender;
// document.getElementById('dob').innerHTML = currentUser.dob;
 