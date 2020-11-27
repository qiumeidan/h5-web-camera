/*
 * @Author: QMD
 * @Date: 2020-11-27 09:59:05
 * @LastEditTime: 2020-11-27 10:55:17
 * @FilePath: \cameraComponent\src\main.js
 * @Description:
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// icon 全局注册
import HIcon from './components/icon' // eslint-disable-line
Vue.use(HIcon)

// camare全局注册
import Camera from './components/camera' // eslint-disable-line
Vue.use(Camera)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
