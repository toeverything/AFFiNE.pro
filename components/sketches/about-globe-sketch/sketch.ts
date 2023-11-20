// @Source: https://github.com/shuding/cobe/tree/main/src
import Phenomenon from 'phenomenon'

import fragment from './shader.frag?raw'
import textureImage from './texture'

export interface Marker {
  location: [number, number]
  size: number
}

export interface COBEOptions {
  width: number
  height: number
  onRender: (state: Record<string, any>) => void
  phi: number
  theta: number
  mapSamples: number
  mapBrightness: number
  mapBaseBrightness?: number
  baseColor: [number, number, number]
  markerColor: [number, number, number]
  glowColor: [number, number, number]
  markers: Marker[]
  diffuse: number
  devicePixelRatio: number
  dark: number
  opacity?: number
  offset?: [number, number]
  scale?: number
  context?: WebGLContextAttributes
}

const OPT_PHI = 'phi'
const OPT_THETA = 'theta'
const OPT_DOTS = 'mapSamples'
const OPT_BASE_COLOR = 'baseColor'
const OPT_MARKER_COLOR = 'markerColor'
const OPT_GLOW_COLOR = 'glowColor'
const OPT_MARKERS = 'markers'
const OPT_MARKERS_NUM = 'markersNum'
const OPT_DIFFUSE = 'diffuse'
const OPT_DPR = 'devicePixelRatio'
const OPT_DARK = 'dark'
const OPT_OFFSET = 'offset'
const OPT_SCALE = 'scale'
const OPT_OPACITY = 'opacity'
const OPT_MAP_BRIGHTNESS = 'mapBrightness'
const OPT_MAP_BASE_BRIGHTNESS = 'mapBaseBrightness'

const OPT_MAPPING = {
  [OPT_PHI]: OPT_PHI,
  [OPT_THETA]: OPT_THETA,
  [OPT_DOTS]: OPT_DOTS,
  [OPT_MAP_BRIGHTNESS]: OPT_MAP_BRIGHTNESS,
  [OPT_BASE_COLOR]: OPT_BASE_COLOR,
  [OPT_MARKER_COLOR]: OPT_MARKER_COLOR,
  [OPT_GLOW_COLOR]: OPT_GLOW_COLOR,
  [OPT_DIFFUSE]: OPT_DIFFUSE,
  [OPT_DARK]: OPT_DARK,
  [OPT_OFFSET]: OPT_OFFSET,
  [OPT_SCALE]: OPT_SCALE,
  [OPT_OPACITY]: OPT_OPACITY,
  [OPT_MAP_BASE_BRIGHTNESS]: OPT_MAP_BASE_BRIGHTNESS,
}

const { PI, sin, cos } = Math

const mapMarkers = (markers: Marker[]) => {
  return [].concat(
    // @ts-ignore
    ...markers.map((m) => {
      let [a, b] = m.location
      a = (a * PI) / 180
      b = (b * PI) / 180 - PI
      const cx = cos(a)
      return [-cx * cos(b), sin(a), cx * sin(b), m.size]
    }),
    // Make sure to fill zeros
    [0, 0, 0, 0]
  )
}

export default (canvas: HTMLCanvasElement, opts: COBEOptions): Phenomenon => {
  const createUniform = (type: string, name: keyof COBEOptions, fallback?: any) => {
    return {
      type,
      value: typeof opts[name] === 'undefined' ? fallback : opts[name] as any,
    }
  }

  // See https://github.com/shuding/cobe/pull/34.
  const contextType = canvas.getContext("webgl2")
    ? "webgl2"
    : canvas.getContext("webgl")
    ? "webgl"
    : "experimental-webgl";

  const p = new Phenomenon({
    canvas,
    contextType,
    context: {
      alpha: true,
      stencil: false,
      antialias: true,
      depth: false,
      preserveDrawingBuffer: false,
      ...opts.context,
    },
    settings: {
      [OPT_DPR]: opts[OPT_DPR] || 1,
      onSetup: (gl: WebGL2RenderingContext) => {
        const RGBFormat = gl.RGB
        const srcType = gl.UNSIGNED_BYTE
        const TEXTURE_2D = gl.TEXTURE_2D

        const texture = gl.createTexture()
        gl.bindTexture(TEXTURE_2D, texture)
        gl.texImage2D(
          TEXTURE_2D,
          0,
          RGBFormat,
          1,
          1,
          0,
          RGBFormat,
          srcType,
          new Uint8Array([0, 0, 0, 0])
        )

        const image = new Image()
        image.onload = () => {
          gl.bindTexture(TEXTURE_2D, texture)
          gl.texImage2D(TEXTURE_2D, 0, RGBFormat, RGBFormat, srcType, image)

          gl.generateMipmap(TEXTURE_2D)

          const program = gl.getParameter(gl.CURRENT_PROGRAM)
          const textureLocation = gl.getUniformLocation(
            program,
            'uTexture'
          )
          gl.texParameteri(TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
          gl.texParameteri(TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
          gl.uniform1i(textureLocation, 0)
        }
        image.src = textureImage
      },
    },
  })

  p.add('', {
    vertex: `attribute vec3 aPosition;uniform mat4 uProjectionMatrix;uniform mat4 uModelMatrix;uniform mat4 uViewMatrix;void main(){gl_Position=uProjectionMatrix*uModelMatrix*uViewMatrix*vec4(aPosition,1.);}`,
    fragment,
    uniforms: {
      ['uResolution']: {
        type: 'vec2',
        value: [opts.width, opts.height],
      },
      [OPT_PHI]: createUniform('float', OPT_PHI),
      [OPT_THETA]: createUniform('float', OPT_THETA),
      ['dots']: createUniform('float', OPT_DOTS),
      [OPT_MAP_BRIGHTNESS]: createUniform('float', OPT_MAP_BRIGHTNESS),
      [OPT_MAP_BASE_BRIGHTNESS]: createUniform(
        'float',
        OPT_MAP_BASE_BRIGHTNESS,
        0
      ),
      [OPT_BASE_COLOR]: createUniform('vec3', OPT_BASE_COLOR),
      [OPT_MARKER_COLOR]: createUniform('vec3', OPT_MARKER_COLOR),
      [OPT_DIFFUSE]: createUniform('float', OPT_DIFFUSE),
      [OPT_GLOW_COLOR]: createUniform('vec3', OPT_GLOW_COLOR),
      [OPT_DARK]: createUniform('float', OPT_DARK),
      [OPT_MARKERS]: {
        type: 'vec4',
        value: mapMarkers(opts[OPT_MARKERS]),
      },
      [OPT_MARKERS_NUM]: {
        type: 'float',
        value: opts[OPT_MARKERS].length as any,
      },
      [OPT_OFFSET]: createUniform('vec2', OPT_OFFSET, [0, 0]),
      [OPT_SCALE]: createUniform('float', OPT_SCALE, 1),
      [OPT_OPACITY]: createUniform('float', OPT_OPACITY, 1),
    },
    mode: 4,
    geometry: {
      vertices: [
        { x: -100, y: 100, z: 0 },
        { x: -100, y: -100, z: 0 },
        { x: 100, y: 100, z: 0 },
        { x: 100, y: -100, z: 0 },
        { x: -100, y: -100, z: 0 },
        { x: 100, y: 100, z: 0 },
      ] as any,
    },
    // @ts-ignore
    onRender: ({ uniforms }) => {
      let state = {} as any
      if (opts.onRender) {
        // @ts-ignore
        state = opts.onRender(state) || state
        for (let k in OPT_MAPPING) {
          if (state[k] !== undefined) {
            // @ts-ignore
            uniforms[OPT_MAPPING[k]].value = state[k]
          }
        }
        if (state[OPT_MARKERS] !== undefined) {
          uniforms[OPT_MARKERS].value = mapMarkers(state[OPT_MARKERS])
          uniforms[OPT_MARKERS_NUM].value = state[OPT_MARKERS].length
        }
        if (state.width && state.height) {
          uniforms['uResolution'].value = [state.width, state.height]
        }
      }
    },
  })

  return p
}
