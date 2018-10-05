attribute vec2 coordinates;
uniform vec4 u_offset;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;

void main(void) {
    gl_Position = vec4(coordinates, 0.0, 1.0) + u_offset;
    v_texcoord = a_texcoord;
}
