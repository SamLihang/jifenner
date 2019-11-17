<template>
  <div class="wrapper">
    <img src="../../assets/images/flag/home.jpg" alt class="wrapper_bc" />
    <div class="btn" @click="handlerClick"></div>
  </div>
</template>

<script>
export default {
  methods: {
    handlerClick() {
      if (this.$store.state.flag) {
        if (this.$store.state.flag.userFlag.flagContent) {
          this.$router.push("/flag/rank");
        } else {
          this.$router.push("/flag/upload");
        }
      } else {
        this.$router.push("/flag/login");
      }
    }
  },
  watch: {
    "$store.state.userId": {
      handler: function(newVal) {
        if (newVal && !this.$store.state.flag) {
          this.$post("/flag/queryFlagAll", {
            userId: this.$store.state.userId
          }).then(res => {
            if (res.status === 0) {
              if (res.msg === "查询用户是否创建Flag成功")
                this.$store.commit("setFlag", res.data);
            }
          });
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
  background-size: 100% 100%;
  position: relative;
  .wrapper_bc {
    position: absolute;
    width: 100%;
    height: auto;
  }
  .btn {
    position: absolute;
    top: 450px;
    left: 50%;
    width: 100px;
    height: 25px;
    transform: translateX(-50%);
    background-image: url("../../assets/images/flag/start.png");
    background-size: 100% 100%;
  }
}
</style>