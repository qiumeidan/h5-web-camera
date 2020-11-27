/*
 * @Author: QMD
 * @Date: 2020-11-27 09:59:05
 * @LastEditTime: 2020-11-27 11:21:02
 * @FilePath: \cameraComponent\src\router\index.js
 * @Description:
 */
import Vue from 'vue'
import Router from 'vue-router'
import showCamera from '@/views/showCamera/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'showCamera',
      component: showCamera
    }
  ]
})
