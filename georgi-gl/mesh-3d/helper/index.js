import HelpGeometry from './geometry'
import HelperMaterial from '../../materials/helper-material'
import Mesh from '../../core/mesh'

export default {

    init (gl, camera) {
        this.camera = camera

        this.geometry = new HelpGeometry(gl, { width: 10, linesNum: 5 })
        this.material = new HelperMaterial(gl, [ 0.75, 0.75, 0.75,  1.0, 0.0, 0.0,  0.0, 1.0, 0.0,  0.0, 0.0, 1.0 ])
        this.material.activate().setPerspective(camera.projectionMatrix).deactivate()
        this.grid = new Mesh(this.geometry)
        this.mesh = new Mesh(this.grid)
        return this
    },

    renderFrame (deltaFrame) {
        this.material
            .activate()
            .setCameraMatrix(this.camera.updateViewMatrix())
            .renderModel(this.grid.preRender())
            .deactivate()
        return this
    }

}