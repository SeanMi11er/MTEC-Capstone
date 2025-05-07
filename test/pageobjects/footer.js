const BasePage = require('./base.js');

class FooterPage extends BasePage {
    constructor() { super('/'); }

    get corporateSection() { return $('section#text-2'); }
    get mainOfficeSection() { return $('section#text-3'); }
    get estimatesSection() { return $('section#text-5'); }
    get officeHoursSection() { return $('section#text-4'); }

    get infoEmail() { return $('a[href="mailto:info@imsmasonry.com"]'); }
    get estimatesEmail() { return $('a[href="mailto:estimates@imsmasonry.com"]'); }

    async expectSectionsVisible() {
        for (const sec of [
            this.corporateSection,
            this.mainOfficeSection,
            this.estimatesSection,
            this.officeHoursSection
        ]) {
            await sec.scrollIntoView();
            await expect(sec).toBeDisplayed();
        }
    }

    async clickEmail(linkEl, user) {
        await linkEl.scrollIntoView();
        await linkEl.moveTo();
        await linkEl.click();
        await expect(linkEl).toHaveAttribute(
            'href',
            expect.stringContaining(`mailto:${user}@imsmasonry.com`)
        );
    }

    async verifyFooter() {
        await this.expectSectionsVisible();

        await this.clickEmail(this.infoEmail, 'info');
        await browser.refresh();

        await this.expectSectionsVisible();
        await this.clickEmail(this.estimatesEmail, 'estimates');
    }

    async scrollIntoView() {
        await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
    }
}

module.exports = new FooterPage();

