// =====================================================================
//  ILLUSTRATION PANEL
//  Fills <div id="art-gallery"> inside the Concept Art tab.
// =====================================================================
import { illustrations, settings } from './portfolioData.js';
import { createCard, openDetails } from './components.js';

const STYLES = [
    { value: 'portrait', label: 'Portrait 3:4' },
    { value: 'landscape', label: 'Landscape 16:9' },
];

export function initIllustrationPanel() {
    const root = document.getElementById('art-gallery');
    if (!root) return;

    let style = settings.illustrationStyle === 'landscape' ? 'landscape' : 'portrait';

    root.innerHTML = '';

    // Portrait / Landscape switch
    let toggle = null;
    if (settings.showIllustrationStyleToggle) {
        toggle = document.createElement('div');
        toggle.className = 'pf-toggle';
        toggle.setAttribute('role', 'group');
        toggle.setAttribute('aria-label', 'Tile shape');
        toggle.innerHTML = STYLES.map(s =>
            `<button type="button" data-style="${s.value}">${s.label}</button>`
        ).join('');
        root.appendChild(toggle);

        toggle.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-style]');
            if (!btn) return;
            style = btn.dataset.style;
            render();
        });
    }

    const grid = document.createElement('div');
    root.appendChild(grid);

    function render() {
        grid.className = `pf-card-grid pf-grid-${style}`;
        grid.innerHTML = '';

        if (toggle) {
            toggle.querySelectorAll('button').forEach(b => {
                b.setAttribute('aria-pressed', String(b.dataset.style === style));
            });
        }

        illustrations.forEach(art => {
            grid.appendChild(createCard({
                image: art.src,
                title: art.title,
                subtitle: art.caption,
                ratio: style,
                focus: art.focus,
                onSelect: () => openDetails({
                    cover: art.src,
                    coverFit: 'contain',
                    title: art.title,
                    caption: art.caption,
                    tags: art.tags,
                    links: art.links,
                    content: art.content,
                }),
            }));
        });
    }

    render();
}
