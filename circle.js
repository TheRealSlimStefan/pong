import Figure from '/figure.js'

export default class Circle extends Figure {
    constructor(x, y, speedX, speedY, radius, color) {
        super(x, y, color);
        this.speedX = speedX;
        this.speedY = speedY;
        this.radius = radius;
    }
}