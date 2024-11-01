function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 5) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    const passwordRegex = /^(?=.*[a-z])[A-Za-z\d]{5,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return;
    }

    console.log('User registered:', { email, password });
}
