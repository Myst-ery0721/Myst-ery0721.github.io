// Simple Model Manager using direct Sketchfab embeds
class ModelManager {
    constructor() {
        this.models = [
            {
                type: 'sketchfab',
                src: '6d11480c70ef4184bc2caf89ed427ab3',  // TV Head
                embedUrl: 'https://sketchfab.com/models/6d11480c70ef4184bc2caf89ed427ab3/embed?ui_theme=dark&transparent=0&autostart=1&ui_annotations=0&ui_controls=1&ui_inspector=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=1&ui_hint=0',
                thumbnail: 'img/3d/tvhead.png',
                title: 'TV Head'
            },
            {
                type: 'sketchfab',
                src: 'dce52f00ee2a4316944d20ddf562d844',  // Roblox Bini Hat
                embedUrl: 'https://sketchfab.com/models/dce52f00ee2a4316944d20ddf562d844/embed?ui_theme=dark&transparent=0&autostart=1&ui_annotations=0&ui_controls=1&ui_inspector=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=1&ui_hint=0',
                thumbnail: 'img/3d/binihat.png',
                title: 'Roblox Bini Hat'
            },
            {
                type: 'sketchfab',
                src: 'd817fecbea9e4573a8ccd7034555e5ed',  // Empty White Room
                embedUrl: 'https://sketchfab.com/models/d817fecbea9e4573a8ccd7034555e5ed/embed?ui_theme=dark&transparent=0&autostart=1&ui_annotations=0&ui_controls=1&ui_inspector=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=1&ui_hint=0',
                thumbnail: 'img/3d/whiteroom.png',
                title: 'Empty White Room'
            },
            {
                type: 'sketchfab',
                src: 'e00520e1fb9b42a5a9f9676a3fa332c0',  // Empty White Room
                embedUrl: 'https://sketchfab.com/models/e00520e1fb9b42a5a9f9676a3fa332c0/embed?ui_theme=dark&transparent=0&autostart=1&ui_annotations=0&ui_controls=1&ui_inspector=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=1&ui_hint=0',
                thumbnail: 'img/3d/tarot.png',
                title: 'Tarot Cards'
            },
            {
                type: 'sketchfab',
                src: 'b6a14b224c40466ba99cd3405dd91a05',  // Empty White Room
                embedUrl: 'https://sketchfab.com/models/b6a14b224c40466ba99cd3405dd91a05/embed?ui_theme=dark&transparent=0&autostart=1&ui_annotations=0&ui_controls=1&ui_inspector=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=1&ui_hint=0',
                thumbnail: 'img/3d/salakot.png',
                title: 'Salakot Hat'
            },
            {
                type: 'sketchfab',
                src: '3a0cc00436f14bb09028c3db3a864207',  // Empty White Room
                embedUrl: 'https://sketchfab.com/models/3a0cc00436f14bb09028c3db3a864207/embed?ui_theme=dark&transparent=0&autostart=1&ui_annotations=0&ui_controls=1&ui_inspector=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=1&ui_hint=0',
                thumbnail: 'img/3d/smashedmonitor.png',
                title: 'Monitor_Roblox Project'
            },
        ];
        
        this.container = null;
        this.currentModelSrc = null;
    }

    async initialize(containerId) {
        try {
            this.container = document.getElementById(containerId);
            if (!this.container) {
                throw new Error('Container element not found');
            }
            this.container.innerHTML = '';
            return true;
        } catch (error) {
            console.error('Error initializing viewer:', error);
            return false;
        }
    }

    async loadModel(model) {
        try {
            // Show loading UI
            const loadingElement = document.getElementById('model-loading');
            if (loadingElement) loadingElement.classList.remove('hidden');

            // Don't reload if it's the same model
            if (this.currentModelSrc === model.src) {
                if (loadingElement) loadingElement.classList.add('hidden');
                return;
            }

            // Clear container
            this.container.innerHTML = '';

            // Create wrapper div with background color
            const wrapper = document.createElement('div');
            wrapper.className = 'w-full h-full bg-gray-900';
            
            // Create iframe with specific styling
            const iframe = document.createElement('iframe');
            iframe.title = model.title;
            iframe.className = 'w-full h-full';
            iframe.style.border = 'none';
            iframe.style.backgroundColor = '#111827';
            iframe.allowFullscreen = true;
            iframe.allow = 'autoplay; fullscreen';
            iframe.src = model.embedUrl;

            // Handle load events
            iframe.onload = () => {
                if (loadingElement) loadingElement.classList.add('hidden');
            };

            iframe.onerror = () => {
                if (loadingElement) loadingElement.classList.add('hidden');
                this.showError(this.container, 'Failed to load 3D model');
            };

            wrapper.appendChild(iframe);
            this.container.appendChild(wrapper);
            this.currentModelSrc = model.src;

            // Set a timeout for loading
            setTimeout(() => {
                if (loadingElement && !loadingElement.classList.contains('hidden')) {
                    loadingElement.classList.add('hidden');
                }
            }, 5000);

        } catch (error) {
            console.error('Error in loadModel:', error);
            if (loadingElement) loadingElement.classList.add('hidden');
            this.showError(this.container, 'An error occurred while loading the model');
        }
    }

    showError(container, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90';
        errorDiv.innerHTML = `
            <div class="text-center p-4">
                <p class="text-red-800 text-xl mb-2">⚠️</p>
                <p class="text-white">${message}</p>
                <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition-colors">
                    Refresh Page
                </button>
            </div>
        `;
        container.appendChild(errorDiv);
    }
}

// Setup thumbnails remains the same
function setupThumbnails(modelManager) {
    const modelGrid = document.getElementById('model-grid');
    if (!modelGrid) return;

    modelGrid.innerHTML = '';

    modelManager.models.forEach((model, index) => {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'relative model-thumb bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-red-800 transition-all aspect-square';
        
        thumbDiv.innerHTML = `
            <img 
                src="${model.thumbnail}" 
                alt="${model.title}" 
                class="w-full h-full object-cover"
            >
            <div class="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs py-2 px-3">
                ${model.title}
            </div>
        `;
        
        modelGrid.appendChild(thumbDiv);

        thumbDiv.addEventListener('click', async () => {
            try {
                await modelManager.loadModel(model);
                const allThumbs = modelGrid.querySelectorAll('.model-thumb');
                allThumbs.forEach(t => t.classList.remove('ring-2', 'ring-red-800'));
                thumbDiv.classList.add('ring-2', 'ring-red-800');
            } catch (error) {
                console.error(`Error loading model ${model.title}:`, error);
                thumbDiv.classList.remove('ring-2', 'ring-red-800');
            }
        });

        if (index === 0) {
            thumbDiv.classList.add('ring-2', 'ring-red-800');
            modelManager.loadModel(model).catch(console.error);
        }
    });
}

// Initialize model viewer remains the same
async function initModelViewer(containerId) {
    try {
        const modelManager = new ModelManager();
        const initialized = await modelManager.initialize(containerId);
        
        if (!initialized) {
            throw new Error('Failed to initialize model manager');
        }

        setupThumbnails(modelManager);
        return modelManager;
    } catch (error) {
        console.error('Error initializing model viewer:', error);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="flex items-center justify-center h-full bg-gray-900 rounded-lg">
                    <div class="text-red-800 text-center p-4">
                        <p class="mb-2">⚠️</p>
                        <p>Failed to load 3D viewer</p>
                        <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition-colors">
                            Refresh Page
                        </button>
                    </div>
                </div>
            `;
        }
        return null;
    }
}

export { ModelManager, initModelViewer, setupThumbnails };