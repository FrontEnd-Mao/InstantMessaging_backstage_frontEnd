<template>
  <van-uploader v-model="fileList" :after-read="afterRead" />
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        { url: "https://cdn.jsdelivr.net/npm/@vant/assets/leaf.jpeg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: "https://cloud-image", isImage: true },
      ],
    };
  },
  methods: {
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";

      setTimeout(() => {
        file.status = "failed";
        file.message = "上传失败";
      }, 1000);
    },
  },
};
</script>

<style>
</style>