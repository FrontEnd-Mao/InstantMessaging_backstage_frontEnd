<template>
  <div>
    <van-field
      v-model="result"
      is-link
      readonly
      name="datetimePicker"
      :label="data.name"
      placeholder="点击选择时间"
      @click="showPicker = true"
      :readonly="data.options.readonly"
      :rules="data.required"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择年月日时分秒"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      //时间选择器
      currentDate: new Date(2021, 0, 17),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      result: "",
      showPicker: false,
    };
  },
  methods: {
    onConfirm(value) {
      this.result = value;
      this.showPicker = false;
    },
  },
};
</script>

<style>
</style>