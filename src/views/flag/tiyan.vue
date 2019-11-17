<template>
  <div class="wrapper">
    <img class="wrapper_bc" src="../../assets/images/flag/tiyan_bc.jpg" alt />
    <div class="tiyan_content">
      <input class="tiyan_input" type="text" placeholder="请输入学校" v-model="school" />
      <input class="tiyan_input" type="text" placeholder="年级" v-model="classes" />
      <div class="tiyan_btns">
        <div class="tiyan_btn baoming" @click="baomingHandler"></div>
        <router-link to="/flag/home">
          <div class="tiyan_btn tiyan_btn_home"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      school: "",
      classes: ""
    };
  },
  methods: {
    baomingHandler() {
      if (!this.classes || !this.school) {
        Toast("请填写信息");
        return;
      }
      this.$post("/flag/experienceCamp", {
        flagSign: this.classes,
        flagSchool: this.school,
        userId: this.$store.state.userId
      }).then(res => {
        if (res.status === 0) {
          Toast("报名成功");
        } else {
          Toast("报名失败");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  .wrapper_bc {
    width: 100%;
    height: auto;
  }
  .tiyan_content {
    position: absolute;
    top: 285px;
    left: 50%;
    transform: translateX(-50%);
    .tiyan_input {
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
    .tiyan_btns {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-items: center;
      .tiyan_btn {
        width: 80px;
        height: 20px;
        &.baoming {
          background-image: url("../../assets/images/flag/tiyan_btn1.png");
          background-size: 100% 100%;
        }
        &.tiyan_btn_home {
          background-image: url("../../assets/images/flag/tiyan_btn2.png");
          background-size: 100% 100%;
        }
      }
    }
  }
  .btn {
    position: absolute;
    bottom: 25px;
    left: 50%;
    width: 100px;
    height: 25px;
    transform: translateX(-50%);
    background-image: url("../../assets/images/flag/rank_btn.png");
    background-size: 100% 100%;
  }
}
</style>