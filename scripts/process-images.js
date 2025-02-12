const sharp = require('sharp');
const fs = require('fs').promises;

async function processImages() {
    const images = await fs.readdir('./Assets/original');
    const sizes = [320, 640, 1024, 1920];

    for (const image of images) {
        for (const size of sizes) {
            await sharp(`./Assets/original/${image}`)
                .resize(size)
                .webp({ quality: 80 })
                .toFile(`./Assets/processed/${image}-${size}.webp`);
            
            await sharp(`./Assets/original/${image}`)
                .resize(size)
                .jpeg({ quality: 80 })
                .toFile(`./Assets/processed/${image}-${size}.jpg`);
        }
    }
}
