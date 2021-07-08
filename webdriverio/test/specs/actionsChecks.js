const Actions = require('../../helpers/actions');
const BasePage = require('../../page_objects/basePage/basePage');
const HomePage = require('../../page_objects/homePage/homePage.js');
const Executor = require('../../helpers/executor');

describe('Basic checks for newly added actions', () => {
    let homePage, basePage, actions, executor

    beforeEach(() => {
        homePage = new HomePage();
        basePage = new BasePage();
        actions = new Actions();
        executor = new Executor();
    });

    it('should right-click on the selected element', async() => {
        await homePage.openCurrentPage();
        const logonButton = await basePage.getElement('button._3upCsVwB8ncX5nAFH7QnPq');
        await executor.executeScript(() => {
            return document.addEventListener('contextmenu', action => console.log(`The element ${action} was right-clicked!`))
        }, logonButton);
        await actions.rightClickOnTheElement(logonButton);
        await basePage.browserWait(2000);
        await executor.reloadBrowser();
    });

    it('should clear input field', async() => {
        await homePage.openCurrentPage();
        let searchInput = await basePage.getElement(basePage.searchInput);
        await basePage.inputValue(searchInput, 'Shining');
        await basePage.browserWait(3000);
        await actions.clearInput(searchInput);
        await basePage.browserWait(3000);
        let clearedInputField = await basePage.getElementValue(searchInput);
        expect(clearedInputField).toEqual('');
        await executor.reloadBrowser();
    });

    it('should highlight elements', async() => {
        await homePage.openCurrentPage();
        await executor.highlightElements();
        await browser.pause(3000);
    });
})