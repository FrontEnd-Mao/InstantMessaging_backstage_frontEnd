export default {
    componentList: [
        {
            type: "input",
            name: "单行文本",
            options: {
              width: "100%",
              defaultValue: "",
              placeholder: "",
              required: false,
            },
          },
          {
            type: "password",
            name: "密码输入框",
            options: {
              width: "100%",
              defaultValue: "",
              placeholder: "",
              required: false,
              remoteOptions: [], // 用于绑定后端返回的数据
              remoteFunc: "", // 设计器获取后端数据方法，下面配置时详细介绍
            },
          },
          {
            type: "picker",
            name: "选择器",
            options: {
              width: "100%",
              defaultValue: "",
              placeholder: "点击选择城市",
              required: false,
              remoteOptions: [], // 用于绑定后端返回的数据
              remoteFunc: "", // 设计器获取后端数据方法，下面配置时详细介绍
            },
          },
    ]
}