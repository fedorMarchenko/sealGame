class Collectable {
    constructor(game) {
        this.score = 1
        this.frameX = 0
        this.frameY = 0
        this.fps = 10
        this.frameInterval = 1000 / this.fps
        this.frameTimer = 0
        this.markedForDeletion = false
    }
    update(deltaTime) {
        //movement
        this.x = this.x + this.speedX - this.game.speed
        this.y += this.speedY
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if (this.frameX < this.maxFrame)
                this.frameX++
            else
                this.frameX = 0
        } else
            this.frameTimer += deltaTime
        // check if off screen
        if (this.x + this.width < 0)
            this.markedForDeletion = true
    }
    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
        }
        context.drawImage(this.image, this.frameX * this.spriteWidth + this.sourseFrameX, this.sourseFrameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

class Fish extends Collectable {
    constructor(game) {
        super()
        this.game = game
        this.spriteWidth = 32
        this.spriteHeight = 22
        this.width = 60
        this.height = 44
        this.x = this.game.width
        this.y = this.game.waterLvl + Math.random() * (this.game.height - this.game.waterLvl - this.height)
        this.speedX = 0
        this.speedY = 0
        this.maxFrame = 2
        this.image = document.getElementById('collectables_fishSheet')
    }
    update(deltaTime) {
        super.update(deltaTime)
        if (this.speedX < 0)
            this.sourseFrameY = this.sourseStraightFrameY
        else
            this.sourseFrameY = this.sourseTurnFrameY
    }
}

export class goldFish extends Fish {
    constructor(game) {
        super(game)
        this.score = 10
        this.sourseStraightFrameY = 168
        this.sourseTurnFrameY = 200
        this.sourseFrameY = this.sourseTurnFrameY
        this.sourseFrameX = 0
        this.angle = 0
        this.va = Math.random() * 0.1 + 0.1
        this.radius = Math.floor(Math.random() * 7)
    }
    update(deltaTime) {
        super.update(deltaTime)
        this.angle += this.va
        this.y += this.radius * Math.sin(this.angle)
        if (this.y < this.game.waterLvl)
            this.y = this.game.waterLvl
        else if (this.y > this.game.height - this.height * 1.5) {
            this.y = this.game.height - this.height * 1.5
        } 
    }
}

export class blackFish extends Fish {
    constructor(game) {
        super(game)
        this.sourseStraightFrameY = 168
        this.sourseTurnFrameY = 200
        this.sourseFrameY = this.sourseStraightFrameY
        this.sourseFrameX = 96
        this.speedX = Math.floor(Math.random() * 8) - 4
    }
    update(deltaTime) {
        super.update(deltaTime)
    }
}

export class whiteFish extends Fish {
    constructor(game) {
        super(game)
        this.sourseStraightFrameY = 168
        this.sourseTurnFrameY = 200
        this.sourseFrameY = this.sourseStraightFrameY
        this.sourseFrameX = 192
        this.speedY = Math.floor(Math.random() * 4)
        this.speedX = Math.floor(Math.random() * 4)
        this.gravity = 0.01
        this.y = Math.random() * this.game.waterLvl
    }
    update(deltaTime) {
        super.update(deltaTime)
        if (this.y < this.game.waterLvl)
            this.speedY += this.gravity
        else
            this.speedY -= this.gravity * 3
    }
}

export class blueFish extends Fish {
    constructor(game) {
        super(game)
        this.sourseStraightFrameY = 40
        this.sourseTurnFrameY = 72
        this.sourseFrameY = this.sourseStraightFrameY
        this.sourseFrameX = 0
        this.direction = Math.random() > 0.5 ? 1 : -1
        this.speedX = Math.floor(Math.random() * 5)
        this.maxSpeed = 6 + Math.floor(Math.random() * 4)
        this.acceleration = 5
        this.time = 0
        this.stunTime = 2000
    }
    update(deltaTime) {
        super.update(deltaTime)
        if (this.x > this.game.width + this.width)
            this.direction = -1
        if (this.time > this.stunTime) {
            if (this.speedX * this.direction < this.maxSpeed)
                this.speedX = this.speedX + this.acceleration / 1000 * deltaTime * this.direction
            else {
                this.speedX = 5
                this.time = 0
            }
        } else
            this.time += deltaTime
    }
}

export class greenFish extends Fish {
    constructor(game, speedX, speedY, y) {
        super(game)
        this.speedX = speedX
        this.speedY = speedY
        this.y = y + Math.random() * this.height * 2
        this.x = this.x + Math.random() * this.width * 2
        this.sourseStraightFrameY = 40
        this.sourseTurnFrameY = 72
        this.sourseFrameY = this.sourseStraightFrameY
        this.sourseFrameX = 96
    }
}

export class greenLightFish extends Fish {
    constructor(game, speedX, speedY, y) {
        super(game)
        this.speedX = speedX
        this.speedY = speedY
        this.y = y + Math.random() * this.height * 2
        this.x = this.x + Math.random() * this.width * 2
        this.sourseStraightFrameY = 168
        this.sourseTurnFrameY = 200
        this.sourseFrameY = this.sourseStraightFrameY
        this.sourseFrameX = 288
    }
}

export class redFish extends Fish {
    constructor(game) {
        super(game)
        this.sourseStraightFrameY = 40
        this.sourseTurnFrameY = 72
        this.sourseFrameY = this.sourseStraightFrameY
        this.sourseFrameX = 192
        this.acceleration = 5
        this.direction = Math.random() > 0.5 ? 1 : -1
    }
    update(deltaTime) {
        super.update(deltaTime)
        this.speedY += this.acceleration / 1000 * deltaTime * this.direction
        if (this.y > this.game.height - this.height - this.height / 2) {
            this.speedY = Math.min(this.speedY, 0)
            this.direction = -1
        } else if (this.y < this.game.waterLvl + this.height / 2) {
            this.speedY = Math.max(this.speedY, 0)
            this.direction = 1
        } 
    }
}

export class grayFish extends Fish {
    constructor(game) {
        super(game)
        this.sourseStraightFrameY = 40
        this.sourseTurnFrameY = 72
        this.sourseFrameY = this.sourseStraightFrameY
        this.sourseFrameX = 288
        this.speedY = Math.floor(Math.random() * 4)
        this.speedX = Math.floor(Math.random() * 4)
        this.gravity = 0.01
        this.y = Math.random() * this.game.waterLvl
    }
    update(deltaTime) {
        super.update(deltaTime)
        if (this.y < this.game.waterLvl)
            this.speedY += this.gravity
        else
            this.speedY -= this.gravity * 3
    }
}