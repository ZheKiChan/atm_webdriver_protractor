const BasePage = require("../page_objects/basePage/basePage");

class Actions {
    constructor() {}

    async rightClickOnTheElement(selectedElement) {
        await selectedElement.click({ button: 'right' });
    }

    async clearInput(inputField) {
        await inputField.clearValue();
    }
}

module.exports = Actions;