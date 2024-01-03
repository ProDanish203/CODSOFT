const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", ()=>{
    sidebar.classList.add("sidebar-open")
});

// Close Sidebar When clicked Outside
document.onclick = function(e){
    if(e.target.id !== "nav" && e.target.id !== "menuBtn"){
        sidebar.classList.remove("sidebar-open")
    }
}
window.onscroll = () =>{
    sidebar.classList.remove("sidebar-open")
}

// Check for user if logged-in
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (token) window.location.href = "index.html"; 
});

// Authentication
// Login User
const loginUser = async () => {
    try {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if(!username) return alert("Username is required")
        if(!password) return alert("Password is required")

        const response = await fetch('https://codsoft-blogger-api.vercel.app/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem('token', data.token);
            alert('Login successful');
            window.location.href = 'index.html'; 

        } else {
            const errorData = await response.json();
            alert(`${errorData.message}`);
        }
    } catch (error) {
        console.error('Error logging in:', error.message);
    }
};

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", loginUser);
