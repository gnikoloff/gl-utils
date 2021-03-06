import HelpGeometry from './geometry'
import HelperMaterial from '../../materials/helper-material'
import Mesh from '../../core/mesh'

export default class GridHelper {

    constructor (gl, camera, props) {
        this.camera = camera

        this.geometry = new HelpGeometry(gl, { width: props.width, linesNum: props.linesNum })
        this.material = new HelperMaterial(gl, [ 0.75, 0.75, 0.75,  1.0, 0.0, 0.0,  0.0, 1.0, 0.0,  0.0, 0.0, 1.0 ])
        this.material.activate().setPerspective(camera.projectionMatrix).deactivate()
        this.mesh = new Mesh(this.geometry).setPosition(...props.position)
    }

    renderFrame (deltaFrame) {
        this.material
            .activate()
            .setCameraMatrix(this.camera.updateViewMatrix())
            .renderModel(this.mesh.preRender())
            .deactivate()
        return this
    }

}