const GalleryPage = require('../pageobjects/gallery.js');

describe('Projects gallery', () => {
    before(async () => {
        await GalleryPage.navigate();
    });

    it('passes all gallery checks', async () => {
        await GalleryPage.verifyGalleryPage();
    });
});