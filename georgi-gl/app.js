import GLInstance from './core/gl-instance'
import { makeShader, makeProgram } from './gl-utils'

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

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const glInstance = new GLInstance(canvas).setSize(w / 3, h / 3).clear()
const gl = glInstance.getContext()

const vertexShader   = makeShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
const program        = makeProgram(gl, vertexShader, fragmentShader)

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

onRenderFrame()
function onRenderFrame () {
    const newTime = window.performance.now() / 1000
    const delta = newTime - oldTime
    oldTime = newTime

    window.requestAnimationFrame(onRenderFrame)
    
    gl.uniform1f(u_pointSizeLocation, 5.0 + Math.sin(oldTime) * 50.0)
    glInstance.clear()
    gl.drawArrays(gl.POINT, 0, 1)    
}