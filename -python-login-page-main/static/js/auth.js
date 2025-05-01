document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();  // Prevent form submission

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Send the login request
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Login successful!");

                // Save the JWT token to localStorage
                localStorage.setItem("token", data.token);

                // Redirect based on user role
                if (data.user.role === "admin") {
                    window.location.href = "/admin-dashboard";  // Admin dashboard
                } else {
                    window.location.href = "/user-dashboard";  // User dashboard
                }
            } else {
                alert(data.error || "Login failed.");
            }
        });
    }

    // Handle register form submission
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();  // Prevent form submission

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Send the registration request
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Registration successful!");
                window.location.href = "/";  // Redirect to login page after successful registration
            } else {
                alert(data.error || "Registration failed.");
            }
        });
    }
});

async function getUserDashboard() {
    const token = localStorage.getItem("token");  // Get token from localStorage
    if (!token) {
        alert("You need to log in first.");
        window.location.href = '/';  // Redirect to login page if no token is found
        return;
    }

    // Fetch the user dashboard
    const res = await fetch("/user-dashboard", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`  // Send the token in the Authorization header
        }
    });

    const data = await res.json();

    if (res.ok) {
        document.getElementById("username").textContent = data.username;
    } else {
        alert(data.error || "Failed to fetch user data.");
        window.location.href = '/';  // Redirect to login page if the token is invalid or expired
    }
}

// Call the function to show the user dashboard on page load
if (window.location.pathname === '/user-dashboard') {
    getUserDashboard();
}


// A function to fetch the admin dashboard if the user is an admin
async function getAdminDashboard() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You need to log in first.");
        window.location.href = '/';  // Redirect to login page if no token is found
        return;
    }

    // Fetch the admin dashboard
    const res = await fetch("/admin-dashboard", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`  // Send the token in the Authorization header
        }
    });

    const data = await res.json();

    if (res.ok) {
        // Handle the admin dashboard content here
        // Example: Display the username
        document.getElementById("username").textContent = data.username;
    } else {
        alert(data.error || "Failed to fetch admin data.");
        window.location.href = '/';  // Redirect to login page if the token is invalid or expired
    }
}

// Call the function to show the user dashboard on page load
if (window.location.pathname === '/user-dashboard') {
    getUserDashboard();
}

// Call the function to show the admin dashboard on page load
if (window.location.pathname === '/admin-dashboard') {
    getAdminDashboard();
}
