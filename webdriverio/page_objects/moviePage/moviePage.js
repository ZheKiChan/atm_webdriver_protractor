const BasePage = require('../basePage/basePage');

class MoviePage extends BasePage {
    constructor() {
        super()
        this.searchedMovie = 'Дом, который построил Джек';
    }

    async elemIsExisting(elementSelected) {
        return await elementSelected.isExisting();
    }
}

module.exports = MoviePage;