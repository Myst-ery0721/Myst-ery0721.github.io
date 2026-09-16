// =====================================================================
//  GAME DEV PANEL
//  Part 1: slideshow + full description (left), list of games (right)
//  Part 2: gallery of all games, click for a pop-up that autoplays
//          the game's video
// =====================================================================
import { games } from './portfolioData.js';
import {
    createImage, createMedia, createCard, createSlideshow,
    createTags, createParagraphs, createGallery, openDetails,
} from './components.js';

export function initGamePanel() {
    const player = document.getElementById('game-player');
    const list = document.getElementById('game-list');
    const gallery = document.getElementById('game-gallery');
    if (!player || !list || !gallery || !games.length) return;

    buildPlayer(player);
    buildList(list);
    buildGallery(gallery);
    showGame(0);
}

function gameTags(game) {
    return [game.role, game.year, ...(game.tools || [])];
}


// ---------------------------------------------------------------------
//  Part 1: left column
// ---------------------------------------------------------------------
function buildPlayer(player) {
    player.innerHTML = `
        <div class="pf-player__show"></div>
        <div class="pf-player__info">
            <h3 class="pf-player__title"></h3>
            <div class="pf-player__tags"></div>
            <div class="pf-player__description" tabindex="0" aria-label="Game description"></div>
        </div>
    `;
}

function showGame(index) {
    const game = games[index];
    const player = document.getElementById('game-player');

    // Slideshow (falls back to the thumbnail if there is no media)
    const slides = (game.media && game.media.length)
        ? game.media
        : [{ type: 'image', src: game.thumbnail, caption: '' }];
    const show = createSlideshow(slides, { shape: 'wide', label: `${game.title} slideshow` });
    player.querySelector('.pf-player__show').replaceChildren(show.element);

    player.querySelector('.pf-player__title').textContent = game.title;

    const tags = createTags(gameTags(game));
    player.querySelector('.pf-player__tags').replaceChildren(...(tags ? [tags] : []));

    const description = player.querySelector('.pf-player__description');
    const text = createParagraphs(game.description, 'pf-player__text');
    description.replaceChildren(...(text ? [text] : []));
    description.scrollTop = 0;

    document.querySelectorAll('#game-list .pf-list-item').forEach((row, i) => {
        row.classList.toggle('is-active', i === index);
        row.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
}


// ---------------------------------------------------------------------
//  Part 1: right column (list of games)
// ---------------------------------------------------------------------
function buildList(list) {
    list.innerHTML = '';
    games.forEach((game, index) => {
        const row = document.createElement('button');
        row.type = 'button';
        row.className = 'pf-list-item';

        const thumb = document.createElement('div');
        thumb.className = 'pf-list-item__thumb';
        thumb.appendChild(createImage(game.thumbnail, game.title));

        const count = (game.media || []).length;
        const text = document.createElement('div');
        text.className = 'pf-list-item__text';
        text.innerHTML = `
            <span class="pf-list-item__title">${game.title}</span>
            <span class="pf-list-item__meta">${[game.role, `${count} ${count === 1 ? 'item' : 'items'}`].filter(Boolean).join(', ')}</span>
        `;

        row.append(thumb, text);
        row.addEventListener('click', () => showGame(index));
        list.appendChild(row);
    });
}


// ---------------------------------------------------------------------
//  Part 2: gallery of games + pop-up
// ---------------------------------------------------------------------
function buildGallery(gallery) {
    gallery.innerHTML = '';
    gallery.className = 'pf-card-grid pf-grid-landscape';
    games.forEach(game => {
        gallery.appendChild(createCard({
            image: game.thumbnail,
            title: game.title,
            subtitle: [game.role, game.year].filter(Boolean).join(', '),
            ratio: 'landscape',
            onSelect: () => openGameDetails(game),
        }));
    });
}

function openGameDetails(game) {
    const media = game.media || [];
    const firstVideo = media.find(m => m.type === 'video' || m.type === 'youtube');

    // Top: the first video autoplays; without a video, show the thumbnail
    const hero = document.createElement('div');
    if (firstVideo) {
        hero.className = 'pf-hero pf-hero--video';
        hero.appendChild(createMedia(firstVideo, { autoplay: true }));
    } else {
        hero.className = 'pf-hero pf-hero--cover';
        hero.appendChild(createImage(game.thumbnail, game.title));
    }

    openDetails({
        hero,
        title: game.title,
        parts: [
            createTags(gameTags(game)),
            createGallery(media.filter(m => m !== firstVideo)),
            createParagraphs(game.description),
        ],
    });
}
