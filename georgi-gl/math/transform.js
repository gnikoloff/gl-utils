import { Vector3, Matrix4 } from './math'

export default class Transform {
    constructor () {

        this.deg2Rad = Math.PI / 180

        this.position = new Vector3(0, 0, 0)
        this.rotation = new Vector3(0, 0, 0)
        this.scale    = new Vector3(1, 1, 1)

        this.matView   = new Matrix4()       // cache the result when calling updateMatrix()
        this.matNormal = new Float32Array(9) // this is mat3, raw array to hold the values
                                             // the normal matrix doesn't need position, only scale and rotation
                                             // that's why we drop the position and we have mat3

        this.forward = new Float32Array(4)   // when rotating, keep track of what direction is up
        this.up      = new Float32Array(4)   // up direction, inverse to get bottom
        this.right   = new Float32Array(4)   // right direction, inverse to get left

    }

    updateMatrix () {
        this.matView
            .reset() // order is very important!
            .vtranslate(this.position)
            .rotateX(this.rotation.x * this.deg2Rad)
            .rotateY(this.rotation.y * this.deg2Rad)
            .rotateZ(this.rotation.z * this.deg2Rad)
            .vscale(this.scale)

        // calculate the normal mat, which doesn't need translate
        // transpose and invert from mat4 to mat3
        Matrix4.normalMat3(this.matNormal, this.matView.raw)

        // determine directions after all of the transformations
        Matrix4.transformVec4(this.forward, [ 0, 0, 1, 0 ], this.matView.raw) // z
        Matrix4.transformVec4(this.up,      [ 0, 1, 0, 0 ], this.matView.raw) // y
        Matrix4.transformVec4(this.right,   [ 1, 0, 0, 0 ], this.matView.raw) // x

        return this.matView.raw
    }

    updateDirection () {
        Matrix4.transformVec4(this.forward, [ 0, 0, 1, 0 ], this.matView.raw) // z
        Matrix4.transformVec4(this.up,      [ 0, 1, 0, 0 ], this.matView.raw) // y
        Matrix4.transformVec4(this.right,   [ 1, 0, 0, 0 ], this.matView.raw) // x
        return this
    }

    getViewMatrix () {
        return this.matView.raw
    }

    getNormalMatrix () {
        return this.matNormal
    }

    reset () {
        this.position.set(0, 0, 0)
        this.scale.set(1, 1, 1)
        this.rotation.set(0, 0, 0)
    }

}