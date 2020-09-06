import Game from '/game.js'

export default class Interface {
    constructor() {
        this.mainMenu = document.querySelector('[data-slide="main-menu"]');
        this.twoPlayersMenu = document.querySelector('[data-slide="two-players-menu"]');
        this.playerBotMenu = document.querySelector('[data-slide="player-bot-menu"]');
        this.scores = document.querySelector('[data-slide="scores"]');
        this.game = document.querySelector('[data-slide="game"]');

        this.playerVsPlayerButton = document.querySelector('[data-change-slide="two-players-menu"]');
        this.playerVsComputerButton = document.querySelector('[data-change-slide="player-bot-menu"]');
        this.scoresButton = document.querySelector('[data-change-slide="scores"]');

        this.leftArrowTwoPlayersButton = document.querySelector('div.two-players-menu [data-change-slide="main-menu"]');
        this.rightArrowTwoPlayersButton = document.querySelector('div.two-players-menu [data-change-slide="game"]');

        this.leftArrowPlayerComputerButton = document.querySelector('div.player-bot-menu [data-change-slide="main-menu"]');
        this.rightArrowPlayerComputerButton = document.querySelector('div.player-bot-menu [data-change-slide="game"]');

        this.buttons = [this.playerVsPlayerButton, this.playerVsComputerButton, this.scoresButton, this.leftArrowTwoPlayersButton, this.rightArrowTwoPlayersButton, this.leftArrowPlayerComputerButton, this.rightArrowPlayerComputerButton]

        this.slides = [this.mainMenu, this.twoPlayersMenu, this.playerBotMenu, this.scores, this.game];

        this.buttons.forEach(button => {
            button.addEventListener('click', this.changeSlide.bind(this));
        });

        this.startGame();
    }

    changeSlide(event) {
        console.log(this.slides);
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        this.slides.forEach(slide => {
            if (slide.getAttribute('data-slide') === event.target.getAttribute('data-change-slide')) {
                slide.classList.add('active');

                if (slide.getAttribute('data-slide') === 'game') this.startGame();
            }
        });
    }

    startGame() {
        const game = new Game();
    }
}