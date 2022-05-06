<template>
  <div class="content">
    <div class="left">
      <el-tree
        lazy
        @node-click="changeSelectNode"
        :load="loadNode"
        :props="props"
        node-key="id"
      >
      </el-tree>
    </div>
    <div class="right">
      <el-row class="top">
        <div>
          <span class="departmentName">{{ selectNode.name }}</span
          ><span class="count">{{ tableData.length }}</span>
        </div>
      </el-row>
      <el-row class="center">
        <el-button class="departBtn" size="small" @click="dialogVisible = true"
          >添加子部门</el-button
        >
        <el-button
          class="departBtn"
          size="small"
          type="primary"
          plain
          @click="dialogAchangeName = true"
          >修改部门名称</el-button
        >
        <el-button
          class="departBtn"
          size="small"
          type="primary"
          plain
          @click="clickDialogAddEmployee"
          >添加员工</el-button
        >
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确定删除吗"
          @confirm="delate"
        >
          <el-button
            class="departBtn"
            size="small"
            slot="reference"
            type="danger"
            >删除子部门</el-button
          >
        </el-popconfirm>
      </el-row>
      <el-row>
        <el-table class="employeesTable" :data="tableData" style="width: 100%">
          <el-table-column label="员工" width="180">
            <template slot-scope="scope">
              <img
                style="
                  width: 30px;
                  height: 30px;
                  vertical-align: middle;
                  border-radius: 50%;
                "
                class="employeesImg"
                :src="scope.row.imgurl"
                alt=""
              />
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" width="220">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.sex }}</span>
            </template>
          </el-table-column>
          <el-table-column label="职位" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.position }}</span>
            </template>
          </el-table-column>
          <el-table-column label="加入时间" width="210">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.joiningTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <el-dialog
      title="添加部门"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
    >
      <el-form ref="form" :model="form" class="demo-form-inline">
        <el-form-item label="部门名称">
          <el-input
            v-model="form.departmentName"
            placeholder="部门名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDepartment">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改部门名称"
      :visible.sync="dialogAchangeName"
      width="30%"
      :append-to-body="true"
    >
      <el-form ref="formone" :model="formone" class="demo-form-inline">
        <el-form-item label="部门名称">
          <el-input
            v-model="formone.departmentName"
            placeholder="部门名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAchangeName = false">取 消</el-button>
        <el-button type="primary" @click="changeDepartName">更新</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加成员"
      :visible.sync="dialogAddEmployees"
      width="40%"
      :append-to-body="true"
    >
      <el-form ref="formone" :model="formone" class="demo-form-inline">
        <el-form-item label="成员">
          <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入员工姓名或邮箱"
            v-model="value"
            :data="transferData"
          >
          </el-transfer>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddEmployees = false">取 消</el-button>
        <el-button type="primary" @click="addEmployees">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  loadfirstnode,
  loadchildnode,
  addDepartment,
  delateDepartment,
  changeDepartmentName,
  getDepartmentMembers,
  addDepartmentMembers,
  getEnterpriseemployees,
  deleteEmployees,
} from "@/network/threeData.js";
import utiles from "@/utils/utils.js";
export default {
  data() {
    //穿梭框

    return {
      props: {
        label: "name",
        isLeaf: "isLeaf",
      },
      dialogVisible: false,
      dialogAchangeName: false,
      dialogAddEmployees: false,
      form: {
        departmentName: "",
      },
      formone: {
        departmentName: "",
      },
      selectNode: "",
      nowPage: 0,
      pageSize: 10,
      tableData: [],
      transferData: [],
      value: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
    };
  },
  mounted() {
    this.getAllgetEemployees();
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.loadfirstnode(resolve);
      }
      if (node.level >= 1) {
        this.loadchildnode(node, resolve);
      }
    },
    //加载第一级节点
    async loadfirstnode(resolve) {
      let data = {
        eid: utiles.getUrlKey("eid"),
        level: 0,
      };
      const res = await loadfirstnode(data);
      let node = [
        {
          name: res.resualt.departmentName,
          id: res.resualt._id,
          level: res.resualt.level,
        },
      ];
      this.selectNode = node[0];

      return resolve(node);
    },
    //加载节点的子节点集合
    async loadchildnode(node, resolve) {
      // console.log("超过二级的", node, node.level);

      let data = {
        eid: utiles.getUrlKey("eid"),
        parentId: node.data.id,
      };

      const res = await loadchildnode(data);
      let nodes = [];

      res.resualt.forEach((element) => {
        nodes.push({
          name: element.departmentName,
          id: element._id,
          level: element.level,
        });
      });
      return resolve(nodes);
    },
    //添加子部门
    addDepartment() {
      let data = {
        eid: utiles.getUrlKey("eid"),
        parentID: this.selectNode.id,
        level: this.selectNode.level,
        departmentName: this.form.departmentName,
      };

      if (this.selectNode.id) {
        addDepartment(data)
          .then((res) => {
            // console.log(res);
            // this.dialogVisible = false;
            window.location.reload();
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        this.dialogVisible = false;
        this.$notify({
          title: "警告",
          message: "请选择部门",
          type: "warning",
        });
      }
    },
    //删除子部门
    delate() {
      if (this.selectNode.id) {
        let data = {
          departmentId: this.selectNode.id,
        };
        delateDepartment(data)
          .then((res) => {
            if (res.status == 200) {
              window.location.reload();
            } else if (res.status == 1) {
              this.$notify({
                title: "警告",
                message: "请删除此部门下的成员或子部门后，再删除此部门",
                type: "warning",
              });
            } else if (res.status == 500) {
              this.$message.error("服务器错误");
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        this.$notify({
          title: "警告",
          message: "请选择部门",
          type: "warning",
        });
      }
    },
    //修改部门名称
    changeDepartName() {
      if (this.selectNode.id) {
        let data = {
          departmentId: this.selectNode.id,
          departmentName: this.formone.departmentName,
        };
        changeDepartmentName(data)
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        this.$notify({
          title: "警告",
          message: "请选择部门",
          type: "warning",
        });
      }
    },
    //点击节点时更改被选中的组织数据并获取该节点的员工信息
    changeSelectNode(data) {
      this.selectNode = data;

      if (this.selectNode.level == 0) {
        this.getAllgetEemployees();
      } else {
        this.getDepartmentEemployees();
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除公司成员
    handleDelete(index, row) {
      this.$alert("删除后，成员的企业微信消息记录将完全被清除。", "删除成员", {
        confirmButtonText: "确定",
        showCancelButton: true,
        callback: (action) => {
          if (action == "confirm") {
            let data = {
              uid: row.uid,
            };
            deleteEmployees(data)
              .then((res) => {
                if (res.status == 200) {
                  this.tableData.splice(index, 1);
                  this.$message({
                    message: "删除成功",
                    type: "success",
                  });
                } else if (res.status == 500) {
                  this.$message.error("服务器错误");
                }
              })
              .catch((err) => {
                this.$message.error(err);
              });
          }
          console.log(index, row);
        },
      });
    },
    //获取公司员工
    getAllgetEemployees() {
      let data = {
        eid: utiles.getUrlKey("eid"),
        pageSize: this.pageSize,
        nowPage: this.nowPage,
      };
      getEnterpriseemployees(data)
        .then((res) => {
          if (res.status == 200) {
            this.tableData = res.backValue;
            this.tableData.forEach((item) => {
              item.imgurl = this.apiUrl + item.imgurl;
              item.joiningTime = utiles.timestampToTime(item.joiningTime);
              if (item.position == "none") {
                item.position = "无";
              }
              if (item.sex == "asexual") {
                item.sex = "无";
              } else if (item.sex == "male") {
                item.sex = "男";
              } else {
                item.sex = "女";
              }
            });
          } else if (res.status == 500) {
            this.$message.error("服务器错误");
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    //获取部门员工
    getDepartmentEemployees() {
      let data = {
        department: this.selectNode.id,
        eid: utiles.getUrlKey("eid"),
        pageSize: this.pageSize,
        nowPage: this.nowPage,
      };
      getDepartmentMembers(data)
        .then((res) => {
          if (res.status == 200) {
            this.tableData = res.backValue;

            if (this.tableData.length) {
              this.tableData.forEach((item) => {
                item.imgurl = this.apiUrl + item.imgurl;
                item.joiningTime = utiles.timestampToTime(item.joiningTime);
                if (item.position == "none") {
                  item.position = "无";
                }
                if (item.sex == "asexual") {
                  item.sex = "无";
                } else if (item.sex == "male") {
                  item.sex = "男";
                } else {
                  item.sex = "女";
                }
              });
            }
          } else if (res.status == 500) {
            this.$message.error("服务器错误");
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    //点击添加部门成员按钮为穿梭框赋值
    clickDialogAddEmployee() {
      const transfer = [];
      let data = {
        eid: utiles.getUrlKey("eid"),
        pageSize: this.pageSize,
        nowPage: this.nowPage,
      };
      getEnterpriseemployees(data)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.backValue);
            res.backValue.forEach((item) => {
              transfer.push({
                label: item.name,
                key: item.employeesId,
              });
            });
            this.transferData = transfer;
          } else if (res.status == 500) {
            this.$message.error("服务器错误");
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });

      this.dialogAddEmployees = true;
    },
    //部门添加员工
    addEmployees() {
      let data = {
        uids: this.value,
        departmentId: this.selectNode.id,
      };
      addDepartmentMembers(data)
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.getDepartmentEemployees();
          }
          this.dialogAddEmployees = false;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>

<style lang="scss">
.content {
  width: 100%;
  height: 50vh;
  .left {
    width: 15%;
    height: 100%;
    float: left;
  }
  .right {
    width: 85%;
    height: 100%;
    float: left;
    .top {
      text-align: left;
      .departmentName {
        margin: 10px;
        font-size: 18px;
        font-weight: 600;
      }
      .count {
        margin: 10px;
      }
    }
    .center {
      margin-bottom: 20px;
      .departBtn {
        float: right;
        margin-right: 15px;
      }
    }
  }
  .el-transfer-panel {
    width: 280px;
  }
}
</style>