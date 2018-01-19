import Material from '../../materials/helper-material'
import vertexShaderSource from './vertex-shader'
import fragmentShaderSource from './fragment-shader'
console.log(Material)
export default class HelperMaterial extends Material {
    constructor (gl, colorsArray) {
        super(gl, vertexShaderSource, fragmentShaderSource)

        this.uniformLocations.u_color = gl.getUniformLocation(this.program, 'u_color')
        gl.uniform3fv(this.uniformLocations.u_color, colorsArray)

        // lets unbind 
        gl.useProgram(null)
    }
    set (size, angle) {
        this.gl.uniform1f(this.uniformLocations.u_pointSize, size)
        return this
    }
}
