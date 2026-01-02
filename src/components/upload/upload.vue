<template>
  <div
    :class="classes"
    :style="styles"
  >
    <slot>
      <div :class="wrapperClasses">
        图片上传
      </div>
    </slot>
    <input
      ref="upload"
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="showPhoto"
    >
  </div>
</template>

<script>
import { ref, computed, defineComponent, getCurrentInstance, watch } from 'vue'
import exifr from 'exifr'
import MegaPixImage from '../../lib/MegaPixImage'
import { JPEG } from '../../utils/util'

const prefixCls = 'dpzvc3-upload'

export default defineComponent({
  name: 'Dpzvc3Upload',
  props: {
    multiple: { type: Boolean, default: false },
    accept: { type: String, default: 'image/*' },
    styles: { type: Object, default: () => ({}) }
  },
  setup (props, { emit }) {
    const { proxy } = getCurrentInstance()
    // const $Indicator = appContext.config.globalProperties.$Indicator

    const files = ref([])
    const fileLength = ref(0)
    const upload = ref(null)

    const classes = computed(() => [prefixCls])
    const wrapperClasses = computed(() => [`${prefixCls}-wrapper`])

    watch(files, (val) => {
      emit('on-change-file', val)
    })

    const showPhoto = async (e) => {
      proxy.$Indicator.snake({ text: '上传中' })
      files.value = []
      const fileList = e.target.files
      fileLength.value = fileList.length

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        try {
          const Orientation = await exifr.orientation(file)
          const dataURL = await new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (err) => reject(err)
          })

          const img = new Image()
          img.src = dataURL

          await new Promise((resolve) => {
            img.onload = () => {
              create(img, Orientation)
              resolve()
            }
          })
        } catch (err) {
          console.error('读取图片或 EXIF 失败', err)
        }
      }

      e.target.value = ''
    }

    const create = (file, Orientation) => {
      let data = null
      const img = new Image()
      const mpImg = new MegaPixImage(file)

      mpImg.render(img, { maxWidth: 600, quality: 0.8 })
      img.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
        data = canvas.toDataURL('image/jpeg', 0.8)

        if (navigator.userAgent.match(/iphone/i)) {
          if (Orientation && Orientation !== 1) {
            switch (Orientation) {
            case 6: rotateImg(this, 'left', canvas); break
            case 8: rotateImg(this, 'right', canvas); break
            case 3:
              rotateImg(this, 'right', canvas)
              rotateImg(this, 'right', canvas)
              break
            }
          }
          data = canvas.toDataURL('image/jpeg', 0.8)
        }

        if (navigator.userAgent.match(/Android/i)) {
          const JPEGEncoder = JPEG.JPEGEncoder
          const encoder = new JPEGEncoder()
          data = encoder.encode(ctx.getImageData(0, 0, canvas.width, canvas.height), 80)
        }

        const result = {
          base64: data,
          clearBase64: data.substr(data.indexOf(',') + 1)
        }

        files.value.push(result)

        if (files.value.length === fileLength.value) {
          proxy.$Indicator.remove()
        }
      }
    }

    const rotateImg = (img, direction, canvas) => {
      const minStep = 0
      const maxStep = 3
      if (!img) return
      const height = img.height
      const width = img.width
      let step = 2
      if (direction === 'right') {
        step++
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        step > maxStep && (step = minStep)
      } else {
        step--
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        step < minStep && (step = maxStep)
      }
      const degree = (step * 90 * Math.PI) / 180
      const ctx = canvas.getContext('2d')
      switch (step) {
      case 0: canvas.width = width; canvas.height = height; ctx.drawImage(img, 0, 0, canvas.width, canvas.height); break
      case 1: canvas.width = height; canvas.height = width; ctx.rotate(degree); ctx.drawImage(img, 0, -height, canvas.height, canvas.width); break
      case 2: canvas.width = width; canvas.height = height; ctx.rotate(degree); ctx.drawImage(img, -width, -height, canvas.width, canvas.height); break
      case 3: canvas.width = height; canvas.height = width; ctx.rotate(degree); ctx.drawImage(img, -width, 0, canvas.height, canvas.width); break
      }
    }

    return {
      files,
      classes,
      wrapperClasses,
      upload,
      showPhoto
    }
  }
})
</script>
