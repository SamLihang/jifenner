<template>
  <div class="wrapper">
    <img src="../../assets/images/flag/rank_bg.png" alt class="wrapper_bc" />
    <div class="rank_flag">
      <img
        v-if="flagStatus"
        :src="require(`../../assets/images/flag/rank_flag${flagStatus}.png`)"
        alt
      />
    </div>
    <div class="rank_title">
      <div class="rank_title_item">
        <p>
          我的积分:
          <span>{{flag && flag.points}}</span>
          <sub>(第{{flag && flag.rankingCount}}名)</sub>
        </p>
        <router-link to="/home">
          <div class="rank_button"></div>
        </router-link>
        <div class="rank_button blue" @click="alert_show = true"></div>
      </div>
      <div class="rank_title_item">
        <p>
          积分排名前
          <span>50</span>可参加体验营哦～
        </p>
        <router-link to="/flag/tiyan">
          <div class="rank_button kk"></div>
        </router-link>
      </div>
    </div>
    <div class="btn" @click="share_show = true"></div>
    <div class="rank_content">
      <h5>排行榜</h5>
      <ul class="rank_list">
        <li class="rank_item" v-for="(rank,index) in rankList" :key="index">
          <p style="width: 40px">{{index+1}}</p>
          <p style="width: 60px">{{rank.flagName | name}}</p>
          <p style="width: 100px">{{rank.flagPhone | phone}}</p>
          <p style="width: 100px;text-align: right">{{rank.points}}</p>
        </li>
      </ul>
    </div>
    <div class="alert" v-if="alert_show">
      <div class="alert_content">
        <div class="close_btn" @click="alert_show = false"></div>
        <img class="alert_title" src="../../assets/images/flag/alert_huodong.png" alt />
        <div class="alert_text">
          <p>
            <i>Flag</i>细则：
            <br />1.活动期间，在校大学生可设定自己的
            <i>Flag</i>，并邀请好友助力监督赚取积分。累计积分排名前50的大学生，即有机会参与“校园
            <i>e</i>银行，金智惠高校”体验营活动，体验营将安排行内行外优秀师资讲授金融知识，组织“校园
            <i>e</i>银行”行长分享经验，以及相关的实践活动。
            <br />2.“校园
            <i>e</i>银行，金智惠高校”体验营地点暂时保密哦，体验时间为十月中下旬。
            <br />积分细则：
            <br />1.成功定制
            <i>Flag</i>可获得
            <i>50</i>积分，分享
            <i>Flag</i>并邀请好友助力监督，每成功助力一次，可获得
            <i>50</i>积分，每成功邀请10位好友助力，还可额外再获
            <i>10</i>积分。
            <br />2.助力好友须为“建设银行浙江省分行”公众号的新增粉丝，且每位好友只能助力一次，取关再重新关注不计。
            <br />3.每天签到可获得1积分，连续签到1周可额外再获5积分。
            <br />4.积分可在建面惠积分商城兑换礼品，0.01元+相应积分即可兑换。
            <br />5.积分不得转赠兑现找零。
          </p>
        </div>
      </div>
    </div>
    <div class="alert" v-if="share_show">
      <div class="alert_content ruler">
        <div class="close_btn" @click="share_show = false"></div>
        <img class="alert_title" src="../../assets/images/flag/alert_yaoqing.png" alt />
        <div class="alert_text">
          <p>
            1、可生成
            <i>专属海报</i>，专属海报保存成图片分享至朋友圈或好友；
            <br />2、好友可通过海报中的二维码进入积分商城，每
            <i>邀请成功</i>一名好友，可
            <i>增加10积分</i>；
            <br />3、每累计成功邀请10名好友，可
            <i>额外获得10积分奖励</i>。
          </p>
        </div>
      </div>
      <router-link to="/flag/share">
        <div class="alert_btn"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      alert_show: false,
      share_show: false,
      rankList: []
    };
  },
  methods: {
    getData() {
      this.$post("/flag/scoreRanking").then(res => {
        if (res.status === 0) {
          this.rankList = res.data;
        }
      });
    }
  },
  computed: {
    ...mapState(["flag"]),
    flagStatus() {
      if (!this.flag) {
        return;
      }
      switch (this.flag.userFlag.flagContent) {
        case "不要贪心，心诚则灵！":
          return 1;
        case "精力旺盛，这个flag有点忙！":
          return 2;
        case "小孩才做选择，我全都要啦！":
          return 3;
        default:
          return;
      }
    }
  },
  watch: {
    "$store.state.userId": {
      handler: function(newVal) {
        this.getData();
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
  .rank_flag {
    width: 260px;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
  }
  .rank_title {
    position: relative;
    top: 110px;
    width: 255px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .rank_title_item {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin-bottom: 10px;
      align-items: center;
      .rank_button {
        width: 60px;
        height: 20px;
        text-align: center;
        flex: 0 0 auto;
        color: #fff;
        font-size: 13px;
        border-radius: 100px;
        background-image: url("../../assets/images/flag/rank_jifen.png");
        background-size: 100% 100%;
        &.blue {
          background-image: url("../../assets/images/flag/rank_ruler.png");
          background-size: 100% 100%;
        }
        &.kk {
          background-image: url("../../assets/images/flag/rank_kk.png");
          background-size: 100% 100%;
        }
      }
    }
    p {
      font-size: 10px;
      color: #2141b4;
    }
    span {
      font-size: 14px;
      color: #ff5b61;
      vertical-align: bottom;
    }
    sub {
      font-size: 8px;
      color: #2141b4;
      vertical-align: bottom;
    }
  }
  .btn {
    position: absolute;
    top: 240px;
    left: 50%;
    width: 100px;
    height: 25px;
    transform: translateX(-50%);
    background-image: url("../../assets/images/flag/rank_btn.png");
    background-size: 100% 100%;
  }
  .rank_content {
    position: absolute;
    width: 255px;
    height: 200px;
    top: 280px;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid #2141b4;
    color: #2141b4;
    background: #ebfaff;
    border-radius: 8px;
    text-align: center;
    padding: 5px;
    box-sizing: border-box;
    font-size: 14px;
    .rank_list {
      height: 155px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .rank_item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        text-align: left;
      }
    }
  }
  .alert {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .alert_content {
      position: relative;
      width: 230px;
      height: 320px;
      background: url("../../assets/images/flag/alert.png");
      background-size: 100% 100%;
      padding: 30px 20px 10px;
      box-sizing: border-box;
      color: #2141b4;
      text-align: center;
      &.ruler {
        height: 280px;
      }
      h5 {
        font-size: 20px;
      }
      .alert_text {
        margin-top: 20px;
        text-align: left;
        font-size: 14px;
        height: calc(100% - 50px);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
      }
      .close_btn {
        width: 30px;
        height: 30px;
        background: url("../../assets/images/flag/close_btn.png");
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(30%, -50%);
      }
      i {
        color: #ff5b61;
      }
    }
    .alert_title {
      width: 70px;
      height: auto;
    }
    .alert_btn {
      margin-top: 20px;
      width: 100px;
      height: 25px;
      background-image: url("../../assets/images/flag/alert_btn.png");
      background-size: 100% 100%;
    }
  }
}
</style>