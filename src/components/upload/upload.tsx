// src/components/upload/upload.tsx
import {
  defineComponent,
  ref,
  computed,
  watch,
  getCurrentInstance,
  PropType
} from 'vue'
import exifr from 'exifr'
import MegaPixImage from '../../lib/MegaPixImage'
import { JPEG } from '../../utils/util'
import type { UploadProps } from './types'

export type { UploadProps }

const prefixCls = 'dpzvc3-upload'

export default defineComponent({
  name: 'Dpzvc3Upload',

  props: {
    multiple: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    accept: {
      type: String as PropType<string>,
      default: 'image/*'
    },
    styles: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },

  emits: ['on-change-file'],

  setup(props: UploadProps, { emit, slots }) {
    const { proxy } = getCurrentInstance()!

    const files = ref<any[]>([])
    const fileLength = ref(0)
    const uploadRef = ref<HTMLInputElement | null>(null)

    const classes = computed(() => [prefixCls])
    const wrapperClasses = computed(() => [`${prefixCls}-wrapper`])

    watch(files, (val) => {
      emit('on-change-file', val)
    })

    const showPhoto = async (e: Event) => {
      const input = e.target as HTMLInputElement
      const fileList = input.files
      if (!fileList || !proxy) return

      (proxy as any).$Indicator?.snake({ text: '上传中' })

      files.value = []
      fileLength.value = fileList.length

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        try {
          const orientation = await exifr.orientation(file)

          const dataURL = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
          })

          const img = new Image()
          img.src = dataURL

          await new Promise<void>((resolve) => {
            img.onload = () => {
              create(img, orientation)
              resolve()
            }
          })
        } catch (err) {
          console.error('读取图片失败', err)
        }
      }

      input.value = ''
    }

    const create = (file: HTMLImageElement, orientation?: number) => {
      const img = new Image()
      const mpImg = new MegaPixImage(file)

      mpImg.render(img, { maxWidth: 600, quality: 0.8 })

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        let data = canvas.toDataURL('image/jpeg', 0.8)

        if (/iphone/i.test(navigator.userAgent) && orientation && orientation !== 1) {
          rotateImg(img, orientation, canvas)
          data = canvas.toDataURL('image/jpeg', 0.8)
        }

        if (/android/i.test(navigator.userAgent)) {
          const encoder = new JPEG.JPEGEncoder()
          data = encoder.encode(
            ctx.getImageData(0, 0, canvas.width, canvas.height),
            80
          )
        }

        files.value.push({
          base64: data,
          clearBase64: data.slice(data.indexOf(',') + 1)
        })

        if (files.value.length === fileLength.value) {
          (proxy as any).$Indicator?.remove()
        }
      }
    }

    const rotateImg = (
      img: HTMLImageElement,
      orientation: number,
      canvas: HTMLCanvasElement
    ) => {
      const ctx = canvas.getContext('2d')!
      const width = img.width
      const height = img.height

      switch (orientation) {
        case 6:
          canvas.width = height
          canvas.height = width
          ctx.rotate(Math.PI / 2)
          ctx.drawImage(img, 0, -height)
          break
        case 8:
          canvas.width = height
          canvas.height = width
          ctx.rotate(-Math.PI / 2)
          ctx.drawImage(img, -width, 0)
          break
        case 3:
          canvas.width = width
          canvas.height = height
          ctx.rotate(Math.PI)
          ctx.drawImage(img, -width, -height)
          break
      }
    }

    return () => (
      <div class={classes.value} style={props.styles}>
        {slots.default ? (
          slots.default()
        ) : (
          <div class={wrapperClasses.value}>图片上传</div>
        )}

        <input
          ref={uploadRef}
          type="file"
          accept={props.accept}
          multiple={props.multiple}
          onChange={showPhoto}
        />
      </div>
    )
  }
})