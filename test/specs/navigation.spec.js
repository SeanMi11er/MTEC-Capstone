const Navigation = require('../pageobjects/navigation.js');

describe('Main site navigation', () => {
    beforeEach(async () => { await Navigation.navigate(); });

    it('highlights each main menu item on hover', async () => {
        await Navigation.verifyHovers(Navigation.topRoutes);
    });

    it('verifies top-level menu items', async () => {
        await Navigation.verifyTopMenu(Navigation.topRoutes);
    });

    it('verifies Projects submenu', async () => {
        await Navigation.verifySubmenus(Navigation.projectsSub);
    });

    it('verifies Services submenu', async () => {
        await Navigation.verifySubmenus(Navigation.servicesSub);
    });

    it('verifies About Us submenu', async () => {
        await Navigation.verifySubmenus(Navigation.aboutSub);
    });

    it('verifies Careers submenu', async () => {
        await Navigation.verifySubmenus(Navigation.careersSub);
    });

    it('checks external social links', async () => {
        await Navigation.verifySocial(Navigation.social);
    });
});
