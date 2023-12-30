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
    if (token) window.location.href = "/index.html"; 
});

// Authentication
// Register User
const registerUser = async () => {
    try {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const email = document.getElementById('register-email').value;

        if(!username) return alert("Username is required")
        if(!password) return alert("Password is required")
        if(!email) return alert("Email is required")

        const response = await fetch('https://codsoft-blogger-api.vercel.app/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            alert('Registeration successful');
            window.location.href = '/login.html'; 
        } else {
            const errorData = await response.json();
            alert(`${errorData.message}`);
        }
    } catch (error) {
        console.error('Error in signing up:', error.message);
    }
};

const registerBtn = document.getElementById("register-btn");
registerBtn.addEventListener("click", registerUser);
