import FooterPage from '../pageobjects/footer.page.js';

describe('IMS Masonry Footer Contact Test (No Expect)', () => {
    beforeEach(async () => {
        await browser.url('https://imsmasonry.com/');
    });

    it('should display all footer sections with correct details and verify email links', async () => {
        await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
        
        // Verify the footer details are present and clickable for email links
        await FooterPage.verifyFooterDetailsPresent();
        await FooterPage.hoverAndClickEmail(FooterPage.infoEmailLink);
        
        // Refresh the page and verify again for the second email link
        await browser.refresh();
        await FooterPage.hoverAndClickEmail(FooterPage.estimatesEmailLink);
    });
});