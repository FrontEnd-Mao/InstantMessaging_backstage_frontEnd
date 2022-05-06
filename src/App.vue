<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Draggable from "./components/customerform/Draggable/Draggable.vue";
import Container from "./components/customerform/Container/Container.vue";
import Home from './view/home/Home';
export default {
  name: "App",
  components: {
    Draggable,
    Container,
    Home
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
</style>
