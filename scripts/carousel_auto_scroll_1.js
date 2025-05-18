const carouselContainer = document.querySelector('.carousel-container');
const carouselSlide = document.querySelector('.carousel-slide');
const carouselItems = document.querySelectorAll('.carousel-item');
const autoScrollButton = document.querySelector('.auto-scroll-toggle');

let counter = 0;
const slideWidth = carouselItems[0].offsetWidth;
let autoScrollInterval;
let isAutoScrolling = true;
const autoScrollSpeed = 3000; // Time in milliseconds between auto scroll

// Set initial position
carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;



function slideTo(index) {
    carouselSlide.style.transform = `translateX(${-slideWidth * index}px)`;
}

// Auto scroll functionality
function startAutoScroll() {
    isAutoScrolling = true;
    autoScrollInterval = setInterval(() => {
        counter++;
        if (counter >= carouselItems.length) {
            counter = 0;
        }
        slideTo(counter);
    }, autoScrollSpeed);
}

startAutoScroll();



// Handle resizing
window.addEventListener('resize', () => {
    slideWidth = carouselItems[0].offsetWidth;
    slideTo(counter);
});