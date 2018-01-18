import { makeProgram } from './shaders/utils'
import GLInstance from './core/gl-instance'
import Shader from './shaders/shader'
import RenderLoop from './core/render-loop'

const vertexShaderSource = `#version 300 es
    in vec3 a_position;

    uniform float u_pointSize;

    void main () {
        gl_PointSize = u_pointSize;
        gl_Position = vec4(a_position, 1.0);
    }
`
const fragmentShaderSource = `#version 300 es
    precision highp float;
    
    out vec4 finalColor;

    void main () {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist < 0.5) {
            finalColor = vec4(0.0, 0.0, 0.0, 1.0);
        } else {
            discard;
        }
    }
`

let w = window.innerWidth
let h = window.innerHeight
let oldTime = 0

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const renderLoop = new RenderLoop()
const glInstance = new GLInstance(canvas).setSize(w / 3, h / 3).clear()
const gl = glInstance.getContext()
const program = makeProgram(gl, vertexShaderSource, fragmentShaderSource)


gl.useProgram(program)
const a_positionLocation  = gl.getAttribLocation(program, 'a_position')
const u_pointSizeLocation = gl.getUniformLocation(program, 'u_pointSize')
gl.useProgram(null)

const positions = new Float32Array([ 0.0, 0.0, 0.0 ])
const positionBuffer = glInstance.createArrayBuffer(positions)

gl.useProgram(program)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.enableVertexAttribArray(a_positionLocation)
gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0)

class TestShader extends Shader {
    constructor (gl) {
        const vertexShaderSource = ``
        const fragmentShaderSource = ``
        super(gl, vertexShaderSource, fragmentShaderSource)

        this.uniformLocations.u_pointSize = gl.getUniformLocation(this.program, 'u_pointSize')
        // this.uniformLocations.u_angle =
    }
    set (size, angle) {
        
    }
}

renderLoop.start((deltaTime) => {
    gl.uniform1f(u_pointSizeLocation, 200.0)
    glInstance.clear()
    gl.drawArrays(gl.POINT, 0, 1) 
    
})