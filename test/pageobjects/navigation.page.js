class NavigationPage {
    // Main nav links
    get banner() { return $('#header_main .avia-standard-logo a'); }
    get homeButton() { return $('li.menu-item-home > a'); }
    get aboutUsButton() { return $('#menu-item-3314'); }
    get projectsButton() { return $('#menu-item-3704'); }
    get servicesButton() { return $('#menu-item-3305'); }
    get safetyButton() { return $('#menu-item-5091'); }
    get careersButton() { return $('li#menu-item-5110 > a'); }
    get contactButton() { return $('#menu-item-3315'); }

    // Social links
    get instagramLink() { return $('a[aria-label="Link to Instagram"]'); }
    get facebookLink() { return $('a[aria-label="Link to Facebook"]'); }
    get linkedinLink() { return $('a[aria-label="Link to LinkedIn"]'); }

    // Dropdown nav hover targets
    get aboutMenu() { return $('#menu-item-3314 > a > .avia-menu-text'); }
    get aboutUsLink() { return $('#menu-item-6319 > a > .avia-menu-text'); }
    get industryAwardsLink() { return $('#menu-item-5313 > a > .avia-menu-text'); }

    get projectsMenu() { return $('#menu-item-3704 > a > .avia-menu-text'); }
    get projectsLink() { return $('#menu-item-6367 > a > .avia-menu-text'); }
    get featuredProjectsLink() { return $('#menu-item-6361 > a > .avia-menu-text'); }
    get projectsInProgressLink() { return $('#menu-item-6362 > a > .avia-menu-text'); }
    get recentProjectsLink() { return $('#menu-item-6363 > a > .avia-menu-text'); }
    get volunteerProjectsLink() { return $('#menu-item-6364 > a > .avia-menu-text'); }
    get projectArchiveLink() { return $('#menu-item-6365 > a > .avia-menu-text'); }

    get servicesMenu() { return $('#menu-item-3305 > a > .avia-menu-text'); }
    get servicesLink() { return $('#menu-item-6366 > a > .avia-menu-text'); }
    get traditionalMasonryLink() { return $('#menu-item-6373 > a > .avia-menu-text'); }
    get architecturalLink() { return $('#menu-item-6369 > a > .avia-menu-text'); }
    get restorationLink() { return $('#menu-item-9038 > a > .avia-menu-text'); }
    get gfrcLink() { return $('#menu-item-6370 > a > .avia-menu-text'); }
    get icfLink() { return $('#menu-item-6372 > a > .avia-menu-text'); }
    get pavingLink() { return $('#menu-item-6368 > a > .avia-menu-text'); }

    get careersMenu() { return $('#menu-item-5110 > a > .avia-menu-text'); } 
    get careersLink() { return $('#menu-item-6320 > a > .avia-menu-text'); }
    get joinOurTeamLink() { return $('#menu-item-6161 > a > .avia-menu-text'); }

    get pageHeading() { return $('h4.av-special-heading-tag'); }

    // Helper methods for navigation
    async clickNavAndVerify(linkEl, expectedUrl, expectedText = null) {
        await linkEl.waitForClickable({ timeout: 5000 });
        await linkEl.click();
        const currentUrl = await browser.getUrl();
        if (!currentUrl.includes(expectedUrl)) {
            throw new Error(`❌ Expected URL to include "${expectedUrl}", but got "${currentUrl}"`);
        }

        if (expectedText) {
            const text = await this.pageHeading.getText();
            if (text !== expectedText) {
                throw new Error(`❌ Expected heading "${expectedText}", but got "${text}"`);
            }
        }
    }

    async clickExternalLink(linkEl) {
        await linkEl.waitForClickable({ timeout: 5000 });
        await linkEl.click();
    }

    async hoverAndClickNav(menuElement, linkElement, expectedUrlPart, expectedText = null) {
        await menuElement.moveTo();
        await this.clickNavAndVerify(linkElement, expectedUrlPart, expectedText);
    }
}

module.exports = new NavigationPage();