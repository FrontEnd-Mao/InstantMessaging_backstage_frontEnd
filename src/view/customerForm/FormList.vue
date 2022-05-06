<template>
  <div>
    <div class="addFrom">
      <el-button type="primary" icon="el-icon-plus" @click="addFrom"
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
      <el-table-column label="表单名称" prop="formName"> </el-table-column>
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
            title="这是一段内容确定删除吗？"
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
        :total="formCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import utils from "@/utils/utils.js";
import { searchFormData, delateForm } from "@/network/customerForm.js";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      currentPage3: 1, //跳转到第几页
      formCount: 0, //流程总数
      pageSize: 10, //一页条数
      nowPage: 0, //第几页
    };
  },
  created() {
    this.searchFormData();
    this.$bus.$on("searchForm", () => {
      // 函数体内即为代码逻辑 我这里是重新调用接口以获得最新数量
      console.log('进入bus');
      // this.searchFormData();

    });
  },
  methods: {
    //查询表单信息
    searchFormData() {
      let data = {
        uid: this.$route.query.uid,
        eid: this.$route.query.eid,
        pageSize: this.pageSize,
        nowPage: this.nowPage,
      };
      searchFormData(data)
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
    //编辑表单信息
    handleEdit(index, row) {
      console.log(index, row);
      let url =
        "#/CustormForm?eid=" +
        this.$route.query.eid +
        "&uid=" +
        this.$route.query.uid +
        "&formID=" +
        this.tableData[index].formId +
        "&type=edit";
      window.open(url);
    },
    //删除表单
    handleDelete(index, row) {
      console.log(index, row);
      let data = {
        formId: row["formId"],
      };
      delateForm(data)
        .then((res) => {
          console.log(res);
          this.tableData.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //新增表单跳转
    addFrom() {
      let url =
        "#/CustormForm?eid=" +
        this.$route.query.eid +
        "&uid=" +
        this.$route.query.uid +
        "&type=add";
      window.open(url);
      console.log(this.$route.query.uid);
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
  beforeDestroy() {
    this.$bus.$off("searchForm");
  },
};
</script>

<style lang="scss">
.addFrom {
  float: right;
  margin-right: 10px;
}
</style>