<!--
 * @Author: QMD
 * @Date: 2020-11-27 10:19:36
 * @LastEditTime: 2020-11-27 11:54:41
 * @FilePath: \cameraComponent\src\views\showCamera\index.vue
 * @Description:
-->
<template>
  <div>
    <button @click="openCamera">open camera</button>
    <Camera
      v-if="showCamera"
      @confirm="getCarema"
      @close="closeCamera"/>
  </div>
</template>
<script>
export default {
  name: 'showCamera',
  data () {
    return {
      showCamera: false
    }
  },
  methods: {
    openCamera () {
      this.showCamera = true
    },
    /**
     * [getCarema 获取拍摄图片]
     */
    async getCarema (url, mediaStreamTrack) {
      this.showCamera = false
      mediaStreamTrack.stop()
      // url是返回的base64
      if (url) {

      }
    },
    /**
     * [closeCamera 关闭相机]
     */
    closeCamera (mediaStreamTrack) {
      this.showCamera = false
      mediaStreamTrack.stop()
    }
  }
}
</script>
