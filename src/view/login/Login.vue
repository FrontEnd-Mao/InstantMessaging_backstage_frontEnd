<template>
  <div class="content">
    <img src="@/assets/Login/img/bg.png" alt="" class="wave" />
    <div class="container">
      <div class="img">
        <img src="@/assets/Login/img/img-3.svg" alt="" />
      </div>
      <div class="login-box">
        <form action="">
          <img src="@/assets/Login/img/avatar.svg" alt="" class="avatar" />
          <h2>Welcome</h2>
          <div class="input-group">
            <div class="icon">
              <i class="fa fa-user"></i>
            </div>
            <div>
              <!-- <h5>Username</h5> -->
              <input type="text" class="input" v-model="userName" />
            </div>
          </div>
          <div class="input-group">
            <div class="icon">
              <i class="fa fa-lock"></i>
            </div>
            <div>
              <!-- <h5>Password</h5> -->
              <input type="password" class="input" v-model="pwd" />
            </div>
          </div>
          <input
            type="submit"
            class="btn"
            value="Login"
            @click="requestLogin"
            v-loading.fullscreen.lock="fullscreenLoading"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../../network/login.js";
export default {
  data() {
    return {
      isFocus: false,
      pwd: "",
      userName: "",
      fullscreenLoading: false,
    };
  },
  methods: {
    requestLogin() {
      this.fullscreenLoading = true;
      let _this = this;
      let data = {
        data: this.userName,
        pwd: this.pwd,
      };
      login(data)
        .then((res) => {
          if (res.status == 200) {
            _this.$router.push({ path: "/" });
            console.log(res);
            localStorage.setItem(
              "backstage_user",
              JSON.stringify({
                uid: res.backValue.id,
                img: res.backValue.imgurl,
                name: res.backValue.name,
                token: res.backValue.token,
                eid: res.backValue.eid,
              })
            );
            this.fullscreenLoading = false;
          } else if (res.status == 400 || res.status == 500) {
            this.fullscreenLoading = false;
            _this.$notify.error({
              title: "登录失败",
              message: "账号或密码错误",
            });
          } else if (res.status == 501) {
            this.fullscreenLoading = false;
            _this.$notify.error({
              title: "登录失败",
              message: "对不起，您没有权限登录",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.content {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
.container {
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18rem;
  padding: 0 2rem;
}
.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.img img {
  width: 500px;
}

.login-box {
  display: flex;
  align-items: center;
  text-align: center;
}
form {
  width: 360px;
}
.avatar {
  width: 100px;
}
form h2 {
  font-size: 2.9rem;
  text-transform: uppercase;
  margin: 15px 0;
  color: #999;
}

.input-group {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.input-group:nth-child(1) {
  margin-bottom: 4px;
}
.input-group:before,
.input-group:after {
  content: "";
  position: absolute;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: #38d39f;
  transition: 0.5s;
}
.input-group:after {
  right: 50%;
}
.input-group:before {
  left: 50%;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon i {
  color: #d9d9d9;
  transition: 0.5s;
}

.input-group > div {
  position: relative;
  height: 45px;
}

.input-group > div > h5 {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #d9d9d9;
  font-size: 18px;
  transition: 0.3s;
}
.input-group.focus .icon i {
  color: #38d39f;
}
.input-group.focus div h5 {
  top: -5px;
  font-size: 15px;
}
.input-group.focus:after,
.input-group.focus:before {
  width: 50%;
}
.input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: #555;
  font-family: "Roboto", sans-serif;
}
a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}
a:hover {
  color: #38d39f;
}
.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  margin: 1rem 0;
  font-size: 1.2rem;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  background-size: 200%;
  transition: 0.5s;
}
.btn:hover {
  background-position: right;
}
.copyright {
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 2px;
  color: #38d39f;
  text-align: center;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
}

/*媒体查询*/
@media screen and (max-width: 768px) {
  .container {
    grid-gap: 9rem;
  }
}
@media screen and (max-width: 1024px) {
  form {
    width: 290px;
  }
  form h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }
  .img img {
    width: 360px;
  }
}
@media screen and (max-width: 1080px) {
  .wave {
    display: none;
  }
  .img {
    display: none;
  }
  .container {
    grid-template-columns: 1fr;
  }
  .login-box {
    justify-content: center;
  }
}
</style>