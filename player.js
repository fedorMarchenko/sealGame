export default class Player {
    constructor(game) {
        this.game = game
        this.frameWidth = 188
        this.frameHeight = 86
        this.width = 100
        this.height = 91.3
        this.x = 0
        this.y = this.game.waterLvl + Math.floor((this.game.height - this.game.waterLvl - this.height) * Math.random())
        this.image = document.getElementById('player')
        this.frameX = 0
        this.frameY = 0
        this.fps = 5
        this.frameTimer = 0
        this.frameInterval = 1000 / this.fps
        this.maxFrame = 3
        this.gravity = 0.05
        this.vy = 0
        this.vx = 0
        this.maxSpeed = 5
    }
    update(input, deltaTime) {
        this.checkCollision()
        this.frameTimer += deltaTime
        if (this.y > this.game.waterLvl)
            this.handleInput(input)
        else {
            this.game.air = this.game.maxAir
            this.vy = this.vy + this.gravity
        }
        // horizontal movement
        this.x += this.vx
        // horizontal boundaries
        if (this.x < 0)
            this.x = 0
        if (this.x > this.game.width - this.width)
            this.x = this.game.width - this.width
        // vertical movement
        this.y += this.vy
        // vertical boundaries
        if (this.y > this.game.height - this.height)
            this.y = this.game.height - this.height
        // sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            this.frameY = (this.frameY + 1) % this.maxFrame
        }
    }
    handleInput(input) {
        if (input.touchActive) {
            let x = input.touchCurrentCoordinate[0] - input.touchStartCoordinate[0]
            let y = input.touchCurrentCoordinate[1] - input.touchStartCoordinate[1]
            let len = Math.sqrt(x * x + y * y)
            if (len == 0) {
                this.vx = 0
                this.vy = 0
            } else {
                this.vx = x / len * (len > 60 ? this.maxSpeed : len / 12)
                this.vy = y / len * (len > 60 ? this.maxSpeed : len / 12)
            }
        } else {
            this.vx = 0
            this.vy = 0
        }
    }
    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
        }
        context.drawImage(this.image, this.frameX * this.frameWidth, this.frameY * this.frameHeight, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height)
    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width * 0.8 &&
                enemy.x + enemy.width > this.x + this.width * 0.2 &&
                enemy.y < this.y + this.height * 0.8 &&
                enemy.y + enemy.height > this.y + this.height * 0.2
                ) {
                enemy.markedForDeletion = true
                this.game.lives--
                if (this.game.lives <= 0) {
                    this.game.gameOver = true
                    this.gameOverCause = 0
                }
            }
        })
        this.game.collectables.forEach(collectable => {
            if (
                collectable.x < this.x + this.width &&
                collectable.x + collectable.width > this.x &&
                collectable.y < this.y + this.height &&
                collectable.y + collectable.height > this.y
                ) {
                collectable.markedForDeletion = true
                this.game.score += collectable.score
                if (this.game.lives < this.game.maxLive)
                    this.game.lives++
            }
        })
    }
    restart() {
        this.x = 0
        this.y = this.game.waterLvl + (this.game.height - this.game.waterLvl - this.height) * Math.random()
        this.vy = 0
        this.vx = 0
        this.frameX = 0
        this.frameY = 0
        this.frameTimer = 0
    }
}