const navPage = require('../pageobjects/navigation.page');

describe('IMS Masonry Navigation Tests (No Expect)', () => {
    beforeEach(async () => {
        await browser.url('https://imsmasonry.com/');
    });

    it('click Banner and verify navigation', async () => {
        await navPage.clickNavAndVerify(navPage.banner, 'imsmasonry.com');
    });

    it('click Home button and verify navigation', async () => {
        await navPage.clickNavAndVerify(navPage.homeButton, 'imsmasonry.com');
    });

    it('click About Us button and verify text', async () => {
        await navPage.clickNavAndVerify(navPage.aboutUsButton, 'page_id=626', 'About Us');
    });

    it('click Projects button and verify text', async () => {
        await navPage.clickNavAndVerify(navPage.projectsButton, 'page_id=914', 'Projects');
    });

    it('click Services button and verify text', async () => {
        await navPage.clickNavAndVerify(navPage.servicesButton, 'page_id=650', 'Our Services');
    });

    it('click Safety button and verify text', async () => {
        await navPage.clickNavAndVerify(navPage.safetyButton, 'page_id=5079', 'Safety');
    });

    it('click Careers button and verify text', async () => {
        await navPage.clickNavAndVerify(navPage.careersButton, 'page_id=5096');
    });

    it('click Contact button and verify text', async () => {
        await navPage.clickNavAndVerify(navPage.contactButton, 'page_id=632', 'Contact Us');
    });

    it('click Instagram link', async () => {
        await navPage.clickExternalLink(navPage.instagramLink);
    });

    it('click Facebook link', async () => {
        await navPage.clickExternalLink(navPage.facebookLink);
    });

    it('click LinkedIn link', async () => {
        await navPage.clickExternalLink(navPage.linkedinLink);
    });

    // About Us Hover Menu
    it('should hover over About Us Menu Header and click About Us link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.aboutMenu,
            navPage.aboutUsLink,
            'page_id=626',
            'About Us'
        );
    });

    it('should hover over About Us Menu Header and click Industry Awards link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.aboutMenu,
            navPage.industryAwardsLink,
            'page_id=5305',
            'Industry Awards'
        );
    });

    // Projects Hover Menu
    it('should hover over Projects Menu Header and click Projects link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.projectsMenu,
            navPage.projectsLink,
            'page_id=914',
            'Projects'
        );
    });

    it('should hover over Projects Menu Header and click Featured Projects link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.projectsMenu,
            navPage.featuredProjectsLink,
            'page_id=3822',
            'Featured Projects'
        );
    });

    it('should hover over Projects Menu Header and click Projects in Progress link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.projectsMenu,
            navPage.projectsInProgressLink,
            'page_id=3848',
            'Projects in Progress'
        );
    });

    it('should hover over Projects Menu Header and click Recent Projects link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.projectsMenu,
            navPage.recentProjectsLink,
            'page_id=3849',
            'Recent Projects'
        );
    });

    it('should hover over Projects Menu Header and click Volunteer Projects link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.projectsMenu,
            navPage.volunteerProjectsLink,
            'page_id=3861',
            'Volunteer Projects'
        );
    });

    it('should hover over Projects Menu Header and click Project Archive link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.projectsMenu,
            navPage.projectArchiveLink,
            'page_id=3820',
            'Project Archive'
        );
    });

    // Services Hover Menu
    it('should hover over Services Menu Header and click Services link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.servicesMenu,
            navPage.servicesLink,
            'page_id=650',
            'Our Services'
        );
    });

    it('should hover over Services Menu Header and click Traditional Masonry link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.servicesMenu,
            navPage.traditionalMasonryLink,
            'page_id=3544',
            'Traditional Masonry'
        );
    });

    it('should hover over Services Menu Header and click Architectural Cladding link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.servicesMenu,
            navPage.architecturalLink,
            'page_id=3611',
            'Architectural Cladding'
        );
    });

    it('should hover over Services Menu Header and click Restoration link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.servicesMenu,
            navPage.restorationLink,
            'page_id=3854',
            'Restoration'
        );
    });

    it('should hover over Services Menu Header and click GFRC (Glass Fiber Reinforced Concrete) link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.servicesMenu,
            navPage.gfrcLink,
            'page_id=3609',
            'GFRC (Glass Fiber Reinforced Concrete)'
        );
    });

    it('should hover over Services Menu Header and click ICF (Insulated Concrete Forms) link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.servicesMenu,
            navPage.icfLink,
            'page_id=3605',
            'ICF (Insulated Concrete Forms)'
        );
    });

    it('should hover over Services Menu Header and click Paving, Flooring, Water Features link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.servicesMenu,
            navPage.pavingLink,
            'page_id=3613',
            'Paving, Flooring, Water Features'
        );
    });

    // Careers Hover Menu
    it('should hover over Careers Menu Header and click Careers link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.careersMenu,
            navPage.careersLink,
            'page_id=5096',
            'Careers'
        );
    });

    it('should hover over Careers Menu Header and click Join Our Team link, verifying destination', async () => {
        await navPage.hoverAndClickNav(
            navPage.careersMenu,
            navPage.joinOurTeamLink,
            'page_id=5107',
            'Available Positions'
        );
    });
});