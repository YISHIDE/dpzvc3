/**
 * Created by yishide on 16/7/18.
 */
// import Config from '../config/config'
//
// import * as Cache from './cache';

export function camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function findComponentUpward (content, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = content.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

export function findComponentDownward (content, componentName) {
  const childrens = content.$children
  let children = null

  if (childrens.length) {
    childrens.forEach(child => {
      const name = child.$options.name
      if (name === componentName) {
        children = child
      }
    })

    for (let i = 0; i < childrens.length; i++) {
      const child = childrens[i]
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

export function findComponentsDownward (content, componentName, components = []) {
  const childrens = content.$children

  if (childrens.length) {
    childrens.forEach(child => {
      const name = child.$options.name
      const childs = child.$children

      if (name === componentName) components.push(child)
      if (childs.length) {
        const findChilds = findComponentsDownward(child, componentName, components)
        if (findChilds) components.concat(findChilds)
      }
    })
  }
  return components
}

export function randomStr () {
  const len = 32
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const max = chars.length

  let str = ''
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * max))
  }
  return str
}

export const JPEG = {
  // eslint-disable-next-line no-unused-expressions, no-sequences, eqeqeq, no-array-constructor, no-return-assign
  JPEGEncoder: function (a) { function I (a) { let c; let i; let j; let k; let l; let m; let n; let o; let p; const b = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99]; for (c = 0; c < 64; c++)i = d((b[c] * a + 50) / 100), i < 1 ? i = 1 : i > 255 && (i = 255), e[z[c]] = i; for (j = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], k = 0; k < 64; k++)l = d((j[k] * a + 50) / 100), l < 1 ? l = 1 : l > 255 && (l = 255), f[z[k]] = l; for (m = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379], n = 0, o = 0; o < 8; o++) for (p = 0; p < 8; p++)g[n] = 1 / (8 * e[z[n]] * m[o] * m[p]), h[n] = 1 / (8 * f[z[n]] * m[o] * m[p]), n++ } function J (a, b) { let f; let g; let c = 0; let d = 0; const e = []; for (f = 1; f <= 16; f++) { for (g = 1; g <= a[f]; g++)e[b[d]] = [], e[b[d]][0] = c, e[b[d]][1] = f, d++, c++; c *= 2 } return e } function K () { i = J(A, B), j = J(E, F), k = J(C, D), l = J(G, H) } function L () { let c; let d; let e; let a = 1; let b = 2; for (c = 1; c <= 15; c++) { for (d = a; b > d; d++)n[32767 + d] = c, m[32767 + d] = [], m[32767 + d][1] = c, m[32767 + d][0] = d; for (e = -(b - 1); -a >= e; e++)n[32767 + e] = c, m[32767 + e] = [], m[32767 + e][1] = c, m[32767 + e][0] = b - 1 + e; a <<= 1, b <<= 1 } } function M () { for (let a = 0; a < 256; a++)x[a] = 19595 * a, x[a + 256 >> 0] = 38470 * a, x[a + 512 >> 0] = 7471 * a + 32768, x[a + 768 >> 0] = -11059 * a, x[a + 1024 >> 0] = -21709 * a, x[a + 1280 >> 0] = 32768 * a + 8421375, x[a + 1536 >> 0] = -27439 * a, x[a + 1792 >> 0] = -5329 * a } function N (a) { for (let b = a[0], c = a[1] - 1; c >= 0;)b & 1 << c && (r |= 1 << s), c--, s--, s < 0 && (r == 255 ? (O(255), O(0)) : O(r), s = 7, r = 0) } function O (a) { q.push(w[a]) } function P (a) { O(255 & a >> 8), O(255 & a) } function Q (a, b) { let c; let d; let e; let f; let g; let h; let i; let j; let l; let p; let q; let r; let s; let t; let u; let v; let w; let x; let y; let z; let A; let B; let C; let D; let E; let F; let G; let H; let I; let J; let K; let L; let M; let N; let O; let P; let Q; let R; let S; let T; let U; let V; let W; let X; let Y; let Z; let $; let _; let k = 0; const m = 8; const n = 64; for (l = 0; m > l; ++l)c = a[k], d = a[k + 1], e = a[k + 2], f = a[k + 3], g = a[k + 4], h = a[k + 5], i = a[k + 6], j = a[k + 7], p = c + j, q = c - j, r = d + i, s = d - i, t = e + h, u = e - h, v = f + g, w = f - g, x = p + v, y = p - v, z = r + t, A = r - t, a[k] = x + z, a[k + 4] = x - z, B = 0.707106781 * (A + y), a[k + 2] = y + B, a[k + 6] = y - B, x = w + u, z = u + s, A = s + q, C = 0.382683433 * (x - A), D = 0.5411961 * x + C, E = 1.306562965 * A + C, F = 0.707106781 * z, G = q + F, H = q - F, a[k + 5] = H + D, a[k + 3] = H - D, a[k + 1] = G + E, a[k + 7] = G - E, k += 8; for (k = 0, l = 0; m > l; ++l)c = a[k], d = a[k + 8], e = a[k + 16], f = a[k + 24], g = a[k + 32], h = a[k + 40], i = a[k + 48], j = a[k + 56], I = c + j, J = c - j, K = d + i, L = d - i, M = e + h, N = e - h, O = f + g, P = f - g, Q = I + O, R = I - O, S = K + M, T = K - M, a[k] = Q + S, a[k + 32] = Q - S, U = 0.707106781 * (T + R), a[k + 16] = R + U, a[k + 48] = R - U, Q = P + N, S = N + L, T = L + J, V = 0.382683433 * (Q - T), W = 0.5411961 * Q + V, X = 1.306562965 * T + V, Y = 0.707106781 * S, Z = J + Y, $ = J - Y, a[k + 40] = $ + W, a[k + 24] = $ - W, a[k + 8] = Z + X, a[k + 56] = Z - X, k++; for (l = 0; n > l; ++l)_ = a[l] * b[l], o[l] = _ > 0 ? 0 | _ + 0.5 : 0 | _ - 0.5; return o } function R () { P(65504), P(16), O(74), O(70), O(73), O(70), O(0), O(1), O(1), O(0), P(1), P(1), O(0), O(0) } function S (a, b) { P(65472), P(17), O(8), P(b), P(a), O(3), O(1), O(17), O(0), O(2), O(17), O(1), O(3), O(17), O(1) } function T () { let a, b; for (P(65499), P(132), O(0), a = 0; a < 64; a++)O(e[a]); for (O(1), b = 0; b < 64; b++)O(f[b]) } function U () { let a, b, c, d, e, f, g, h; for (P(65476), P(418), O(0), a = 0; a < 16; a++)O(A[a + 1]); for (b = 0; b <= 11; b++)O(B[b]); for (O(16), c = 0; c < 16; c++)O(C[c + 1]); for (d = 0; d <= 161; d++)O(D[d]); for (O(1), e = 0; e < 16; e++)O(E[e + 1]); for (f = 0; f <= 11; f++)O(F[f]); for (O(17), g = 0; g < 16; g++)O(G[g + 1]); for (h = 0; h <= 161; h++)O(H[h]) } function V () { P(65498), P(12), O(3), O(1), O(0), O(2), O(17), O(3), O(17), O(0), O(63), O(0) } function W (a, b, c, d, e) { let h; let l; let o; let q; let r; let s; let t; let u; let v; let w; const f = e[0]; const g = e[240]; const i = 16; const j = 63; const k = 64; for (l = Q(a, b), o = 0; k > o; ++o)p[z[o]] = l[o]; for (q = p[0] - c, c = p[0], q == 0 ? N(d[0]) : (h = 32767 + q, N(d[n[h]]), N(m[h])), r = 63; r > 0 && p[r] == 0; r--);if (r == 0) return N(f), c; for (s = 1; r >= s;) { for (u = s; p[s] == 0 && r >= s; ++s);if (v = s - u, v >= i) { for (t = v >> 4, w = 1; t >= w; ++w)N(g); v = 15 & v }h = 32767 + p[s], N(e[(v << 4) + n[h]]), N(m[h]), s++ } return r != j && N(f), c } function X () { let b; const a = String.fromCharCode; for (b = 0; b < 256; b++)w[b] = a(b) } function Y (a) { if (a <= 0 && (a = 1), a > 100 && (a = 100), y != a) { let b = 0; b = a < 50 ? Math.floor(5e3 / a) : Math.floor(200 - 2 * a), I(b), y = a, console.log('Quality set to: ' + a + '%') } } function Z () { let c; const b = (new Date()).getTime(); a || (a = 50), X(), K(), L(), M(), Y(a), c = (new Date()).getTime() - b, console.log('Initialization ' + c + 'ms') } let d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H; Math.round, d = Math.floor, e = new Array(64), f = new Array(64), g = new Array(64), h = new Array(64), m = new Array(65535), n = new Array(65535), o = new Array(64), p = new Array(64), q = [], r = 0, s = 7, t = new Array(64), u = new Array(64), v = new Array(64), w = new Array(256), x = new Array(2048), z = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63], A = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], B = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], C = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125], D = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250], E = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], F = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], G = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119], H = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250], this.encode = function (a, b) { let d; let e; let f; let m; let n; let o; let p; let y; let z; let A; let B; let C; let D; let E; let F; let G; let H; let I; let J; let K; const c = (new Date()).getTime(); for (b && Y(b), q = new Array(), r = 0, s = 7, P(65496), R(), T(), S(a.width, a.height), U(), V(), d = 0, e = 0, f = 0, r = 0, s = 7, this.encode.displayName = '_encode_', m = a.data, n = a.width, o = a.height, p = 4 * n, z = 0; o > z;) { for (y = 0; p > y;) { for (D = p * z + y, E = D, F = -1, G = 0, H = 0; H < 64; H++)G = H >> 3, F = 4 * (7 & H), E = D + G * p + F, z + G >= o && (E -= p * (z + 1 + G - o)), y + F >= p && (E -= y + F - p + 4), A = m[E++], B = m[E++], C = m[E++], t[H] = (x[A] + x[B + 256 >> 0] + x[C + 512 >> 0] >> 16) - 128, u[H] = (x[A + 768 >> 0] + x[B + 1024 >> 0] + x[C + 1280 >> 0] >> 16) - 128, v[H] = (x[A + 1280 >> 0] + x[B + 1536 >> 0] + x[C + 1792 >> 0] >> 16) - 128; d = W(t, g, d, i, k), e = W(u, h, e, j, l), f = W(v, h, f, j, l), y += 32 }z += 8 } return s >= 0 && (I = [], I[1] = s + 1, I[0] = (1 << s + 1) - 1, N(I)), P(65497), J = 'data:image/jpeg;base64,' + btoa(q.join('')), q = [], K = (new Date()).getTime() - c, console.log('Encoding time: ' + K + 'ms'), J }, Z() }
}

export function scrollTop (el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
              return window.setTimeout(callback, 1000 / 60)
            }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll (start, end, step) {
    if (start === end) return

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

export const cookieStorage = {
//   setItem: function (key, value, options) {
//     let data, opts
//     if (options === undefined) {
//       data = JSON.parse(value)
//       opts = Object.assign({}, defaultConfigs, data.options)
//       delete data.options
//       value = JSON.stringify(data)
//     } else {
//       data = Object.assign({}, options)
//       opts = Object.assign({}, defaultConfigs, options)
//     }

  //     key = encodeURIComponent(String(key))
  //       .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
  //       .replace(/[()]/g, escape)

  //     value = encodeURIComponent(String(value))
  //       .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)

  //     if (typeof data.expire === 'number') {
  //       if (data.expire === 0) data.expire = Date.now() + timeMap.y * 10
  //       opts.expires = new Date(data.expire)
  //     }

  //     if (opts.cross) {
  //       const hostname = window.location.hostname
  //       if (!/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/.test(hostname) && !!~hostname.indexOf('.')) {
  //         opts.domain = '.' + window.location.hostname.split('.').slice(1).join('.')
  //       }
  //     }

  //     return (document.cookie = [
  //       key, '=', value,
  //       opts.expires ? '; expires=' + opts.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
  //       opts.path ? '; path=' + opts.path : '',
  //       opts.domain ? '; domain=' + opts.domain : '',
  //       opts.secure ? '; secure' : ''
  //     ].join(''))
  //   },
  getItem: function (key) {
    let result = {}
    const cookies = document.cookie ? document.cookie.split('; ') : []
    const decodes = /(%[0-9A-Z]{2})+/g

    for (const cookie of cookies) {
      const parts = cookie.split('=')
      let name = parts.shift()
      let value = parts.join('=')

      name = name.replace(decodes, decodeURIComponent)
      value = value.replace(decodes, decodeURIComponent)

      if (name === key) {
        result = value
        return result
      }

      if (!key) {
        result[name] = value
      }
    }

    return !key ? result : null
  },
  removeItem: function (key, options) {
    const opts = Object.assign({
      path: '/',
      expire: -1
    }, options)

    this.setItem(key, '', opts)
  },
  key: function (index) {
    const cookies = document.cookie ? document.cookie.split(/;\s*/) : []
    if (index < 0 || index >= cookies.length) return ''

    const kvPairs = cookies[index]
    return kvPairs.split('=').shift()
  }
}
