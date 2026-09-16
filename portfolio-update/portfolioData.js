// =====================================================================
//  PORTFOLIO CONTENT
//  This is the file you edit to add or change your work.
//  You should rarely need to touch the other new .js files.
// =====================================================================
//
//  DETAIL PAGE BLOCKS
//  The pop-up detail page for every item (artwork, game, 3D project)
//  is built from a "content" list. Each block is shown top to bottom,
//  in the order you write them. Mix and match these:
//
//    { type: 'text',    heading: 'My role', text: 'Paragraph one.\n\nParagraph two.' }
//    { type: 'list',    heading: 'What I did', items: ['Modeling', 'Texturing'] }
//    { type: 'image',   src: 'img/.../file.png', caption: 'Optional caption' }
//    { type: 'gallery', images: [ { src: 'a.png', caption: '' }, { src: 'b.png' } ] }
//    { type: 'video',   src: 'img/.../clip.mp4', caption: 'Optional caption' }
//    { type: 'youtube', id: 'VIDEO_ID', caption: 'Optional caption' }
//
//  'heading' and 'caption' are always optional.
//  In text, a blank line (\n\n) starts a new paragraph, and you can use
//  simple HTML like <b>bold</b> or <i>italic</i>.
//
//  If an image path is wrong, the site shows a dark box that says which
//  file is missing, so it's easy to spot and fix.
// =====================================================================


// ---------------------------------------------------------------------
//  SETTINGS
// ---------------------------------------------------------------------
export const settings = {
    // Shape of the Illustration tiles: 'portrait' (3:4) or 'landscape' (16:9, like 1920x1080)
    illustrationStyle: 'portrait',

    // Show the Portrait / Landscape switch above the Illustration grid?
    // true = visitors can switch, false = only your choice above is used
    showIllustrationStyleToggle: true,

    // Shape of the 3D gallery tiles: 'square', 'portrait' or 'landscape'
    threeDTileStyle: 'square',
};


// ---------------------------------------------------------------------
//  ILLUSTRATION PANEL
//  caption  = the extra line shown beside/below the title in the pop-up
//  focus    = (optional) which part of the image stays visible when the
//             tile crops it, e.g. 'top', 'center', '50% 20%'
//  content  = (optional) detail blocks shown below, see top of file
// ---------------------------------------------------------------------
export const illustrations = [
    {
        title: "'Prince Callisto' -- The Blood Knight",
        src: 'img/DIGITAL.ARTIST/1.jpg',
        caption: 'Character illustration',
        tags: ['Clip Studio Paint'],
        focus: 'top',
        content: [
            { type: 'text', heading: 'About this piece', text: 'Write about the idea, the process, or the story behind this character.' },
        ],
    },
    { title: 'Tamed by an Angel', src: 'img/DIGITAL.ARTIST/2.jpg', caption: '', content: [] },
    { title: 'Arione', src: 'img/DIGITAL.ARTIST/3.jpg', caption: '', content: [] },
    { title: 'King of the Cursed Kingdom', src: 'img/DIGITAL.ARTIST/4.jpg', caption: '', content: [] },
    { title: 'Death is Fun', src: 'img/DIGITAL.ARTIST/5.jpg', caption: '', content: [] },
    { title: "'Skye Faust' -- Living Paradox", src: 'img/DIGITAL.ARTIST/6.webp', caption: '', content: [] },
    { title: 'DTIYS Artwork', src: 'img/DIGITAL.ARTIST/7.webp', caption: '', content: [] },
    { title: 'Hunter Grounds -- Splash Screen', src: 'img/DIGITAL.ARTIST/SplashScreen.jpg', caption: '', content: [] },
    { title: "'Bound to Hell' -- Persona Artwork", src: 'img/DIGITAL.ARTIST/erystle.jpg', caption: '', content: [] },
    { title: 'Aliester the Danger!', src: 'img/DIGITAL.ARTIST/Aliester.jpg', caption: '', content: [] },
    { title: 'Side by Side', src: 'img/DIGITAL.ARTIST/sideside.png', caption: '', content: [] },
    { title: 'Vash the Stampede -- FanArt', src: 'img/DIGITAL.ARTIST/vashu2.png', caption: '', content: [] },
    { title: 'Persona Reference Sheet', src: 'img/DIGITAL.ARTIST/refsheet.png', caption: '', content: [] },
];


// ---------------------------------------------------------------------
//  GAME DEV PANEL
//  Each game is one "folder". Tip: keep each game's files in its own
//  folder, e.g. img/GAMES/my-game/thumb.png, img/GAMES/my-game/shot1.png
//
//  thumbnail = cover image (right-side list, gallery and top of pop-up)
//  summary   = text under the slideshow
//  media     = what the slideshow shows, in order. Types:
//                { type: 'image',   src: '...', caption: '' }
//                { type: 'video',   src: '...mp4', caption: '' }
//                { type: 'youtube', id: 'VIDEO_ID', caption: '' }
//  links     = buttons, e.g. to itch.io
//  content   = detail blocks in the pop-up (see top of file)
//  showMediaInDetails = true adds the slideshow media at the bottom
//                       of the pop-up as a gallery
// ---------------------------------------------------------------------
export const games = [
    {
        title: 'Game Title 1',
        thumbnail: 'img/GAMES/game1/thumb.png',
        role: '3D Artist',
        year: '2025',
        tools: ['Unity', 'Blender', 'Substance Painter'],
        summary: 'One or two sentences on what the game is. Then one or two on what you made for it.',
        media: [
            { type: 'image', src: 'img/GAMES/game1/shot1.png', caption: 'Main menu' },
            { type: 'image', src: 'img/GAMES/game1/shot2.png', caption: 'First level' },
            // { type: 'video', src: 'img/GAMES/game1/trailer.mp4', caption: 'Gameplay' },
            // { type: 'youtube', id: 'PASTE_VIDEO_ID', caption: 'Trailer' },
        ],
        links: [
            { label: 'Play on itch.io', url: 'https://mystery721.itch.io/' },
        ],
        content: [
            { type: 'text', heading: 'Overview', text: 'What is the game? Who made it, how long did it take, and was it for a game jam, school, or personal project?' },
            { type: 'list', heading: 'My contributions', items: ['Modeled and textured the characters', 'Designed the environment props', 'Set up materials and lighting in Unity'] },
            { type: 'text', heading: 'What I learned', text: 'A short reflection. Recruiters like seeing how you solve problems.' },
        ],
        showMediaInDetails: true,
    },
    {
        title: 'Game Title 2',
        thumbnail: 'img/GAMES/game2/thumb.png',
        role: 'Character Artist',
        year: '2024',
        tools: ['Blender'],
        summary: 'Short description of the second game.',
        media: [
            { type: 'image', src: 'img/GAMES/game2/shot1.png', caption: '' },
        ],
        links: [],
        content: [
            { type: 'text', heading: 'Overview', text: 'Describe the game and your part in it.' },
        ],
        showMediaInDetails: true,
    },
    {
        title: 'Game Title 3',
        thumbnail: 'img/GAMES/game3/thumb.png',
        role: 'Environment Artist',
        year: '2024',
        tools: ['Unity'],
        summary: 'Short description of the third game.',
        media: [
            { type: 'image', src: 'img/GAMES/game3/shot1.png', caption: '' },
        ],
        links: [],
        content: [],
        showMediaInDetails: true,
    },
];


// ---------------------------------------------------------------------
//  3D ARTIST PANEL
// ---------------------------------------------------------------------

// The one live 3D model shown on the left.
// sketchfabId is the code in the Sketchfab link:
// sketchfab.com/3d-models/name-THIS_PART
export const featured3DModel = {
    sketchfabId: '6d11480c70ef4184bc2caf89ed427ab3',
    title: 'TV Head',
    caption: 'Drag to rotate and scroll to zoom.',
};

// The image gallery on the right.
// image   = tile image and top of the pop-up
// content = detail blocks (see top of file)
export const projects3D = [
    {
        title: 'TV Head',
        image: 'img/3d/tvhead.png',
        caption: 'Stylized character head',
        tags: ['Blender', 'Substance Painter'],
        content: [
            { type: 'text', heading: 'About the project', text: 'Describe the model: the idea, poly count, how long it took, and what you focused on.' },
            // { type: 'gallery', images: [ { src: 'img/3d/tvhead-wire.png', caption: 'Wireframe' }, { src: 'img/3d/tvhead-tex.png', caption: 'Textures' } ] },
        ],
    },
    { title: 'Roblox Bini Hat', image: 'img/3d/binihat.png', caption: '', tags: [], content: [] },
    { title: 'Empty White Room', image: 'img/3d/whiteroom.png', caption: '', tags: [], content: [] },
    { title: 'Tarot Cards', image: 'img/3d/tarot.png', caption: '', tags: [], content: [] },
    { title: 'Salakot Hat', image: 'img/3d/salakot.png', caption: '', tags: [], content: [] },
    { title: 'Monitor (Roblox Project)', image: 'img/3d/smashedmonitor.png', caption: '', tags: [], content: [] },
];
