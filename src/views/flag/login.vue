<template>
  <div class="wrapper">
    <img src="../../assets/images/flag/login_bc.jpg" alt class="wrapper_bc" />
    <div class="login_content">
      <input type="text" class="login_input" placeholder="请输入姓名" v-model="name" />
      <input type="text" class="login_input" placeholder="手机号" v-model="phone" />
      <input type="text" class="login_input" placeholder="验证码" v-model="code" />
      <div class="login_yzm">
        <div class="get_code" v-if="show" @click="getCode"></div>
        <span v-else class="count">{{count}} s</span>
      </div>
    </div>
    <div class="btn" @click="getPhoneProvince"></div>
  </div>
</template>

<script>
import API from "../../assets/api";
import { Toast, Dialog } from "vant";
import { axios } from "../../../config/axios";
import Jsonp from "jsonp";
export default {
  data() {
    return {
      show: true,
      name: "",
      phone: "",
      code: "",
      msg: "获取验证码",
      timer: null,
      count: "",
      isLogin: false
    };
  },
  methods: {
    validateInputInfo() {
      if ((!this.phone, !this.name, !this.code)) {
        Toast("请填写信息");
        this.isLogin = false;
        return false;
      }
      return true;
    },
    getPhoneProvince() {
      if (this.isLogin) return;
      this.isLogin = true;
      if (this.validateInputInfo()) {
        Jsonp(
          `https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=${this.phone}`,
          null,
          (err, data) => {
            if (err) {
              this.login();
            } else {
              if (data.province !== "浙江") {
                this.isLogin = false;
                Toast("只有浙江用户可以参加");
              } else {
                this.login();
              }
            }
          }
        );
      }
    },
    getCode() {
      const TIME_COUNT = 60;
      if (!/^1[345789]\d{9}$/.test(this.phone)) {
        Toast("请填写正确的手机号");
        return false;
      }
      if (!this.timer) {
        this.$get("/user/sendCode", { phone: this.phone })
          .then(res => {
            if (res.status === 0) {
              Toast.success(res.msg);
              this.count = TIME_COUNT;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            } else {
              Toast.fail(res.msg);
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          })
          .catch(() => {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          });
      }
    },
    login() {
      this.$post(API.POST_USER_REGISTER, {
        openid: this.$store.state.openid,
        name: this.name,
        phone: this.phone,
        idCard: "",
        codeNo: this.code,
        InviterId: localStorage.shareUserId || ""
      }).then(res => {
        if (res.status === 0) {
          Toast.success(res.msg);
          this.$store.commit("changeState", {
            k: "userId",
            v: res.data.id
          });
          this.$post(API.POST_USER_LOGIN, {
            openid: this.$store.state.openid
          }).then(res => {
            if (res.status === 0) {
              //此情况说明登录成功
              this.$store.commit("changeState", {
                k: "userId",
                v: res.data.userId
              });
              this.$store.commit("changeState", {
                k: "token",
                v: res.data.token
              });
              this.$store.commit("setFlag", null);
              axios.defaults.headers.Token = res.data.token;
              this.$router.replace("/flag/upload");
            } else {
              this.isLogin = false;
            }
          });
        } else {
          this.isLogin = false;
          Toast.fail(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100vw;
  background-size: 100% 100%;
  position: relative;
  .wrapper_bc {
    position: absolute;
    width: 100%;
    height: auto;
  }
  .login_content {
    position: absolute;
    top: 285px;
    left: 50%;
    transform: translateX(-50%);
    .login_input {
      width: 210px;
      height: 33px;
      font-weight: 600;
      line-height: 33px;
      background: #fff;
      border-radius: 80px;
      margin-bottom: 8px;
      font-size: 14px;
      color: rgba(58, 96, 201);
      padding: 0 15px;
      box-sizing: border-box;
      &::-webkit-input-placeholder {
        color: rgba(58, 96, 201, 0.3);
      }
      &:-moz-placeholder {
        /* Firefox 18- */
        color: rgba(58, 96, 201, 0.3);
      }
      &::-moz-placeholder {
        /* Firefox 19+ */
        color: rgba(58, 96, 201, 0.3);
      }
      &:-ms-input-placeholder {
        color: rgba(58, 96, 201, 0.3);
      }
    }
    .login_yzm {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 90px;
      height: 33px;
      text-align: center;
      font-size: 14px;
      line-height: 33px;
      border-radius: 80px;
      margin-bottom: 8px;
      color: #2141b4;
      background: #ffda21;
      .get_code {
        width: 100%;
        height: 100%;
        background-image: url("../../assets/images/flag/getCode_btn.png");
        background-size: 100% 100%;
      }
      .count {
        font-weight: 600;
      }
    }
  }
  .btn {
    position: absolute;
    top: 440px;
    left: 50%;
    width: 100px;
    height: 25px;
    transform: translateX(-50%);
    background-image: url("../../assets/images/flag/login_btn.png");
    background-size: 100% 100%;
  }
}
</style>