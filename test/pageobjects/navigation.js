const BasePage = require('./base.js');

class NavigationPage extends BasePage {
    constructor() { super('/'); }

    get banner() { return $('#header_main .avia-standard-logo a'); }
    get headingH4() { return $('h4.av-special-heading-tag'); }

    navItem(label) { return $(`//nav//a[.//span[@class="avia-menu-text" and normalize-space()="${label}"]]`); }
    submenuItem(menu, sub) { return $(`//a[.//span[normalize-space()="${menu}"]]/../..//a[.//span[normalize-space()="${sub}"]]`); }
    socialLink(net) { return $(`//a[@aria-label="Link to ${net}"]`); }

    async clickAndVerify({ el, label, url, heading }) {
        const link = el ?? this.navItem(label);
        await link.click();
        await this.expectUrlContains(url);
        if (heading) await expect(this.headingH4).toHaveText(heading);
    }

    async hoverClickAndVerify({ menu, sub, url, heading }) {
        await this.navItem(menu).moveTo();
        await this.submenuItem(menu, sub).click();
        await this.expectUrlContains(url);
        if (heading) await expect(this.headingH4).toHaveText(heading);
    }

    async expectHoverActive(route) {
        const label = route.label ?? route;
        const link  = route.el   ?? this.navItem(label);

        const fxEls = await link.$$('span.avia-menu-fx')
        if (fxEls.length === 0) {
            return
        }
        const fx = fxEls[0]

        await link.moveTo();

        await browser.waitUntil(async () => {
            const { value: width } = await fx.getCSSProperty('width');
            return parseFloat(width) > 0;
        }, {
            timeout: 1500,
            timeoutMsg: `Underline did not animate for menu "${label}"`,
        });

        const { value: width } = await fx.getCSSProperty('width');
        const { width: linkWidth } = await link.getSize();
        const diff = Math.abs(parseFloat(width) - linkWidth);
        if (diff > 2) {
            throw new Error(
                `Underline width (${width}px) did not match link width ` +
                `(${linkWidth}px) for menu “${label}”`
            );
        }
    }

    async verifyTopMenu(routes) { for (const r of routes) await this.clickAndVerify(r); }
    async verifySubmenus(routes) { for (const r of routes) await this.hoverClickAndVerify(r); }
    async verifySocial(nets) { for (const n of nets) await this.socialLink(n).click(); }
    async verifyHovers(routes) { for (const r of routes) await this.expectHoverActive(r); }

    get topRoutes() {
        return [
            { label: 'Banner', el: this.banner, url: 'imsmasonry.com/' },
            { label: 'Home', url: 'imsmasonry.com/' },
            { label: 'About Us', url: 'page_id=626', heading: 'About Us' },
            { label: 'Projects', url: 'page_id=914', heading: 'Projects' },
            { label: 'Services', url: 'page_id=650', heading: 'Our Services' },
            { label: 'Safety', url: 'page_id=5079', heading: 'Safety' },
            { label: 'Careers', url: 'page_id=5096', heading: 'Careers' },
            { label: 'Contact', url: 'page_id=632', heading: 'Contact Us' }
        ];
    }

    get projectsSub() {
        return [
            { menu: 'Projects', sub: 'Featured Projects', url: 'page_id=3822', heading: 'Featured Projects' },
            { menu: 'Projects', sub: 'Projects in Progress', url: 'page_id=3848', heading: 'Projects in Progress' },
            { menu: 'Projects', sub: 'Recent Projects', url: 'page_id=3849', heading: 'Recent Projects' },
            { menu: 'Projects', sub: 'Volunteer Projects', url: 'page_id=3861', heading: 'Volunteer Projects' },
            { menu: 'Projects', sub: 'Project Archive', url: 'page_id=3820', heading: 'Project Archive' }
        ];
    }

    get servicesSub() {
        return [
            { menu: 'Services', sub: 'Traditional Masonry', url: 'page_id=3544', heading: 'Traditional Masonry' },
            { menu: 'Services', sub: 'Architectural Cladding', url: 'page_id=3611', heading: 'Architectural Cladding' },
            { menu: 'Services', sub: 'Restoration', url: 'page_id=3854', heading: 'Restoration' },
            { menu: 'Services', sub: 'GFRC (Glass Fiber Reinforced Concrete)', url: 'page_id=3609', heading: 'GFRC (Glass Fiber Reinforced Concrete)' },
            { menu: 'Services', sub: 'ICF (Insulated Concrete Forms)', url: 'page_id=3605', heading: 'ICF (Insulated Concrete Forms)' },
            { menu: 'Services', sub: 'Paving, Flooring, Water Features', url: 'page_id=3613', heading: 'Paving, Flooring, Water Features' },
            { menu: 'Services', sub: 'Services', url: 'page_id=650', heading: 'Our Services' }
        ];
    }

    get aboutSub() {
        return [
            { menu: 'About Us', sub: 'About Us', url: 'page_id=626', heading: 'About Us' },
            { menu: 'About Us', sub: 'Industry Awards', url: 'page_id=5305', heading: 'Industry Awards' }
        ];
    }

    get careersSub() {
        return [
            { menu: 'Careers', sub: 'Careers', url: 'page_id=5096', heading: 'Careers' },
            { menu: 'Careers', sub: 'Join Our Team', url: 'page_id=5107', heading: 'Available Positions' }
        ];
    }

    get social() { return ['Instagram', 'Facebook', 'LinkedIn']; }
}

module.exports = new NavigationPage();