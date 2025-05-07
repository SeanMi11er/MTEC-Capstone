import FooterPage from '../pageobjects/footer.js';

describe('Footer content', () => {
    beforeEach(async () => {
        await FooterPage.navigate();
    });

    it('verifies footer sections and email links', async () => {
        await FooterPage.verifyFooter();
    });
});
