<template>
  <phone-model>
    <van-form>
      <van-cell-group
        inset
        :label="item.name"
        v-for="item in data.list"
        :key="item.key"
        :prop="item.model"
      >
        <text-input v-if="item.type == 'textInput'" :data="item"></text-input>
        <multiline-text-box
          v-if="item.type == 'multilineTextBox'"
          :data="item"
        ></multiline-text-box>
        <uploader v-if="item.type == 'uploader'" :data="item"></uploader>
        <date-picker-year-month-day
          v-if="item.type == 'date'"
          :data="item"
        ></date-picker-year-month-day>
        <date-picker-year-month
          v-if="item.type == 'date-year-month'"
          :data="item"
        ></date-picker-year-month>
        <date-picker-all
          v-if="item.type == 'datetime'"
          :data="item"
        ></date-picker-all>
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </phone-model>
</template>

<script>
import PhoneModel from "../Phone/Phone.vue";

import DatePickerYearMonthDay from "../componentList/Picker/DatePicker/DatePickerYMD.vue";
import DatePickerYearMonth from "../componentList/Picker/DatePicker/DatePickerYM.vue";
import DatePickerAll from "../componentList/Picker/DatePicker/DatePickerAll.vue";
import Uploader from "../componentList/Uploader/Uploader.vue";
import MultilineTextBox from "../componentList/Input/MultilineTextBox.vue";
import TextInput from "../componentList/Input/TextInput.vue";
export default {
  components: {
    PhoneModel,
    DatePickerYearMonth,
    DatePickerYearMonthDay,
    DatePickerAll,
    Uploader,
    MultilineTextBox,
    TextInput,
  },
  props: ["data", "remote"],

  data() {
    return {
      models: {},
      rules: {},
    };
  },
  created() {
    this.generateModle(this.data.list);
  },
  mounted() {
    // 加载动态数据
    console.log(this.data);
    if (this.data.list) {
      for (let i = 0; i < this.data.list.length; i++) {
        const curItem = this.data.list[i];

        curItem.options.remoteOptions = [];
        if (
          curItem.options.remoteFunc &&
          this.remote[curItem.options.remoteFunc]
        ) {
          this.remote[curItem.options.remoteFunc]((data) => {
            curItem.options.remoteOptions = data.map((item) => {
              debugger;
              return {
                value: item.value,
                label: item.label,
              };
            });
          });
        }
      }
    }
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    generateModle(list) {
      for (let i = 0; i < list.length; i++) {
        // 使用配置的默认值初始化表单 model 对象
        this.$set(this.models, list[i].model, list[i].options.defaultValue);

        // 生成rules
        this.rules[list[i].model] = list[i].rules && [
          ...list[i].rules.map((item) => {
            return { ...item };
          }),
        ];
      }
    },
    handleSubmit() {
      this.$refs.generateForm.validate((valid) => {
        if (valid) {
          // 验证成功
          alert(JSON.stringify(this.models));
        } else {
          // 验证失败
        }
      });
    },
  },
  watch: {
    // 监听data变化的时候重新设置models值
    data: {
      deep: true,
      handler(val) {
        this.generateModle(val.list);
      },
    },
  },
};
</script>