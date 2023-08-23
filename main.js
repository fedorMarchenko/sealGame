import Player from "./player.js"
import InputHandler from "./input.js"
import { Background } from "./background.js"
import { Iceberg } from "./enemies.js"
import { UI } from "./UI.js"
import { goldFish, blackFish, whiteFish, greenLightFish, blueFish, greenFish, redFish, grayFish } from "./collectables.js"

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 900
    canvas.height = 500

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.waterLvl = 170
            this.background = new Background(this)
            this.player = new Player(this)
            this.input = new InputHandler(this)
            this.UI = new UI(this)
            this.collectables = []
            this.enemies = []
            this.debug = false
            this.speed = 5
            this.enemyTimer = 0
            this.enemyInterval = 1000
            this.collectableTimers = new Array(6).fill(0)
            this.collectableIntervals = new Array(6).fill(1000)
            this.score = 0
            this.maxLive = 5
            this.lives = this.maxLive
            this.maxAir = 15000
            this.air = this.maxAir
            this.gameOver = false
            this.gameOverCause = 0
        }
        update(deltaTime) {
            this.background.update()
            this.player.update(this.input, deltaTime)
            // handleEnemies
            this.enemyTimer += deltaTime
            if (this.enemyTimer > this.enemyInterval) {
                this.enemyTimer = 0
                this.enemyInterval = 500 * (1 + Math.random() * 2)
                this.addEnemy()
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime)
            })
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
            // handleCollectable
            for (let i = 0; i < 6; i++) {
                this.collectableTimers[i] += deltaTime
                if (this.collectableTimers[i] > this.collectableIntervals[i]) {
                    this.collectableTimers[i] = 0
                    this.collectableIntervals[i] = 500 * (1 + Math.random() * 2)
                    this.addCollectable(i)
                }
            }
            this.collectables.forEach(collectable => {
                collectable.update(deltaTime)
            })
            this.collectables = this.collectables.filter(collectable => !collectable.markedForDeletion)
            // handle air
            this.air -= deltaTime
            if (this.air < 0) {
                this.gameOver = true
                this.gameOverCause = 1
            }
        }
        draw(context, canvas) {
            this.background.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
            this.collectables.forEach(collectable => {
                collectable.draw(context)
            })
            this.player.draw(context)
            this.UI.draw(context, this.input, canvas)
        }
        addEnemy() {
            this.enemies.push(new Iceberg(this))
        }
        addCollectable(i) {
            switch (i) {
                case 0:
                    if (Math.random() < 0.25)
                        this.collectables.push(new blueFish(this))
                break;
                case 1:
                    if (Math.random() < 0.20)
                        this.collectables.push(new redFish(this))
                break;
                case 2:
                    if (Math.random() < 0.20)
                        this.collectables.push(new blackFish(this))
                break;
                case 3:
                    if (Math.random() < 0.20) {
                        this.collectables.push(new grayFish(this))
                        this.collectables.push(new whiteFish(this))
                    }
                break;
                case 4:
                    if (Math.random() < 0.05)
                        this.collectables.push(new goldFish(this))
                break;
                case 5:
                    if (Math.random() < 0.05) {
                        let count = 3 + Math.floor(Math.random() * 3)
                        let speedX = Math.floor(Math.random() * 9) - 4
                        let y = this.waterLvl + Math.random() * (this.height - this.waterLvl - 50)
                        let speedY = (Math.random() > 0.5 ?  (this.height - y) : (this.waterLvl - y)) * (this.speed - speedX) / this.width * 0.9
                        for (let i = 0; i < count; i++) {
                            if (Math.random() > 0.5)
                                this.collectables.push(new greenFish(this, speedX, speedY, y))
                            else
                                this.collectables.push(new greenLightFish(this, speedX, speedY, y))
                        }
                    }
                break;
            }
        }
        checkRestart() {
            if (this.input.touchActive) {
                let x = this.input.touchCurrentCoordinate[0] - this.input.touchStartCoordinate[0]
                let y = this.input.touchCurrentCoordinate[1] - this.input.touchStartCoordinate[1]
                let len = Math.sqrt(x * x + y * y)
                if (len > 50) {
                    this.restart()
                    animate(lastTime)
                }
            }
        }
        restart() {
            this.background.restart()
            this.player.restart()
            this.input.touchActive = false
            this.collectables = []
            this.enemies = []
            this.debug = false
            this.enemyTimer = 0
            this.collectableTimer = 0
            this.score = 0
            this.lives = this.maxLive
            this.air = this.maxAir
            this.gameOver = false
            this.gameOverCause = 0
            this.speed = 5
        }
    }

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0

    function animate(timeStamp) {
        let deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        if (deltaTime > 30)
            deltaTime = 30
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx, canvas)
        if (!game.gameOver)
            requestAnimationFrame(animate)
        else {
            game.input.touchActive = false
            handleRestart()
        }
    }

    function handleRestart() {
        if (game.gameOver) {
            game.checkRestart()
            requestAnimationFrame(handleRestart)
        }
    }

    animate(0)
})