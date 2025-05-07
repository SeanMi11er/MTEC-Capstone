const ContactPage = require('../pageobjects/contact.js');

describe('Contact form', () => {
    beforeEach(async () => {
        await ContactPage.navigate();
    });

    it('selects each category without error', async () => {
        await ContactPage.chooseCategory('Estimates');
        await ContactPage.chooseCategory('Information');
    });

    it('shows an error when Name is empty', async () => {
        await ContactPage.submitFormExpectError(
            {
                category : 'Estimates',
                email    : 'johndoe@example.com',
                message  : 'Hello'
            },
            'your-name'
        );
    });

    it('shows an error when Email is empty', async () => {
        await ContactPage.submitFormExpectError(
            {
                category : 'Estimates',
                name: 'John Doe',
                message  : 'Hello'
            },
            'your-email'
        );
    });

    it('submits successfully with valid data', async () => {
        const c = ContactPage.fakeContact();
        await ContactPage.fillForm({ category: 'Estimates', ...c });
        await ContactPage.submit();
        await ContactPage.expectSuccess();
    });
});
