// =====================================================================
//  SHARED COMPONENTS
//  Building blocks used by all three portfolio panels:
//    createImage()   an <img> that shows a helpful box if the file is missing
//    createCard()    a gallery tile with vignette, title and hover "pop"
//    openDetails()   the scrollable pop-up detail page
// =====================================================================


// ---------------------------------------------------------------------
//  Image with a "missing file" fallback
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
//  Detail pop-up
//
//  openDetails({
//      cover: 'img/...png',     image at the top
//      coverFit: 'contain',     'contain' shows the whole image (artwork),
//                               'cover' fills a wide banner (games)
//      title: '...',
//      caption: '...',          extra line beside the title
//      tags: ['Blender'],       small labels
//      links: [{ label, url }], buttons
//      content: [ blocks ]      see portfolioData.js
//  })
// ---------------------------------------------------------------------
let modal = null;
let lastFocused = null;

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
        if (e.key === 'Escape' && modal && !modal.hidden) closeDetails();
    });
}

export function openDetails(item) {
    if (!modal) buildModal();

    const scroll = modal.querySelector('.pf-modal__scroll');
    scroll.innerHTML = '';
    scroll.scrollTop = 0;

    // Cover image
    if (item.cover) {
        const cover = document.createElement('div');
        cover.className = `pf-detail__cover pf-fit-${item.coverFit || 'contain'}`;
        cover.appendChild(createImage(item.cover, item.title));
        scroll.appendChild(cover);
    }

    const body = document.createElement('div');
    body.className = 'pf-detail__body';

    // Title + caption
    const header = document.createElement('header');
    header.className = 'pf-detail__header';
    header.innerHTML = `
        <h3 id="pf-modal-title" class="pf-detail__title">${item.title || ''}</h3>
        ${item.caption ? `<p class="pf-detail__caption">${item.caption}</p>` : ''}
    `;
    body.appendChild(header);

    if (item.tags && item.tags.length) {
        const tags = document.createElement('ul');
        tags.className = 'pf-tags';
        tags.innerHTML = item.tags.map(t => `<li>${t}</li>`).join('');
        body.appendChild(tags);
    }

    if (item.links && item.links.length) {
        const links = document.createElement('div');
        links.className = 'pf-links';
        links.innerHTML = item.links
            .map(l => `<a class="pf-button" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`)
            .join('');
        body.appendChild(links);
    }

    (item.content || []).forEach(block => {
        const el = renderBlock(block);
        if (el) body.appendChild(el);
    });

    scroll.appendChild(body);

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        modal.classList.add('is-open');
        modal.querySelector('.pf-modal__close').focus();
    });
}

export function closeDetails() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open');
    modal.hidden = true;
    // Clearing the content also stops any video that is playing
    modal.querySelector('.pf-modal__scroll').innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
}


// ---------------------------------------------------------------------
//  Content blocks
// ---------------------------------------------------------------------
function withHeading(section, heading) {
    if (heading) {
        const h = document.createElement('h4');
        h.className = 'pf-block__heading';
        h.textContent = heading;
        section.appendChild(h);
    }
}

function figure(mediaEl, caption) {
    const fig = document.createElement('figure');
    fig.className = 'pf-block__figure';
    fig.appendChild(mediaEl);
    if (caption) {
        const cap = document.createElement('figcaption');
        cap.textContent = caption;
        fig.appendChild(cap);
    }
    return fig;
}

export function createVideo(src) {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    return video;
}

export function createYouTube(id, title = 'YouTube video') {
    const wrap = document.createElement('div');
    wrap.className = 'pf-embed';
    wrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}" title="${title}"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowfullscreen loading="lazy"></iframe>`;
    return wrap;
}

function renderBlock(block) {
    const section = document.createElement('section');
    section.className = `pf-block pf-block--${block.type}`;

    switch (block.type) {
        case 'text': {
            withHeading(section, block.heading);
            String(block.text || '').split(/\n\s*\n/).forEach(para => {
                const p = document.createElement('p');
                p.innerHTML = para.trim();
                section.appendChild(p);
            });
            break;
        }
        case 'list': {
            withHeading(section, block.heading);
            const ul = document.createElement('ul');
            ul.innerHTML = (block.items || []).map(i => `<li>${i}</li>`).join('');
            section.appendChild(ul);
            break;
        }
        case 'image': {
            withHeading(section, block.heading);
            section.appendChild(figure(createImage(block.src, block.caption || ''), block.caption));
            break;
        }
        case 'gallery': {
            withHeading(section, block.heading);
            const grid = document.createElement('div');
            grid.className = 'pf-block__gallery';
            (block.images || []).forEach(im => {
                grid.appendChild(figure(createImage(im.src, im.caption || ''), im.caption));
            });
            section.appendChild(grid);
            break;
        }
        case 'video': {
            withHeading(section, block.heading);
            section.appendChild(figure(createVideo(block.src), block.caption));
            break;
        }
        case 'youtube': {
            withHeading(section, block.heading);
            section.appendChild(figure(createYouTube(block.id), block.caption));
            break;
        }
        default:
            console.warn('Unknown content block type:', block.type);
            return null;
    }
    return section;
}
