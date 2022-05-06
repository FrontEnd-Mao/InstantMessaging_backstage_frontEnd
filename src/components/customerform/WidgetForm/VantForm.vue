<template>
  <van-form
    :label-width="config.labelWidth"
    :label-align="config.labelAlign"
    :input-align="config.inputAalign"
    :error-message-align="configs.errorMessageAlign"
    :size="config.size"
  >
    <phone-model>
      <draggable
        class="list-group"
        tag="ul"
        v-model="widgetList"
        v-bind="{
          animation: 200,
          group: 'people',
          disabled: false,
          ghostClass: 'ghost',
        }"
        @add="onAdd"
      >
        <van-cell-group
          v-for="(element, index) in widgetList"
          :key="element.key"
          :label="element.name"
          class="list-form-item"
          @click.native.stop="handleWidgetSelect(element)"
          :style="{
            border:
              selectWidget && selectWidget.key == element.key
                ? '1px solid rgb(233,64,87)'
                : '',
          }"
        >
          <template v-if="element.type == 'picker'">
            <van-field
              v-model="result"
              is-link
              readonly
              name="picker"
              label="选择器"
              placeholder="点击选择城市"
              :style="{ paddingRight: element.options.paddingRight }"
              @click="showPicker = true"
            />
            <van-popup v-model:show="showPicker" position="bottom">
              <van-picker
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>
            <el-button
              type="text"
              class="delete-action"
              @click="onDelete(index)"
              style="padding-right: 10px; vertical-align: middle"
              >删除</el-button
            >
          </template>
          <template v-if="element.type == 'date'">
            <DatePickerYMD :data="element"></DatePickerYMD>
          </template>
          <template v-if="element.type == 'date-year-month'">
            <DatePickerYM :data="element"></DatePickerYM>
          </template>
          <template v-if="element.type == 'datetime'">
            <DatePickerAll :data="element"></DatePickerAll>
          </template>
          <template v-if="element.type == 'uploader'">
            <Uploader :data="element"></Uploader>
          </template>
          <template v-if="element.type == 'multilineTextBox'">
            <MultilineTextBox :data="element"></MultilineTextBox>
          </template>
          <template v-if="element.type == 'textInput'">
            <TextInput :data="element"></TextInput>
          </template> 
        </van-cell-group>
      </draggable>
    </phone-model>
    
  </van-form>
</template>


<script>
import Draggable from "vuedraggable";
import PhoneModel from "../Phone/Phone.vue";

import DatePickerYMD from "../componentList/Picker/DatePicker/DatePickerYMD.vue";
import DatePickerYM from "../componentList/Picker/DatePicker/DatePickerYM.vue";
import DatePickerAll from "../componentList/Picker/DatePicker/DatePickerAll.vue";
import Uploader from "../componentList/Uploader/Uploader.vue";
import MultilineTextBox from "../componentList/Input/MultilineTextBox.vue";
import TextInput from "../componentList/Input/TextInput.vue";



export default {
  components: {
    Draggable,
    PhoneModel,
    DatePickerYMD,
    DatePickerYM,
    DatePickerAll,
    Uploader,
    MultilineTextBox,
    TextInput,

  },
  props: ["data", "config"],
  data() {
    return {
      widgetList: this.data,
      selectWidget: "",
      //选择器
      showPicker: false,
      result: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      //时间选择器
      currentDate: new Date(2021, 0, 17),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      configs: {}
    };
  },
  methods: {
    onAdd(evt) {
      const newIndex = evt.newIndex;
      const key = new Date().getTime();
      //
      this.$set(this.widgetList, newIndex, {
        ...this.widgetList[newIndex],
        options: {
          ...this.widgetList[newIndex].options,
        },
        key,
        model: this.widgetList[newIndex].type + "_" + key, // 用于绑定表单填写数据使用
      });
      console.log(this.widgetList);
    },
    onDelete(index) {
      this.widgetList.splice(index, 1);
    },
    // 选中单个元素触发的事件
    handleWidgetSelect(item) {
      this.selectWidget = item;
    },
    onConfirm(value) {
      this.result = value;
      this.showPicker = false;
    },
    //接受父组件传递过来的清空方法
    empty() {
      this.widgetList = [];
    },
    //接受初始进入页面后父组件传递的值给该组件
    initialData(widgetData, configData) {
      this.widgetList = [...widgetData];
      // this.config = configData;
    }
  },
  watch: {
    // 添加对 select、 slectWidget 的监听
    // select(val) {
    //   this.selectWidget = val;
    // },
    selectWidget: {
      handler(val) {
        this.$emit("update:select", val);
      },
      deep: true, // 为了发现对象内部值的变化
    },
    // 表单字段更新后同步到父组件
    widgetList(val) {
      this.$emit("update:data", val);
    },
  },
};
</script>
<style lang="scss">
.el-input {
  width: 98% !important;
}
.delete-action {
  position: absolute;
  bottom: 5px;
  right: -6px;
}
</style>