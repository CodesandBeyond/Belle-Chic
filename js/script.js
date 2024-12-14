// Login-Signup Modal

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

    if (notificationButton) {

        const promoError = document.getElementById('promoError');

        if (promo.length = 0) {
            passwordError.textContent = 'Please enter a valid promo code.';
            return;
        }

        let notificationsEnabled = false; // Track the notification state

        notificationButton.addEventListener('click', () => {
            notificationsEnabled = !notificationsEnabled; // Toggle the state

            if (notificationsEnabled) {
                console.log('Notifications enabled');
                alert("Notifications enabled. You'll receive updates!");
                notificationButton.classList.add('active'); // Add a visual indicator
            } else {
                console.log('Notifications disabled');
                alert("Notifications disabled. You won't receive updates.");
                notificationButton.classList.remove('active'); // Remove the visual indicator
            }
        });
    }
});

// Slideshow //

let currentIndex = 0;
let slides;

function showSlides() {
    if (!slides || slides.length === 0) {
        console.warn("Slides not found or empty");
        return;
    }

    // Hide all slides
    slides.forEach(slide => slide.style.display = "none");

    // Show current slide
    slides[currentIndex].style.display = "block";
}

// Change slides manually
function changeSlide(n) {
    if (!slides || slides.length === 0) {
        return;
    }
    currentIndex = (currentIndex + n + slides.length) % slides.length;
    showSlides();
}

// Auto slideshow
function autoSlideshow() {
    changeSlide(1);
    setTimeout(autoSlideshow, 3000); // Change image every 3 seconds
}


// Initialize
document.addEventListener("DOMContentLoaded", () => {
    slides = document.querySelectorAll(".slide, .about-slide");

    if (slides.length > 0) {
        showSlides();
        autoSlideshow();
    } else {
        console.error("No slides found on the page.");
    }
});
