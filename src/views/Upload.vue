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

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'ViewUpload',
  setup () {
    const files = ref([])
    const upload = ref(null)

    const onChangeFile = (newFiles) => {
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
