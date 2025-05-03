class ContactPage {
    get categoryField() { return $('select[name="contact-category"]'); }
    get nameField() { return $('#name'); }
    get emailField() { return $('#email'); }
    get messageField() { return $('textarea[name="your-message"]'); }
    get submitButton() { return $('input[type="submit"]'); }

    async open() {
        await browser.url('https://imsmasonry.com/?page_id=9450');
    }

    async enterCategory(category) {
        await this.categoryField.selectByVisibleText(category);
    }
    
    async enterName(name) {
        await this.nameField.setValue(name);
    }

    async enterEmail(email) {
        await this.emailField.setValue(email);
    }

    async enterMessage(message) {
        await this.messageField.setValue(message);
    }

    async getNameValue() {
        return await this.nameField.getValue();
    }

    async getEmailValue() {
        return await this.emailField.getValue();
    }

    async getMessageValue() {
        return await this.messageField.getValue();
    }

    get successMessage() {
        return $('.wpcf7-response-output');
    }

    get nameError() {
        return $('span[data-name="your-name"] .wpcf7-not-valid-tip');
    }
    
    get emailError() {
        return $('span[data-name="your-email"] .wpcf7-not-valid-tip');
    }

    get messageError() {
        return $('span[data-name="your-message"] .wpcf7-not-valid-tip');
    }

    async submitForm() {
        await this.submitButton.click();
    }
}

module.exports = new ContactPage();