const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function processImages() {
    const baseDir = './Assets';
    const sizes = [320, 640, 1024, 1920];
    
    // Process Men's category
    const menCategories = ['JKM', 'PNM', 'SHM', 'SSM', 'USM'];
    for (const category of menCategories) {
        const inputDir = `${baseDir}/Images/Men/${category}`;
        const outputDir = `${baseDir}/Images/Men/${category}/processed`;
        await processDirectory(inputDir, outputDir, sizes);
    }
    
    // Process Women's category
    const womenInputDir = `${baseDir}/Images/Women`;
    const womenOutputDir = `${baseDir}/Images/Women/processed`;
    await processDirectory(womenInputDir, womenOutputDir, sizes);
    
    // Process others directory
    const othersInputDir = `${baseDir}/others`;
    const othersOutputDir = `${baseDir}/others/processed`;
    await processDirectory(othersInputDir, othersOutputDir, sizes);
}

async function processDirectory(inputDir, outputDir, sizes) {
    try {
        await fs.mkdir(outputDir, { recursive: true });
        const files = await fs.readdir(inputDir);
        
        // Filter image files and exclude processed directory
        const imageFiles = files.filter(file => 
            ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase()) &&
            !file.includes('processed')
        );

        for (const image of imageFiles) {
            const imageName = path.parse(image).name;
            // Skip already processed -D (detail) images
            if (imageName.endsWith('-D')) continue;
            
            for (const size of sizes) {
                await sharp(`${inputDir}/${image}`)
                    .resize(size)
                    .webp({ quality: 80 })
                    .toFile(`${outputDir}/${imageName}-${size}.webp`);
                
                await sharp(`${inputDir}/${image}`)
                    .resize(size)
                    .jpeg({ quality: 80 })
                    .toFile(`${outputDir}/${imageName}-${size}.jpg`);
            }
        }
    } catch (error) {
        console.error(`Error processing directory ${inputDir}:`, error);
    }
}

module.exports = processImages;