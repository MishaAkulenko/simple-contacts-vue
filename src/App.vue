<template>
  <div id="root" class="root">
    <Header v-show="$route.name !== 'contactsList'"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/TheHeader.vue'

export default {
  name: 'App',
  components:{
    Header
  }
}
</script>

<style lang="scss">
  .root {
    min-height: 100vh;
  }
</style>
