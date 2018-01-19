import * as constants from '../core/gl-constants'

export default class GridAxis {
    constructor (gl, props = {}) {
        this.width    = props.width    || 1.85
        this.linesNum = props.linesNum || 2
        this.showAxis = props.showAxis || true

        const vertexArray = this.makeVertexArray()
        
        const attribColorLocation = 4
        const mesh = { drawMode: gl.LINES, vao: gl.createVertexArray() }

        mesh.vertexComponentsLen = 4
        mesh.vertexCount = vertexArray.length / mesh.vertexComponentsLen
        const stride = Float32Array.BYTES_PER_ELEMENT * mesh.vertexComponentsLen

        // setup buffer for both positon and colorLocation
        mesh.vertexBuffer = gl.createBuffer()
        gl.bindVertexArray(mesh.vao)
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW)
        
        gl.enableVertexAttribArray(constants.ATTR_POSITION_LOC)
        gl.enableVertexAttribArray(attribColorLocation)

        gl.vertexAttribPointer(
            constants.ATTR_POSITION_LOC,         // attrib location
            3,                                   // how big is the vector by number count
            gl.FLOAT,                            // what type of number are we passing in
            false,                               // does it have to be normalized? 
            stride,                              // how big is a vertex chunk of data
            0                                    // offset by how much
        )

        gl.vertexAttribPointer(
            attribColorLocation,                 // new shader has 'in float a_color' as the second attrib
            1,                                   // the attrib is just a single float
            gl.FLOAT,                    
            false, 
            stride,
            Float32Array.BYTES_PER_ELEMENT * 3   // skip the first 3 float in our vertex chunk
        )

        // cleanup
        gl.bindVertexArray(null)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        gl.instance.meshesCache['grid'] = mesh

        return mesh

    }

    makeVertexArray () {
        const verts    = []
        const width    = this.width
        const linesNum = this.linesNum
        const step     = width / linesNum
        const half     = width / 2

        for (let i = 0; i <= linesNum; i += 1) {
            
            // x, y, z, colorIndex
            let p = -half + i * step
            verts.push(
                p, 0, half, 0,
                p, 0, -half, 0
            )

            // horizontal line
            // x, y, z, colorIndex
            p = half - i * step
            verts.push(
                -half, 0, p, 0,
                half, 0, p, 0
            )

        }

        if (this.showAxis) {
            verts.push(
                -half * 0.5, 0,           0,          1,
                 half * 0.5, 0,           0,          1,
                 0,         -half * 0.5,  0,          3,
                 0,          half * 0.5,  0,          3,
                 0,          0,          -half * 0.5, 2,
                 0,          0,           half * 0.5, 2
            )
        }

        return verts
    }

}