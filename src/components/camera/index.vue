<!--
 * @Author: QMD
 * @Date: 2020-11-27 10:13:05
 * @LastEditTime: 2020-11-27 11:38:48
 * @FilePath: \cameraComponent\src\components\camera\index.vue
 * @Description:
-->
<template>
  <div class="camare">
    <div class="video_top">
      <div class="video_close" @click="closeCarema">
        <h-icon type="closeCamare" size="30"/>
      </div>
      <div class="video_rotate" @click="changeDirection()">
        <h-icon type="camareRotate" size="45"/>
      </div>
    </div>
    <div class="video_con">
      <video
        id="v"
        ref="v"
        width="640"
        height="400"
        autoplay/>
    </div>
    <canvas
      id="canvas"
      ref="canvas"
      width="1280"
      height="800"
      style="width:640px;height:400px"/>
    <div class="video_bottom">
      <div class="video_button" @click="getPhoto()">
        <h-icon type="camareButton" size="45"/>
      </div>
      <div class="video_check" @click="checkPic">
        <h-icon type="camareCheck" size="35"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Camera',
  data () {
    return {
      ctx: '',
      mediaStreamTrack: {},
      cutAvater: '',
      vedio: '',
      videoPrams: {},
      front: true,
      deviceInfoId: '',
      num: 0,
      carema: []
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      document.getElementById('app').appendChild(this.$el)
      this.evokeCamera()
    })
  },
  methods: {
    // 获取摄像头数组的方法要注意，不同设备可能获取的规律不一样
    gotDevices () {
      return new Promise(resolve => {
        let test = navigator.mediaDevices.enumerateDevices()
        test.then((deviceInfos) => {
          for (let i = 0; i < deviceInfos.length; ++i) {
            if (deviceInfos[i].kind === 'videoinput') {
              this.carema.push(deviceInfos[i].deviceId)
            }
          }
          let deviceInfoId = this.front ? this.carema[1] : this.carema[0]
          resolve(deviceInfoId)
        })
      })
    },
    // 唤起相机
    async evokeCamera () {
      //  老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      let deviceId = await this.gotDevices()
      this.videoPrams = { video: {
        deviceId: deviceId,
        width: { ideal: 1280 },
        height: { ideal: 800 }
      }}
      let promise = navigator.mediaDevices.getUserMedia(this.videoPrams)
      promise.then(stream => {
        this.vedio = this.$refs.v
        this.mediaStreamTrack = stream.getTracks()[0]
        //  旧的浏览器可能没有srcObject
        if ('srcObject' in this.vedio) {
          this.vedio.srcObject = stream
        } else {
          //  防止再新的浏览器里使用它，应为它已经不再支持了
          this.vedio.src = window.URL.createObjectURL(stream)
        }
        this.vedio.onloadedmetadata = (e) => {
          this.vedio.play()
        }
      }).catch(err => {
        console.error(err.name + ': ' + err.message)
      })
      this.$nextTick(() => {
        console.log(this.$refs.canvas)
        console.log(this.$refs.v.clientWidth, this.$refs.v.clientHeight)
        var scaleBy = 1.4
        let outWidth = this.$refs.v.clientWidth
        let outHeight = this.$refs.v.clientHeight
        // 设置图片清晰度，先放大1.4倍，再缩小
        let can = document.querySelector('#canvas')
        can.height = outHeight * scaleBy
        can.width = outWidth * scaleBy
        can.style.width = outWidth + 'px'
        can.style.height = outHeight + 'px'
        this.ctx = can.getContext('2d')
        this.ctx.scale(scaleBy, scaleBy)
      })
    },
    // 点击拍照
    getPhoto () {
      this.ctx.drawImage(this.vedio, 0, 0, 1280, 800)
      // canvas生成剪切过的图片DataURL
      this.cutAvater = this.$refs.canvas.toDataURL()
    },
    // 选择完成
    checkPic () {
      this.$emit('confirm', this.cutAvater, this.mediaStreamTrack)
    },
    // 取消
    closeCarema () {
      this.$emit('close', this.mediaStreamTrack)
    },
    // 转换相机
    changeDirection () {
      this.front = !this.front
      this.mediaStreamTrack.stop()
      this.evokeCamera()
    }
  }
}
</script>
<style scoped>
video{
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.video_con {
  position: absolute;
  width: 100%;
  height: 100%;
}
 #canvas {
  display: block;
  margin: auto;
  position: absolute;
  width: 100%;
  height: 100%;
}
.camare{
  position: fixed;
  width: 100%;
  height: calc(100vh);
  top: 0;
  left: 0;
  z-index: 99999;
}
.video_button{
  width: 80px;
  height: 80px;
  line-height: 60px;
  text-align: center;
  background: #fff;
  border: 0.018182rem solid;
  border-radius: 100%;
  position: absolute;
  top: 0;
  right: 20px;
  margin-top: calc((100vh - 80px) / 2);
}
.video_bottom{
  height: 1.818182rem;
  line-height: 1.818182rem;
  text-align: center;
  right: 0;
  top: 0;
  width: 100%;
}
.video_check{
  position: absolute;
  bottom: 10px;
  right: 25px;
  color: #fff;
  font-size: 35px;
  z-index: 99999;
  width: 60px;
  height: 60px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 100%;
  line-height: 70px;
}
.video_top {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  position: absolute;
}
.video_rotate{
  position: absolute;
  right: 55px;
  top: 0.181818rem;
  z-index: 99999;
  width: 60px;
  height: 60px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 100%;
  line-height: 60px;
}
.video_close{
  color: #fff;
  font-size: 35px;
  margin-top: 10px;
  z-index: 99999;
  width: 60px;
  height: 60px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 100%;
  line-height: 65px;
  position: absolute;
}
</style>
