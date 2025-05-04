const ContactPage = require('../pageobjects/contact.page');

describe('Contact Page Tests', () => {
    beforeEach(async () => {
        await ContactPage.open();
    });

    it('should select the correct category from the dropdown', async () => {
        await ContactPage.open();
        await ContactPage.enterCategory('Estimates');
        await ContactPage.verifySelectedCategory('Estimates');

        await ContactPage.enterCategory('Information');
        await ContactPage.verifySelectedCategory('Information');
    });

    it('should show an error when the Name field is empty', async () => {
        await ContactPage.open();
        await ContactPage.enterCategory('Estimates');
        await ContactPage.enterEmail('johndoe@example.com');
        await ContactPage.enterMessage('Hello');
        await ContactPage.submitForm();
        await ContactPage.verifyNameError();
    });

    it('should show an error when the Email field is empty', async () => {
        await ContactPage.open();
        await ContactPage.enterCategory('Estimates');
        await ContactPage.enterName('John Doe');
        await ContactPage.enterMessage('Requesting a quote.');
        await ContactPage.submitForm();
        await ContactPage.verifyEmailError();
    });

    it('should successfully submit the contact form and display confirmation message', async () => {
        await ContactPage.open();
        await ContactPage.enterCategory('Estimates');
        await ContactPage.enterName('John Doe');
        await ContactPage.enterEmail('johndoe@example.com');
        await ContactPage.enterMessage('Hello, I am requesting an estimate for your services.');
        await ContactPage.submitForm();
        await ContactPage.verifySuccessMessage();
    });
});