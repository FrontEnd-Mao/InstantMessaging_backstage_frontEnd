<template>
  <van-cell-group inset>
    <van-field
      v-model="message"
      rows="2"
      autosize
      :label="data.name"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      :readonly="data.options.readonly"
      :rules="data.required"
    />
  </van-cell-group>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      message: "",
    };
  },
  methods: {

  }

};
</script>

<style>
</style>