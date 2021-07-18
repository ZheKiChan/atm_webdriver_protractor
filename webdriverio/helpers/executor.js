class Executor {
    constructor() {

    }

    async executeScript(scriptToExecute) {
        await browser.execute(scriptToExecute);
    }

    async reloadBrowser() {
        await browser.reloadSession();
    }

    async highlightElements() {
        await browser.execute(() => {
            let navBar = document.querySelectorAll('div._2pg46b7pEErCqdM94TauPn._1Jgi-iThA_rypFPea4PKva');
            navBar.forEach((el) => {
                el.style.background = 'yellow';
            })
        })
    }
}

module.exports = Executor;