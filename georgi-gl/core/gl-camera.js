import { Matrix4 } from '../math/math'
import Transform from '../math/transform'

/*
    * Creates a perspective camea

    * @param { Object } props - camera config object
    * @param { number } props.fov - Field Of View
    * @param { number } props.near - Near
    * @param { number } props.far - Far
*/
export default class GLCamera {
    constructor (gl, props = {}) {
        this.projectionMatrix = new Float32Array(16)

        const fov  = props.fov  || 45
        const near = props.near || 0.1
        const far  = props.far  || 100

        const ratio = gl.canvas.width / gl.canvas.height
        Matrix4.perspective(this.projectionMatrix, fov, ratio, near, far)

        this.transform = new Transform() // transform to control the position of the camera
        this.viewMatrix = new Float32Array(16) // inverse matrix of the transform

        this.mode = Camera.MODE_ORBIT // what sort of ctrl mode to use

    }

    panX (val) {
        if (this.mode === Camera.MODE_ORBIT) return
        this.updateViewMatrix()
        this.transform.position.x += this.transform.right[0] * val
        this.transform.position.y += this.transform.right[1] * val
        this.transform.position.z += this.transform.right[2] * val
    }

    panY (val) {
        
    }

}