<template>
  <div class="Upload">
    <Upload
      ref="upload"
      :multiple="true"
      @on-change-file="onChangeFile"
    />

    <template v-if="files.length">
      <img
        v-for="(item, index) in files"
        :key="index"
        :src="item.base64"
      >
    </template>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
// import Upload from '@/components/upload'
// import type { UploadProps } from '@/components/upload/types'
export default defineComponent({
  name: 'ViewUpload',
  components: {
    // Upload
  },
  setup () {
    const files = ref<Array<{ base64: string, clearBase64: string }>>([])
    const upload = ref(null)

    const onChangeFile = (newFiles: any[]) => {
      files.value = newFiles
    }

    return {
      files,
      upload,
      onChangeFile
    }
  }
})
</script>

<style lang="less" scoped>
.Upload {
  height: 100%;

  .upload-box {
    width: 200px;
    height: 100px;
    background: #008cee;
    color: #ffffff;
    text-align: center;
    line-height: 100px;
  }

  // img {
  //   width: 100px;
  //   height: 100px;
  //   margin: 5px;
  //   object-fit: cover;
  // }
}
</style>
