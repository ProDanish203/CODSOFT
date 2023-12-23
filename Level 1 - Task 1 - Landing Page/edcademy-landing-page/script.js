// Responsive Navbar Code
const menu = document.getElementById("menu");
const navbar = document.getElementById("navbar");

menu.addEventListener("click", () => {
    menu.classList.toggle("fa-bars");
    menu.classList.toggle("fa-times")
    navbar.classList.toggle("active");
});

window.onscroll = () => {
    menu.classList.add("fa-bars");
    menu.classList.remove("fa-times")
    navbar.classList.remove("active");
}

document.onclick = (e) => {
    if(e.target.id !== "navbar" && e.target.id !== "menu" ){
        menu.classList.add("fa-bars");
        menu.classList.remove("fa-times")
        navbar.classList.remove("active");
    }
}



// Counter Code
const workSection = document.querySelector(".counter");
const workObserver = new IntersectionObserver((entries, observer) => {
    const [entry] = entries;
    // console.log(entry);

    // if(entry.isIntersecting == false);
    if(!entry.isIntersecting) return;

    // Animate Number Counter
    const counterNum = document.querySelectorAll("#count");
    const speed = 50;

    counterNum.forEach((curElem) => {
        const updateNumber = () => {
            const targetNumber = parseInt(curElem.dataset.number);
            // console.log(targetNumber);
            const initialNumber = parseInt(curElem.innerText);
            // console.log(initialNumber);
            const incrementNumber = Math.trunc(targetNumber/speed);
            // console.log(incrementNumber);

            if(initialNumber < targetNumber){
            curElem.innerText = `${initialNumber + incrementNumber}+`;

            setTimeout(updateNumber , 10);
            }
        };

    updateNumber();
    });

    observer.unobserve(workSection);
    }, {
        root:null,
        threshold: 0,
    }
);

workObserver.observe(workSection);