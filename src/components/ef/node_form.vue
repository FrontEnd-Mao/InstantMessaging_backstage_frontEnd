<template>
  <div>
    <div class="ef-node-form">
      <div class="ef-node-form-header">编辑</div>
      <div class="ef-node-form-body">
        <el-form
          :model="node"
          ref="dataForm"
          label-width="80px"
          v-show="type === 'node'"
        >
          <el-form-item label="类型">
            <el-input v-model="node.type" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="node.name"></el-input>
          </el-form-item>
          <el-form-item label="left坐标">
            <el-input v-model="node.left" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="top坐标">
            <el-input v-model="node.top" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="ico图标">
            <el-input v-model="node.ico"></el-input>
          </el-form-item>
          <el-form-item label="绑定审批人">
            <el-button @click="bindingAapprover = true">设置表达式</el-button>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="node.state" placeholder="请选择">
              <el-option
                v-for="item in stateList"
                :key="item.state"
                :label="item.label"
                :value="item.state"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-close">重置</el-button>
            <el-button type="primary" icon="el-icon-check" @click="save"
              >保存</el-button
            >
          </el-form-item>
          <el-dialog title="审批人选择" :visible.sync="bindingAapprover">
            <el-table
              ref="singleTable"
              :data="tableData"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%; margin-bottom: 30px"
            >
              <el-table-column type="index" width="50"> </el-table-column>
              <el-table-column property="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column property="department" label="部门" width="120">
              </el-table-column>

              <el-table-column property="position" label="职位">
              </el-table-column>
            </el-table>
            <el-button @click="bindingAapprover = false">取 消</el-button>
            <el-button type="primary" @click="addApprover">确 定</el-button>
          </el-dialog>
        </el-form>

        <el-form
          :model="line"
          ref="dataForm"
          label-width="80px"
          v-show="type === 'line'"
        >
          <el-form-item label="条件">
            <el-input v-model="line.label" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="表达式">
            <el-button @click="dialogTableVisible = true">设置表达式</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-close">重置</el-button>
            <el-button type="primary" icon="el-icon-check" @click="saveLine"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
        <el-dialog title="表达式" :visible.sync="dialogTableVisible">
          <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            label-width="100px"
            class="demo-dynamic"
          >
            <div class="content">
              <div class="header">
                <el-row :gutter="20">
                  <el-col :span="3"
                    ><div class="grid-content bg-purple">左括号</div></el-col
                  >
                  <el-col :span="5"
                    ><div class="grid-content bg-purple">控件名称</div></el-col
                  >
                  <el-col :span="3"
                    ><div class="grid-content bg-purple">判断条件</div></el-col
                  >
                  <el-col :span="3"
                    ><div class="grid-content bg-purple">数值</div></el-col
                  >
                  <el-col :span="3"
                    ><div class="grid-content bg-purple">右括号</div></el-col
                  >
                  <el-col :span="3"
                    ><div class="grid-content bg-purple">连接条件</div></el-col
                  >
                  <el-col :span="4"
                    ><div class="grid-content bg-purple">操作</div></el-col
                  >
                </el-row>
              </div>
              <div class="expressInput">
                <el-form-item
                  v-for="(domain, index) in dynamicValidateForm.domains"
                  :key="domain.key"
                  :prop="'domains.' + index + '.optionsControls'"
                  style="margin-top: 15px"
                  :rules="{
                    required: true,
                    message: '不能为空',
                    trigger: 'blur',
                  }"
                >
                  <el-row :gutter="20">
                    <el-col :span="3"
                      ><div class="grid-content bg-purple">
                        <el-select
                          v-model="domain.leftParenthesis"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in leftParenthesis"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select></div
                    ></el-col>
                    <el-col :span="5"
                      ><div class="grid-content bg-purple">
                        <el-select
                          v-model="domain.optionsControls"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in optionsControls"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select></div
                    ></el-col>
                    <el-col :span="3"
                      ><div class="grid-content bg-purple">
                        <el-select
                          v-model="domain.optionsJudgmentConditions"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in optionsJudgmentConditions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select></div
                    ></el-col>
                    <el-col :span="3"
                      ><div class="grid-content bg-purple">
                        <el-input
                          @input="
                            domain.dataValue = domain.dataValue.replace(
                              /[^\d.]/g,
                              ''
                            )
                          "
                          v-model="domain.dataValue"
                        ></el-input></div
                    ></el-col>
                    <el-col :span="3"
                      ><div class="grid-content bg-purple">
                        <el-select
                          v-model="domain.rightParenthesis"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in rightParenthesis"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select></div
                    ></el-col>
                    <el-col :span="3"
                      ><div class="grid-content bg-purple">
                        <el-select
                          v-model="domain.connectionConditions"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in connectionConditions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select></div
                    ></el-col>
                    <el-col :span="4"
                      ><div class="grid-content bg-purple">
                        <el-button @click.prevent="removeDomain(domain)"
                          >删除</el-button
                        >
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
            </div>

            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('dynamicValidateForm')"
                >提交</el-button
              >
              <el-button @click="addDomain">新增</el-button>
              <el-button @click="resetForm('dynamicValidateForm')"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { getEmployee } from "@/network/workFlow.js";
import utils from "@/utils/utils.js";

export default {
  props: ["configModel"],
  data() {
    return {
      visible: true,
      // node 或 line
      type: "node",
      node: {},
      line: {},
      data: {},
      dialogTableVisible: false,
      //绑定审批人弹出框
      bindingAapprover: false,
      //审批人值
      approver: "",
      optionsJudgmentConditions: [
        {
          value: "<",
          label: "<",
        },
        {
          value: "<=",
          label: "<=",
        },
      ],
      optionsconnectionConditions: [
        {
          value: "AND",
          label: "AND",
        },
        {
          value: "OR",
          label: "OR",
        },
        {
          value: "",
          label: "无",
        },
      ],
      //动态表单
      dynamicValidateForm: {
        domains: [
          {
            leftParenthesis: "",
            rightParenthesis: "",
            connectionConditions: "",
            dataValue: "",
            optionsJudgmentConditions: "",
            optionsControls: "",
          },
        ],
        email: "",
      },
      //左括号
      leftParenthesis: [
        {
          value: " ",
          label: " ",
        },
        {
          value: "(",
          label: "(",
        },
      ],
      //右括号
      rightParenthesis: [
        {
          value: " ",
          label: " ",
        },
        {
          value: ")",
          label: ")",
        },
      ],
      //逻辑判断
      connectionConditions: [
        {
          value: " ",
          label: " ",
        },
        {
          value: "OR",
          label: "OR",
        },
        {
          value: "AND",
          label: "AND",
        },
      ],
      //判断条件
      optionsJudgmentConditions: [
        {
          value: "<",
          label: "<",
        },
        {
          value: "<=",
          label: "<=",
        },
        {
          value: ">",
          label: ">",
        },
        {
          value: ">=",
          label: ">=",
        },
        {
          value: "=",
          label: "=",
        },
      ],
      //控件名称
      optionsControls: [],
      //表达式
      express: "",
      stateList: [
        {
          state: "success",
          label: "成功",
        },
        {
          state: "warning",
          label: "警告",
        },
        {
          state: "error",
          label: "错误",
        },
        {
          state: "running",
          label: "运行中",
        },
      ],
      //审批人列表
      tableData: [],
      multipleSelection: [],
    };
  },
  //监听异步获取的表单model
  watch: {
    configModel: {
      // 监控该变量，重新赋值并刷新图表
      handler(newVal) {
        this.configModel = newVal;
        this.addModelValue();
      },
      deep: true, // 必须设置
    },
  },
  mounted() {
    this.addModelValue();
    this.getEmployees();
  },
  methods: {
    /**
     * 表单修改，这里可以根据传入的ID进行业务信息获取
     * @param data
     * @param id
     */
    nodeInit(data, id) {
      this.type = "node";
      this.data = data;
      data.nodeList.filter((node) => {
        if (node.id === id) {
          this.node = cloneDeep(node);
        }
      });
    },
    lineInit(line) {
      this.type = "line";
      this.line = line;
    },
    // 修改连线
    saveLine() {
      this.$emit("setLineLabel", this.line.from, this.line.to, this.line.label);
      this.$message({
        message: "保存成功",
        type: "success",
      });
    },
    //保存
    save() {
      console.log(this.node);
      if (this.node.id) {
        this.data.nodeList.filter((node) => {
          if (node.id === this.node.id) {
            if (this.approver) {
              this.node.name = this.approver.name;
            }
            node.name = this.node.name;
            node.left = this.node.left;
            node.top = this.node.top;
            node.ico = this.node.ico;
            node.state = this.node.state;
            node.bindingApprover = this.approver;

            this.$emit("repaintEverything");
            this.$message({
              message: "保存成功",
              type: "success",
            });
          }
        });
      } else {
        this.$message({
          message: "请选择节点s",
          type: "warning",
        });
      }
    },
    //添加表单模型
    addModelValue() {
      this.configModel.forEach((element) => {
        this.optionsControls.push({
          value: element.model,
          label: element.name,
        });
      });
    },
    //提交表达式
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dynamicValidateForm.domains.forEach((item) => {
            this.express +=
              item.leftParenthesis +
              `formValueCopy['${item.optionsControls}']` +
              item.optionsJudgmentConditions +
              item.dataValue +
              item.rightParenthesis +
              item.connectionConditions;
          });
          this.$emit(
            "setLineLabel",
            this.line.from,
            this.line.to,
            this.line.label,
            this.express
          );
          this.dialogTableVisible = false;
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.express = "";
        } else {
          this.$message({
            message: "警告哦，请填写完成",
            type: "warning",
          });
          return false;
        }
      });
    },
    //表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //移除一行
    removeDomain(item) {
      if (this.dynamicValidateForm.domains.length == 1) {
        this.$message({
          message: "不能再删除了哦！",
          type: "warning",
        });
      } else {
        var index = this.dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1);
        }
      }
    },
    //添加一行
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    //获取企业员工人数
    getEmployees() {
      let data = {
        enterpriseID: utils.getUrlKey("eid"),
      };
      getEmployee(data)
        .then((res) => {
          this.tableData = res.backValue;
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //选择性表单
    handleCurrentChange(val) {
      this.approver = val;
      console.log(this.approver);
    },
    //绑定审批人
    addApprover() {

        if (this.approver) {
          this.save();
          this.bindingAapprover = false;
        } else {
          this.$message({
            message: "请选择一位审批人",
            type: "warning",
          });
        }

    },
  },
};
</script>

<style>
.el-node-form-tag {
  position: absolute;
  top: 50%;
  margin-left: -15px;
  height: 40px;
  width: 15px;
  background-color: #fbfbfb;
  border: 1px solid rgb(220, 227, 232);
  border-right: none;
  z-index: 0;
}
.el-form-item__content {
  margin: 0 !important;
}
.el-dialog {
  width: 60%;
}
</style>
