import FooterPage from '../pageobjects/footer.page.js';

describe('IMS Masonry Footer Contact Test', () => {
    beforeEach(async () => {
        await browser.url('https://imsmasonry.com/');
    });

    it('should display all footer sections with correct details and verify email links', async () => {
        await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
        
        await FooterPage.verifyFooterDetailsPresent();
        await FooterPage.hoverAndClickEmail(FooterPage.infoEmailLink);

        await browser.refresh();

        await FooterPage.hoverAndClickEmail(FooterPage.estimatesEmailLink);
    });
});
