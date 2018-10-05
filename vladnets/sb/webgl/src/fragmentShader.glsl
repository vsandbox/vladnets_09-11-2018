precision mediump float;

varying vec2 v_texcoord;
uniform sampler2D u_texture;

void main(void) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
    // gl_FragColor = texture2D(u_texture, v_texcoord);
}