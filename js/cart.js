let cart = [];

function addToCart(name, price) {
    cart.push({name, price});
    updateCart();
    saveCart();
}

function updateCart() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = `(${cart.length})`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadCart();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(name, price);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const signupLink = document.getElementById('signupLink');
    const closeButton = document.getElementById('closeButton');
    const googleSignInButton = document.getElementById('googleSignInButton');
    const googleSignUpButton = document.getElementById('googleSignUpButton');
    const notificationButton = document.getElementById('notificationButton');

    if (loginButton && loginModal && signupModal && signupLink) {
        loginButton.addEventListener('click', () => {
            loginModal.style.display = 'block';
        });
    }

    if (notificationButton) {
        notificationButton.addEventListener('click', () => {
            notificationButton.style.display = 'block';
        });

        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'none';
            signupModal.style.display = 'block';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target == loginModal || e.target == signupModal) {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        }
    });

    closeButton.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Initialize login attempts
    let loginAttempts = 0;
    const MAX_ATTEMPTS = 3;

    function handleLoginAttempt(email, password) {
        // This is where you would normally check the credentials against a database
        // For this example, we'll use a dummy check
        if (email === "test@example.com" && password === "password123") {
            // Successful login
            alert("You've logged in successfully!");
            loginModal.style.display = 'none';
            loginAttempts = 0; // Reset attempts on successful login
        } else {
            loginAttempts++;
            if (loginAttempts >= MAX_ATTEMPTS) {
                // Account suspended
                alert("Your account has been temporarily suspended due to too many failed login attempts. Please try again later.");
                // Here you would typically disable the login button or form
                document.getElementById('loginSubmit').disabled = true;
                // You could also set a timer to re-enable the login after a certain period
                setTimeout(() => {
                    document.getElementById('loginSubmit').disabled = false;
                    loginAttempts = 0;
                }, 5 * 60 * 1000); // 5 minutes
            } else {
                // Failed attempt, but account not suspended yet
                alert(`Invalid credentials. You have ${MAX_ATTEMPTS - loginAttempts} attempts remaining.`);
            }
        }
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            handleLoginAttempt(email, password);
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            
            // Reset error messages
            emailError.textContent = '';
            passwordError.textContent = '';
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address.';
                return;
            }
            
            // Password length check
            if (password.length < 8) {
                passwordError.textContent = 'Password must be at least 8 characters long.';
                return;
            }
            
            // If all validations pass, proceed with signup
            console.log('Signup submitted');
            alert("Test: You've signed up successfully!");
            signupModal.style.display = 'none';
        });
    }

    if (googleSignInButton) {
        googleSignInButton.addEventListener('click', () => {
            // Handle Google sign-in logic here
            console.log('Google sign-in clicked');
            alert("Test: You've signed in with Google successfully!");
            loginModal.style.display = 'none';
        });
    }

    if (googleSignUpButton) {
        googleSignUpButton.addEventListener('click', () => {
            // Handle Google sign-up logic here
            console.log('Google sign-up clicked');
            alert("Test: You've signed up with Google successfully!");
            loginModal.style.display = 'none';
        });
    }
});
