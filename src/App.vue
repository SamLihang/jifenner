<template>
  <div id="app">
    <router-view />
    <van-dialog v-model="show" :show-confirm-button="false">
      <img src="./assets/images/home/qrcode.jpg" />
      <p style="text-align: center;line-height: 60px">请先关注官微</p>
    </van-dialog>
  </div>
</template>
<script>
import API from "./assets/api";
import { Toast, Dialog } from "vant";
import { axios } from "../config/axios";
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    parseUrl(url) {
      return {
        path: url.split("/#")[1].split("?")[0],
        query: (function() {
          if (!url.includes("?")) return {};
          var params = {},
            seg = url.split("?")[1].split("&"),
            len = seg.length,
            p;
          for (var i = 0; i < len; i++) {
            if (seg[i]) {
              p = seg[i].split("=");
              params[p[0]] = p[1];
            }
          }
          return params;
        })()
      };
    }
  },
  created() {
    //微信会把 #/去除这里对地址进行一些处理
    if (window.location.href.includes("openid")) {
      let url = window.location.href.split("/?");
      if (url[0] && url[1]) {
        let query = url[1].split("#");
        let openid = query[0].replace("openid", "jfid");
        let path = query[1].split("?")[0];
        window.location.replace(
          `${url[0]}/#${path}?${openid}&${query[1].split("?")[1]}`
        );
        return;
      }
    }
    let route = this.parseUrl(window.location.href);
    if (route.query.userId) {
      localStorage.shareUserId = route.query.userId;
    }
    // let openid = route.query.jfid;
    let openid = this.$route.query.jfid || localStorage.ccb_new_openid;
    if (openid) {
      // 把openid存在 vuex 和 localStorage里
      localStorage.ccb_new_openid = openid;
      this.$store.commit("setopenid", openid);
      //获取登录信息
      this.$post(API.POST_USER_LOGIN, { openid }).then(res => {
        if (res.status === 0) {
          //此情况说明登录成功
          Toast.success(res.msg);
          this.$store.commit("changeState", {
            k: "userId",
            v: res.data.userId
          });
          this.$store.commit("changeState", {
            k: "token",
            v: res.data.token
          });
          axios.defaults.headers.Token = res.data.token;
          if (this.$route.path === "/login") {
            this.$router.replace("/home");
          }
        } else if (res.status === 8) {
          //未关注官微
          // Dialog.alert({
          //   message: <img src="adf"></img>,
          //   confirmButtonText: '前往官微'
          // }).then(() => {
          //   window.location.href = API.OFFICIAL_URL;
          // });
          this.show = true;
        } else if (res.status === 7) {
          // this.$router.replace("/login");
        }
        //其它情况暂不处理
      });
    } else {
      this.$getAccredit(route.path);
    }
  }
};
</script>
<style lang="less">
body {
  background: #f5f5f5;
}
#app {
  width: 100%;
  height: 100%;
  font-size: 11px;
}
.van-swipe-item {
  float: left;
}
</style>
