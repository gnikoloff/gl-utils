export default class RenderLoop {
    constructor (fps) {
        this.oldTime = 0
        this.updateAnimationFrame = this.updateAnimationFrame.bind(this)

        this.cb = null
    }
    start (cb) {
        this.cb = cb
        this.updateAnimationFrame()
    }
    stop (cb) {
        window.cancelAnimationFrame(this.rAf)
        if (cb) cb()
        this.cb = null
    }
    updateAnimationFrame () {
        this.rAf = window.requestAnimationFrame(this.updateAnimationFrame)
        const currentTime = performance.now() / 1000
        const deltaTime = currentTime - this.oldTime    
        this.oldTime = currentTime
        
        this.cb(deltaTime)
    }
}