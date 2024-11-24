// script.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const errorMessage = document.getElementById('errorMessage');
    const loginBox = document.querySelector('.login-box');
    
    // Simulate login validation
    if (document.getElementById('username').value === '' || 
        document.getElementById('password').value === '') {
        errorMessage.textContent = 'Please fill in all fields';
        errorMessage.classList.add('show');
        loginBox.classList.add('shake');
        
        setTimeout(() => {
            loginBox.classList.remove('shake');
        }, 500);
    } else {
        // Successful login simulation
        errorMessage.classList.remove('show');
        loginBox.style.transform = 'translateZ(100px)';
        setTimeout(() => {
            alert('Login successful!');
        }, 500);
    }
});
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Basic validation
    if (username && password) {
        // Store user data
        localStorage.setItem('username', username);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to dashboard
        window.location.href = './dashboard/dashboard.html';
    } else {
        errorMessage.textContent = 'Please fill in all fields';
        errorMessage.classList.add('show');
    }
});