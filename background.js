class Layer {
    constructor(game, sourceX, sourceY, sourceWidth, sourceHeight, width, height, speedModifier, image) {
        this.game = game
        this.sourceX = sourceX
        this.sourceY = sourceY
        this.sourceWidth = sourceWidth
        this.sourceHeight = sourceHeight
        this.width = width
        this.height = height
        this.speedModifier = speedModifier
        this.image = image
        this.x = 0
        this.y = 0
    }
    update() {
        if (this.x < -this.width)
            this.x = 0
        else
            this.x -= this.game.speed * this.speedModifier
    }
    draw(context) {
        context.drawImage(this.image, this.sourceX, this.sourceY, this.sourceWidth, this.sourceHeight, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.sourceX, this.sourceY, this.sourceWidth, this.sourceHeight, this.x + this.width, this.y, this.width, this.height)
    }
}

export class Background {
    constructor(game) {
        this.game = game
        this.width = 1667
        this.height = 500
        this.backgroundImage = document.getElementById('background')
        this.layer1 = new Layer(this.game, 73, 2763, 6925 - 73, 3373 - 2763, this.width, this.height, 0.6, this.backgroundImage)
        this.backgroundLayers = [this.layer1]
    }
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update()
        })
    }
    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context)
        })
    }
    restart() {
        this.backgroundLayers.forEach(layer => {
            layer.x = 0
            layer.y = 0
        })
    }
}