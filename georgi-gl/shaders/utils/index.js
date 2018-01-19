import * as constants from '../../core/gl-constants'

const makeShader = (gl, type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader

    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}

// Export methods

export const makeProgram = (gl, vertexShaderSource, fragmentShaderSource, doValidate = false) => {
    const vertexShader = makeShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    const program = gl.createProgram()

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(`Failed to link program:`)
        console.log(gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
        return
    }

    if (doValidate) {
        gl.validateProgram(program)
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            console.error(`Failed to validate the program:`)
            console.log(gl.getProgramInfoLog(program))
            gl.deleteProgram(program)
            return
        }
    }

    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)

    return program
}

// Get the locations of standard attributes that are mostly used.
// Location will be -1 if attribute is not found
export const getStandardAttribLocations = (gl, program) => {
    return {
        position: gl.getAttribLocation(program, constants.ATTR_POSITION_NAME),
        normal:   gl.getAttribLocation(program, constants.ATTR_NORMAL_NAME),
        uvs:      gl.getAttribLocation(program, constants.ATTR_UV_NAME)
    }
}

// Get the locations of standard uniforms that are mostly used.
export const getStandardUniformLocations = (gl, program) => {
    return {
        perspective:  gl.getUniformLocation(program, 'u_perspectiveMatrix'),
        modelMatrix:  gl.getUniformLocation(program, 'u_modelViewMatrix'),
        cameraMatrix: gl.getUniformLocation(program, 'u_cameraMatrix'),
        mainTexture:  gl.getUniformLocation(program, 'u_mainTexture')
    }
}