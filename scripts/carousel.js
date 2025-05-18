const carouselContainer = document.querySelector('.carousel-container');
        const carouselSlide = document.querySelector('.carousel-slide');
        const carouselItems = document.querySelectorAll('.carousel-item');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        const autoScrollButton = document.querySelector('.auto-scroll-toggle');

        let counter = 0;
        const slideWidth = carouselItems[0].offsetWidth;
        let autoScrollInterval;
        let isAutoScrolling = false;
        const autoScrollSpeed = 3000; // Time in milliseconds between auto scroll

        // Set initial position
        carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;

        // Navigation buttons
        nextButton.addEventListener('click', () => {
            if (counter >= carouselItems.length - 1) return;
            counter++;
            slideTo(counter);
            stopAutoScroll();
        });

        prevButton.addEventListener('click', () => {
            if (counter <= 0) return;
            counter--;
            slideTo(counter);
            stopAutoScroll();
        });

        function slideTo(index) {
            carouselSlide.style.transform = `translateX(${-slideWidth * index}px)`;
        }

        // Touch swipe functionality
        let touchStartX = 0;
        let touchEndX = 0;

        carouselSlide.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        carouselSlide.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            const swipeThreshold = 50;

            if (swipeDistance > swipeThreshold && counter > 0) {
                counter--;
            } else if (swipeDistance < -swipeThreshold && counter < carouselItems.length - 1) {
                counter++;
            }
            slideTo(counter);
            stopAutoScroll();
        }

        // Prevent default drag behavior
        carouselSlide.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        // Auto scroll functionality
        function startAutoScroll() {
            isAutoScrolling = true;
            autoScrollButton.textContent = 'Stop Auto Scroll';
            autoScrollInterval = setInterval(() => {
                counter++;
                if (counter >= carouselItems.length) {
                    counter = 0;
                }
                slideTo(counter);
            }, autoScrollSpeed);
        }

        function stopAutoScroll() {
            isAutoScrolling = false;
            autoScrollButton.textContent = 'Start Auto Scroll';
            clearInterval(autoScrollInterval);
        }

        autoScrollButton.addEventListener('click', () => {
            if (isAutoScrolling) {
                stopAutoScroll();
            } else {
                startAutoScroll();
            }
        });

        // Handle resizing
        window.addEventListener('resize', () => {
            slideWidth = carouselItems[0].offsetWidth;
            slideTo(counter);
        });