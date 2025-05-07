const BasePage = require('./base.js');
const { faker } = require('@faker-js/faker')

class ContactPage extends BasePage {
    constructor() { super('/?page_id=9450'); }

    get categorySelect() { return this.field('contact-category'); }
    get nameField() { return this.field('your-name'); }
    get emailField() { return this.field('your-email'); }
    get messageField() { return this.field('your-message'); }
    get submitButton() { return $('input[type="submit"]'); }
    get successMessage() { return $('.wpcf7-response-output'); }

    field(nameAttr) { return $(`[name="${nameAttr}"]`); }

    categoryOption(label) {
        return $(`//select[@name="contact-category"]/option[normalize-space()="${label}"]`);
    }

    errorTip(nameAttr) {
        return $(`span[data-name="${nameAttr}"] .wpcf7-not-valid-tip`);
    }

    async chooseCategory(label) {
        await this.categorySelect.selectByVisibleText(label);
        await expect(this.categoryOption(label)).toBeSelected();
    }

    async fillForm({ category, name, email, message }) {
        if (category) await this.chooseCategory(category);
        if (name) await this.nameField.setValue(name);
        if (email) await this.emailField.setValue(email);
        if (message) await this.messageField.setValue(message);
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectError(nameAttr, txt = 'Please fill out this field.') {
        const err = await this.errorTip(nameAttr);
        await expect(err).toBeDisplayed();
        await expect(err).toHaveText(txt);
    }

    async expectSuccess() {
        await expect(this.successMessage).toBeDisplayed();
        await expect(this.successMessage).toHaveText(
            'Thank you for your message. It has been sent.'
        );
    }

    fakeContact () {
        return {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            message: faker.lorem.sentences(2)
        };
    }
}

module.exports = new ContactPage();