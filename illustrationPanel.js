// =====================================================================
//  ILLUSTRATION PANEL
//  Fills <div id="art-gallery"> inside the Concept Art tab.
//    1. Illustrations    -> 3:4 tiles
//    2. Reference Sheets -> 16:9 tiles, in their own section below
//  Clicking any tile opens the same slideshow pop-up.
// =====================================================================
import { illustrations, referenceSheets } from './portfolioData.js';
import { createCard, openArtworkDetails } from './components.js';

export function initIllustrationPanel() {
    const root = document.getElementById('art-gallery');
    if (!root) return;

    root.innerHTML = '';

    // 1. Illustrations (3:4)
    root.appendChild(buildGrid(illustrations, 'portrait'));

    // 2. Reference Sheets (16:9), only shown if the list has entries
    if (referenceSheets && referenceSheets.length) {
        const heading = document.createElement('h3');
        heading.className = 'pf-section-heading pf-subsection-heading';
        heading.textContent = 'Reference Sheets';
        root.appendChild(heading);

        root.appendChild(buildGrid(referenceSheets, 'landscape'));
    }
}

function buildGrid(items, ratio) {
    const grid = document.createElement('div');
    grid.className = `pf-card-grid pf-grid-${ratio}`;

    items.forEach(art => {
        grid.appendChild(createCard({
            image: art.src,
            title: art.title,
            ratio,
            focus: art.focus,
            onSelect: () => openArtworkDetails({ ...art, image: art.src }),
        }));
    });

    return grid;
}
