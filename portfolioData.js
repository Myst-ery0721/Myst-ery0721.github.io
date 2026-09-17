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
        title: "Bust Commission: Samurai Guy",
        src: 'img/DIGITAL.ARTIST/Comms (1).jpg',
        description: 'A commission piece for a client. The process images show the steps I took to create the final artwork, from initial sketches to placing values and polishing the final image.\n\nI used Clip Studio Paint for this piece, focusing on character design and composition.',
        processImages: [
            { src: 'img/DIGITAL.ARTIST/Comms (2).jpg', caption: 'Sketch' },
            { src: 'img/DIGITAL.ARTIST/Comms (3).jpg', caption: 'Sketch' },
            { src: 'img/DIGITAL.ARTIST/Comms (4).jpg', caption: 'Placing Values' },
            { src: 'img/DIGITAL.ARTIST/Comms (5).jpg', caption: 'Placing Values' },
            { src: 'img/DIGITAL.ARTIST/Comms (6).jpg', caption: 'Polishing' },
            { src: 'img/DIGITAL.ARTIST/Comms (7).jpg', caption: 'Reference Image' },
        ],
        tags: ['Clip Studio Paint', 'Character Design'],
        focus: 'top',
    },

    // EXAMPLE: 2 slides and one paragraph
    {
        title: 'DITYS Entry: Old Lady',
        src: 'img/DIGITAL.ARTIST/DITYS (1).jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio, praesent libero, sed cursus ante dapibus diam.',
        processImages: [
            { src: 'img/DIGITAL.ARTIST/DITYS (3).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/DITYS (4).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/DITYS (5).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/DITYS (6).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/DITYS (7).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/DITYS (8).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/DITYS (9).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/DITYS (10).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/DITYS (11).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/DITYS (12).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/DITYS (13).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/DITYS (14).jpg', caption: 'Initial Sketch' },
        ],
        tags: ['Clip Studio Paint', 'Digital Painting'],
    },

    // EXAMPLE: 1 slide (no process images) with text.
    // With only one image, the arrows and dots hide automatically.
    {
        title: 'Senku Fanart',
        src: 'img/DIGITAL.ARTIST/senku.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imperdiet.',
        processImages: [
            { src: 'img/DIGITAL.ARTIST/senkuVid.mp4', caption: 'Initial Sketch', type: 'video' },
        ],
        tags: ['Clip Studio Paint', 'Digital Painting'],
    },

    {
        title: 'Queen Bee',
        src: 'img/DIGITAL.ARTIST/QBee.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imperdiet.',
        processImages: [
            { src: 'img/DIGITAL.ARTIST/QBee.mp4', caption: 'Initial Sketch', type: 'video' },
        ],
        tags: ['Clip Studio Paint', 'Digital Painting'],
    },
    
    {
        title: 'Arione - Persona',
        src: 'img/DIGITAL.ARTIST/Arione (1).jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imperdiet.',
        processImages: [
            { src: 'img/DIGITAL.ARTIST/Arione (2).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/Arione (1).mp4', caption: 'Initial Sketch', type: 'video' },
        ],
        tags: ['Clip Studio Paint', 'Digital Painting'],
    },

    {
        title: 'OC Skye Faust',
        src: 'img/DIGITAL.ARTIST/Skye (1).jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imperdiet.',
        processImages: [
            { src: 'img/DIGITAL.ARTIST/Skye (2).jpg', caption: 'Initial Sketch' },
            { src: 'img/DIGITAL.ARTIST/Skye (1).mp4', caption: 'Initial Sketch', type: 'video' },
        ],
        tags: ['Clip Studio Paint', 'Digital Painting'],
    },
    {
        title: 'GameShowcase Prints',
        src: 'img/DIGITAL.ARTIST/GameShowcase(1).png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imperdiet.',
        processImages: [
        ],
        tags: ['Clip Studio Paint', 'Digital Painting'],
    },
    {
        title: 'GameShowcase Prints (2)',
        src: 'img/DIGITAL.ARTIST/GameShowcase.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imperdiet.',
        processImages: [],
        tags: ['Clip Studio Paint', 'Digital Painting'],
    },

];


// ---------------------------------------------------------------------
//  REFERENCE SHEETS (Illustration panel, below the 3:4 artworks)
//  Same fields as illustrations above, and the same pop-up.
//  The only difference: these tiles are landscape (16:9), so wide
//  reference sheets aren't cropped into a tall 3:4 shape.
//  focus = (optional) which part stays visible in the tile, e.g. 'center', 'top'
// ---------------------------------------------------------------------
export const referenceSheets = [
    {
        title: 'RefSheet : Chibis',
        src: 'img/DIGITAL.ARTIST/wowoshi.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum imperdiet.',
        processImages: [
            { src: 'img/DIGITAL.ARTIST/Alien.png', caption: 'Initial Sketch' },
        ],
        tags: ['Clip Studio Paint', 'Digital Painting'],
    },
    
    { title: 'Persona Reference Sheet', src: 'img/DIGITAL.ARTIST/refsheet.png', description: '', processImages: [] },
];


// ---------------------------------------------------------------------
//  GAME DEV PANEL: SOLO PROJECTS (top part)
//  Shown in the slideshow (left) and the list of games (right).
//  Each game is one "folder". Tip: keep each game's files in its own
//  folder, e.g. img/GAMES/my-game/thumb.png
//
//  thumbnail   = cover image (right-side list)
//  description = what the game is + what you did, in one paragraph.
//                Shown under the slideshow.
//  media       = slideshow items, in order. Types:
//                  { type: 'image',   src: '...', caption: '' }
//                  { type: 'video',   src: '...mp4', caption: '' }
//                  { type: 'youtube', id: 'VIDEO_ID', caption: '' }
// ---------------------------------------------------------------------
export const games = [
    {
        title: 'Game Title 1',
        thumbnail: 'img/GameDev/circus.png',
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
//  GAME DEV PANEL: CONTRIBUTIONS (bottom gallery)
//  Games you worked on with others.
//
//  thumbnail          = the tile image ONLY (not used in the pop-up)
//  media              = the big preview at the top of the pop-up, with
//                       arrows. Put the video first, then screenshots.
//                       Videos play automatically (muted).
//                         { type: 'video',   src: '...mp4', caption: '' }
//                         { type: 'youtube', id: 'VIDEO_ID', caption: '' }
//                         { type: 'image',   src: '...png', caption: '' }
//  contributionImages = the "My Contributions" gallery below the title:
//                       your models, textures, concept art for that game
//                         { src: '...png', caption: 'Character model' }
//  description        = paragraph under the gallery
//
//  If this list is empty, the whole Contributions section hides.
// ---------------------------------------------------------------------
export const gameContributions = [
    {
        title: 'GAME JAM INDIE CRITICAL: THE CIRCUS',
        thumbnail: 'img/GameDev/circusThumbnail.png',
        role: 'Environment Artist',
        year: '2025',
        tools: ['Unity', 'Blender'],
        media: [
            // { type: 'video', src: 'img/GAMES/contribution1/trailer.mp4', caption: 'Gameplay trailer' },
            { type: 'video', src: 'img/GameDev/circus.mp4', caption: 'Screenshot' },
            { type: 'image', src: 'img/GAMES/contribution1/shot2.png', caption: 'Screenshot' },
        ],
        contributionImages: [
            { src: 'img/GAMES/contribution1/my-model1.png', caption: 'Character model' },
            { src: 'img/GAMES/contribution1/my-model2.png', caption: 'Environment props' },
        ],
        description: 'What the game is, the team or studio you worked with, and exactly what you contributed.',
    },
    {
        title: 'Contribution Title 2',
        thumbnail: 'img/GAMES/contribution2/thumb.png',
        role: 'Prop Artist',
        year: '2024',
        tools: ['Blender', 'Substance Painter'],
        media: [
            { type: 'image', src: 'img/GAMES/contribution2/shot1.png', caption: '' },
        ],
        contributionImages: [
            { src: 'img/GAMES/contribution2/my-model1.png', caption: '' },
        ],
        description: 'Describe the game and your part in it.',
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
