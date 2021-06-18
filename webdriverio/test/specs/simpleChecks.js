describe('Positive scenarios', () => {
    it('should have title', async() => {
        await browser.url('https://www.kinopoisk.ru');
        let title = await browser.getTitle();
        expect(title).toEqual("КиноПоиск. Все фильмы планеты.");
    });

    it('should contain url without any anchors', async() => {
        await browser.url('https://www.kinopoisk.ru');
        let url = await browser.getUrl();
        expect(url).toEqual("https://www.kinopoisk.ru/");
    });

    it('should show searched film in search result dropdown at the first postion', async() => {
        await browser.url('https://www.kinopoisk.ru');
        let searchInput = await $('input[name="kp_query"]');
        await searchInput.setValue('Дом который построил Джек');
        let dropdownList = await $('div.kinopoisk-header-suggest__groups-container');
        await dropdownList.waitForDisplayed(6000);
        let firstPositionMovieInDropDown = await $('//div[@data-index=0]//h4');
        let firstMovieName = await firstPositionMovieInDropDown.getText();
        let movieSearched = 'Дом, который построил Джек';
        expect(firstMovieName).toEqual(movieSearched);
    });

    it('should open page with searched movie', async() => {
        await browser.url('https://www.kinopoisk.ru');
        let searchInput = await $('input[name="kp_query"]');
        await searchInput.setValue('Дом который построил Джек');
        let dropdownList = await $('div.kinopoisk-header-suggest__groups-container');
        await dropdownList.waitForDisplayed(6000);
        let movieLink = await $('a[href="/film/942396/sr/2/"]');
        await movieLink.click();
        await browser.waitUntil(() => browser.execute(() => document.readyState === 'complete'), {
            timeout: 60000,
            timeoutMsg: 'Message on failure'
        });
        let title = await $('span.styles_title__2l0HH');
        let movieTitle = await title.getText();
        expect(movieTitle).toEqual('Дом, который построил Джек (2018)');
    });

    it('should show the director and his name', async() => {
        await browser.url('https://www.kinopoisk.ru');
        let searchInput = await $('input[name="kp_query"]');
        await searchInput.setValue('Дом который построил Джек');
        let dropdownList = await $('div.kinopoisk-header-suggest__groups-container');
        await dropdownList.waitForDisplayed(6000);
        let movieLink = await $('a[href="/film/942396/sr/2/"]');
        await movieLink.click();
        await browser.waitUntil(() => browser.execute(() => document.readyState === 'complete'), {
            timeout: 60000,
            timeoutMsg: 'Message on failure'
        });
        let directorField = await $('div[data-test-id="encyclopedic-table"] div:nth-child(5)');
        let directorFieldExists = await directorField.isExisting();
        expect(directorFieldExists).toBe(true);
    });
})