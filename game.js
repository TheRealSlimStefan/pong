import Circle from "/circle.js";
import Rect from "/rect.js";

//class Game which is managing all play
export default class Game {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.temporarySpeedY = null;
        this.keyboard = [];

        this.initialize();

        window.addEventListener('keydown', (event) => {
            if (!this.keyboard.includes(event.which)) this.keyboard.push(event.which);
        });

        window.addEventListener('keyup', (event) => {
            while (this.keyboard.includes(event.which)) {
                this.keyboard.splice(this.keyboard.indexOf(event.which), 1);
            }
        });
    }

    // This function initialize all game, sets all parameters and wait until the game will start
    initialize() {
        this.canvas.width = 640;
        this.canvas.height = 360;

        const backgroundPositionX = 0;
        const backgroundPositionY = 0;
        const backgroundWidth = this.canvas.width;
        const backgroundHeight = this.canvas.height;
        const backgroundColor = "black";

        const lineWidth = 1;
        const lineHeight = this.canvas.height;
        const linePositionX = this.canvas.width / 2 - lineWidth / 2;
        const linePositionY = 0;
        const lineColor = "white";

        const playersColor = "white";
        const playersWidth = 10;
        const playersHeight = 50;

        const playerOnePositionX = 50;
        const playerOnePositionY = this.canvas.height / 2 - playersHeight / 2;

        const playerTwoPositionX = this.canvas.width - 50;
        const playerTwoPositionY = this.canvas.height / 2 - playersHeight / 2;

        const ballRadius = 5;
        const ballPositionX = this.canvas.width / 2;
        const ballPositionY = this.canvas.height / 2;
        const ballSpeedX = 1.5;
        const ballSpeedY = 1.5;
        const ballColor = "white";

        this.playersSpeed = 3.5;

        this.background = new Rect(
            backgroundPositionX,
            backgroundPositionY,
            backgroundWidth,
            backgroundHeight,
            backgroundColor
        );

        this.line = new Rect(
            linePositionX,
            linePositionY,
            lineWidth,
            lineHeight,
            lineColor
        );

        this.playerOne = new Rect(
            playerOnePositionX,
            playerOnePositionY,
            playersWidth,
            playersHeight,
            playersColor
        );

        this.playerTwo = new Rect(
            playerTwoPositionX,
            playerTwoPositionY,
            playersWidth,
            playersHeight,
            playersColor
        );

        this.ball = new Circle(
            ballPositionX,
            ballPositionY,
            ballSpeedX,
            ballSpeedY,
            ballRadius,
            ballColor
        );

        this.draw();

        const startGame = (event) => {
            if (event.which === 32) {
                this.animation();
                window.removeEventListener('keyup', startGame);
            }
        }

        window.addEventListener('keyup', startGame);
    }

    // This function is drawing all elements which will be displayed on the screen
    draw() {
        this.background.draw(this.context);
        this.line.draw(this.context);
        this.playerOne.draw(this.context);
        this.playerTwo.draw(this.context);
        this.ball.draw(this.context);
    }

    // This function actualize all parameters of the elements
    update() {
        const clamp = (min, max, value) => {
            if (value < min) return min;
            else if (value > max) return max;
            else return value;
        }

        this.keyboard.forEach(key => {
            if (key === 87) {
                if (this.playerOne.y > 5)
                    this.playerOne.y -= this.playersSpeed;
            }

            if (key === 83) {
                if (this.playerOne.y < this.background.height - this.playerOne.height - 5)
                    this.playerOne.y += this.playersSpeed;
            }

            if (key === 38) {
                if (this.playerTwo.y > 5)
                    this.playerTwo.y -= this.playersSpeed;
            }

            if (key === 40) {
                if (this.playerTwo.y < this.background.height - this.playerTwo.height - 5)
                    this.playerTwo.y += this.playersSpeed;
            }
        });

        //remove before release my code
        if (this.ball.x + this.ball.radius >= this.background.width || this.ball.x - this.ball.radius <= 0) this.ball.speedX = -this.ball.speedX;

        if (this.ball.y + this.ball.radius >= this.background.height || this.ball.y - this.ball.radius <= 0) this.ball.speedY = -this.ball.speedY;

        let playerOnePointX = clamp(this.playerOne.x, this.playerOne.x + this.playerOne.width, this.ball.x);
        let playerOnePointY = clamp(this.playerOne.y, this.playerOne.y + this.playerOne.height, this.ball.y);

        let playerTwoPointX = clamp(this.playerTwo.x, this.playerTwo.x + this.playerTwo.width, this.ball.x);
        let playerTwoPointY = clamp(this.playerTwo.y, this.playerTwo.y + this.playerTwo.height, this.ball.y);

        let ballDistanceFromPlayerOne = Math.sqrt(Math.pow(playerOnePointX - this.ball.x, 2) + Math.pow(playerOnePointY - this.ball.y, 2)) - this.ball.radius;

        let ballDistanceFromPlayerTwo = Math.sqrt(Math.pow(playerTwoPointX - this.ball.x, 2) + Math.pow(playerTwoPointY - this.ball.y, 2)) - this.ball.radius;

        //playerOne

        if (ballDistanceFromPlayerOne <= 0 && playerOnePointX === this.playerOne.x + this.playerOne.width) {
            if (playerOnePointY < this.playerOne.y + this.playerOne.height / 3) {
                if (this.temporarySpeedY !== null) {
                    this.ball.speedY = Math.abs(this.temporarySpeedY);
                    this.ball.speedY = -this.ball.speedY;
                }
                this.ball.speedX = -this.ball.speedX;
            } else if (playerOnePointY < this.playerOne.y + this.playerOne.height * 2 / 3) {
                this.ball.speedX = -this.ball.speedX;
                if (this.temporarySpeedY === null) {
                    this.temporarySpeedY = this.ball.speedY;
                }
                this.ball.speedY = 0;
            } else if (playerOnePointY < this.playerOne.y + this.playerOne.height) {
                if (this.temporarySpeedY !== null) {
                    this.ball.speedY = Math.abs(this.temporarySpeedY);
                }
                this.ball.speedX = -this.ball.speedX;
            }
        } else if (ballDistanceFromPlayerOne <= 0 && playerOnePointX < this.playerOne.x + this.playerOne.width) {
            this.ball.speedY = -this.ball.speedY;
        }

        //playerTwo

        if (ballDistanceFromPlayerTwo <= 0 && playerTwoPointX === this.playerTwo.x) {
            if (playerTwoPointY < this.playerTwo.y + this.playerTwo.height / 3) {
                if (this.temporarySpeedY !== null) {
                    this.ball.speedY = Math.abs(this.temporarySpeedY);
                    this.ball.speedY = -this.ball.speedY;
                }
                this.ball.speedX = -this.ball.speedX;
            } else if (playerTwoPointY < this.playerTwo.y + this.playerTwo.height * 2 / 3) {
                this.ball.speedX = -this.ball.speedX;
                if (this.temporarySpeedY === null) {
                    this.temporarySpeedY = this.ball.speedY;
                }
                this.ball.speedY = 0;
            } else if (playerTwoPointY < this.playerTwo.y + this.playerTwo.height) {
                if (this.temporarySpeedY !== null) {
                    this.ball.speedY = Math.abs(this.temporarySpeedY);
                }
                this.ball.speedX = -this.ball.speedX;
            }
        } else if (ballDistanceFromPlayerTwo <= 0 && playerTwoPointX > this.playerTwo.x) {
            this.ball.speedY = -this.ball.speedY;
        }

        this.ball.x += this.ball.speedX;
        this.ball.y += this.ball.speedY;

        this.draw();
    }

    // This function is clearing the screen and call function update to display all elements with changed parameters to animate them
    animation() {
        this.context.clearRect(this.background.x, this.background.y, this.background.width, this.background.height);

        this.update();

        requestAnimationFrame(() => {
            this.animation();
        });
    }
}