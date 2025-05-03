const GalleryPage = require('../pageobjects/gallery.page');

describe('IMS Masonry Projects Gallery', () => {
    before(async () => {
        await GalleryPage.open();
    });


    it('should display all project images and text links', async () => {
        const images = await GalleryPage.getProjectImages();
        const links = await GalleryPage.getProjectLinks();

        for (const image of images) {
            await expect(image).toBeDisplayed();
        }

        for (const link of links) {
            await expect(link).toBeDisplayed();
        }
    });

    it('should show hover effects for images and links', async () => {
        const images = await GalleryPage.getProjectImages();
        const links = await GalleryPage.getProjectLinks();

        for (const image of images) {
            await image.moveTo();
            const arrow = await image.$('svg');
            await expect(arrow).toBeDisplayed();
        }

        for (const link of links) {
            await link.moveTo();
            const color = await link.getCSSProperty('color');
            expect(color.value).not.toBe('#000000');
        }
    });

    it('should navigate correctly when clicking images and links', async () => {
        const images = await GalleryPage.getProjectImages();
        const links = await GalleryPage.getProjectLinks();

        for (let i = 0; i < images.length; i++) {
            await images[i].click();
            await expect(browser).toHaveUrlContaining('project');
            await browser.back();

            await links[i].click();
            await expect(browser).toHaveUrlContaining('project');
            await browser.back();
        }
    });
});
