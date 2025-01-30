// Import model handling functions
import { initModelViewer } from './modelHandler.js';

// Game Development Slider
const gameSlides = [
    {
        image: "https://placehold.co/1200x600/111827/FFFFFF/png?text=Mountain+Sunrise",
        title: "Nature and sunrise",
        description: "An immersive open-world adventure game set in breathtaking natural landscapes."
    },
    {
        image: "https://placehold.co/1200x600/111827/FFFFFF/png?text=Snowy+Peaks",
        title: "Winter peaks",
        description: "Explore vast mountain ranges and discover hidden mysteries in the snow."
    },
    {
        image: "https://placehold.co/1200x600/111827/FFFFFF/png?text=Coastal+Road",
        title: "Coastal journey",
        description: "Travel along scenic coastal roads in this atmospheric driving experience."
    },
    {
        image: "https://placehold.co/1200x600/111827/FFFFFF/png?text=Northern+Lights",
        title: "Aurora nights",
        description: "Experience the magic of the northern lights in this mystical adventure."
    }
];

let currentGameSlide = 0;

function updateGameSlide() {
    const mainImage = document.getElementById('main-game-image');
    const title = document.getElementById('game-title');
    const description = document.getElementById('game-description');
    const currentSlideNum = document.getElementById('current-slide');
    
    if (mainImage && title && description && currentSlideNum) {
        mainImage.src = gameSlides[currentGameSlide].image;
        title.textContent = gameSlides[currentGameSlide].title;
        description.textContent = gameSlides[currentGameSlide].description;
        currentSlideNum.textContent = currentGameSlide + 1;
        
        const thumbnails = document.querySelectorAll('.grid.grid-cols-4 > div');
        thumbnails.forEach((thumb, index) => {
            if (index === currentGameSlide) {
                thumb.classList.add('ring-2', 'ring-red-800');
                thumb.classList.remove('ring-0');
            } else {
                thumb.classList.remove('ring-2', 'ring-red-800');
                thumb.classList.add('ring-0');
            }
        });
    }
}

function nextGameSlide() {
    currentGameSlide = (currentGameSlide + 1) % gameSlides.length;
    updateGameSlide();
}

function prevGameSlide() {
    currentGameSlide = (currentGameSlide - 1 + gameSlides.length) % gameSlides.length;
    updateGameSlide();
}

function setGameSlide(index) {
    currentGameSlide = index;
    updateGameSlide();
}

// Concept art data
const conceptArt = [
    { title: "'Prince Callisto' -- The Blood Knight", src: "img/DIGITAL.ARTIST/1.jpg" },
    { title: "Tamed by an Angel", src: "img/DIGITAL.ARTIST/2.jpg" },
    { title: "Arione", src: "img/DIGITAL.ARTIST/3.jpg" },
    { title: "King of the Cursed Kingdom", src: "img/DIGITAL.ARTIST/4.jpg" },
    { title: "Death is Fun", src: "img/DIGITAL.ARTIST/5.jpg" },
    { title: "'Skye Faust' -- Living Paradox", src: "img/DIGITAL.ARTIST/6.webp" },
    { title: "DTIYS Artwork", src: "img/DIGITAL.ARTIST/7.webp" },
    { title: "Hunter Grounds -- Splash Screen", src: "img/DIGITAL.ARTIST/SplashScreen.jpg" },
    { title: "'Bound to Hell' -- Persona Artwork", src: "img/DIGITAL.ARTIST/erystle.jpg" },
    { title: "Aliester the Danger!", src: "img/DIGITAL.ARTIST/Aliester.jpg" },
    { title: "Side by Side", src: "img/DIGITAL.ARTIST/sideside.png" },
    { title: "Vash the Stampede -- FanArt", src: "img/DIGITAL.ARTIST/vashu2.png" },
    { title: "Persona Reference Sheet", src: "img/DIGITAL.ARTIST/refsheet.png" }
];

// Initialize mobile menu
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (!menuButton || !mobileMenu || !menuIcon || !closeIcon) return;

    function toggleMenu() {
        const isOpen = mobileMenu.classList.contains('show');
        mobileMenu.classList.toggle('show');
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
        menuButton.classList.toggle('active');
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }
    
    menuButton.addEventListener('click', toggleMenu);
    
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('show')) {
            toggleMenu();
        }
    });
}

// Initialize hero grid
function initHeroGrid() {
    const heroGrid = document.getElementById('hero-grid');
    if (heroGrid) {
        conceptArt.slice(0, 5).forEach(art => {
            const div = document.createElement('div');
            div.className = 'relative overflow-hidden';
            div.innerHTML = `
                <img src="${art.src}" alt="${art.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/98"></div>  // Changed from 95 to 98
            `;
            heroGrid.appendChild(div);
        });
    }
}

// Initialize concept grid
function initConceptGrid() {
    const conceptGrid = document.getElementById('concept-content');
    if (conceptGrid) {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4';
        
        conceptArt.forEach(art => {
            const div = document.createElement('div');
            div.className = 'relative w-full pb-full';
            
            const innerDiv = document.createElement('div');
            innerDiv.className = 'absolute inset-0 overflow-hidden rounded-lg cursor-pointer group';
            
            innerDiv.innerHTML = `
                <div class="relative w-full h-full">
                    <div class="absolute inset-0">
                        <img src="${art.src}" alt="${art.title}" 
                            class="w-full h-full object-cover">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6">
                        <div class="w-full space-y-2">
                            <div class="h-px w-full bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
                            <p class="text-white text-lg font-light text-center tracking-wider">${art.title}</p>
                            <div class="h-px w-full bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
                        </div>
                    </div>
                </div>
            `;
            
            div.appendChild(innerDiv);
            innerDiv.addEventListener('click', () => openLightbox(art));
            gridContainer.appendChild(div);
        });
        
        conceptGrid.appendChild(gridContainer);
    }
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            const contentArea = lightbox.querySelector('.max-w-4xl');
            if (!contentArea.contains(e.target)) {
                closeLightbox();
            }
        });
    }
}

function openLightbox(art) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');

    if (lightbox && lightboxImage && lightboxCaption) {
        lightboxImage.src = art.src;
        lightboxImage.alt = art.title;
        lightboxCaption.textContent = art.title;
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Portfolio tabs initialization
function initPortfolioTabs() {
    const buttons = document.querySelectorAll('[data-tab]');
    buttons.forEach(button => {
        button.onclick = (e) => {
            e.preventDefault();
            const tab = button.getAttribute('data-tab');
            
            buttons.forEach(b => {
                b.classList.remove('active');
                b.style.borderBottomColor = 'transparent';
            });
            button.classList.add('active');
            button.style.borderBottomColor = 'white';
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            
            const content = document.getElementById(`${tab}-content`);
            if (content) {
                content.classList.remove('hidden');
            }
        };
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize basic features
        initMobileMenu();
        initPortfolioTabs();
        initHeroGrid();
        initConceptGrid();
        initLightbox();
        updateGameSlide();

        // Initialize 3D model viewer
        const modelContainer = document.getElementById('model-container');
        if (modelContainer) {
            await initModelViewer('model-container');
            console.log('3D viewer initialized successfully');
        }

        // Hide preloader after everything is initialized
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1000);
        }
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Make necessary functions available globally
window.nextGameSlide = nextGameSlide;
window.prevGameSlide = prevGameSlide;
window.setGameSlide = setGameSlide;
window.openLightbox = openLightbox;