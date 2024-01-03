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


// Loader Code
const loaderWrapper = document.querySelector(".loader-wrapper");

    function loader(){
        setTimeout(() => {
            loaderWrapper.style.opacity = "0";
        }, 1000);
        setTimeout(() => {
            loaderWrapper.style.display = "none"
    }, 1200);
}

// Check for user if logged-in
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const loginNavItem = document.getElementById('loginNavItem');
    const createNavItem = document.getElementById('createNavItem');
    const logoutNavItem = document.getElementById('logoutNavItem');
    const logoutBtn = document.getElementById('logout-btn');


    if (token) {
        // User is logged in
        loginNavItem.style.display = 'none';
        createNavItem.style.display = 'block';
        logoutNavItem.style.display = 'block';
    } else {
        // User is not logged in
        loginNavItem.style.display = 'block';
        createNavItem.style.display = 'none';
        logoutNavItem.style.display = 'none';
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        location.reload();
    });
});

// Display All Blogs
const blogsContainer = document.getElementById('display-blogs');
// Fetch All Blogs
const fetchAllBlogs = async () => {
    try {
        document.getElementById('main-page-loader').style.display = 'flex';
        document.getElementById('all-blogs-section').style.display = 'none';

        const response = await fetch('https://codsoft-blogger-api.vercel.app/api/v1/blogs/get');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const {blogs} = await response.json();
        blogsContainer.innerHTML = '';

        blogs.forEach(blog => {
            const blogItem = document.createElement('div');
            blogItem.className = 'blog-item';

            blogItem.innerHTML = `
                <div class="blog-item-title">${blog.title}</div>
                <div class="blog-item-desc">${blog.content.slice(0, 200)}...</div>
                <div class="blog-item-reaction">
                    <i class="fas fa-heart"></i>
                    <span class="reaction-value">10</span>
                </div>
                <div class="blog-item-tags">
                    
                </div>
                <div class="blog-item-btn">
                    <a href="blog.html?blogId=${blog._id}" class="blog-btn">Read More</a>
                </div>
            `;

            blogsContainer.appendChild(blogItem);
        });

        document.getElementById('main-page-loader').style.display = 'none';
        document.getElementById('all-blogs-section').style.display = 'block';

    } catch (error) {
        console.error('Error fetching blogs:', error.message);
    }
};

fetchAllBlogs();



// Modal
const createBtn = document.getElementById("create-btn");
const createBtnMobile = document.getElementById("create-btn-sidebar");
const modalLayer = document.getElementById("modal-layer");
const closeModalBtn = document.getElementById("close-modal");

closeModalBtn.addEventListener("click", () => modalLayer.classList.remove("open"))

createBtn.addEventListener("click", () => {
    if (modalLayer.classList.contains("open")) 
    modalLayer.classList.remove("open");
    else
        modalLayer.classList.add("open")
})

createBtnMobile.addEventListener("click", () => {
    if (modalLayer.classList.contains("open")) 
    modalLayer.classList.remove("open");
    else
        modalLayer.classList.add("open")
})

// Create New Blog
const createBlog = async () => {
    try {

        const title = document.getElementById('create-title').value;
        const content = document.getElementById('blog-content').value;

        const token = localStorage.getItem('token');

        if(!title) return alert("Title is required");
        if(!content) return alert("Content is required");

        const response = await fetch('https://codsoft-blogger-api.vercel.app/api/v1/blogs/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            alert('Blog created successfully');

            document.getElementById('create-title').value = '';
            document.getElementById('blog-content').value = '';

            modalLayer.classList.remove("open");
        } else {
            const errorData = await response.json();
            alert(`Failed to create blog. Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating blog:', error.message);
    }
};

document.querySelector('.create-form').addEventListener('submit', function (event) {
    event.preventDefault();
    createBlog();
});





