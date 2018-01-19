import GLInstance from './core/gl-instance'
import RenderLoop from './core/render-loop'
import PerspectiveCamera from './core/perspective-camera'
import CameraController from './core/camera-controller'

import GridHelper from './mesh-3d/helper'

let w = window.innerWidth
let h = window.innerHeight

const canvas = document.createElement('canvas')

const renderLoop = new RenderLoop(true)
const glInstance = new GLInstance(canvas).setSize(w, h).clear()
const gl = glInstance.getContext()

const camera = new PerspectiveCamera(gl)
camera.transform.position.set(0, 0.5, 2)
const cameraCtrl = new CameraController(gl, camera)

GridHelper.init(gl, camera)

renderLoop.start((deltaFrame) => {
    glInstance.clear()    
    GridHelper.renderFrame(deltaFrame)
})