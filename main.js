document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');

    let autoSlideInterval;    
    let currentIndex = 0;

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(function () {
            goToNextSlide();
        }, 5000); // Ganti 5000 dengan waktu dalam milidetik sesuai kebutuhan Anda
    }    

    function handleSlideChange() {
        currentIndex = Math.round(carousel.scrollLeft / carousel.offsetWidth);
        updateIndicators();
    }

    function goToSlide(index) {
        currentIndex = index;
        carousel.scrollLeft = currentIndex * carousel.offsetWidth;
        updateIndicators();
    }

    function goToPrevSlide() {
        clearInterval(autoSlideInterval);
        currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
        carousel.scrollLeft = currentIndex * carousel.offsetWidth;
        updateIndicators();
        startAutoSlide(); 
    }

    function goToNextSlide() {
        clearInterval(autoSlideInterval);
        currentIndex = (currentIndex + 1) % indicators.length;
        carousel.scrollLeft = currentIndex * carousel.offsetWidth;
        updateIndicators();
        startAutoSlide(); 
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            goToSlide(index);
        });
    });
    
    // Set initial indicators
    updateIndicators();
    
    // Start auto slide
    startAutoSlide();
    
    carousel.addEventListener('scroll', handleSlideChange);

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', function () {
        clearInterval(autoSlideInterval); // Hentikan otomatisasi saat tombol ditekan
        goToPrevSlide();
    });

    nextBtn.addEventListener('click', function () {
        clearInterval(autoSlideInterval); // Hentikan otomatisasi saat tombol ditekan
        goToNextSlide();
    });
});


// Function to scroll to the target section with an offset from the top
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop;
        const windowHeight = window.innerHeight;
        const targetPosition = offsetTop - (windowHeight / 5);
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    }
}

// Add event listeners to navbar links
const navbarLinks = document.querySelectorAll('.navbar a');
navbarLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSectionId = link.getAttribute('href').substring(1);
      scrollToSection(targetSectionId);
    });
});

// resource nav-btn
const resourceContainer = document.getElementById("resourceContainer");
const scrollStep = 200; // Atur seberapa banyak piksel untuk di-scroll setiap kali tombol ditekan

function scrollResourceBox(direction) {
    if (direction === "prev") {
        resourceContainer.scrollLeft -= scrollStep;
    } else if (direction === "next") {
        resourceContainer.scrollLeft += scrollStep;
    }
}

// Tambahkan event listener untuk tombol
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

prevButton.addEventListener("click", () => {
    scrollResourceBox("prev");
});

nextButton.addEventListener("click", () => {
    scrollResourceBox("next");
});


// home-icon
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

window.onscroll = () => {
    navbar.classList.remove('active');
}