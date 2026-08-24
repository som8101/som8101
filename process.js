const fs = require('fs');
const http = require('https');
const Jimp = require('jimp');
const opentype = require('opentype.js');

const USER_IMG_PATH = 'C:\\Users\\Somnath Gorai\\.gemini\\antigravity-ide\\brain\\70a018f2-8789-47fe-9189-d0755303cb96\\.user_uploaded\\media_1787583785476.jpg';
const LOGO_IMG_PATH = 'C:\\Users\\Somnath Gorai\\.gemini\\antigravity-ide\\brain\\70a018f2-8789-47fe-9189-d0755303cb96\\.user_uploaded\\media_1787583858489.png';
const OUT_JSON = 'data.json';

async function downloadFont(url, path) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path);
        http.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', err => {
            fs.unlink(path, () => {});
            reject(err);
        });
    });
}

function colorDistance(c1, c2) {
    return Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b);
}

async function removeBackground(imagePath) {
    console.log("Reading image...");
    const image = await Jimp.read(imagePath);
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    
    console.log("Removing background (flood fill)...");
    const tolerance = 45; // color distance tolerance
    
    const visited = new Uint8Array(w * h);
    const queue = [];
    
    function push(x, y) {
        if (x < 0 || x >= w || y < 0 || y >= h) return;
        const idx = y * w + x;
        if (visited[idx]) return;
        
        const c = Jimp.intToRGBA(image.getPixelColor(x, y));
        if (colorDistance(c, {r: 255, g: 255, b: 255}) < tolerance) {
            visited[idx] = 1;
            queue.push({x, y});
            image.setPixelColor(0x00000000, x, y);
        }
    }
    
    // Start from corners and edges
    for (let i = 0; i < w; i++) { push(i, 0); push(i, h - 1); }
    for (let i = 0; i < h; i++) { push(0, i); push(w - 1, i); }
    
    while (queue.length > 0) {
        const {x, y} = queue.shift();
        push(x - 1, y);
        push(x + 1, y);
        push(x, y - 1);
        push(x, y + 1);
    }
    
    console.log("Encoding base64...");
    const base64 = await image.getBase64Async(Jimp.MIME_PNG);
    return base64;
}

async function main() {
    const data = {};
    try {
        console.log("Processing user image...");
        data.userImageBase64 = await removeBackground(USER_IMG_PATH);
        
        console.log("Processing logo image...");
        const logo = await Jimp.read(LOGO_IMG_PATH);
        data.logoBase64 = await logo.getBase64Async(Jimp.MIME_PNG);
        
        console.log("Downloading font...");
        const fontUrl = "https://github.com/google/fonts/raw/main/ofl/pacifico/Pacifico-Regular.ttf";
        await downloadFont(fontUrl, 'Pacifico.ttf');
        
        console.log("Generating font paths...");
        const font = opentype.loadSync('Pacifico.ttf');
        // generate text as path
        const path = font.getPath('Somnath Gorai', 0, 72, 72);
        data.namePath = path.toSVG();
        
        fs.writeFileSync(OUT_JSON, JSON.stringify(data));
        console.log("Done! Data written to", OUT_JSON);
    } catch (e) {
        console.error("Error:", e);
    }
}

main();
