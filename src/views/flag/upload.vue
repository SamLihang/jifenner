<template>
  <div class="wrapper">
    <img src="../../assets/images/flag/flag_bg.jpg" alt class="wrapper_bc" />
    <label for="upload" class="upload_head">
      <img v-if="!headImg" src="../../assets/images/flag/upload_head.png" />
      <img v-else :src="headImg" alt />
      <input id="upload" @change="uploadFile" accept="image/*" style="display: none" type="file" />
    </label>
    <div class="upload_flags">
      <div
        class="upload_flag"
        v-for="(flag,index) in flagsList"
        :key="index"
        @click="flag.selected = !flag.selected"
      >
        <div class="upload_checkbox">
          <img
            class="upload_checkbox_img"
            src="../../assets/images/flag/checked.png"
            alt
            v-if="flag.selected"
          />
          <img class="upload_checkbox_img" src="../../assets/images/flag/unchecked.png" alt v-else />
        </div>
        <img class="flag_content" :src="flag.content" alt />
      </div>
    </div>
    <div class="btn" @click="handlerClick"></div>
  </div>
</template>

<script>
import { axios } from "../../../config/axios";
import { Toast } from "vant";
import { mapState } from "vuex";
export default {
  data() {
    return {
      headImg: null,
      flagsList: [
        {
          selected: false,
          content: require("../../assets/images/flag/upload_flag1.png")
        },
        {
          selected: false,
          content: require("../../assets/images/flag/upload_flag2.png")
        },
        {
          selected: false,
          content: require("../../assets/images/flag/upload_flag3.png")
        },
        {
          selected: false,
          content: require("../../assets/images/flag/upload_flag4.png")
        },
        {
          selected: false,
          content: require("../../assets/images/flag/upload_flag5.png")
        },
        {
          selected: false,
          content: require("../../assets/images/flag/upload_flag6.png")
        },
        {
          selected: false,
          content: require("../../assets/images/flag/upload_flag7.png")
        },
        {
          selected: false,
          content: require("../../assets/images/flag/upload_flag8.png")
        },
        {
          selected: false,
          content: require("../../assets/images/flag/upload_flag9.png")
        },
        {
          selected: false,
          content: require("../../assets/images/flag/upload_flag10.png")
        }
      ]
    };
  },
  computed: {
    flagContent() {
      const num = this.flagsList.filter(item => item.selected).length;
      if (num === 0) {
        return "";
      } else if (num <= 3) {
        return "不要贪心，心诚则灵！";
      } else if (num <= 6) {
        return "精力旺盛，这个flag有点忙！";
      } else {
        return "小孩才做选择，我全都要啦！";
      }
    }
  },
  methods: {
    handlerClick() {
      if (!this.headImg) {
        Toast("请上传头像");
        return;
      }
      if (!this.flagContent) {
        Toast("请选择flag");
        return;
      }
      this.$post("/flag/updUserFlagStepTwo", {
        flagImg: this.headImg,
        flagContent: this.flagContent,
        flagPhone: this.$store.state.flag.userFlag.flagPhone,
        flagName: this.$store.state.flag.userFlag.flagName
      }).then(res => {
        Toast("立flag成功");
        this.$router.push("/flag/rank");
      });
    },
    uploadFile(e) {
      if (!e.target.files[0]) return;
      let file = new FormData();
      file.append("multipartFiles", e.target.files[0]);
      Toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: "上传中..."
      });
      axios
        .post("/flag/fileUpload", file)
        .then(res => {
          Toast.clear();
          if (res.data.status === 0) {
            this.headImg = res.data.data;
          } else {
            Toast("上传失败");
          }
        })
        .catch(err => {
          Toast.loading.clear();
          Toast("上传失败");
        });
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
  .upload_head {
    width: 80px;
    height: 80px;
    position: absolute;
    text-align: center;
    overflow: hidden;
    font-size: 10px;
    color: #2141b4;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
  }
  .upload_flags {
    position: absolute;
    width: 230px;
    height: 280px;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: flex-start;
    .upload_flag {
      margin-top: 8px;
      .upload_checkbox {
        margin-left: 5px;
        display: inline-block;
        vertical-align: middle;
        .upload_checkbox_img {
          width: 14px;
          height: 14px;
        }
      }
      .flag_content {
        display: inline-block;
        height: 14px;
        vertical-align: middle;
        margin-left: 10px;
        width: auto;
      }
    }
  }
  .btn {
    position: absolute;
    top: 450px;
    left: 50%;
    width: 100px;
    height: 25px;
    transform: translateX(-50%);
    background-image: url("../../assets/images/flag/flag_btn.png");
    background-size: 100% 100%;
  }
}
</style>