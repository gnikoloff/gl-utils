// const Stats = require('stats-js')

export default class RenderLoop {
    constructor (debug = true) {
        this.oldTime = 0
        this.updateAnimationFrame = this.updateAnimationFrame.bind(this)

        // do stats-js

        this.cb = null
    }
    start (cb) {
        this.cb = cb
        this.updateAnimationFrame()
    }
    stop () {
        window.cancelAnimationFrame(this.rAf)
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