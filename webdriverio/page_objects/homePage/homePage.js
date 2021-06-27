"use strict"
const BasePage = require('../basePage/basePage');


class HomePage extends BasePage {
    constructor() {
        super();
        this.url = 'https://www.kinopoisk.ru';
        this.title = 'КиноПоиск. Все фильмы планеты.';
    }

    async openCurrentPage() {
        return await super.openPage(this.url);
    }

}

module.exports = HomePage;