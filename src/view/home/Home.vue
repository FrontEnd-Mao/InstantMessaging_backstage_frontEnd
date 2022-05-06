<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-title">
        <span style="font-size: 18px; color: #000">后台管理系统</span>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <!--导航菜单-->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        style="width: 250px"
      >
        <el-menu-item index="1">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toMailList">
          <i class="el-icon-setting"></i>
          <span slot="title">企业通讯录</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">我的企业</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>流程与表单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="toForm">表单配置</el-menu-item>
            <el-menu-item index="4-2" @click="toProcess">流程配置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>公告管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" @click="toAllNotice"
              >所有公告</el-menu-item
            >
            <el-menu-item index="5-2" @click="toEditNotice"
              >公告编辑</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <!--右侧内容区-->
      <el-col :span="20" class="content-wrapper" style="padding-left: 5%">
        <router-view></router-view>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import NavMenu from "../../components/main/navMenu/NavMenu.vue";
export default {
  components: {
    NavMenu,
  },
  data() {
    return {
      userData: {},
    };
  },
  created() {
    this.getLocalStorage();
  },
  methods: {
    //获取缓存
    getLocalStorage() {
      let userStorage = JSON.parse(localStorage.getItem("backstage_user"));
      if (userStorage) {
        this.userData = userStorage;
      } else {
        this.$router.push({ path: "/Login" });
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //进入通讯录
    toMailList() {
      this.$router.push({
        path: "/MailList",
        name: "MailList",
        query: {
          eid: this.userData.eid,
          uid: this.userData.uid,
        },
      });
    },
    //金UR表单
    toForm() {
      this.$router.push({
        path: "/FormList",
        name: "FromList",
        query: {
          eid: this.userData.eid,
          uid: this.userData.uid,
        },
      });
    },
    //进入流程
    toProcess() {
      this.$router.push({
        path: "/ProcessList",
        name: "ProcessList",
        query: {
          eid: this.userData.eid,
          uid: this.userData.uid,
        },
      });
    },
    //进入所有公告
    toAllNotice() {
      this.$router.push({
        path: "/AllNotice",
        name: "AllNotice",
        query: {
          eid: this.userData.eid,
          uid: this.userData.uid,
        },
      });
    },
    //进入编辑
    toEditNotice() {
      this.$router.push({
        path: "/EditNotice",
        name: "EditNotice",
        query: {
          eid: this.userData.eid,
          uid: this.userData.uid,
        },
      });
    },
  },
};
</script>
<style scoped lang="scss" >
.el-menu-vertical-demo {
  text-align: left;
}
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .topbar-wrap {
    height: 60px;
    line-height: 60px;
    background: #fff;
    padding: 0px;
    box-shadow: 0 2px 8px #f0f1f2;
    color: #000;
    /*.topbar-btn:hover {*/
    /*background-color: #4A5064;*/
    /*}*/
    .topbar-logo {
      float: left;
      width: 59px;
      line-height: 26px;
    }

    .topbar-logos {
      float: left;
      width: 120px;
      line-height: 26px;
    }

    .topbar-logo img,
    .topbar-logos img {
      height: 40px;
      margin-top: 5px;
      margin-left: 2px;
    }

    .topbar-title {
      float: left;
      text-align: left;
      width: 200px;
      padding-left: 10px;
      border-left: 1px solid #000;
    }

    .topbar-account {
      float: right;
      padding-right: 12px;
    }

    .userinfo-inner {
      cursor: pointer;
      color: #000;
      padding-left: 10px;
    }
  }

  .main {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: fixed;
    top: 70px;
    bottom: 0px;
    overflow: hidden;
    border-radius: 0;
    background: #fff;
    padding-top: 20px;
  }

  aside {
    min-width: 50px;
    background: #fff;

    &::-webkit-scrollbar {
      display: none;
    }

    &.showSidebar {
      overflow-x: hidden;
      overflow-y: auto;
    }

    .el-menu {
      height: 100%; /*写给不支持calc()的浏览器*/
      height: -moz-calc(100% - 80px);
      height: -webkit-calc(100% - 80px);
      height: calc(100% - 80px);
      border-radius: 0px;
      background-color: #fff;
      border-right: 0px;
    }

    .el-submenu .el-menu-item {
      min-width: 60px;
    }

    .el-menu {
      width: 180px;
    }

    .el-menu--collapse {
      width: 60px;
    }

    .el-menu .el-menu-item,
    .el-submenu .el-submenu__title {
      height: 46px;
      line-height: 46px;
    }

    .el-menu-item:hover,
    .el-submenu .el-menu-item:hover,
    .el-submenu__title:hover {
      background-color: #fff;
      color: #fff;
    }
  }

  .menu-toggle {
    background: #fff;
    text-align: center;
    color: white;
    height: 26px;
    line-height: 30px;
  }

  .content-container {
    background: rgb(246, 247, 253);
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    padding-bottom: 1px;

    .content-wrapper {
      background-color: rgb(246, 247, 253);
      box-sizing: border-box;
    }
  }
}
</style>