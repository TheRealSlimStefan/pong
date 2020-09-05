import Circle from "/circle.js";
import Rect from "/rect.js";

export default class Game {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.keyboard = [];

        this.initialize();

        window.addEventListener('keydown', (event) => {
            console.log(event.which);
            if (!this.keyboard.includes(event.which)) this.keyboard.push(event.which);
        });

        window.addEventListener('keyup', (event) => {
            while (this.keyboard.includes(event.which)) {
                console.log(this.keyboard.indexOf(event.which));
                this.keyboard.splice(this.keyboard.indexOf(event.which), 1);
            }
        });
    }

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
        const ballSpeedX = 1;
        const ballSpeedY = 1;
        const ballColor = "white";

        this.playersSpeed = 4;

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
        this.animation();
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.background.color;
        this.context.fillRect(
            this.background.x,
            this.background.y,
            this.background.width,
            this.background.height
        );
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = this.line.color;
        this.context.fillRect(
            this.line.x,
            this.line.y,
            this.line.width,
            this.line.height
        );
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = this.playerOne.color;
        this.context.fillRect(
            this.playerOne.x,
            this.playerOne.y,
            this.playerOne.width,
            this.playerOne.height
        );
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = this.playerTwo.color;
        this.context.fillRect(
            this.playerTwo.x,
            this.playerTwo.y,
            this.playerTwo.width,
            this.playerTwo.height
        );
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = this.ball.color;
        this.context.arc(this.ball.x, this.ball.y, this.ball.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    }

    update() {
        this.keyboard.forEach(key => {
            if (key === 87) {
                if (this.playerOne.y > 5)
                    this.playerOne.y -= this.playersSpeed;
                // console.log('wcisnieto w');
            }

            if (key === 83) {
                if (this.playerOne.y < this.background.height - this.playerOne.height - 5)
                    this.playerOne.y += this.playersSpeed;
                // console.log('wcisnieto s');
            }

            if (key === 38) {
                if (this.playerTwo.y > 5)
                    this.playerTwo.y -= this.playersSpeed;
                // console.log('strzałka góra');
            }

            if (key === 40) {
                if (this.playerTwo.y < this.background.height - this.playerTwo.height - 5)
                    this.playerTwo.y += this.playersSpeed;
                // console.log('strzałka dół');
            }
        });

        // if(this.ball.x < )
        this.ball.x += this.ball.speedX;
        this.ball.y += this.ball.speedY;

        this.draw();
    }

    animation() {
        this.context.clearRect(this.background.x, this.background.y, this.background.width, this.background.height);

        this.update();

        // console.log('kolejna klatka animacji');

        requestAnimationFrame(() => {
            this.animation();
        });
    }
}