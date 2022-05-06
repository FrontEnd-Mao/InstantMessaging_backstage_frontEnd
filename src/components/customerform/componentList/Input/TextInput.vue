<template>
  <van-field v-model="text" :label="data.name" :readonly="data.options.readonly" :rules="data.required"/>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      text: "",
    };
  },
};
</script>

<style>
</style>