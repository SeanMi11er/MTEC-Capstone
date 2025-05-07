class BasePage {
    constructor (path = '') { this.path = path; }
    async navigate ()      { await browser.url(this.path); }
    async expectUrl (frag) { await expect(browser).toHaveUrlContaining(frag); }

    /**
     * Assert the current URL contains the given fragment.
     * Automatically retries for up to 5 s – just like WDIO’s matcher.
     */
    async expectUrlContains (fragment, timeout = 5000) {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(fragment),
            {
                timeout,
                timeoutMsg: `Expected URL to contain "${fragment}"`,
            }
        );
        const url = await browser.getUrl();
        if (!url.includes(fragment)) {
            throw new Error(`Expected "${url}" to include "${fragment}"`);
        }
    }
}
module.exports = BasePage;