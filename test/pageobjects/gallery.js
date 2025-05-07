const BasePage = require('./base.js');

class GalleryPage extends BasePage {
    constructor() { super('/?page_id=914'); }

    get tiles() { return $$('div.avia-image-container-inner'); }
    get galleryTiles() { return $$('a.grid-image.avia-hover-fx'); }

    link(tile) { return tile.$('a.avia_image'); }
    img(tile) { return tile.$('img'); }
    overlay(tile) { return tile.$('span.image-overlay-inside'); }

    captionForHref(href) {
        return $(`a.av-heading-link[href="${href}"]`);
    }

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

    async expectNavigationWorks(max = 6) {
        const cards = await this.tiles;

        for (let i = 0; i < Math.min(max, cards.length); i++) {
            const tile = cards[i];
            const imgRef = await this.link(tile).getAttribute('href');

            await this.link(tile).click();
            await expect(browser).toHaveUrl(imgRef);

            await browser.back();
            await (await $('h4.av-special-heading-tag')).waitForDisplayed();

            const caption = this.captionForHref(imgRef);

            await tile.moveTo();
            await browser.waitUntil(() => caption.isDisplayed(),
                { timeoutMsg: 'caption never appeared' });

            await caption.click();
            await expect(browser).toHaveUrl(imgRef);

            await browser.back();
            await (await $('h4.av-special-heading-tag')).waitForDisplayed();
        }
    }
    async verifyGalleryPage() {
        await this.expectImagesVisible();
        await this.expectLinksVisible();
        await this.expectNavigationWorks();
    }
}

module.exports = new GalleryPage();