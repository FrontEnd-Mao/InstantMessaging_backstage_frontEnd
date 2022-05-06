<template>
  <div class="fm-container">
    <el-header class="fm-header">
      <div class="header-left">
        <img src="../../../assets/logo.png" class="logo" alt="" />
        Maos Customer Form
      </div>
      <div class="header-right">
        <!-- <el-button plain icon="el-icon-tickets">生成JSON</el-button> -->
        <el-button class="btn" type="primary" icon="el-icon-view" @click="handlePreview"
          >预览</el-button
        >
        <el-popconfirm title="确定清空吗？" @confirm="empty">
          <el-button class="btn" slot="reference" type="danger" icon="el-icon-delete" >清空</el-button> 
        </el-popconfirm>
       
        <el-button
          type="success"
          icon="el-icon-files"
          class="btn"
          v-if="type == 'add'"
          @click="dialogFormVisible = true"
          >保存</el-button
        >

          <el-button
          type="success"
          icon="el-icon-files"
          class="btn"
          v-if="type == 'edit'"
          @click="centerDialogVisible = true"
          >更新</el-button
        >
        <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  style="text-align:center"
  center>
  <span>请确认是否更新</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateForm">确 定</el-button>
  </span>
</el-dialog>
      </div>
    </el-header>
    <div class="fm-left">
      <div class="left-text">表单组件</div>
      <div class="clear"></div>
      <draggable
        class="list-group"
        tag="ul"
        v-model="componentList"
        v-bind="{
          animation: 200,
          group: { name: 'people', pull: 'clone', put: false },
          disabled: false,
          ghostClass: 'ghost',
        }"
      >
        <li
          class="list-group-item"
          v-for="element in componentList"
          :key="element.key"
        >
          {{ element.name }}
        </li>
      </draggable>
    </div>
    <div class="fm-main">
      <vant-form
        :data.sync="widgetList"
        :select.sync="widgetSelect"
        :config="formConfig"
        ref="vantForm"
      ></vant-form>
    </div>
    <div class="fm-right">
      <el-aside width="100%" class="">
        <el-tabs v-model="activeName" :stretch="true">
          <el-tab-pane label="字段配置" name="widget">
            <widget-config
              :data="widgetSelect"
              v-if="widgetSelect"
            ></widget-config>
          </el-tab-pane>
          <el-tab-pane label="表单配置" name="form">
            <form-config :data="formConfig"></form-config>
          </el-tab-pane>
        </el-tabs>
      </el-aside>

      <el-dialog
        title="预览"
        :visible.sync="dialogVisible"
        :fullscreen="true"
        width="100%"
        :before-close="
          () => {
            dialogVisible = false;
          }
        "
      >
        <!--绑定 configData -->
        <generate-form :data="configData" :remote="remoteFuncs"></generate-form>
      </el-dialog>
    </div>
    <!--点击保存以后弹出填写表单名称 -->
    <el-dialog title="保存" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="表单名称" label-width="120px" prop="name">
          <el-input v-model="form.name" autocomplete="off" ></el-input>
        </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="creatForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  creatForm,
  searchFormOneData,
  updataForm,
} from "@/network/customerForm.js";
import utils from "@/utils/utils.js";

import Draggable from "vuedraggable";
import WidgetForm from "../WidgetForm/WidgetForm";
import VantForm from "../WidgetForm/VantForm";
import FormConfig from "../FormConfig/FormConfig";
import WidgetConfig from "../WidgetConfig/WidgetConfig";
import GenerateForm from "../GenerateForm/GenerateForm";
export default {
  components: {
    Draggable,
    WidgetForm,
    FormConfig,
    WidgetConfig,
    GenerateForm,
    VantForm,
  },
  data() {
    return {
      remoteFuncs: {
        func_test(resolve) {
          // 模拟异步请求
          setTimeout(() => {
            const data = [
              { value: "value1", label: "选项1" },
              { value: "value2", label: "选项2" },
              { value: "value3", label: "选项3" },
            ];

            // 将数据添加到回调函数中，在异步返回时进行赋值操作
            resolve(data);
          }, 500);
        },
      },
      dialogFormVisible: false,
      form: {
        name: "",
      },
      rules: {
        name: [{ required: true, message: "请输入表单名称", trigger: "blur" }],
      },
      type: "", //判断是编辑还是新增表单
      centerDialogVisible: false,
      componentList: [
        // {
        //   type: "input",
        //   name: "单行文本",
        //   options: {
        //     width: "100%",
        //     defaultValue: "",
        //     placeholder: "",
        //     required: false,
        //   },
        // },
        {
          type: "picker",
          name: "选择器",
          options: {
            paddingRight: "50px",
            defaultValue: "",
            placeholder: "点击选择城市",
            readonly: true,
            required: false,
            remoteOptions: [], // 用于绑定后端返回的数据
            remoteFunc: "", // 设计器获取后端数据方法，下面配置时详细介绍
          },
          required: [{ required: false, message: "" }], //校验规则
        },
        {
          type: "date",
          name: "时间选择器-年月日",
          options: {
            paddingRight: "50px",
            defaultValue: "",
            readonly: true,
            required: false,
            remoteOptions: [], // 用于绑定后端返回的数据
            remoteFunc: "", // 设计器获取后端数据方法，下面配置时详细介绍
          },
          required: [{ required: false, message: "" }], //校验规则
        },
        {
          type: "date-year-month",
          name: "时间选择器-年月",
          options: {
            paddingRight: "50px",
            defaultValue: "",
            readonly: true,
            required: false,
            remoteOptions: [], // 用于绑定后端返回的数据
            remoteFunc: "", // 设计器获取后端数据方法，下面配置时详细介绍
          },
          required: [{ required: false, message: "" }], //校验规则
        },
        {
          type: "datetime",
          name: "时间选择器-完整时间",
          options: {
            paddingRight: "50px",
            defaultValue: "",
            readonly: true,
            required: false,
            remoteOptions: [], // 用于绑定后端返回的数据
            remoteFunc: "", // 设计器获取后端数据方法，下面配置时详细介绍
          },
          required: [{ required: false, message: "" }], //校验规则
        },
        {
          type: "uploader",
          name: "附件",
          options: {
            paddingRight: "50px",
            defaultValue: "",
            readonly: true,
            required: false,
            remoteOptions: [], // 用于绑定后端返回的数据
            remoteFunc: "", // 设计器获取后端数据方法，下面配置时详细介绍
          },
          required: [{ required: false, message: "" }], //校验规则
        },
        {
          type: "multilineTextBox",
          name: "多行文本框",
          options: {
            paddingRight: "50px",
            defaultValue: "",
            readonly: true,
            required: false,
            remoteOptions: [], // 用于绑定后端返回的数据
            remoteFunc: "", // 设计器获取后端数据方法，下面配置时详细介绍
          },
          required: [{ required: false, message: "" }], //校验规则
        },
        {
          type: "textInput",
          name: "输入框",
          options: {
            paddingRight: "50px",
            defaultValue: "",
            readonly: true,
            required: false,
            remoteOptions: [], // 用于绑定后端返回的数据
            remoteFunc: "", // 设计器获取后端数据方法，下面配置时详细介绍
          },
          required: [{ required: false, message: "" }], //校验规则
        },
      ],
      widgetList: [],
      // 初始状态下为空
      widgetSelect: null,
      activeName: "widget",
      // 定义对象用于存放表单设置信息,并设置好默认信息
      formConfig: {
        labelWidth: 0,
        labelAlign: "left",
        size: "small",
        inputAlign: "right",
        errorMessageAlign: "left",
      },

      dialogVisible: false,
      // 表单渲染数据
      configData: {},
    };
  },
  created() {
    if (utils.getUrlKey("formID")) {
      let data = {
        formId: utils.getUrlKey("formID"),
      };
      searchFormOneData(data)
        .then((res) => {
          console.log(JSON.parse(res.backValue.configModel).config);
          this.widgetList = [...JSON.parse(res.backValue.configModel).list];
          this.formConfig = JSON.parse(res.backValue.configModel).config;
          this.$refs.vantForm.initialData(this.widgetList, this.formConfig);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (utils.getUrlKey("type") == "add") {
      this.type = "add";
    } else {
      this.type = "edit";
    }
   
  },
  methods: {
    handlePreview() {
      // 预览方法，获取表单设计器配置信息
      const config = {
        list: [...this.widgetList],
        config: { ...this.formConfig },
      };
      for (let i = 0; i < config["list"].length; i++) {
        config["list"][i].options["readonly"] = false;
      }
      this.configData = config; // 将配置信息传递到 GenerateForm 中
      this.dialogVisible = true;
      console.log(this.formConfig);
    },
    empty() {
      this.configData = { list: [], config: {} };
      this.widgetSelect = null;

      this.$refs.vantForm.empty();
    },
    //创建保存表单
    creatForm() {
      if (this.form.name) {
        // 获取表单设计器配置信息
        const config = {
          list: [...this.widgetList],
          config: { ...this.formConfig },
        };
        for (let i = 0; i < config["list"].length; i++) {
          config["list"][i].options["readonly"] = false;
        }
        let data = {
          eid: utils.getUrlKey("eid"),
          uid: utils.getUrlKey("uid"),
          name: this.form.name,
          configModel: JSON.stringify(config),
        };
        creatForm(data)
          .then((res) => {
            this.dialogFormVisible = false;
            this.$bus.$emit("searchForm");
            window.close();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //更新表单
    updateForm() {
      console.log("更新");
      const config = {
        list: [...this.widgetList],
        config: { ...this.formConfig },
      };
      for (let i = 0; i < config["list"].length; i++) {
        config["list"][i].options["readonly"] = false;
      }
      let data = {
        formId: utils.getUrlKey("formID"),
        configModel: JSON.stringify(config),
      };

      updataForm(data)
        .then((res) => {
          console.log(res);
          this.centerDialogVisible = false;
            this.$message({
              message: "更新成功",
              type: "success",
            });
        })
        .catch((err) => {
           this.$message.error('更新失败：' + err);
        });
    },
  },
};
</script>

<style lang="scss">
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
//...
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
  list-style: none;
  margin: calc((15vw - 240px) / 2);
}
.list-group-item {
  cursor: move;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 0;
  margin: 5px;
  font-size: 10px;
  line-height: 50px;
  background-color: rgb(246, 247, 255);
  float: left;
  box-sizing: border-box;
}
.list-group-item:hover {
  border: 1px dashed rgb(120, 123, 232);
}
.fm-header {
  border-bottom: 1px solid rgb(228, 231, 237);
  color: rgb(233, 64, 87);
  font-weight: 600;
  font-size: 25px;
  white-space: nowrap;
  text-align: left;
  line-height: 60px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.fm-header .logo {
  width: 50px;
  height: 50px;
  float: left;
  padding-top: 5px;
  margin-right: 5px;
}
.header-left {
  width: 20%;
  margin: 0;
  float: left;
}
.header-right {
  width: 15%;
  float: right;
  .btn {
    margin-left: 10px;
  }
}
.fm-left {
  width: 15vw;
  float: left;
  height: calc(100vh - 60px);
  // margin-top: 15px;
  border-right: 1px solid rgb(228, 231, 237);
}

.fm-main {
  width: 60%;
  float: left;
  margin: 10px;
  // padding-top: 50px;
  // background:url(./1.jpg)
}
.fm-right {
  width: 20%;
  height: calc(100vh - 60px);
  // margin-top: 15px;
  border-left: 1px solid rgb(228, 231, 237);
  float: right;
}
.left-text {
  font-weight: 600;
  font-size: 14px;
  margin: 18px 0 0px 8px;
  float: left;
}
.clear {
  clear: both;
}
</style>