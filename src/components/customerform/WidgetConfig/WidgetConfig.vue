<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item label="校验">
        <div>
          <el-checkbox v-model="data.options.required">必填</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="数据绑定参数">
        <el-input v-model="data.model"></el-input>
      </el-form-item>
      <el-form-item label="数据绑定方法名">
        <el-input v-model="data.options.remoteFunc"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      validator: {
        required: null,
      },
    };
  },
  watch: {
    "data.options.required": function (val) {
      if (val) {
        this.validator.required = {required: true, message: `${this.data.name}必须填写`,};
      } else {
        this.validator.required = { required: false, message: "" };
      }
      // 生成表单验证的rules属性
      Object.keys(this.validator).forEach((key) => {
        
        console.log(this.data.required[0]);

        if (this.validator[key]) {
          this.data.required[0].message = this.validator[key].message;
          this.data.required[0].required = this.validator[key].required;
        }
        console.log(this.data.required);
      });
    },
  },
};
</script>