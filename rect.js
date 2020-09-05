import Figure from '/figure.js'

export default class Rect extends Figure {
    constructor(x, y, width, height, color) {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
        context.closePath();
    }
}