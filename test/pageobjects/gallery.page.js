class GalleryPage {
    get projectItems() { return $$('div.project-item'); }

    async open() {
        await browser.url('https://imsmasonry.com/?page_id=914');
    }

    async getProjectImages() {
        return await this.projectItems.map(item => item.$('img'));
    }

    async getProjectLinks() {
        return await this.projectItems.map(item => item.$('a'));
    }
}

module.exports = new GalleryPage();