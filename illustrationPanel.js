// =====================================================================
//  ILLUSTRATION PANEL
//  Fills <div id="art-gallery"> inside the Concept Art tab.
//  Tiles are 3:4. Clicking one opens a slideshow pop-up.
// =====================================================================
import { illustrations } from './portfolioData.js';
import { createCard, openArtworkDetails } from './components.js';

export function initIllustrationPanel() {
    const root = document.getElementById('art-gallery');
    if (!root) return;

    const grid = document.createElement('div');
    grid.className = 'pf-card-grid pf-grid-portrait';

    illustrations.forEach(art => {
        grid.appendChild(createCard({
            image: art.src,
            title: art.title,
            ratio: 'portrait',
            focus: art.focus,
            onSelect: () => openArtworkDetails({ ...art, image: art.src }),
        }));
    });

    root.innerHTML = '';
    root.appendChild(grid);
}
