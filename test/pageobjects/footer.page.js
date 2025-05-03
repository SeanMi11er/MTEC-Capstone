class FooterPage {
    get corporateSection() {
        return $('section#text-2');
    }

    get mainOfficeSection() {
        return $('section#text-3');
    }

    get estimatesSection() {
        return $('section#text-5');
    }

    get officeHoursSection() {
        return $('section#text-4');
    }

    get infoEmailLink() {
        return $('a[href="mailto:info@imsmasonry.com"]');
    }

    get estimatesEmailLink() {
        return $('a[href="mailto:estimates@imsmasonry.com"]');
    }

    async verifyFooterDetailsPresent() {
        await expect(this.corporateSection).toBeDisplayed();
        await expect(this.mainOfficeSection).toBeDisplayed();
        await expect(this.estimatesSection).toBeDisplayed();
        await expect(this.officeHoursSection).toBeDisplayed();
    }

    async hoverAndClickEmail(link) {
        await link.scrollIntoView();
        await link.moveTo();
        await expect(link).toBeClickable();
        await link.click();
    }
}

export default new FooterPage();

