const BasePage = require('./base.js');

class GalleryPage extends BasePage {
    constructor() { super('/?page_id=914'); }

    get tiles() { return $$('div.avia-image-container-inner'); }
    get galleryTiles() { return $$('a.grid-image.avia-hover-fx'); }

    link(tile) { return tile.$('a.avia_image'); }
    img(tile) { return tile.$('img'); }
    overlay(tile) { return tile.$('span.image-overlay-inside'); }

    async expectImagesVisible() {
        for (const tile of await this.tiles) {
            await expect(this.img(tile)).toBeDisplayed();
        }
    }

    async expectLinksVisible() {
        for (const tile of await this.tiles) {
            await expect(this.link(tile)).toBeDisplayed();
        }
    }

    async expectNavigationWorks() {
        for (const tile of await this.tiles) {
            const dest = await this.link(tile).getAttribute('href');

            await this.link(tile).click();
            await expect(browser).toHaveUrl(dest);

            await browser.back();
            await browser.pause(300);
        }
    }

    async verifyGalleryPage() {
        await this.expectImagesVisible();
        await this.expectLinksVisible();
        await this.expectNavigationWorks();
    }
}

module.exports = new GalleryPage();