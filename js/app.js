/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navbar_list = document.getElementById('navbar__list');
let navbarHidingtimer;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Sets the timer for hiding the navbar for 500ms
function setNavbarHidingTimer() {
    navbarHidingtimer = setTimeout(function () {
        navbar_list.style.display = 'none';
    }, 500);
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavlist() {
    const ulFragment = document.createDocumentFragment();
    for (const section of sections) {
    const ulItem = document.createElement('li');
    ulItem.innerHTML = `<a href='#${section.id}' class='menu__link' data-nav='${section.id}' >${section.dataset.nav}</a>`;
    ulFragment.appendChild(ulItem);
    }
    navbar_list.appendChild(ulFragment);
}

// Add class 'active' to section when near top of viewport using .getBoundingClientRect()
// Change the color of the navbar list item related to the active section
function setSectionActive() {
    sections.forEach((section,index) => {
        let topRect = section.getBoundingClientRect().top;
        let li = navbar_list.getElementsByTagName('a').item(index);
        if (topRect<=200 && topRect >= (-section.clientHeight + 300)) {
            section.classList.add('your-active-class');
            li.style.color = '#00f';
        } else {
            section.classList.remove('your-active-class');
            navbar_list.getElementsByTagName('a').item(index).classList.remove('active__link');
            li.style.removeProperty('color');
        }
    });
}

// Hide nav bar when not scrolling and do not hide when at top of the page
function hideNavBar() {
    // Clear our timeout throughout the scroll
    window.clearTimeout(navbarHidingtimer);
    // Removes the display property to show the navbar
    navbar_list.style.removeProperty('display');
    // Check whether it is the top of the page or not in order not to hide the navbar
    if (!(document.body.getBoundingClientRect().top >= 100)) {
        // Set a timeout to run after scrolling ends
        setNavbarHidingTimer();
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', function () {
    buildNavlist();
});

// Smooth scroll to section on link click
navbar_list.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.dataset.nav) {
        document.getElementById(e.target.dataset.nav).scrollIntoView({behavior:'smooth'});
    }
});

// Set sections as active
window.addEventListener('scroll', setSectionActive);

// Hide nav bar
window.addEventListener('scroll', hideNavBar);

// Show nav bar on mouse over and hide on mouse leaving
navbar_list.addEventListener('mouseover', () => {
    window.clearTimeout(navbarHidingtimer);
});
navbar_list.addEventListener('mouseleave', () => {
    if(!(document.body.getBoundingClientRect().top >= 100))
        setNavbarHidingTimer();
});
/**
 * End main Events
 */
