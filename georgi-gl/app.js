import { makeProgram } from './shaders/utils'
import GLInstance from './core/gl-instance'

import Shader from './shaders/shader'
import Model from './meshes/model'
import Grid from './meshes/grid-axis'
import RenderLoop from './core/render-loop'
import PerspectiveCamera from './core/camera/perspective-camera'
import CameraController from './core/camera/camera-controller'

const vertexShaderSource = `#version 300 es
    layout(location=0) in vec3 a_position;
    layout(location=4) in float a_color; // color index at 4th position of position buffer.

    uniform mat4 u_perspectiveMatrix;
    uniform mat4 u_modelViewMatrix;
    uniform mat4 u_cameraMatrix;

    uniform vec3 u_color[4];

    out vec4 v_color;

    void main () { 
        v_color = vec4(u_color[int(a_color)], 1.0);
        gl_Position = u_perspectiveMatrix * u_cameraMatrix * u_modelViewMatrix * vec4(a_position, 1.0);
    }
`
const fragmentShaderSource = `#version 300 es
    precision highp float;
    
    in vec4 v_color;
    out vec4 finalColor;

    void main () {
        finalColor = v_color;
    }
`

class TestShader extends Shader {
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

let w = window.innerWidth
let h = window.innerHeight

const canvas = document.createElement('canvas')

const renderLoop = new RenderLoop()
const glInstance = new GLInstance(canvas).setSize(w, h).clear()
const gl = glInstance.getContext()

const camera = new PerspectiveCamera(gl)
camera.transform.position.set(0, 0.5, 2)
const cameraCtrl = new CameraController(gl, camera)

const shader = new TestShader(gl, [ 0.75, 0.75, 0.75,  1.0, 0.0, 0.0,  0.0, 1.0, 0.0,  0.0, 0.0, 1.0 ])
shader.activate().setPerspective(camera.projectionMatrix).deactivate()
console.log(shader.uniformLocations)

const gridPrimitive = new Grid(gl, { width: 10, linesNum: 5 })
const grid = new Model(gridPrimitive)

let time = 0

renderLoop.start((deltaTime) => {
    time += deltaTime
    
    glInstance.clear()    

    shader
        .activate()
        .setCameraMatrix(camera.updateViewMatrix())
        .renderModel(grid.preRender())
        .deactivate()

})