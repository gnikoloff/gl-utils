import { 
    makeProgram, 
    getStandardAttribLocations,
    getStandardUniformLocations
} from './utils'

export default class Shader {
    constructor (gl, vertexShaderSource, fragmentShaderSource) {
        this.program = makeProgram(gl, vertexShaderSource, fragmentShaderSource)

        if (this.program) {
            this.gl = gl
            gl.useProgram(this.program)

            this.attribLocations  = getStandardAttribLocations(gl, this.program)
            this.uniformLocations = getStandardUniformLocations(gl, this.program)

        }
    }

    setPerspective (matrix) {
        this.gl.uniformMatrix4fv(this.uniformLocations.perspective, false, matrix)
        return this
    }

    setModelMatrix (matrix) {
        this.gl.uniformMatrix4fv(this.uniformLocations.modelMatrix, false, matrix)
        return this
    }

    setCameraMatrix (matrix) {
        this.gl.uniformMatrix4fv(this.uniformLocations.cameraMatrix, false, matrix)
        return this
    }

    // rendering
    preRender () {

    }

    renderModel (model) {
        this.setModelMatrix(model.transform.getViewMatrix())

        this.gl.bindVertexArray(model.mesh.vao)
        if (model.mesh.indexCount) {
            this.gl.drawElements(model.mesh.drawMode, model.mesh.indexCount, gl.UNSIGNED_SHORT, 0)
        } else {
            this.gl.drawArrays(model.mesh.drawMode, 0, model.mesh.vertexCount)
        }
        this.gl.bindVertexArray(null)
        
        return this
    }

    // utils

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