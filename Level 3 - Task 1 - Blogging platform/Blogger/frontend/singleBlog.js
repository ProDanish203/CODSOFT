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

// Fetch Single Blog
const fetchBlogDetails = async () => {
    try {
        document.getElementById('loader').style.display = 'flex';
        document.getElementById('single-blog-section').style.display = 'none';

        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('blogId');

        if (!blogId) {
            throw new Error('BlogId not found in the query parameters.');
        }

        const blogResponse = await fetch(`https://codsoft-blogger-api.vercel.app/api/v1/blogs/${blogId}`);
        if (!blogResponse.ok) {
            throw new Error(`Failed to fetch blog. Status: ${blogResponse.status}`);
        }

        const {blog} = await blogResponse.json();

        document.getElementById('commentCount').textContent = blog.comments.length;
        document.getElementById('reactionValue').textContent = blog.reactions;
        document.getElementById('blogTitle').textContent = blog.title;
        document.getElementById('blogDesc').textContent = blog.content;
        document.getElementById('author-name').textContent = blog.author.username;

        const commentsContainer = document.getElementById('commentsContainer');
        commentsContainer.innerHTML = '';
        blog.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <span class="comment-name">${comment.author.username}:</span>
                <p class="comment-content">${comment.text}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });

        document.getElementById('loader').style.display = 'none';
        document.getElementById('single-blog-section').style.display = 'block';

    } catch (error) {
        console.error('Error fetching blog details:', error.message);
    }
};
fetchBlogDetails();



// Modal
const createBtn = document.getElementById("create-btn");
const modalLayer = document.getElementById("modal-layer");
const closeModalBtn = document.getElementById("close-modal");

closeModalBtn.addEventListener("click", () => modalLayer.classList.remove("open"))

createBtn.addEventListener("click", () => {
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

        const response = await fetch('http://localhost:5000/api/v1/blogs/create', {
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
