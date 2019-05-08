<template>
  <div id="app">
    <router-view/>
    <van-dialog
      v-model="show"
      :show-confirm-button="false"
    >
      <img src="./assets/images/home/qrcode.jpg">
      <p style="text-align: center;line-height: 60px">请先关注官微</p>
    </van-dialog>
  </div>
</template>
<script>
  import API from './assets/api'
  import { Toast, Dialog } from 'vant'
  import {axios} from '../config/axios'
  export default {
    data() {
      return {
        show: false
      }
    },
    methods: {
      goGuanfang() {
        window.location.href = API.OFFICIAL_URL;
      }
    },
    created() {
      if(this.$route.query.userId) {
        localStorage.shareUserId = this.$route.query.userId
      }
      //微信会把 #/去除这里对地址进行一些处理
      if (window.location.href.slice(-7) === "#/login") {
        let url = window.location.href.split("?");
        if(url[0] && url[1]) {
          window.location.replace( url[0] + "/#/login?" + url[1].replace("#/login", ""));
          return
        }
      }
      let openid = this.$route.query.openid || localStorage.ccb_new_openid;
      if(openid) {
        // 把openid存在 vuex 和 localStorage里
        localStorage.ccb_new_openid= openid
        this.$store.commit('setopenid', openid)
        //获取登录信息
        this.$post(API.POST_USER_LOGIN, { openid }).then( res => {
          if(res.status === 0) {
            //此情况说明登录成功
            Toast.success(res.msg);
            this.$store.commit('changeState', {
              k: 'userId',
              v: res.data.userId
            });
            this.$store.commit('changeState', {
              k: 'token',
              v: res.data.token
            });
            axios.defaults.headers.Token = res.data.token
            if(this.$route.path === '/login') {
              this.$router.replace('/home');
            }
          } else if(res.status === 8) { //未关注官微
            // Dialog.alert({
            //   message: <img src="adf"></img>,
            //   confirmButtonText: '前往官微'
            // }).then(() => {
            //   window.location.href = API.OFFICIAL_URL;
            // });
            this.show = true
          } else if(res.status === 7) {
            this.$router.replace('/login')
          }
          //其它情况暂不处理
        })
      } else {
        this.$getAccredit()
      }
    }
  }
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
