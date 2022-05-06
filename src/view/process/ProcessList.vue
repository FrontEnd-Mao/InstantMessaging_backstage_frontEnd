<template>
  <div>
    <div class="addFrom">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="dialogFormVisible = true"
        >新增</el-button
      >
    </div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%; margin-bottom: 20px"
    >
      <el-table-column label="流程" prop="workFlowName"> </el-table-column>
      <el-table-column label="创建人" prop="createrName"> </el-table-column>
      <el-table-column label="修改日期" prop="modificationTime">
      </el-table-column>
      <el-table-column label="创建日期" prop="creatTime"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-popconfirm
            title="你确定要删除这条流程吗？"
            @confirm="handleDelete(scope.$index, scope.row)"
            style="margin-left: 20px"
          >
            <el-button size="mini" type="danger" slot="reference"
              >Delete</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="processCount"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="新增流程"
      :visible.sync="dialogFormVisible"
      style="z-index: 2007"
      :append-to-body="true"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="流程名称"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="绑定表单"
          prop="form"
          :label-width="formLabelWidth"
        >
          <el-select v-model="optionValue" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.formId"
              :label="item.formName"
              :value="item.formId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProcess">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { searchFormData } from "@/network/customerForm.js";
import {
  createWorkFlow,
  searchWorkFlow,
  delateFlow,
  searchWorkFlowCount,
} from "@/network/workFlow.js";
import utils from "@/utils/utils.js";

export default {
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入表单名称", trigger: "blur" }],
        form: [{ required: true, message: "请选择绑定表单", trigger: "blur" }],
      },
      search: "",
      dialogFormVisible: false,
      form: {
        name: "",
      },
      optionValue: "",
      options: [],
      formLabelWidth: "120px",
      tableData: [],
      currentPage3: 1, //跳转到第几页
      processCount: 0, //流程总数
      pageSize: 10, //一页条数
      nowPage: 0, //第几页
    };
  },
  created() {
    this.searchForm();
    this.searchWorkFlow();
    this.searchPrcessCount();
  },
  methods: {
    //编辑流程
    handleEdit(index, row) {
      let url =
        "#/WorkFlow?eid=" +
        this.$route.query.eid +
        "&uid=" +
        this.$route.query.uid +
        "&workFlowId=" +
        row.workFlowId +
        "&type=edit";
      window.open(url);
    },
    //删除流程
    handleDelete(index, row) {
      let data = {
        workFlowId: row["workFlowId"],
      };
      delateFlow(data)
        .then((res) => {
          console.log(res);
          this.$message({
            message: "删除成功！",
            type: "success",
          });
          this.tableData.splice(index, 1);
        })
        .catch((err) => {
          this.$message({
            message: "删除失败！",
            type: "error",
          });
          console.log(err);
        });
    },
    //创建流程
    addProcess() {
      if (this.form.name && this.optionValue) {
        let data = {
          userID: utils.getUrlKey("uid"),
          enterpriseID: utils.getUrlKey("eid"),
          name: this.form.name,
          associatedForm: this.optionValue,
          creatTime: new Date(),
          modificationTime: new Date(),
        };
        createWorkFlow(data)
          .then((res) => {
            this.dialogFormVisible = false;
            this.form.name = "";
            this.optionValue = "";
            console.log(res);
            let url =
              "#/WorkFlow?eid=" +
              this.$route.query.eid +
              "&uid=" +
              this.$route.query.uid +
              "&workFlowId=" +
              res.workFlowId +
              "&type=add";
            window.open(url);
            location.reload();
          })
          .catch((err) => {
            log(err);
          });
      }
    },
    //获取表单数据
    searchForm() {
      let data = {
        uid: this.$route.query.uid,
        eid: this.$route.query.eid,
        pageSize: this.pageSize,
        nowPage: this.nowPage,
      };
      searchFormData(data)
        .then((res) => {
          let resualt = res.e;
          this.options = resualt;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //分页查询流程
    searchWorkFlow() {
      let data = {
        uid: utils.getUrlKey("uid"),
        eid: utils.getUrlKey("uid"),
        pageSize: this.pageSize,
        nowPage: this.nowPage,
      };
      searchWorkFlow(data)
        .then((res) => {
          let resualt = res.e;
          resualt.forEach(function (item) {
            item.creatTime = utils.timestampToTime(item.creatTime);
            item.modificationTime = utils.timestampToTime(
              item.modificationTime
            );
          });
          this.tableData = resualt;
          console.log(this.tableData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查询流程总数
    searchPrcessCount() {
      let data = {
        uid: utils.getUrlKey("uid"),
        eid: utils.getUrlKey("uid"),
        pageSize: 10,
        nowPage: 0,
      };
      searchWorkFlowCount(data)
        .then((res) => {
          console.log(res.resualt);
          this.processCount = res.resualt;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.nowPage = val - 1;
      this.searchWorkFlow();
    },
  },
};
</script>

<style>
</style>