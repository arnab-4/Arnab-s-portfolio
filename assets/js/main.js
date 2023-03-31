/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

// MENU SHOW

if(navToggle){
    navToggle.addEventListener('click',() =>{
        navMenu.classList.add('show-menu')
    })
}

// Menu Hidden
if(navClose)
{
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
/*=============== SWIPER PROJECTS ===============*/
let swiperProjects = new Swiper(".projects__container",{
    loop : true,
    spaceBetween : 24,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    breakpoints: {
        1200: {
            slidesPreview: 2,
            spaceBetween: -56,
        },
    },
});

/*=============== SWIPER TESTIMONIAL ===============*/


/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      contactProject = document.getElementById('contact-project'),
      contactMessage = document.getElementById('contact-message')


const sendEmail = (e) =>{
    e.preventDefault()

    // check if the fild has a value
    if(contactName.value === '' || contactEmail.value === '' || contactProject.value === ''){
        // Add and remove color
        contactMessage.classList.remove('color-blue')
        contactMessage.classList.add('color-red')

        // Show message
        contactMessage.textContent = 'Write all the input fields 📖'
    }else{
        // serviceID - templateID - #form - publickey
        emailjs.sendForm('service_96wzejq','template_qyqt8n1','#contact-form','-JygiZlW2i1SLtLyA')
            .then(() =>{
                // show message and add color
                contactMessage.classList.add('color-blue')
                contactMessage.textContent = 'Message Sent ✅'

                // Remove message after 5 seconds
                setTimeout(() =>{
                    contactMessage.textContent = ''
                }, 5000)
            },(error)  =>{
                alert('OOPS!  SOMETHING HAS FILED.....', error)
            })

            // TO clear the input field
            contactName.value = ''
            contactEmail.value = ''
            contactProject.value = ''
    }
}

contactForm.addEventListener('submit',sendEmail)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id')

const scrollActive = () =>{
    const scrollY = window.pageYOffset
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop -58 ,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + '}')
        
        if(scrollY > sectionTop && scrollY <=sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')

        }else{
            sectionsClass.classList.remove('active-link')
        }

    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')

    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll' , scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButtton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topics if user is selecte

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// next part

const getCurrentTheme = () => document.body.classList(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButtton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'


if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    document.body.classList[selectedTheme === 'ri-moon-line' ? 'add' : 'remove'](darkTheme)
}
// Activate/deactivae manually with button
themeButtton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButtton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())

})

/*=============== CHANGE BACKGROUND HEADER ===============*/
// const scrollHeader = () =>{
//     const header = document.getElementById('header')

//     this.scrollY >= 50 ? header.classList.add('bg-header')
//                        : header.classList.remove('bg-header')
// }
// window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})
sr.reveal(`.home__data, .projects__container, .footer__container`)
sr.reveal(`.home__info div`,{delay: 600, origin: 'bottom' , interval: 100})
sr.reveal(`.skills__content:nth-child(1), .contact__content:nth-child(1)`,{ origin: 'left'})
sr.reveal(`.skills__content:nth-child(2), .contact__content:nth-child(2)`,{ origin: 'right'})
sr.reveal(`.qualification__content, .services__card`,{interval: 100})


// Toast notification 

// Selecting all required elements
const wrapper = document.querySelector(".wrapper"),
toast = wrapper.querySelector(".toast"),
title = toast.querySelector("span"),
subTitle = toast.querySelector("p"),
wifiIcon = toast.querySelector(".icon"),
closeIcon = toast.querySelector(".close-icon");

window.onload = ()=>{
    function ajax(){
        let xhr = new XMLHttpRequest(); //creating new XML object
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); //sending get request on this URL
        xhr.onload = ()=>{ //once ajax loaded
            //if ajax status is equal to 200 or less than 300 that mean user is getting data from that provided url
            //or his/her response status is 200 that means he/she is online
            if(xhr.status == 200 && xhr.status < 300){
                toast.classList.remove("offline");
                title.innerText = "You're online now";
                subTitle.innerText = "Hurray! Internet is connected.";
                wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
                closeIcon.onclick = ()=>{ //hide toast notification on close icon click
                    wrapper.classList.add("hide");
                }
                setTimeout(()=>{ //hide the toast notification automatically after 5 seconds
                    wrapper.classList.add("hide");
                }, 5000);
            }else{
                offline(); //calling offline function if ajax status is not equal to 200 or not less that 300
            }
        }
        xhr.onerror = ()=>{
            offline(); ////calling offline function if the passed url is not correct or returning 404 or other error
        }
        xhr.send(); //sending get request to the passed url
    }

    function offline(){ //function for offline
        wrapper.classList.remove("hide");
        toast.classList.add("offline");
        title.innerText = "You're offline now";
        subTitle.innerText = "Opps! Internet is disconnected.";
        wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
    }

    setInterval(()=>{ //this setInterval function call ajax frequently after 100ms
        ajax();
    }, 100);
}
