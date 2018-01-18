export default class GLInstance {
    constructor (canvas) {
        this.canvas = canvas
        this.gl     = canvas.getContext('webgl2')

        this.gl.clearColor(1.0, 1.0, 1.0, 1.0)
    }

    createArrayBuffer (floatArr, isStatic = true) {
        const { gl } = this
        const buffer = gl.createBuffer()
        const drawType = isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, floatArr, drawType)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        return buffer
    }

    getContext () {
        return this.gl
    }
    clear () {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT) 
        return this
    }
    setSize (w, h) {
        const dpr = window.devicePixelRatio || 1.0
        this.canvas.style.width  = `${w}px`
        this.canvas.style.height = `${h}px`
        this.canvas.width  = w * dpr
        this.canvas.height = h * dpr
        this.gl.viewport(0, 0, w * dpr, h * dpr)
        return this
    }
}