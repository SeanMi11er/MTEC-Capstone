const GalleryPage = require('../pageobjects/gallery.page');

describe('IMS Masonry Projects Gallery (No expect in spec)', () => {
    before(async () => {
        await GalleryPage.open();
    });

    it('should display all project images and text links', async () => {
        await GalleryPage.validateProjectImagesDisplayed();
        await GalleryPage.validateProjectLinksDisplayed();
    });

    it('should show hover effects for images and links', async () => {
        await GalleryPage.validateHoverEffects();
    });

    it('should navigate correctly when clicking images and links', async () => {
        await GalleryPage.validateGalleryNavigation();
    });
});