import { Matrix4 } from '../math/math'
import Transform from '../math/transform'

/*
    * Creates a perspective camea
    * @param { Object } props      - camera config object
    * @param { number } props.fov  - Field Of View
    * @param { number } props.near - Near
    * @param { number } props.far  - Far
*/
export default class PerspectiveCamera {
    constructor (gl, props = {}) {
        this.projectionMatrix = new Float32Array(16)

        const fov  = props.fov  || 45
        const near = props.near || 0.1
        const far  = props.far  || 100

        this.MODE_FREE  = 0
        this.MODE_ORBIT = 1

        const ratio = gl.canvas.width / gl.canvas.height
        Matrix4.perspective(this.projectionMatrix, fov, ratio, near, far)

        this.transform = new Transform() // transform to control the position of the camera
        this.viewMatrix = new Float32Array(16) // inverse matrix of the transform

        this.mode = this.MODE_ORBIT // what sort of ctrl mode to use
    }

    panX (val) {
        if (this.mode === this.MODE_ORBIT) return
        this.updateViewMatrix()
        this.transform.position.x += this.transform.right[0] * val
        this.transform.position.y += this.transform.right[1] * val
        this.transform.position.z += this.transform.right[2] * val
    }

    panY (val) {
        this.updateViewMatrix()
        this.transform.position.y += this.transform.up[1] * val
        if (this.mode === this.MODE_ORBIT) return // can only move up and down the y axis in orbit mode
        this.transform.position.x += this.transform.up[0] * val
        this.transform.position.z += this.transform.up[2] * val
    }

    panZ (val) {
        this.updateViewMatrix()
        if (this.mode === this.MODE_ORBIT) {
            this.transform.position.z += v 
        } else {
            this.transform.position.x += this.transform.forward[0] * val
            this.transform.position.y += this.transform.forward[1] * val
            this.transform.position.z += this.transform.forward[2] * val
        }
    }

    updateViewMatrix () {
        if (this.mode === this.MODE_FREE) {
            this.transform.matView.reset()
                .vtranslate(this.transform.position)
                .rotateX(this.transform.rotation.x * Transform.deg2Rad)
                .rotateY(this.transform.rotation.y * Transform.deg2Rad)
        } else {
            this.transform.matView.reset()
                .rotateX(this.transform.rotation.x * Transform.deg2Rad)
                .rotateY(this.transform.rotation.y * Transform.deg2Rad)
                .vtranslate(this.transform.position)
        }
        this.transform.updateDirection()
        
        // !!! Important !!!
        // the camera works by doing the inverse transformation on all meshes!!
        // the camera itself is a lie!!!   
        Matrix4.invert(this.viewMatrix, this.transform.matView.raw)
        return this.viewMatrix
    }

}