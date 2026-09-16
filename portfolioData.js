// =====================================================================
//  PORTFOLIO CONTENT
//  This is the file you edit to add or change your work.
//  You should rarely need to touch the other new .js files.
//
//  Text tips:
//  - A blank line (\n\n) inside a description starts a new paragraph.
//  - You can use simple HTML like <b>bold</b> or <i>italic</i>.
//  - If an image path is wrong, the site shows a dark box that says
//    which file is missing, so it's easy to spot and fix.
// =====================================================================


// ---------------------------------------------------------------------
//  SETTINGS
// ---------------------------------------------------------------------
export const settings = {
    // Shape of the 3D gallery tiles: 'square', 'portrait' (3:4) or 'landscape' (16:9)
    threeDTileStyle: 'square',
};


// ---------------------------------------------------------------------
//  ILLUSTRATION PANEL
//  Tiles are always 3:4.
//
//  src            = the artwork (tile + first slide in the pop-up)
//  description    = small paragraph under the title in the pop-up
//  processImages  = extra slides after the artwork, e.g. sketch,
//                   line art, colors. Leave as [] for a single image.
//                   You can also add a timelapse video:
//                   { type: 'video', src: 'img/.../timelapse.mp4', caption: 'Timelapse' }
//  tags           = (optional) small labels, e.g. the software you used
//  focus          = (optional) which part stays visible in the 3:4 tile,
//                   e.g. 'top', 'center', '50% 20%'
// ---------------------------------------------------------------------
export const illustrations = [
    // EXAMPLE: 4 slides (artwork + 3 extra) and two paragraphs.
    // The extra slides reuse other artworks as stand-ins. Replace them
    // with your real process images, e.g. 'img/DIGITAL.ARTIST/process/callisto-sketch.jpg'
    {
        title: "'Prince Callisto' -- The Blood Knight",
        src: 'img/DIGITAL.ARTIST/1.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        processImages: [
            { src: 'img/DIGITAL.ARTIST/2.jpg', caption: 'Sketch (stand-in image)' },
            { src: 'img/DIGITAL.ARTIST/3.jpg', caption: 'Line art (stand-in image)' },
            { src: 'img/DIGITAL.ARTIST/4.jpg', caption: 'Flat colors (stand-in image)' },
        ],
        tags: ['Clip Studio Paint', 'Character Design'],
        focus: 'top',
    },

    // EXAMPLE: 2 slides and one paragraph
    {
        title: 'Tamed by an Angel',
        src: 'img/DIGITAL.ARTIST/2.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio, praesent libero, sed cursus ante dapibus diam.',
        processImages: [
            { src: 'img/DIGITAL.ARTIST/5.jpg', caption: 'Rough sketch (stand-in image)' },
        ],
        tags: ['Adobe Photoshop'],
    },

    // EXAMPLE: 1 slide (no process images) with text.
    // With only one image, the arrows and dots hide automatically.
    {
        title: 'Arione',
        src: 'img/DIGITAL.ARTIST/3.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imperdiet.',
        processImages: [],
        tags: [],
    },

    // The rest: fill in description and processImages when you're ready
    { title: 'King of the Cursed Kingdom', src: 'img/DIGITAL.ARTIST/4.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', processImages: [] },
    { title: 'Death is Fun', src: 'img/DIGITAL.ARTIST/5.jpg', description: '', processImages: [] },
    { title: "'Skye Faust' -- Living Paradox", src: 'img/DIGITAL.ARTIST/6.webp', description: '', processImages: [] },
    { title: 'DTIYS Artwork', src: 'img/DIGITAL.ARTIST/7.webp', description: '', processImages: [] },
    { title: 'Hunter Grounds -- Splash Screen', src: 'img/DIGITAL.ARTIST/SplashScreen.jpg', description: '', processImages: [] },
    { title: "'Bound to Hell' -- Persona Artwork", src: 'img/DIGITAL.ARTIST/erystle.jpg', description: '', processImages: [] },
    { title: 'Aliester the Danger!', src: 'img/DIGITAL.ARTIST/Aliester.jpg', description: '', processImages: [] },
    { title: 'Side by Side', src: 'img/DIGITAL.ARTIST/sideside.png', description: '', processImages: [] },
    { title: 'Vash the Stampede -- FanArt', src: 'img/DIGITAL.ARTIST/vashu2.png', description: '', processImages: [] },
    { title: 'Persona Reference Sheet', src: 'img/DIGITAL.ARTIST/refsheet.png', description: '', processImages: [] },
];


// ---------------------------------------------------------------------
//  GAME DEV PANEL
//  Each game is one "folder". Tip: keep each game's files in its own
//  folder, e.g. img/GAMES/my-game/thumb.png
//
//  thumbnail   = cover image (right-side list and bottom gallery)
//  description = what the game is + what you did, in one paragraph.
//                Shown under the slideshow and in the pop-up.
//  media       = slideshow items, in order. Types:
//                  { type: 'image',   src: '...', caption: '' }
//                  { type: 'video',   src: '...mp4', caption: '' }
//                  { type: 'youtube', id: 'VIDEO_ID', caption: '' }
//
//  In the pop-up (bottom gallery), the FIRST video in media plays
//  automatically at the top (muted, visitors can unmute). Everything
//  else in media is shown in a gallery above the description.
//  If a game has no video, the thumbnail is shown at the top instead.
// ---------------------------------------------------------------------
export const games = [
    {
        title: 'Game Title 1',
        thumbnail: 'img/GAMES/game1/thumb.png',
        role: '3D Artist',
        year: '2025',
        tools: ['Unity', 'Blender', 'Substance Painter'],
        description: 'What the game is, who you made it with, and what you contributed: for example, you modeled and textured the characters, designed the environment props, and set up materials and lighting in Unity.',
        media: [
            // { type: 'video', src: 'img/GAMES/game1/trailer.mp4', caption: 'Gameplay' },
            // { type: 'youtube', id: 'PASTE_VIDEO_ID', caption: 'Trailer' },
            { type: 'image', src: 'img/GAMES/game1/shot1.png', caption: 'Main menu' },
            { type: 'image', src: 'img/GAMES/game1/shot2.png', caption: 'First level' },
        ],
    },
    {
        title: 'Game Title 2',
        thumbnail: 'img/GAMES/game2/thumb.png',
        role: 'Character Artist',
        year: '2024',
        tools: ['Blender'],
        description: 'Describe the second game and your part in it.',
        media: [
            { type: 'image', src: 'img/GAMES/game2/shot1.png', caption: '' },
        ],
    },
    {
        title: 'Game Title 3',
        thumbnail: 'img/GAMES/game3/thumb.png',
        role: 'Environment Artist',
        year: '2024',
        tools: ['Unity'],
        description: 'Describe the third game and your part in it.',
        media: [
            { type: 'image', src: 'img/GAMES/game3/shot1.png', caption: '' },
        ],
    },
];


// ---------------------------------------------------------------------
//  3D ARTIST PANEL
// ---------------------------------------------------------------------

// The one live 3D model shown on the left.
// sketchfabId is the code at the end of the Sketchfab link:
// sketchfab.com/3d-models/name-THIS_PART
export const featured3DModel = {
    sketchfabId: '6d11480c70ef4184bc2caf89ed427ab3',
    title: 'TV Head',
    caption: 'Drag to rotate and scroll to zoom.',
};

// The image gallery on the right. Works like the Illustration panel:
//  image          = tile + first slide in the pop-up
//  description    = small paragraph under the title
//  processImages  = extra slides, e.g. blockout, wireframe, textures
//  tags           = (optional) small labels
export const projects3D = [
    // EXAMPLE: 3 slides and two paragraphs.
    // The extra slides reuse other 3D thumbnails as stand-ins. Replace them
    // with your real process images, e.g. 'img/3d/process/tvhead-wireframe.png'
    {
        title: 'TV Head',
        image: 'img/3d/tvhead.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        processImages: [
            { src: 'img/3d/binihat.png', caption: 'Blockout (stand-in image)' },
            { src: 'img/3d/whiteroom.png', caption: 'Texturing (stand-in image)' },
        ],
        tags: ['Blender', 'Substance Painter'],
    },

    // EXAMPLE: 2 slides and one paragraph
    {
        title: 'Roblox Bini Hat',
        image: 'img/3d/binihat.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mauris, fusce nec tellus sed augue semper porta.',
        processImages: [
            { src: 'img/3d/salakot.png', caption: 'Wireframe (stand-in image)' },
        ],
        tags: ['Blender', 'Roblox Studio'],
    },

    // EXAMPLE: 1 slide with text
    {
        title: 'Empty White Room',
        image: 'img/3d/whiteroom.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris massa, vestibulum lacinia arcu eget nulla.',
        processImages: [],
        tags: ['Blender'],
    },

    { title: 'Tarot Cards', image: 'img/3d/tarot.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', processImages: [] },
    { title: 'Salakot Hat', image: 'img/3d/salakot.png', description: '', processImages: [] },
    { title: 'Monitor (Roblox Project)', image: 'img/3d/smashedmonitor.png', description: '', processImages: [] },
];
