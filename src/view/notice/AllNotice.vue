<template>
  <div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="标题" prop="title"> </el-table-column>
      <el-table-column label="发布人" prop="userName"> </el-table-column>
      <el-table-column label="发布时间" prop="releaseTime"> </el-table-column>
      <el-table-column label="更新时间" prop="modificationTime"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >

          <el-popconfirm
            title="您确定要删除吗？"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
              size="mini"
              slot="reference"
              type="danger"
              style="margin-left: 20px"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑文章"
      :append-to-body="true"
      :visible.sync="dialogVisible"
    >
      <el-row class="row">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-upload
              class="avatar-uploader"
              :action="serverUrl"
              :show-file-list="false"
              :before-upload="beforeCoverUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="内容">
            <!-- 图片上传组件辅助-->
            <el-upload
              class="avatar-uploader"
              :action="serverUrl"
              name="file"
              :show-file-list="false"
              :on-error="uploadError"
              :before-upload="beforeAvatarUpload"
              style="display: none"
            >
            </el-upload>
            <quill-editor
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              @change="onEditorChange($event)"
              style="height: 400px; width: 800px; margin-top: 30px"
            >
            </quill-editor>
          </el-form-item>
          <el-form-item style="margin-top: 110px">
            <el-button type="primary" @click="updata">更新</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllArticles,
  deleteArticle,
  getArticalContent,
  updataArticalContent,
} from "@/network/announcement.js";
import utils from "@/utils/utils.js";

import Vue from "vue";
import VueQuillEditor from "vue-quill-editor";
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor /* { default global options } */);
import { quillEditor } from "vue-quill-editor";
import { toFileReq } from "@/network/fileRequest.js";
import { uploadArticle } from "@/network/announcement.js";

// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ direction: "rtl" }], // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"], // 链接、图片、视频
  //["link", "image"] // 链接、图片
];
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      tableData: [],
      search: "",
      nowPage: 0, //当前页数
      pageSize: 10, //页数大小
      dialogVisible: false,
      row: {},  //选择的行内容
      index: '', //选择行数
      content: "<h2>I am Example</h2>",
      serverUrl: this.apiUrl + "/photos/upload", // 这里写你要上传的图片服务器地址
      imageUrl: "", //上传头像url
      form: {
        title: "", //标题
        content: "", //内容
        imageUrl: "", //封面标题
      },
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",
            handlers: {
              image: function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document
                    .querySelectorAll(".avatar-uploader input")[1]
                    .click();
                } else {
                  this.quill.format("image", false);
                }
              },
              video: function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("video", false);
                }
              },
            },
          },
        },
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getArtical();
    // console.log("this is current quill instance object", this.editor);
  },
  methods: {
    //编辑操作
    handleEdit(index, row) {
      console.log(index, row);
      this.row = row;
      this.index = index
      this.dialogVisible = true;
      this.imageUrl = this.apiUrl + row.imgurl;
      this.form.imageUrl = row.imgurl;
      this.form.title = row.title;
      let data = {
        articalId: row.articalId,
      };
      getArticalContent(data)
        .then((res) => {
          if (res.status == 200) {
            this.content = res.backValue.content;
            this.imageUrl= this.apiUrl + res.backValue.imgurl;
            this.form.imgurl = res.backValue.imgurl;
            this.form.title = res.backValue.title;
          } else if (res.status == 500) {
            this.$message.error("服务器错误！");
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    //删除操作
    handleDelete(index, row) {
      console.log(index, row);
      this.deleteArticle(row.articalId, index);
    },
    //取消
    cancel() {
      this.dialogVisible = false;
    },
    //更新
    updata() {
      let data = {
        aid: this.row.articalId,
        title: this.form.title,
        imgurl: this.form.imageUrl,
        content: this.content,
      };
      console.log(data);
      updataArticalContent(data)
        .then((res) => {
          if (res.status == 200) {
            // this.dialogVisible = false;
            window.location.reload();
          } else if (res.status == 500) {
            this.$message.error("服务器错误");
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    //获取文章
    getArtical() {
      let data = {
        eid: utils.getUrlKey("eid"),
        nowPage: this.nowPage,
        pageSize: this.pageSize,
      };
      getAllArticles(data)
        .then((res) => {
          if (res.status == 200) {
            this.tableData = res.backValue;
            console.log(this.tableData);
 
            this.tableData.forEach(element => {
                element.modificationTime = utils.timestampToTime(element.modificationTime);
                element.releaseTime = utils.timestampToTime(element.releaseTime);
            });
            console.log(res);
          } else if (res.status == 500) {
            this.$message.error("服务器错误");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除文章
    deleteArticle(aid, index) {
      let data = {
        articalId: aid,
      };
      console.log(data);
      deleteArticle(data)
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
    },

    /**************** */
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    //上传图片
    beforeAvatarUpload(file) {
      console.log(file);
      this.quillUpdateImg = true;
      var suffix = file.name.substring(file.name.lastIndexOf("."));
      const suffixs = [".jpeg", ".jpg", ".png"];
      let b = false;
      for (let i = 0; i < suffixs.length; i++) {
        if (suffix === suffixs[i]) {
          b = true;
          break;
        }
      }
      const isLt2M = file.size / 1024 / 1024 < 50;
      if (!b) {
        this.$message({
          message: "上传文件格式错误!",
          type: "warning",
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 50MB!",
          type: "warning",
        });
      }
      //上传
      /***************************************** */
      if (isLt2M && b) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        var _this = this;
        reader.onload = function () {
          var blob = _this.dataURItoBlob(reader.result);
          let formData = new FormData();
          formData.append("url", "artical");
          formData.append("file", blob, new Date() + ".png");
          toFileReq(formData)
            .then((res) => {
              console.log(res);
              if (res.data.status == 200) {
                _this.uploadSuccess(res.data.fileName);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        };
      }
      return false;
    },
    //base64转化blob
    dataURItoBlob(base64Data) {
      //console.log(base64Data);//data:image/png;base64,
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(base64Data.split(",")[1]);
      //base64 解码
      else {
        byteString = unescape(base64Data.split(",")[1]);
      }
      var mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0]; //mime类型 -- image/png

      // var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
      // var ia = new Uint8Array(arrayBuffer);//创建视图
      var ia = new Uint8Array(byteString.length); //创建视图
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ia], {
        type: mimeString,
      });
      return blob;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败s");
    },
    uploadSuccess(name) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      // 获取光标所在位置
      let length = quill.getSelection().index;
      console.log();
      quill.insertEmbed(length, "image", this.apiUrl + "/artical/" + name);
      // 调整光标到最后
      quill.setSelection(length + 1);

      // loading动画消失
      this.quillUpdateImg = false;
    },
    //上传封面
    beforeCoverUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (isJPG && isLt2M) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        var _this = this;
        reader.onload = function () {
          var blob = _this.dataURItoBlob(reader.result);
          let formData = new FormData();
          formData.append("url", "artical");
          formData.append("file", blob, new Date() + ".png");
          toFileReq(formData)
            .then((res) => {
              console.log(res);
              if (res.data.status == 200) {
                _this.imageUrl = _this.apiUrl + "/artical/" + res.data.fileName;
                _this.form.imageUrl = "/artical/" + res.data.fileName;
                console.log(_this.imageUrl);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        };
      }
      return false;
    },
    release() {
      this.form.content = this.content;
      let datas = {
        uid: utils.getUrlKey("uid"),
        eid: utils.getUrlKey("eid"),
        title: this.form.title,
        imgurl: this.form.imageUrl,
        content: this.form.content,
      };
      console.log(datas);
      uploadArticle(datas)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.form.title = "";
            (this.imageUrl = ""),
              (this.content = ""),
              this.$message({
                message: "发布成功",
                type: "success",
              });
          } else if (res.status == 500) {
            this.$message.error("发布失败");
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>

<style lang="scss">
.avatar {
  width: 100px;
  height: 100px;
}
</style>