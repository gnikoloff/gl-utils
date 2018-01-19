export default `#version 300 es
    layout(location=0) in vec3 a_position;
    layout(location=4) in float a_color; // color index at 4th position of position buffer.

    uniform mat4 u_perspectiveMatrix;
    uniform mat4 u_modelViewMatrix;
    uniform mat4 u_cameraMatrix;

    uniform vec3 u_color[4];

    out vec4 v_color;

    void main () { 
        v_color = vec4(u_color[int(a_color)], 1.0);
        gl_Position = u_perspectiveMatrix * u_cameraMatrix * u_modelViewMatrix * vec4(a_position, 1.0);
    }
`