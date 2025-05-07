class BasePage {
    constructor (path = '') { this.path = path; }
    async navigate ()      { await browser.url(this.path); }
    async expectUrl (frag) { await expect(browser).toHaveUrlContaining(frag); }
}
module.exports = BasePage;