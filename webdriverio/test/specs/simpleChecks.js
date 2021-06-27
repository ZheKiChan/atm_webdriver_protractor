const BasePage = require('../../page_objects/basePage/basePage.js');
const HomePage = require('../../page_objects/homePage/homePage.js');
const MoviePage = require('../../page_objects/moviePage/moviePage.js');


describe('Positive scenarios', () => {

    it('should have title', async() => {
        let homePage = new HomePage();
        let basePage = new BasePage();
        await homePage.openCurrentPage();
        let title = await basePage.getTitle();
        expect(title).toEqual(homePage.title);
    });

    it('should contain url without any anchors', async() => {
        let homePage = new HomePage();
        let basePage = new BasePage();
        await homePage.openCurrentPage();
        let url = await basePage.getCurrentUrl();
        expect(url).toEqual("https://www.kinopoisk.ru/");
    });

    it('should show searched film in search result dropdown at the first postion', async() => {
        let homePage = new HomePage();
        let basePage = new BasePage();
        let moviePage = new MoviePage();
        await homePage.openCurrentPage();
        let searchInput = await basePage.getElement(basePage.searchInput);
        await basePage.inputValue(searchInput, moviePage.searchedMovie);
        let dropdownList = await basePage.getElement('div.kinopoisk-header-suggest__groups-container');
        await basePage.waitForElemToBeDisplayed(dropdownList, 6000);
        let firstPositionMovieInDropDown = await basePage.getElement('//div[@data-index=0]//h4');
        let firstMovieName = await basePage.getText(firstPositionMovieInDropDown);
        expect(firstMovieName).toEqual(moviePage.searchedMovie);
    });

    it('should open page with searched movie', async() => {
        let homePage = new HomePage();
        let basePage = new BasePage();
        let moviePage = new MoviePage();
        await homePage.openCurrentPage();
        let searchInput = await basePage.getElement(basePage.searchInput);
        await basePage.inputValue(searchInput, moviePage.searchedMovie);
        let dropdownList = await basePage.getElement('div.kinopoisk-header-suggest__groups-container');
        await basePage.waitForElemToBeDisplayed(dropdownList, 6000);
        let movieLink = await basePage.getElement('a[href="/film/942396/sr/2/"]');
        await basePage.clickOn(movieLink);
        await basePage.waitUntilLoaded();
        let title = await basePage.getElement('span.styles_title__2l0HH');
        let movieTitle = await basePage.getText(title);
        expect(movieTitle).toEqual('Дом, который построил Джек (2018)');
    });

    it('should show the director and his name', async() => {
        let homePage = new HomePage();
        let basePage = new BasePage();
        let moviePage = new MoviePage();
        await homePage.openCurrentPage();
        let searchInput = await basePage.getElement(basePage.searchInput);
        await basePage.inputValue(searchInput, moviePage.searchedMovie);
        let dropdownList = await basePage.getElement('div.kinopoisk-header-suggest__groups-container');
        await basePage.waitForElemToBeDisplayed(dropdownList, 6000);
        let movieLink = await basePage.getElement('a[href="/film/942396/sr/2/"]');
        await basePage.clickOn(movieLink);
        await basePage.waitUntilLoaded();
        let directorField = await basePage.getElement('div[data-test-id="encyclopedic-table"] div:nth-child(5)');
        let directorFieldExists = await moviePage.elemIsExisting(directorField);
        expect(directorFieldExists).toBe(true);
    });
});