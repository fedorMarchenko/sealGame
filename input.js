export default class InputHandler {
    constructor(game) {
        this.game = game
        this.keys = []
        this.touchActive = false
        this.touchStartCoordinate = [0, 0]
        this.touchCurrentCoordinate = [0, 0]
        window.addEventListener('touchstart', (e) => {
            this.touchActive = true
            this.touchStartCoordinate = [e.touches[0].clientX, e.touches[0].clientY]
            this.touchCurrentCoordinate = [e.touches[0].clientX, e.touches[0].clientY]
        })
        window.addEventListener('touchmove', (e) => {
            this.touchCurrentCoordinate = [e.touches[0].clientX, e.touches[0].clientY]
        })
        window.addEventListener('touchend', (e) => {
            this.touchActive = false
        })
        window.addEventListener('touchcancel', (e) => {
            this.touchActive = false
        })
        window.addEventListener('keydown', (e) => {
            if (e.key === 'q')
                this.game.debug = !this.game.debu
        })
    }
}