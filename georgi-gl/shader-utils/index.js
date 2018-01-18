import * as constants from '../core/gl-constants'

export const makeShader = (gl, type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader

    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}

export const makeProgram = (gl, vertexShader, fragmentShader, doValidate = false) => {
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
