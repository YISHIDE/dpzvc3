(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory() // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define([], factory) // AMD
  } else {
    global.MegaPixImage = factory() // Browser global
  }
}(typeof window !== 'undefined' ? window : this, function () {
  // -------------------------
  // Helper functions
  // -------------------------
  function detectSubsampling (img) {
    const iw = img.naturalWidth; const ih = img.naturalHeight
    if (iw * ih > 1024 * 1024) {
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 1
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, -iw + 1, 0)
      return ctx.getImageData(0, 0, 1, 1).data[3] === 0
    } else {
      return false
    }
  }

  function detectVerticalSquash (img, iw, ih) {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = ih
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const data = ctx.getImageData(0, 0, 1, ih).data
    let sy = 0; let ey = ih; let py = ih
    while (py > sy) {
      const alpha = data[(py - 1) * 4 + 3]
      if (alpha === 0) { ey = py } else { sy = py }
      py = (ey + sy) >> 1
    }
    const ratio = py / ih
    return (ratio === 0) ? 1 : ratio
  }

  function renderImageToDataURL (img, options, doSquash) {
    const canvas = document.createElement('canvas')
    renderImageToCanvas(img, canvas, options, doSquash)
    return canvas.toDataURL('image/jpeg', options.quality || 0.8)
  }

  function renderImageToCanvas (img, canvas, options, doSquash) {
    let iw = img.naturalWidth; let ih = img.naturalHeight
    if (!(iw + ih)) return
    const width = options.width; const height = options.height
    const ctx = canvas.getContext('2d')
    ctx.save()
    transformCoordinate(canvas, ctx, width, height, options.orientation)
    const subsampled = detectSubsampling(img)
    if (subsampled) { iw /= 2; ih /= 2 }
    const d = 1024
    let tmpCanvas = document.createElement('canvas')
    tmpCanvas.width = tmpCanvas.height = d
    let tmpCtx = tmpCanvas.getContext('2d')
    const vertSquashRatio = doSquash ? detectVerticalSquash(img, iw, ih) : 1
    const dw = Math.ceil(d * width / iw)
    const dh = Math.ceil(d * height / ih / vertSquashRatio)
    let sy = 0; let dy = 0
    while (sy < ih) {
      let sx = 0; let dx = 0
      while (sx < iw) {
        tmpCtx.clearRect(0, 0, d, d)
        tmpCtx.drawImage(img, -sx, -sy)
        ctx.drawImage(tmpCanvas, 0, 0, d, d, dx, dy, dw, dh)
        sx += d; dx += dw
      }
      sy += d; dy += dh
    }
    ctx.restore()
    tmpCanvas = tmpCtx = null
  }

  function transformCoordinate (canvas, ctx, width, height, orientation) {
    switch (orientation) {
    case 5: case 6: case 7: case 8: canvas.width = height; canvas.height = width; break
    default: canvas.width = width; canvas.height = height
    }
    switch (orientation) {
    case 2: ctx.translate(width, 0); ctx.scale(-1, 1); break
    case 3: ctx.translate(width, height); ctx.rotate(Math.PI); break
    case 4: ctx.translate(0, height); ctx.scale(1, -1); break
    case 5: ctx.rotate(0.5 * Math.PI); ctx.scale(1, -1); break
    case 6: ctx.rotate(0.5 * Math.PI); ctx.translate(0, -height); break
    case 7: ctx.rotate(0.5 * Math.PI); ctx.translate(width, -height); ctx.scale(-1, 1); break
    case 8: ctx.rotate(-0.5 * Math.PI); ctx.translate(-width, 0); break
    }
  }

  const URL = window.URL && window.URL.createObjectURL
    ? window.URL
    : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null

  // -------------------------
  // MegaPixImage class
  // -------------------------
  function MegaPixImage (srcImage) {
    if (window.Blob && srcImage instanceof Blob) {
      if (!URL) { throw Error('No createObjectURL function found') }
      const img = new Image()
      img.src = URL.createObjectURL(srcImage)
      this.blob = srcImage
      srcImage = img
    }
    if (!srcImage.naturalWidth && !srcImage.naturalHeight) {
      const _this = this
      srcImage.onload = srcImage.onerror = function () {
        const listeners = _this.imageLoadListeners
        if (listeners) {
          _this.imageLoadListeners = null
          for (let i = 0; i < listeners.length; i++) { listeners[i]() }
        }
      }
      this.imageLoadListeners = []
    }
    this.srcImage = srcImage
  }

  MegaPixImage.prototype.render = function (target, options, callback) {
    if (this.imageLoadListeners) {
      const _this = this
      this.imageLoadListeners.push(function () { _this.render(target, options, callback) })
      return
    }
    options = options || {}
    const imgWidth = this.srcImage.naturalWidth; const imgHeight = this.srcImage.naturalHeight
    let width = options.width; let height = options.height
    const maxWidth = options.maxWidth; const maxHeight = options.maxHeight
    const doSquash = !this.blob || this.blob.type === 'image/jpeg'
    if (width && !height) { height = (imgHeight * width / imgWidth) << 0 } else if (height && !width) { width = (imgWidth * height / imgHeight) << 0 } else { width = imgWidth; height = imgHeight }
    if (maxWidth && width > maxWidth) { width = maxWidth; height = (imgHeight * width / imgWidth) << 0 }
    if (maxHeight && height > maxHeight) { height = maxHeight; width = (imgWidth * height / imgHeight) << 0 }
    const opt = { width, height }
    for (const k in options) opt[k] = options[k]

    const tagName = target.tagName.toLowerCase()
    if (tagName === 'img') { target.src = renderImageToDataURL(this.srcImage, opt, doSquash) } else if (tagName === 'canvas') { renderImageToCanvas(this.srcImage, target, opt, doSquash) }
    if (typeof this.onrender === 'function') { this.onrender(target) }
    if (callback) { callback() }
    if (this.blob) { this.blob = null; URL.revokeObjectURL(this.srcImage.src) }
  }

  // -------------------------
  // Export as ESM default
  // -------------------------
  return MegaPixImage
}))
