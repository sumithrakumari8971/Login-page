document.addEventListener('DOMContentLoaded', function() {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.role !== 'user') {
        // Redirect to login if not user or missing data
        window.location.href = 'login.html';
        return;
    }

    // Display username
    document.getElementById('username').textContent = user.username;

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function () {
        const btn = this;
        btn.innerHTML = '<span class="spinner"></span> Logging out...';
        btn.disabled = true;

        setTimeout(() => {
            localStorage.clear();
            window.location.href = 'login.html';
        }, 500);
    });
});
