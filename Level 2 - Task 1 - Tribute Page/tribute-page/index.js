const cursorCircle = document.querySelector(".cursor-circle");
const cursor = document.querySelectorAll(".cursor");
const elements = document.querySelectorAll(".getHover");

window.addEventListener("mousemove", (e) =>{
    let xPosition = e.clientX;
    let yPosition = e.clientY;
    
    cursor.forEach((el) => {
        el.style.transform = `translate(calc(-50% + ${xPosition}px), calc(-50% + ${yPosition}px))`;
        el.style.opacity = "1"
    });
});

elements.forEach(el => {
    el.addEventListener("mouseover", () => {
        cursorCircle.classList.add("biggerCursor");
    });
    el.addEventListener("mouseout", () => {
        cursorCircle.classList.remove("biggerCursor");
    });
});


let timeline = gsap.timeline();

timeline.to(".image-wrap", {
    height: "550px",
    backgroundSize: "100%" ,
    backgroundSize: "top center" ,
    duration: 1.5,
    ease: "power4.inOut",
}).to(".image-wrap", {
    height: "400px",
    y: "0",
    backgroundPosition: "15% 10%",
    duration: 1.3,
    ease: "power3.inOut",
}, 1.5)
.from(".big-name", 
{
    // y: getYDistance(".big-name"),
    y: "1300px",  
    duration: 1,
    ease: "power3.inOut",  
}, 1.5)
.from(".hide", 
{
    opacity: "0",
    duration: 1.3,
    ease: "power3.inOut"
}, 1.5)

function getYDistance(el) {
    return(
        window.innerHeight - document.querySelector(el).getBoundingClientrect().top
    );
}


const timelineData = [
    { year: '1876', event: 'Born in Karachi, Pakistan.' },
    { year: '1893', event: 'Jinnah Family moved to Bombay (Mumbai).' },
    { year: '1895', event: 'At the age of 19, became the youngest Indian to be called to the bar in England.' },
    { year: '1896', event: 'At the age of 20, began his practice in Bombay, the only Muslim barrister in the city.' },
    { year: '1900', event: 'Became the Bombay presidency magistrate and got an interim position.' },
    { year: '1906', event: 'Joined the Indian National Congress political party.' },
    { year: '1907', event: 'As a lawyer, gained fame for his skilled handling of the 1907 "Caucus Case".' },
    { year: '1909', event: 'Initially opposed separate electorates for Muslims, but used this means to gain his first elective office in 1909.' },
    { year: '1911', event: 'Introduced the Wakf Validation Act to place Muslim religious trusts on a sound legal footing under British Indian law.' },
    { year: '1912', event: 'In December 1912, addressed the annual meeting of the Muslim League although he was not yet a member.' },
    { year: '1913', event: 'In April 1913, again went to Britain with Gokhale to meet with officials on behalf of the Congress.' },
    { year: '1913', event: 'Joined the All-India Muslim League political party.' },
    { year: '1916', event: 'Became the President of Muslim League.' },
    { year: '1920', event: 'Left the Indian National Congress.' },
    { year: '1934', event: 'Muslims of Bombay elected Jinnah as their representative to the Central Legislative Assembly in October 1934.' },
    { year: '1937', event: 'Failed attempt to form a coalition government including the Congress and the League in the United Provinces following the 1937 election.' },
    { year: '1944', event: 'In September 1944, Jinnah and Gandhi met formally at the Muslim leader\'s home on Malabar Hill in Bombay.' },
    { year: '1946', event: 'In the provincial elections in January 1946, the Muslim League took 75% of the Muslim vote.' },
    { year: '1947', event: 'On 4 July 1947, Liaquat asked Mountbatten on Jinnah\'s behalf to recommend to the British king, George VI, that Jinnah be appointed Pakistan\'s first governor-general.' },
    { year: 'August 14, 1947', event: 'Pakistan is officially created.' },
    { year: '1947', event: 'On 22 August 1947, just after a week of becoming governor general, Jinnah dissolved the elected government.' },
    { year: '1948', event: 'In January 1948, the Indian government finally agreed to pay Pakistan its share of British India\'s assets.' },
    { year: '1948', event: 'On 6 July 1948, Jinnah returned to Quetta, but at the advice of doctors, soon journeyed to an even higher retreat at Ziarat.' },
    { year: '1948', event: 'Jinnah died later that night at 10:20 pm at his home in Karachi on 11 September 1948 at the age of 71, just over a year after Pakistan\'s creation and buried in Karachi.' },
];



function renderTimeline() {
    const timelineElement = document.getElementById('timeline');

    timelineElement.innerHTML = '';

    timelineData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('plain-text');

        listItem.innerHTML = `
            <b>${item.year}</b> - 
            <span>${item.event}</span>
        `;

        timelineElement.appendChild(listItem);
    });
}

renderTimeline();