// =====================================================================
//  GAME DEV PANEL
//  Part 1: slideshow player (left) + list of games (right)
//  Part 2: gallery of all games, click to open the detail pop-up
// =====================================================================
import { games } from './portfolioData.js';
import { createImage, createCard, createVideo, createYouTube, openDetails } from './components.js';

let currentGame = 0;
let currentMedia = 0;

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


// ---------------------------------------------------------------------
//  Part 1a: the player shell (built once)
// ---------------------------------------------------------------------
function buildPlayer(player) {
    player.innerHTML = `
        <div class="pf-player__stage" tabindex="0" aria-label="Game slideshow, use left and right arrow keys">
            <div class="pf-player__media"></div>
            <button type="button" class="pf-player__arrow pf-player__arrow--prev" aria-label="Previous slide">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button type="button" class="pf-player__arrow pf-player__arrow--next" aria-label="Next slide">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
            <span class="pf-player__count" aria-live="polite"></span>
        </div>
        <p class="pf-player__media-caption"></p>
        <div class="pf-player__info">
            <h3 class="pf-player__title"></h3>
            <ul class="pf-tags"></ul>
            <p class="pf-player__summary"></p>
            <div class="pf-links">
                <button type="button" class="pf-button pf-player__details">View full details</button>
            </div>
        </div>
    `;

    player.querySelector('.pf-player__arrow--prev').addEventListener('click', () => stepMedia(-1));
    player.querySelector('.pf-player__arrow--next').addEventListener('click', () => stepMedia(1));
    player.querySelector('.pf-player__details').addEventListener('click', () => openGameDetails(games[currentGame]));

    // Left/right keys while the slideshow has focus
    player.querySelector('.pf-player__stage').addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') stepMedia(-1);
        if (e.key === 'ArrowRight') stepMedia(1);
    });
}


// ---------------------------------------------------------------------
//  Part 1b: the list of games on the right
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
//  Switching games and slides
// ---------------------------------------------------------------------
function showGame(index) {
    currentGame = index;
    currentMedia = 0;
    const game = games[index];
    const player = document.getElementById('game-player');

    player.querySelector('.pf-player__title').textContent = game.title;
    player.querySelector('.pf-player__summary').innerHTML = game.summary || '';
    player.querySelector('.pf-tags').innerHTML = gameTags(game).map(t => `<li>${t}</li>`).join('');

    document.querySelectorAll('#game-list .pf-list-item').forEach((row, i) => {
        row.classList.toggle('is-active', i === index);
        row.setAttribute('aria-current', i === index ? 'true' : 'false');
    });

    showMedia();
}

function stepMedia(direction) {
    const total = (games[currentGame].media || []).length;
    if (total < 2) return;
    currentMedia = (currentMedia + direction + total) % total;
    showMedia();
}

function showMedia() {
    const game = games[currentGame];
    const media = game.media || [];
    const player = document.getElementById('game-player');
    const holder = player.querySelector('.pf-player__media');
    const count = player.querySelector('.pf-player__count');
    const caption = player.querySelector('.pf-player__media-caption');

    // Replacing the element also stops a video that was playing
    holder.innerHTML = '';

    const item = media[currentMedia];
    if (!item) {
        holder.appendChild(createImage(game.thumbnail, game.title));
    } else if (item.type === 'video') {
        holder.appendChild(createVideo(item.src));
    } else if (item.type === 'youtube') {
        holder.appendChild(createYouTube(item.id, game.title));
    } else {
        holder.appendChild(createImage(item.src, item.caption || game.title));
    }

    const total = media.length;
    count.textContent = total ? `${currentMedia + 1} / ${total}` : '';
    count.hidden = total === 0;
    caption.textContent = (item && item.caption) || '';

    player.querySelectorAll('.pf-player__arrow').forEach(a => { a.hidden = total < 2; });
}


// ---------------------------------------------------------------------
//  Part 2: gallery of games
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

function gameTags(game) {
    return [game.role, game.year, ...(game.tools || [])].filter(Boolean);
}

function openGameDetails(game) {
    const content = [...(game.content || [])];

    if (game.showMediaInDetails && game.media && game.media.length) {
        const images = game.media.filter(m => m.type === 'image' || !m.type);
        if (images.length) {
            content.push({ type: 'gallery', heading: 'Gallery', images });
        }
        game.media
            .filter(m => m.type === 'video' || m.type === 'youtube')
            .forEach(m => content.push(m));
    }

    openDetails({
        cover: game.thumbnail,
        coverFit: 'cover',
        title: game.title,
        caption: game.summary,
        tags: gameTags(game),
        links: game.links,
        content,
    });
}
