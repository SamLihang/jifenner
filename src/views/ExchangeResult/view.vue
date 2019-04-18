<template>
  <div class="exchangeResult">
    <div class="container" v-if="showStatus">
        <div class="top" :class="showStatus === 'SUCCESS' ? 'top_success' : 'top_error'"></div>
        <div class="line flex">
            <div class="semi-circle1"></div>
            <hr>
            <div class="semi-circle2"></div>
        </div>
        <div  v-if="showStatus==='SUCCESS'">
          <div class="bottom">
            <p class="flex" v-show="cardnumber">
                <span>卡号：{{cardnumber}}</span>
                <button class="copy" :data-clipboard-text="cardnumber">复制</button>
            </p>
            <p class="flex" v-show="orderJiFen">
                <span>卡密：{{kalman}}</span>
                <button class="copy" :data-clipboard-text="kalman">复制</button>
            </p>
          </div>
          <router-link to="/integralDetail">
            <div class="btn">查看订单</div>
          </router-link>
               <router-link to="/home">
            <button class="btn btn2">返回首页</button>
          </router-link>
        </div>
        <div v-else>
          <div class="bottom">失败原因：{{errMsg}}</div>
          <router-link :to="from">
            <button class="btn">重新兑换</button>
          </router-link>
          <router-link to="/home">
            <button class="btn btn2">返回首页</button>
          </router-link>
        </div>
    </div>
  </div>
</template>

<style lang="less">
    @import './view.less';
</style>

<script>
import JS from './view.js';
export default {
  ...JS
}
</script>
