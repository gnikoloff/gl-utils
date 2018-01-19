import { makeProgram } from './shaders/utils'
import GLInstance from './core/gl-instance'

import Shader from './shaders/shader'
import Model from './meshes/model'
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

class TestShader extends Shader {
    constructor (gl) {
        super(gl, vertexShaderSource, fragmentShaderSource)

        this.uniformLocations.u_pointSize = gl.getUniformLocation(this.program, 'u_pointSize')
        this.uniformLocations.u_angle     = gl.getUniformLocation(this.program, 'u_angle')

        // lets unbind 
        gl.useProgram(null)
    }
    set (size, angle) {
        this.gl.uniform1f(this.uniformLocations.u_pointSize, size)
        return this
    }
}

let w = window.innerWidth
let h = window.innerHeight
let oldTime = 0

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const renderLoop = new RenderLoop()
const glInstance = new GLInstance(canvas).setSize(w / 3, h / 3).clear()
const gl = glInstance.getContext()
const program = makeProgram(gl, vertexShaderSource, fragmentShaderSource)

// There are many instances when we want a single mesh object shared between many models, for example trees.
// One mesh with many transforms essentialy
const shader = new TestShader(gl)
const mesh = glInstance.createMeshVAO({
    name: 'dots',
    drawMode: 'POINTS',
    verticesArray: [ 0.0, 0.0, 0.0, -0.1, 0.1, 0.0, 0.1, 0.1, 0.0, 0.1, -0.1, 0.0, -0.1, -0.1, 0.0 ]
})
const model = new Model(mesh)

renderLoop.start((deltaTime) => {
    glInstance.clear()    

    shader.activate().set(20, 1).renderModel(model)
})