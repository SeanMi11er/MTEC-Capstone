const ContactPage = require('../pageobjects/contact.page');

describe('Contact Page Tests', () => {
    beforeEach(async () => {
        await ContactPage.open();
    });

    it('should select the correct category from the dropdown', async () => {
        await ContactPage.open();
        await ContactPage.enterCategory('Estimates');
        
        let selectedCategory = await ContactPage.categoryField.getValue();
        expect(selectedCategory).toBe('Estimates');

        await ContactPage.enterCategory('Information');
        
        selectedCategory = await ContactPage.categoryField.getValue();
        expect(selectedCategory).toBe('Information');
    });
    
    it('should show an error when the Name field is empty', async () => {
        await ContactPage.open();
    
        await ContactPage.enterCategory('Estimates');
        await ContactPage.enterEmail('johndoe@example.com');
        await ContactPage.enterMessage('Hello');
        await ContactPage.submitForm();
    
        // Wait for validation error to appear
        await browser.waitUntil(async () => {
            return await ContactPage.nameError.isDisplayed();
        }, {
            timeout: 3000,
            timeoutMsg: 'Expected name error message to appear'
        });
    
        // Assert the actual error text
        const nameErrorText = await ContactPage.nameError.getText();
        expect(nameErrorText).toBe('Please fill out this field.');
    });
    
    it('should show an error when the Email field is empty', async () => {
        await ContactPage.open();
    
        // Fill other required fields, leave email blank
        await ContactPage.enterCategory('Estimates');
        await ContactPage.enterName('John Doe');
        await ContactPage.enterMessage('Requesting a quote.');
    
        await ContactPage.submitForm();
    
        // Wait for validation error to appear
        await browser.waitUntil(async () => {
            return await ContactPage.emailError.isDisplayed();
        }, {
            timeout: 3000,
            timeoutMsg: 'Expected email error message to appear'
        });
    
        const emailErrorText = await ContactPage.emailError.getText();
        expect(emailErrorText).toBe('Please fill out this field.');
    });

    it('should successfully submit the contact form and display confirmation message', async () => {
        await ContactPage.open();
    
        await ContactPage.enterCategory('Estimates');
        await ContactPage.enterName('John Doe');
        await ContactPage.enterEmail('johndoe@example.com');
        await ContactPage.enterMessage('Hello, I am requesting an estimate for your services.');
    
        await ContactPage.submitForm();
    
        // Wait for the success message to appear
        await browser.waitUntil(async () => {
            const isDisplayed = await ContactPage.successMessage.isDisplayed();
            const text = await ContactPage.successMessage.getText();
            return isDisplayed && text.includes('Thank you for your message');
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected success message to appear after form submission'
        });
    
        const confirmationText = await ContactPage.successMessage.getText();
        expect(confirmationText).toBe('Thank you for your message. It has been sent.');
    });
})