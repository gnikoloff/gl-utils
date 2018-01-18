import { makeProgram } from './utils'

export default class Shader {
    constructor (gl, vertexShaderSource, fragmentShaderSource) {
        this.program = makeProgram(gl, vertexShaderSource, fragmentShaderSource)

        if (this.program) {
            this.gl = gl
            gl.useProgram(this.program)
            this.attribLocations = getStandardAttribLocations(gl, this.program)
            this.uniformLocations = {} // todo

        }
    }

    init () {}

    renderModel () {}

    activate () {
        this.gl.useProgram(this.program)
        return this
    }

    deactivate () {
        this.gl.useProgram(null)
        return this
    }

    // for when the shader is no longer needed
    dispose () {
        if (this.gl.getParameter(this.gl.CURRENT_PROGRAM) === this.program) this.gl.useProgram(null)
        this.gl.deleteProgram(this.program)
    }

}