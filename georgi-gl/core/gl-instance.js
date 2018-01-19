import * as constants from './constants'

export default class GLInstance {
    constructor (canvas, appendToDOM = true) {
        this.canvas = canvas
        this.gl     = canvas.getContext('webgl2')
        
        if (!this.gl) console.error('WebGL2.0 is not supported.')

        if (appendToDOM) document.body.appendChild(this.canvas)

        this.meshesCache = []
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0)

        this.gl.instance = this
    }

    createArrayBuffer (floatArr, isStatic = true) {
        const { gl } = this
        const buffer = gl.createBuffer()
        const drawType = isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, floatArr, drawType)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        return buffer
    }

    /*
        * Turns arrays in to GL buffers
        * Create a new Vertex Array Object to predefine the buffers for standard shader attribs (position, normal, uv, index)
        * VAO will hold all the state needed for a single draw call

        * @param { Object } props - VAO config object
        * @param { string } - Draw mode
        * @param { name } props.name - VAO identifier
        * @param { array } props.verticesArray - array of vertices
        * @param { array } props.normalsArray - array of normals 
        * @param { array } props.uvsArray - array of uvs 
        * @param { array } props.indexesArray - array of indexes
    */
    createMeshVAO (props) {
        const { gl } = this
        const rtn = { drawMode: this.gl[props.drawMode] }

        rtn.vao = gl.createVertexArray()
        gl.bindVertexArray(rtn.vao)
        
        // Set up position
        if (props.verticesArray !== undefined && props.verticesArray != null) {
            rtn.vertexBuffer = gl.createBuffer()
            rtn.vertexComponentLen = 3
            rtn.vertexCount = props.verticesArray.length / rtn.vertexComponentLen

            gl.bindBuffer(gl.ARRAY_BUFFER, rtn.vertexBuffer)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(props.verticesArray), gl.STATIC_DRAW)
            gl.enableVertexAttribArray(constants.ATTR_POSITION_LOC)
            gl.vertexAttribPointer(constants.ATTR_POSITION_LOC, rtn.vertexComponentLen, gl.FLOAT, false, 0, 0)
        }

        // Set up normal
        if (props.normalsArray !== undefined && props.normalsArray != null) {
            rtn.normalsBuffer = gl.createBuffer()
            rtn.normalComponentLen = 3
            rtn.normalCount = props.normalsArray.length / rtn.normalComponentLen

            gl.bindBuffer(gl.ARRAY_BUFFER, rtn.normalsBuffer)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(props.normalsArray), gl.STATIC_DRAW)
            gl.enableVertexAttribArray(constants.ATTR_NORMAL_LOC)
            gl.vertexAttribPointer(constants.ATTR_NORMAL_LOC, rtn.normalComponentLen, gl.FLOAT, false, 0, 0)
        }

        // Set up uv
        if (props.uvsArray !== undefined && props.uvsArray != null) {
            rtn.uvsBuffer = gl.createBuffer()
            rtn.uvsComponentLen = 3
            rtn.uvsCount = props.uvsArray.length / rtn.uvsComponentLen

            gl.bindBuffer(gl.ARRAY_BUFFER, rtn.uvsBuffer)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(props.uvsArray), gl.STATIC_DRAW)
            gl.enableVertexAttribArray(constants.ATTR_UV_LOC)
            gl.enableVertexAttribArray(constants.ATTR_UV_LOC, rtn.uvsComponentLen, gl.FLOAT, false, 0, 0)
        }

        // Set up indexes
        if (props.indexesArray !== undefined && props.indexesArray != null) {
            rtn.indexBuffer = gl.createBuffer()
            rtn.indexCount = props.indexesArray.length
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rtn.indexBuffer)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(props.indexesArray), gl.STATIC_DRAW)
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
        }

        // clean up time
        // very important!
        // unbind the VAO
        gl.bindVertexArray(null)
        // unbind any buffers that might be set
        gl.bindBuffer(gl.ARRAY_BUFFER, null)

        this.meshesCache[props.name] = rtn
        return rtn

    }

    // helpers

    getContext () {
        return this.gl
    }
    clear () {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT) 
        return this
    }
    setSize (w, h) {
        const dpr = window.devicePixelRatio || 1.0
        this.canvas.style.width  = `${w}px`
        this.canvas.style.height = `${h}px`
        this.canvas.width  = w * dpr
        this.canvas.height = h * dpr
        this.gl.viewport(0, 0, w * dpr, h * dpr)
        return this
    }
}