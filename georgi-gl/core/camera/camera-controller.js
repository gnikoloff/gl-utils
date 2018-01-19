export default class CameraController {
    constructor (gl, camera) {
        const bbox = gl.canvas.getBoundingClientRect()
        
        this.canvas = gl.canvas
        this.camera = camera

        this.rotateRate = -300 // how fast to rotate, degrees per dragging delta
        this.panRate    = 5    // how fast to pan, max unit per dragging delta
        this.zoomDate   = 200  // how fast to zoom in / out

        this.offsetX = bbox.left
        this.offsetY = bbox.top

        this.initX = 0 // start x, y position on mouse down
        this.initY = 0
        this.prevX = 0 // previous x, y position on mouse down
        this.prevY = 0

        this.onMouseDown  = this.onMouseDown.bind(this)
        this.onMouseMove  = this.onMouseMove.bind(this)
        this.onMouseUp    = this.onMouseUp.bind(this)
        this.onMouseWheel = this.onMouseWheel.bind(this)

        this.canvas.addEventListener('mousedown', this.onMouseDown, false)
        this.canvas.addEventListener('mousewheel', this.onMouseWheel, false)
        
    }

    onMouseDown (e) {
        this.initX = this.prevX = e.pageX - this.offsetX
        this.initY = this.prevY = e.pageY - this.offsetY

        this.canvas.addEventListener('mousemove', this.onMouseMove, false)
        this.canvas.addEventListener('mouseup', this.onMouseUp, false)
    }

    onMouseMove (e) {
        const x = e.pageX - this.offsetX
        const y = e.pageY - this.offsetY
        const dx = x - this.prevX
        const dy = y - this.prevY

        if (!e.shiftKey) {
            this.camera.transform.rotation.y += dx * (this.rotateRate / this.canvas.width)
            this.camera.transform.rotation.x += dy * (this.rotateRate / this.canvas.height)
        } else {
            this.camera.panX(-dx * (this.panRate / this.canvas.width))
            this.camera.panY( dy * (this.panRate / this.canvas.height))
        }

        this.prevX = x
        this.prevY = y
    }

    onMouseUp (e) {
        this.canvas.removeEventListener('mousemove', this.onMouseMove)
        this.canvas.removeEventListener('mouseup', this.onMouseUp, false)
    }

    onMouseWheel (e) {
        const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
        this.camera.panZ(delta * (this.zoomRate / this.canvas.height))
    }

}