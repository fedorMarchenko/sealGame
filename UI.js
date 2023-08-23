export class UI {
    constructor(game) {
        this.game = game
        this.width = this.game.width
        this.heigth = this.game.heigth
        this.controlRadius = 60
        this.directionRadius = 20
        this.fontSize = 30
        this.fontFamily = 'Impact'
        this.livesImage = document.getElementById('lives')
    }
    draw(context, input, canvas) {
        context.save()
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2
        context.shadowColor = 'white'
        context.shadowBlur = 0
        context.font = this.fontSize + 'px ' + this.fontFamily
        context.textAlign = 'left'
        context.fillStyle = this.game.fontColor
        // score
        context.fillText('Score: ' + this.game.score, 20 ,50)
        // lives
        for (let i = 0; i < this.game.lives; i++)
            context.drawImage(this.livesImage, 35 * i + 20, 65, 35, 35)
        // air
        context.fillText('Air:', 20, 135)
        context.fillStyle = "aqua"
        context.shadowColor = 'blue'
        if (this.game.air > 0)
            context.fillRect(80, 115, 1.7 * this.game.air / 100, 20)
        // game over messages
        if (this.game.gameOver) {
            context.textAlign = 'center'
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily
            if (this.game.gameOverCause == 0) {
                context.fillText('Too few fish!', this.game.width * 0.5, this.game.height * 0.5 - 20)
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
                context.fillText('get more fish', this.game.width * 0.5, this.game.height * 0.5 + 20)
                context.fillText('slide to restart', this.game.width * 0.5, this.game.height * 0.5 + 50)
            } else {
                context.fillText('Ran out of oxygen!', this.game.width * 0.5, this.game.height * 0.5 - 20)
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
                context.fillText('breath more often', this.game.width * 0.5, this.game.height * 0.5 + 20)
                context.fillText('slide to restart', this.game.width * 0.5, this.game.height * 0.5 + 50)
            }
        }
        context.restore()
        // handle input
        if (!this.game.gameOver && input.touchActive) {
            let canvasPosition = canvas.getBoundingClientRect()
            let centerX = (input.touchStartCoordinate[0] - canvasPosition.x - 5) * this.width / (canvasPosition.width - 10)
            let centerY = (input.touchStartCoordinate[1] - canvasPosition.y - 5) * this.width / (canvasPosition.width - 10)
            let centerXsmall = centerX
            let centerYsmall = centerY

            let x = input.touchCurrentCoordinate[0] - input.touchStartCoordinate[0]
            let y = input.touchCurrentCoordinate[1] - input.touchStartCoordinate[1]
            let len = Math.sqrt(x * x + y * y)
            centerXsmall = centerXsmall + x / len * (len > 60 ? 60 : len)
            centerYsmall = centerYsmall + y / len * (len > 60 ? 60 : len)

            context.save()
            context.beginPath();
            context.arc(centerX, centerY, this.controlRadius, 0, 2 * Math.PI, false);
            context.globalAlpha = 0.5
            context.fillStyle = 'white';
            context.fill();
            context.lineWidth = 5;
            context.globalAlpha = 1
            context.strokeStyle = 'gray';
            context.stroke();
            context.restore()

            context.save()
            context.beginPath();
            context.arc(centerXsmall, centerYsmall, this.directionRadius, 0, 2 * Math.PI, false);
            context.globalAlpha = 0.7
            context.fillStyle = 'gray';
            context.fill();
            context.lineWidth = 5;
            context.globalAlpha = 1
            context.strokeStyle = 'gray';
            context.stroke();
            context.restore()
        }
    }
}