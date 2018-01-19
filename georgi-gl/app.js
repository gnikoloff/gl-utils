import { makeProgram } from './shaders/utils'
import GLInstance from './core/gl-instance'

import Shader from './shaders/shader'
import Model from './meshes/model'
import Grid from './meshes/grid-axis'
import RenderLoop from './core/render-loop'

const vertexShaderSource = `#version 300 es
    layout(location=0) in vec3 a_position;
    layout(location=4) in float a_color; // color index at 4th position of position buffer.

    uniform mat4 u_modelViewMatrix;
    uniform vec3 u_color[4];

    out vec4 v_color;

    void main () { 
        v_color = vec4(u_color[int(a_color)], 1.0);
        gl_Position = u_modelViewMatrix * vec4(a_position, 1.0);
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
const glInstance = new GLInstance(canvas).setSize(w / 2, h / 2).clear()
const gl = glInstance.getContext()

const shader = new TestShader(gl, [ 1.0, 0.0, 0.0,  0.0, 1.0, 0.0,  0.0, 0.0, 1.0,  0.5, 0.5, 0.0 ])
const gridPrimitive = new Grid(gl, {
    width:    1,
    linesNum: 5
})
const grid = new Model(gridPrimitive)
let time =0 
renderLoop.start((deltaTime) => {
    time += deltaTime
    glInstance.clear()    
    grid
        .setScale(1.2, 1.2, 1.0)
        .setRotation(Math.cos(time * 5.0) * 70.0, 0, Math.sin(time * 5.0) * 45.0)
        .setPosition(Math.cos(time * 5.0) * 0.2, 0, 0)
    shader
        .activate()
        .renderModel(grid.preRender())

})