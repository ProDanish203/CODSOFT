// Nav toggler
const navToggler = document.querySelector('.js-header-toggler');
const nav = document.querySelector('.js-header-nav');

navToggler.addEventListener("click", toggleNav);
nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", toggleNav);
})

function toggleNav(){
    navToggler.classList.toggle("active");
    nav.classList.toggle("open");

    if(nav.classList.contains("open")){
        document.body.style.overflow = "hidden";
    }else{
        document.body.style.removeProperty("overflow");
    }
}


// Accordion
function accordion(ele){
    const accord = document.querySelector(ele);

    accord.addEventListener("click", ({target}) => {
        if(!target.closest(".js-accordion-btn")){
            return;
        }

        const btn = target.closest(".js-accordion-btn");
        const item = btn.parentElement.parentElement;
        const body = btn.parentElement.nextElementSibling;

        if(target.closest(".active")){
            slideUp();
            return;
        }

        if(accord.querySelector(".active")){
            slideUp();
        }

        item.classList.add("active");
        body.style.height = body.scrollHeight + "px";

        function slideUp(){
            accord.querySelector(".active").lastElementChild.style.height = "0";
            accord.querySelector(".active").classList.remove("active");
        }

    });

}
accordion(".js-accordion");


// Animate On Scroll
window.addEventListener("load", () => {

    AOS.init({
        once: true,
        duration: 2000
    })

})

// Preloader Code
window.addEventListener("load", () => {

    const preloader = document.querySelector('.js-preloader')

    preloader.classList.add("loaded")
    document.querySelector('.js-preloader-slide').addEventListener("animationend", () => {
        preloader.style.display = "none";
    });

})

function resetForm(event){
    event.preventDefault();

    document.getElementById('contact-form').reset();
}