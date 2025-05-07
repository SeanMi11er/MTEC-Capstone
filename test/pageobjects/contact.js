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
    errorFor(field) { return $(`span[data-name="${field}"] .wpcf7-not-valid-tip`); }

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

    async fillForm(data) {
        if (data.category) await this.categorySelect.selectByVisibleText(data.category);
        if (data.name) await this.nameField.setValue(data.name);
        if (data.email) await this.emailField.setValue(data.email);
        if (data.message) await this.messageField.setValue(data.message);
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectError(field) {
        await expect(this.errorFor(field)).toBeDisplayed();
    }

    async expectSuccess() {
        await expect(this.successMessage).toBeDisplayed();
        await expect(this.successMessage).toHaveText(
            'Thank you for your message. It has been sent.'
        );
    }

    async submitFormExpectError(data, errorField) {
        await this.fillForm(data);
        await this.submit();
        await this.expectError(errorField);
    }

    fakeContact() {
        return {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            message: faker.lorem.sentences(2)
        };
    }
}

module.exports = new ContactPage();