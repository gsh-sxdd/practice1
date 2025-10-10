<template>
  <div id="app">
    <DrawingBoard />
  </div>
</template>

<script>
import DrawingBoard from './components/DrawingBoard.vue'

export default {
  name: 'App',
  components: {
    DrawingBoard
  }
}
</script>

<style>
/* 全局样式可以放在这里 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>