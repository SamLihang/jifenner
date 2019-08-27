<template>
  <div class="wrapper">
    <img class="baseImg" :src="imgUrl" alt="分享图片" v-if="imgUrl" />
    <div class="box" ref="box" v-else>
      <img src="../../assets/images/flag/share_bc.jpg" alt />
      <div id="qrcode"></div>
    </div>
  </div>
</template>

<script>
import QRcode from "qrcodejs2";
import html2canvas from "html2canvas";
import { Toast } from "vant";
export default {
  data() {
    return {
      imgUrl: ""
    };
  },
  methods: {
    getData() {
      this.$post("/user/flagInviteFriends", {
        userId: this.$store.state.userId
      }).then(res => {
        this.qrcode(res.data);
        let xiu = new Image();
        xiu.src = require("../../assets/images/flag/share_bc.jpg");
        xiu.onload = () => {
          html2canvas(this.$refs.box).then(canvas => {
            this.imgUrl = canvas.toDataURL("image/jpeg");
            Toast("图片已生成，长按保存分享给你的好友吧");
          });
        };
      });
    },
    qrcode(url) {
      let qrcode = new QRcode("qrcode", {
        width: 80,
        height: 80, // 高度
        text: url // 二维码内容
      });
    }
  },
  watch: {
    "$store.state.userId": {
      handler: function(newVal) {
        if (newVal) {
          this.getData();
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100vw;
  .box {
    position: relative;
    width: 100%;
  }
  #qrcode {
    position: absolute;
    bottom: 115px;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #2141b4;
    padding: 3px;
    background: #fff;
    border-radius: 5px;
  }
}
</style>