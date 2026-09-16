// =====================================================================
//  3D ARTIST PANEL
//  Left:  one live Sketchfab model (reuses the friend's ModelManager)
//  Right: image gallery, click to open the detail pop-up
// =====================================================================
import { featured3DModel, projects3D, settings } from './portfolioData.js';
import { ModelManager } from './modelHandler.js';
import { createCard, openDetails } from './components.js';

export async function init3DPanel() {
    await initFeaturedModel();
    initGallery();
}

async function initFeaturedModel() {
    const container = document.getElementById('model-container');
    if (!container || !featured3DModel || !featured3DModel.sketchfabId) return;

    // Same viewer as before, just without the thumbnail selector
    const manager = new ModelManager();
    const ready = await manager.initialize('model-container');
    if (!ready) return;

    const id = featured3DModel.sketchfabId;
    const known = manager.models.find(m => m.src === id);
    const model = known || {
        type: 'sketchfab',
        src: id,
        embedUrl: `https://sketchfab.com/models/${id}/embed?ui_theme=dark&transparent=0&autostart=1&ui_annotations=0&ui_controls=1&ui_inspector=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=1&ui_hint=0`,
        title: featured3DModel.title,
    };

    await manager.loadModel(model);

    const caption = document.getElementById('featured-model-caption');
    if (caption) {
        caption.innerHTML = `
            <span class="pf-featured__title">${featured3DModel.title || model.title || ''}</span>
            ${featured3DModel.caption ? `<span class="pf-featured__hint">${featured3DModel.caption}</span>` : ''}
        `;
    }
}

function initGallery() {
    const gallery = document.getElementById('model-gallery');
    if (!gallery) return;

    const ratio = ['square', 'portrait', 'landscape'].includes(settings.threeDTileStyle)
        ? settings.threeDTileStyle : 'square';

    gallery.className = `pf-card-grid pf-grid-3d pf-grid-${ratio}`;
    gallery.innerHTML = '';

    projects3D.forEach(project => {
        gallery.appendChild(createCard({
            image: project.image,
            title: project.title,
            subtitle: project.caption,
            ratio,
            onSelect: () => openDetails({
                cover: project.image,
                coverFit: 'contain',
                title: project.title,
                caption: project.caption,
                tags: project.tags,
                links: project.links,
                content: project.content,
            }),
        }));
    });
}
