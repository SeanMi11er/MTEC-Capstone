const BasePage = require('./base.js');

class GalleryPage extends BasePage {
    constructor() { super('/gallery'); }

    get projectImages() { return $$('img.project-image'); }
    get projectLinks() { return $$('a.project-link'); }
    get hoverTargets() { return $$('div.hover-effect'); }
    get galleryImages() { return $$('div.gallery img'); }
    get galleryLinks() { return $$('div.gallery a'); }

    async expectImagesVisible() {
        for (const img of await this.projectImages) await expect(img).toBeDisplayed();
    }
    async expectLinksVisible() {
        for (const lnk of await this.projectLinks) await expect(lnk).toBeDisplayed();
    }
    async expectHoverEffects() {
        for (const el of await this.hoverTargets) {
            await el.moveTo();
            await expect(el).toBeDisplayed();
        }
    }
    async expectNavigationWorks() {
        const checks = [...await this.galleryImages, ...await this.galleryLinks];
        for (const el of checks) {
            await el.click();
            await expect(browser).toHaveUrlContaining('gallery');
            await browser.back();
        }
    }

    async verifyGalleryPage() {
        await this.expectImagesVisible();
        await this.expectLinksVisible();
        await this.expectHoverEffects();
        await this.expectNavigationWorks();
    }
}

module.exports = new GalleryPage();