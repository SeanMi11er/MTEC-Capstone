class FooterPage {
    // Footer sections and email links
    get corporateSection() { return $('div.flex_column:first-child'); }
    get mainOfficeSection() { return $('#text-3'); }
    get estimatesSection() { return $('#text-5'); }
    get officeHoursSection() { return $('#text-4'); }
    
    get infoEmailLink() { return $('a[href="mailto:info@imsmasonry.com"]'); }
    get estimatesEmailLink() { return $('a[href="mailto:estimates@imsmasonry.com"]'); }

    // Verify footer sections and details are visible
    async verifyFooterDetailsPresent() {
        // Wait for footer sections to be displayed
        await this.corporateSection.waitForDisplayed({ timeout: 5000 });
        await this.mainOfficeSection.waitForDisplayed({ timeout: 5000 });
        await this.estimatesSection.waitForDisplayed({ timeout: 5000 });
        await this.officeHoursSection.waitForDisplayed({ timeout: 5000 });
    }

    // Hover over and click on email links
    async hoverAndClickEmail(emailLink) {
        await emailLink.waitForDisplayed({ timeout: 5000 });
        await emailLink.moveTo();
        await emailLink.click();
        
        // If you want to check if the mail client opens, additional checks can be added, but this is beyond the scope.
    }
}

module.exports = new FooterPage();

