import Figure from '/figure.js'

export default class Circle extends Figure {
    constructor(x, y, speedX, speedY, radius, color) {
        super(x, y, color);
        this.speedX = speedX;
        this.speedY = speedY;
        this.radius = radius;
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
}