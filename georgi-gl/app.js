import { makeProgram } from './core/shader-utils'
import GLInstance from './core/gl-instance'
import RenderLoop from './core/render-loop'
import PerspectiveCamera from './core/perspective-camera'
import CameraController from './core/camera-controller'
import GridMesh from './mesh-3d/grid-helper'

let w = window.innerWidth
let h = window.innerHeight

const canvas = document.createElement('canvas')

const renderLoop = new RenderLoop()
const glInstance = new GLInstance(canvas).setSize(w, h).clear()
const gl = glInstance.getContext()

const camera = new PerspectiveCamera(gl)
camera.transform.position.set(0, 0.5, 2)
const cameraCtrl = new CameraController(gl, camera)

GridMesh.init(gl, camera)




let time = 0

renderLoop.start((deltaTime) => {
    time += deltaTime
    
    glInstance.clear()    
    GridMesh.renderFrame()
    
})