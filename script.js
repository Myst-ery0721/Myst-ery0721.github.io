// Import model handling functions
import { initModelViewer } from './modelHandler.js';

// [ADDED] New portfolio panels (content lives in portfolioData.js)
import { initIllustrationPanel } from './illustrationPanel.js';
import { initGamePanel } from './gamePanel.js';
import { init3DPanel } from './artist3dPanel.js';

// Game Development Slider
// ============================================================
// [NO LONGER USED] The Game tab now uses the "games" list in portfolioData.js.
// This older slideshow code is kept for reference.
// ============================================================
// GAME DEVELOPMENT SLIDES -- edit this list to change the Game tab.
// Each entry becomes one slide AND one thumbnail automatically.
// You can have any number of entries (3, 4, 6...).
//   image:       path to a screenshot/GIF, e.g. "img/GAMES/mygame1.png"
//                (16:9 images look best, e.g. 1280x720)
//   title:       big title under the image
//   description: 1-3 sentences: what the game is + what YOU did
//   thumbLabel:  (optional) short caption on the thumbnail; uses title if left out
// ============================================================
const gameSlides = [
    {
        image: "img/GAMES/game1.png",
        title: "Game Title 1",
        description: "What the game is about, and your role in it (e.g. 3D models, textures, level art).",
        thumbLabel: "Game 1"
    },
    {
        image: "img/GAMES/game2.png",
        title: "Game Title 2",
        description: "What the game is about, and your role in it.",
        thumbLabel: "Game 2"
    },
    {
        image: "img/GAMES/game3.png",
        title: "Game Title 3",
        description: "What the game is about, and your role in it.",
        thumbLabel: "Game 3"
    },
    {
        image: "img/GAMES/game4.png",
        title: "Game Title 4",
        description: "What the game is about, and your role in it.",
        thumbLabel: "Game 4"
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

// [ADDED] Build the game thumbnails from the gameSlides list,
// so you only ever edit the data above (no copy-pasting HTML).
function renderGameThumbnails() {
    const container = document.getElementById('game-thumbnails');
    const totalSlides = document.getElementById('total-slides');
    if (!container) return;

    container.innerHTML = '';

    gameSlides.forEach((slide, index) => {
        const label = slide.thumbLabel || slide.title;

        const thumb = document.createElement('div');
        thumb.className = 'cursor-pointer overflow-hidden aspect-[16/9] bg-gray-900';
        thumb.innerHTML = `
            <div class="relative w-full h-full hover:bg-gray-800 transition-colors duration-300">
                <img src="${slide.image}" alt="${label}"
                    class="w-full h-full object-contain hover:scale-110 transition-transform duration-300">
                <span class="absolute bottom-0 left-0 right-0 text-center text-xs py-1 bg-black/80">${label}</span>
            </div>
        `;
        thumb.addEventListener('click', () => setGameSlide(index));
        container.appendChild(thumb);
    });

    if (totalSlides) totalSlides.textContent = gameSlides.length;
}

// Concept art data
// [NO LONGER USED] The Illustration tab now uses "illustrations" in portfolioData.js.
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

// Initialize hero grid (ORIGINAL PIONG VERSION)
// function initHeroGrid() {
//     const heroGrid = document.getElementById('hero-grid');
//     if (heroGrid) {
//         conceptArt.slice(0, 5).forEach(art =>
//              {
//             const div = document.createElement('div');
//             div.className = 'relative overflow-hidden';
//             div.innerHTML = `
//                 <img src="${art.src}" alt="${art.title}" class="w-full h-full object-cover">
//                 <div class="absolute inset-0 bg-black/98"></div>  // Changed from 95 to 98
//             `;
//             heroGrid.appendChild(div);
//         });
//     }
// }

// Initialize hero grid (MODIFIED)
// [NOT CALLED] The hero now uses a background video. Kept so you can switch back.
function initHeroGrid() {
    const heroGrid = document.getElementById('hero-grid');
    if (!heroGrid) return;

    // Manually chosen images (NO auto-generation)
    const heroImages = [
        { src: 'img/hero1.gif', title: 'Concept 1' },
        { src: 'img/hero3.gif', title: 'Concept 2' },
        { src: 'img/DIGITAL.ARTIST/3.jpg', title: 'Concept 3' },
        { src: 'img/hero4.gif', title: 'Concept 4' },
        { src: 'img/hero2.gif', title: 'Concept 5' },
    ];

    heroImages.forEach(art => {
        const div = document.createElement('div');
        div.className = 'relative overflow-hidden';

        div.innerHTML = `
            <img src="${art.src}" alt="${art.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/98"></div>
        `;

        heroGrid.appendChild(div);
    });
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
        // initHeroGrid();        // [COMMENTED OUT] hero grid replaced by a background video in index.html
        // initConceptGrid();        // [REPLACED] by initIllustrationPanel() below
        initLightbox();
        // renderGameThumbnails();   // [REPLACED] by initGamePanel() below
        // updateGameSlide();

        // [ADDED] New portfolio panels
        initIllustrationPanel();
        initGamePanel();

        // Initialize 3D model viewer
        // [REPLACED] the viewer + thumbnail selector with one featured model + image gallery
        const modelContainer = document.getElementById('model-container');
        if (modelContainer) {
            // await initModelViewer('model-container');
            await init3DPanel();
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