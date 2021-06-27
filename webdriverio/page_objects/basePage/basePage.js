class BasePage {
    constructor() {
        this.searchInput = 'input[name="kp_query"]';
    }

    async getCurrentUrl() {
        const currentUrl = await browser.getUrl();
        return currentUrl;
    }

    async openPage(url) {
        return await browser.url(url);
    }

    async getTitle() {
        const title = await browser.getTitle();
        return title;
    }

    async getElement(selector) {
        let selectedElement = await $(selector);
        return selectedElement;
    }

    async inputValue(elem, text) {
        await elem.setValue(text);
    }

    async waitForElemToBeDisplayed(elementToBeDisplayed, milisec) {
        await elementToBeDisplayed.waitForDisplayed(milisec);
    }

    async getText(textOfElement) {
        return await textOfElement.getText();
    }

    async clickOn(elementToClickOn) {
        await elementToClickOn.click();
    }

    async waitUntilLoaded() {
        await browser.waitUntil(() => browser.execute(() => document.readyState === 'complete'), {
            timeout: 60000,
            timeoutMsg: 'Message on failure'
        });
    }
}

module.exports = BasePage;