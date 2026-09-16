// =====================================================================
//  SHARED COMPONENTS
//  Building blocks used by all three portfolio panels:
//    createImage()          <img> that shows a helpful box if the file is missing
//    createMedia()          image, mp4 video or YouTube video
//    createCard()           gallery tile with vignette, title and hover "pop"
//    createSlideshow()      slides with arrows, counter, caption and dots
//    openDetails()          the scrollable pop-up
//    openArtworkDetails()   pop-up used by the Illustration and 3D panels
// =====================================================================

// Shows in the browser Console (F12) so you can check which version loaded
export const PORTFOLIO_VERSION = 5;
console.info(`Portfolio panels version ${PORTFOLIO_VERSION} loaded`);


// ---------------------------------------------------------------------
//  Media
// ---------------------------------------------------------------------
export function createImage(src, alt = '', className = '') {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.loading = 'lazy';
    if (className) img.className = className;

    img.addEventListener('error', () => {
        const missing = document.createElement('div');
        missing.className = `pf-missing ${className}`;
        missing.innerHTML = `<span>Image not found</span><code>${src}</code>`;
        img.replaceWith(missing);
    }, { once: true });

    return img;
}

export function createVideo(src, { autoplay = false } = {}) {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    if (autoplay) {
        // Browsers only allow autoplay when the video starts muted.
        // Visitors can unmute with the video controls.
        video.muted = true;
        video.setAttribute('muted', '');
        video.autoplay = true;
        video.loop = true;
        video.preload = 'auto';
    }
    return video;
}

export function createYouTube(id, title = 'YouTube video', { autoplay = false } = {}) {
    const params = autoplay ? '?autoplay=1&mute=1&playsinline=1&rel=0' : '?rel=0';
    const wrap = document.createElement('div');
    wrap.className = 'pf-embed';
    wrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}${params}" title="${title}"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowfullscreen></iframe>`;
    return wrap;
}

// item = { type: 'image' | 'video' | 'youtube', src or id, caption }
export function createMedia(item, { autoplay = false } = {}) {
    if (item.type === 'video') return createVideo(item.src, { autoplay });
    if (item.type === 'youtube') return createYouTube(item.id, item.caption || 'YouTube video', { autoplay });
    return createImage(item.src, item.caption || '');
}


// ---------------------------------------------------------------------
//  Gallery tile
//  ratio: 'portrait' | 'landscape' | 'square'
// ---------------------------------------------------------------------
export function createCard({ image, title, subtitle = '', ratio = 'portrait', focus = '', onSelect }) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `pf-card pf-ratio-${ratio}`;
    card.setAttribute('aria-label', `View details: ${title}`);

    const media = document.createElement('div');
    media.className = 'pf-card__media';

    const img = createImage(image, title, 'pf-card__img');
    if (focus) img.style.objectPosition = focus;
    media.appendChild(img);

    // Darkened edges (vignette) + bottom shade so the text is readable
    const vignette = document.createElement('div');
    vignette.className = 'pf-card__vignette';
    media.appendChild(vignette);

    const text = document.createElement('div');
    text.className = 'pf-card__text';
    text.innerHTML = `
        <span class="pf-card__title">${title}</span>
        ${subtitle ? `<span class="pf-card__subtitle">${subtitle}</span>` : ''}
    `;
    media.appendChild(text);

    card.appendChild(media);
    card.addEventListener('click', () => onSelect && onSelect());
    return card;
}


// ---------------------------------------------------------------------
//  Slideshow
//  shape: 'wide' (16:9 frame, used for games)
//         'tall' (tall frame that fits portrait artwork)
//  Returns { element, step, show }
// ---------------------------------------------------------------------
export function createSlideshow(slides, { shape = 'wide', label = 'Slideshow' } = {}) {
    const total = slides.length;
    let index = 0;

    const root = document.createElement('div');
    root.className = `pf-slideshow pf-slideshow--${shape}`;
    root.innerHTML = `
        <div class="pf-slideshow__stage" tabindex="0" aria-roledescription="carousel" aria-label="${label}">
            <div class="pf-slideshow__media"></div>
            <button type="button" class="pf-slideshow__arrow pf-slideshow__arrow--prev" aria-label="Previous slide">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button type="button" class="pf-slideshow__arrow pf-slideshow__arrow--next" aria-label="Next slide">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
            <span class="pf-slideshow__count" aria-live="polite"></span>
        </div>
        <div class="pf-slideshow__footer">
            <p class="pf-slideshow__caption"></p>
            <div class="pf-slideshow__dots"></div>
        </div>
    `;

    const stage = root.querySelector('.pf-slideshow__stage');
    const holder = root.querySelector('.pf-slideshow__media');
    const count = root.querySelector('.pf-slideshow__count');
    const caption = root.querySelector('.pf-slideshow__caption');
    const dots = root.querySelector('.pf-slideshow__dots');

    if (total < 2) root.classList.add('is-single');

    slides.forEach((slide, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'pf-slideshow__dot';
        dot.setAttribute('aria-label', `Slide ${i + 1}${slide.caption ? `: ${slide.caption}` : ''}`);
        dot.addEventListener('click', () => show(i));
        dots.appendChild(dot);
    });

    function show(i) {
        if (!total) return;
        index = (i + total) % total;

        // Replacing the element also stops a video that was playing
        holder.innerHTML = '';
        holder.appendChild(createMedia(slides[index]));

        count.textContent = `${index + 1} / ${total}`;
        caption.textContent = slides[index].caption || '';
        dots.querySelectorAll('.pf-slideshow__dot').forEach((d, n) => {
            d.setAttribute('aria-current', n === index ? 'true' : 'false');
        });
    }

    function step(direction) {
        if (total < 2) return;
        show(index + direction);
    }

    root.querySelector('.pf-slideshow__arrow--prev').addEventListener('click', () => step(-1));
    root.querySelector('.pf-slideshow__arrow--next').addEventListener('click', () => step(1));

    stage.addEventListener('keydown', (e) => {
        if (e.target !== stage) return;
        if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    });

    // Swipe on phones
    let touchX = null;
    stage.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        touchX = null;
    });

    show(0);
    return { element: root, step, show };
}


// ---------------------------------------------------------------------
//  Small pieces for the pop-up
// ---------------------------------------------------------------------
export function createTags(tags) {
    const list = (tags || []).filter(Boolean);
    if (!list.length) return null;
    const ul = document.createElement('ul');
    ul.className = 'pf-tags';
    ul.innerHTML = list.map(t => `<li>${t}</li>`).join('');
    return ul;
}

// Splits text on blank lines into paragraphs
export function createParagraphs(text, className = 'pf-detail__text') {
    const parts = String(text || '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    if (!parts.length) return null;
    const wrap = document.createElement('div');
    wrap.className = className;
    parts.forEach(para => {
        const p = document.createElement('p');
        p.innerHTML = para;
        wrap.appendChild(p);
    });
    return wrap;
}

export function createGallery(items) {
    if (!items || !items.length) return null;
    const grid = document.createElement('div');
    grid.className = 'pf-gallery';
    items.forEach(item => {
        const fig = document.createElement('figure');
        fig.className = `pf-gallery__item pf-gallery__item--${item.type || 'image'}`;
        const frame = document.createElement('div');
        frame.className = 'pf-gallery__frame';
        frame.appendChild(createMedia(item));
        fig.appendChild(frame);
        if (item.caption) {
            const cap = document.createElement('figcaption');
            cap.textContent = item.caption;
            fig.appendChild(cap);
        }
        grid.appendChild(fig);
    });
    return grid;
}


// ---------------------------------------------------------------------
//  Pop-up
//
//  openDetails({
//      hero:       element shown at the top (slideshow, video or image)
//      onArrowKey: function(direction) called for Left/Right keys
//      centered:   true centers the title and text
//      title:      '...'
//      parts:      elements shown under the title, in order
//  })
// ---------------------------------------------------------------------
let modal = null;
let lastFocused = null;
let arrowHandler = null;

function buildModal() {
    modal = document.createElement('div');
    modal.className = 'pf-modal';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'pf-modal-title');
    modal.innerHTML = `
        <div class="pf-modal__backdrop" data-close></div>
        <div class="pf-modal__panel">
            <button type="button" class="pf-modal__close" data-close aria-label="Close details">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
            <div class="pf-modal__scroll"></div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target.closest('[data-close]')) closeDetails();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal || modal.hidden) return;
        if (e.key === 'Escape') {
            closeDetails();
            return;
        }
        if (arrowHandler && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            // Let the slideshow itself and video controls handle their own keys
            if (e.target.closest && e.target.closest('.pf-slideshow__stage, video, iframe, input, textarea')) return;
            e.preventDefault();
            arrowHandler(e.key === 'ArrowLeft' ? -1 : 1);
        }
    });
}

export function openDetails({ hero = null, onArrowKey = null, centered = false, title = '', parts = [] }) {
    if (!modal) buildModal();

    const scroll = modal.querySelector('.pf-modal__scroll');
    scroll.innerHTML = '';
    scroll.scrollTop = 0;

    if (hero) scroll.appendChild(hero);

    const body = document.createElement('div');
    body.className = `pf-detail__body${centered ? ' pf-detail--centered' : ''}`;

    const heading = document.createElement('h3');
    heading.id = 'pf-modal-title';
    heading.className = 'pf-detail__title';
    heading.textContent = title;
    body.appendChild(heading);

    parts.filter(Boolean).forEach(part => body.appendChild(part));
    scroll.appendChild(body);

    arrowHandler = onArrowKey;
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    scroll.querySelectorAll('video[autoplay]').forEach(v => v.play().catch(() => {}));

    requestAnimationFrame(() => {
        modal.classList.add('is-open');
        modal.querySelector('.pf-modal__close').focus();
    });
}

export function closeDetails() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open');
    modal.hidden = true;
    arrowHandler = null;
    // Clearing the content also stops any video that is playing
    modal.querySelector('.pf-modal__scroll').innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
}

// Pop-up for artwork and 3D projects:
// slideshow on top, centered title, small paragraph, tags
//
// Text comes from "description". Older entries that still use
// "caption" or text blocks in "content" also work.
export function openArtworkDetails(item) {
    const title = item.title || '';
    const image = item.image || item.src;

    const slides = [
        { type: 'image', src: image, caption: '' },
        ...(item.processImages || []).map(p => ({ type: 'image', ...p })),
    ];
    const show = createSlideshow(slides, { shape: 'tall', label: `${title} images` });

    openDetails({
        hero: show.element,
        onArrowKey: show.step,
        centered: true,
        title,
        parts: [
            createParagraphs(getDescription(item)),
            createTags(item.tags),
        ],
    });
}

function getDescription(item) {
    if (item.description && String(item.description).trim()) return item.description;

    // Fallback for the older data format
    const oldText = [
        item.caption,
        ...(item.content || []).filter(b => b.type === 'text').map(b => b.text),
    ].filter(t => t && String(t).trim());
    return oldText.join('\n\n');
}
