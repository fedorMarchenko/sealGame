class Enemy {
    constructor(game) {
        this.markedForDeletion = false
    }
    update(deltaTime) {
        //movement
        this.x -= this.speedX + this.game.speed
        this.y += this.speedY
        // check if off screen
        if (this.x + this.width < 0)
            this.markedForDeletion = true
    }
    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
        }
        context.drawImage(this.image, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

export class Iceberg extends Enemy {
    constructor(game) {
        super()
        this.game = game
        this.spriteX = 2016
        this.spriteY = 52
        this.spriteWidth = 2869 - this.spriteX
        this.spriteHeight = 951 - this.spriteY
        this.width = 120
        this.height = 144
        this.x = this.game.width
        this.y = this.game.waterLvl - this.height + 100 + Math.random() * (this.game.height - this.game.waterLvl + this.height - 100)
        this.image = document.getElementById('iceberg')
        this.speedX = Math.floor(Math.random() * 3) - 1
        this.speedY = 0
    }
    update(deltaTime) {
        super.update(deltaTime)
    }
    draw(context) {
        super.draw(context)
    }
}