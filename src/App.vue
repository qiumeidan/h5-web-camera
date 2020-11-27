<!--
 * @Author: QMD
 * @Date: 2020-11-27 09:59:05
 * @LastEditTime: 2020-11-27 10:38:32
 * @FilePath: \cameraComponent\src\App.vue
 * @Description:
-->
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
