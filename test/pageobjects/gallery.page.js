class GalleryPage {
    // Project image and link elements
    get projectImages() { return $$('img.project-image'); }
    get projectLinks() { return $$('a.project-link'); }

    // Hover effects elements
    get hoverEffects() { return $$('div.hover-effect'); }

    // Gallery navigation elements
    get galleryImages() { return $$('div.gallery img'); }
    get galleryLinks() { return $$('div.gallery a'); }

    // Open gallery page
    async open() {
        await browser.url('https://www.imsmasonry.com/gallery'); // Change to your gallery URL
    }

    // Validate all project images are displayed
    async validateProjectImagesDisplayed() {
        const images = await this.projectImages;
        for (const image of images) {
            await image.waitForDisplayed({ timeout: 5000 });
        }
    }

    // Validate all project links are displayed
    async validateProjectLinksDisplayed() {
        const links = await this.projectLinks;
        for (const link of links) {
            await link.waitForDisplayed({ timeout: 5000 });
        }
    }

    // Validate hover effects
    async validateHoverEffects() {
        const hoverElements = await this.hoverEffects;
        for (const hover of hoverElements) {
            await hover.moveTo();
            await hover.waitForDisplayed({ timeout: 5000 }); // Assuming hover triggers visibility
        }
    }

    // Validate gallery navigation (clicking images and links)
    async validateGalleryNavigation() {
        const images = await this.galleryImages;
        for (const image of images) {
            await image.click();
            const currentUrl = await browser.getUrl();
            if (!currentUrl.includes('gallery')) { // Or the appropriate part of the URL you want
                throw new Error(`❌ Expected gallery URL, but got "${currentUrl}"`);
            }
            await browser.back(); // Go back to gallery page for the next image/link
        }

        const links = await this.galleryLinks;
        for (const link of links) {
            await link.click();
            const currentUrl = await browser.getUrl();
            if (!currentUrl.includes('gallery')) { // Or the appropriate part of the URL you want
                throw new Error(`❌ Expected gallery URL, but got "${currentUrl}"`);
            }
            await browser.back(); // Go back to gallery page for the next image/link
        }
    }
}

module.exports = new GalleryPage();