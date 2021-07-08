const BasePage = require('../../page_objects/basePage/basePage.js');
const HomePage = require('../../page_objects/homePage/homePage.js');
const MoviePage = require('../../page_objects/moviePage/moviePage.js');
const Executor = require('../../helpers/executor');


describe('Positive scenarios', () => {
    let homePage, basePage, moviePage, executor

    beforeEach(() => {
        homePage = new HomePage();
        basePage = new BasePage();
        moviePage = new MoviePage();
        executor = new Executor();
    })
    it('should have title', async() => {
        await homePage.openCurrentPage();
        let title = await basePage.getTitle();
        expect(title).toEqual(homePage.title);
        await executor.reloadBrowser();
    });

    it('should contain url without any anchors', async() => {
        await homePage.openCurrentPage();
        let url = await basePage.getCurrentUrl();
        expect(url).toEqual("https://www.kinopoisk.ru/");
        await executor.reloadBrowser();
    });

    it('should show searched film in search result dropdown at the first postion', async() => {
        await homePage.openCurrentPage();
        let searchInput = await basePage.getElement(basePage.searchInput);
        await basePage.inputValue(searchInput, moviePage.searchedMovie);
        let dropdownList = await basePage.getElement('div.kinopoisk-header-suggest__groups-container');
        await basePage.waitForElemToBeDisplayed(dropdownList, 6000);
        let firstPositionMovieInDropDown = await basePage.getElement('//div[@data-index=0]//h4');
        let firstMovieName = await basePage.getText(firstPositionMovieInDropDown);
        expect(firstMovieName).toEqual(moviePage.searchedMovie);
        await executor.reloadBrowser();
    });

    it('should open page with searched movie', async() => {
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
        await executor.reloadBrowser();
    });

    it('should show the director and his name', async() => {
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
        await executor.reloadBrowser();
    });
});