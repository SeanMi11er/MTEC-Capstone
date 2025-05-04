class ContactPage {
    get categoryField() { return $('select[name="contact-category"]'); }
    get nameField() { return $('#name'); }
    get emailField() { return $('#email'); }
    get messageField() { return $('textarea[name="your-message"]'); }
    get submitButton() { return $('input[type="submit"]'); }

    get successMessage() { return $('.wpcf7-response-output'); }

    get nameError() {
        return $('span[data-name="your-name"] .wpcf7-not-valid-tip');
    }

    get emailError() {
        return $('span[data-name="your-email"] .wpcf7-not-valid-tip');
    }

    get messageError() {
        return $('span[data-name="your-message"] .wpcf7-not-valid-tip');
    }

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

    async submitForm() {
        await this.submitButton.click();
    }

    // Moved all the assertions here for validation
    async verifySelectedCategory(expectedCategory) {
        const selectedOption = await this.categoryField.$('option:checked');
        const text = await selectedOption.getText();
        if (text !== expectedCategory) {
            throw new Error(`Category selected is "${text}", but expected "${expectedCategory}"`);
        }
    }

    async verifyNameError() {
        await browser.waitUntil(async () => await this.nameError.isDisplayed(), {
            timeout: 3000,
            timeoutMsg: 'Expected name error message to appear'
        });
        const nameErrorText = await this.nameError.getText();
        if (nameErrorText !== 'Please fill out this field.') {
            throw new Error(`Expected name error text "Please fill out this field.", but got "${nameErrorText}"`);
        }
    }

    async verifyEmailError() {
        await browser.waitUntil(async () => await this.emailError.isDisplayed(), {
            timeout: 3000,
            timeoutMsg: 'Expected email error message to appear'
        });
        const emailErrorText = await this.emailError.getText();
        if (emailErrorText !== 'Please fill out this field.') {
            throw new Error(`Expected email error text "Please fill out this field.", but got "${emailErrorText}"`);
        }
    }

    async verifySuccessMessage() {
        await browser.waitUntil(async () => {
            const isDisplayed = await this.successMessage.isDisplayed();
            const text = await this.successMessage.getText();
            return isDisplayed && text.includes('Thank you for your message');
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected success message to appear after form submission'
        });

        const confirmationText = await this.successMessage.getText();
        if (confirmationText !== 'Thank you for your message. It has been sent.') {
            throw new Error(`Expected success message to be "Thank you for your message. It has been sent.", but got "${confirmationText}"`);
        }
    }
}

module.exports = new ContactPage();