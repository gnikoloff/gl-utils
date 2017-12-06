import Plane from './webgl-utils/geometries/plane'
import Circle from './webgl-utils/geometries/circle'

let w = window.innerWidth
let h = window.innerHeight

const canvas = document.createElement('canvas')
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

canvas.width = w
canvas.height = h
document.body.appendChild(canvas)

const plane = new Plane(gl, {
    x: 0,
    y: 0,
    width: w,
    height: h,
    drawMode: gl.TRIANGLES,
    vertexShader: `
        attribute vec2 a_position;
        attribute vec2 a_uv;

        uniform vec2 u_resolution;

        varying vec2 v_uv;

        void main () {
            vec2 clipSpace = vec2(a_position / u_resolution) * 2.0 - 1.0;
            gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);

            v_uv = a_uv;
        }
    `,
    fragmentShader: `
        precision highp float;

        varying vec2 v_uv;

        void main () {
            gl_FragColor = vec4(v_uv, 0.0, 1.0);
        }
    `
})

const circle = new Circle(gl, {
    x:              w / 2,
    y:              h / 2,
    radius:         200,
    numPoints:      100,
    drawMode:       gl.TRIANGLE_FAN,
    vertexShader:   `
        attribute vec2 a_position;

        uniform vec2 u_resolution;

        void main () {
            vec2 clipSpace = vec2(a_position / u_resolution) * 2.0 - 1.0;
            gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
        }
    `,
    fragmentShader: `
        void main () {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `
})

renderFrame(0)
function renderFrame (ts) {
    requestAnimationFrame(renderFrame)

    gl.viewport(0, 0, w, h)
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    plane.renderFrame(gl)
    circle.rendrFrame(gl)
}