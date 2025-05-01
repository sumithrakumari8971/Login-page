document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token || !user || user.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    // Display users
    fetchUsers();
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
    
    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:5000/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                displayUsers(data.users);
            } else {
                alert(data.error || 'Failed to fetch users');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching users');
        }
    }
    
    function displayUsers(users) {
        const userList = document.getElementById('userList');
        userList.innerHTML = '<h2>User Management</h2>';
        
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        `;
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="delete-btn" data-id="${user.id}">Delete</button>
                </td>
            `;
            table.appendChild(row);
        });
        
        userList.appendChild(table);
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async function() {
                const userId = this.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this user?')) {
                    try {
                        const response = await fetch(`http://localhost:5000/users/${userId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        
                        const data = await response.json();
                        
                        if (response.ok) {
                            alert('User deleted successfully');
                            fetchUsers();
                        } else {
                            alert(data.error || 'Failed to delete user');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('An error occurred while deleting user');
                    }
                }
            });
        });
    }
});