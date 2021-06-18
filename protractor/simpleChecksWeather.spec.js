const { browser, ExpectedConditions, element } = require("protractor")

describe('Positive scenarios', () => {
    let EC = protractor.ExpectedConditions;

    beforeEach(async() => {
        await browser.get('https://www.wunderground.com/');
    });

    it('should have title', async() => {
        expect(await browser.getTitle()).toEqual('Local Weather Forecast, News and Conditions | Weather Underground');
    });

    it('should have url without any unnecessary anchors', async() => {
        const url = await browser.getCurrentUrl();
        expect(url).toEqual('https://www.wunderground.com/');
    });

    it('should show entered city in search result as a first option', async() => {
        const searchField = await element(by.css('input#wuSearch'));
        await searchField.sendKeys('Minsk');
        const searchResultDropdown = await element(by.css('search-autocomplete ul.ui-autocomplete'));
        await browser.wait(EC.visibilityOf(searchResultDropdown), 5000);
        let firstSearchedItem = await element(by.css('li.needsclick.needsfocus.defcon-.is-city.selected.ng-star-inserted span.needsclick.needsfocus.city-name.ng-star-inserted'));
        expect(await firstSearchedItem.getText()).toEqual('Minsk, Minsk Region, Belarus');
    });

    it('should open weather forecast page for the searched city', async() => {
        const searchField = await element(by.css('input#wuSearch'));
        await searchField.sendKeys('Minsk');
        const searchResultDropdown = await element(by.css('search-autocomplete ul.ui-autocomplete'));
        await browser.wait(EC.visibilityOf(searchResultDropdown), 5000);
        const firstSearchedCity = await element(by.xpath('//li[contains(@class, "is-city") and contains(@class, "selected")]//a'));
        await firstSearchedCity.click();
        await browser.waitForAngularEnabled(false);
        expect(await browser.getCurrentUrl()).toEqual('https://www.wunderground.com/weather/by/minsk');
    });

    it('should show current temperature converted from Farehnheit into Celsius', async() => {
        await browser.get('https://www.wunderground.com/weather/by/minsk');
        await browser.waitForAngularEnabled(false);
        let currentTempInFarenheit = await element(by.css('div.current-temp span.wu-value'));
        const fahrenheitToCelsius = fahrenheit => (fahrenheit - 32) * 5 / 9;
        expect(fahrenheitToCelsius(await currentTempInFarenheit.getText())).toBeTruthy();
    });
})