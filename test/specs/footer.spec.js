import FooterPage from '../pageobjects/footer.js';

describe('Footer content', () => {
    beforeEach(async () => {
        await FooterPage.navigate();
        await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
    });

    it('verifies footer sections and email links', async () => {
        await FooterPage.verifyFooter();
    });
});
