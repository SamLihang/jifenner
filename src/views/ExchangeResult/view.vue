<template>
  <div class="exchangeResult">
    <div class="container">
        <div class="top" :class="showStatus === 'SUCCESS' ? 'top_success' : 'top_error'"></div>
        <div class="line flex">
            <div class="semi-circle1"></div>
            <hr>
            <div class="semi-circle2"></div>
        </div>
        <div  v-if="showStatus==='SUCCESS'">
          <div class="bottom">
            <p class="flex">
                <span>卡号：1574353452523525</span>
                <button class="copy" data-clipboard-text="1574353452523525">复制</button>
            </p>
            <p class="flex">
                <span>卡密：WEFWEDSDFHRHDSHS</span>
                <button class="copy" data-clipboard-text="WEFWEDSDFHRHDSHS">复制</button>
            </p>
          </div>
          <div class="btn">查看订单</div>
        </div>
        <div v-else>
          <div class="bottom">失败原因：积分不足导致兑换失败</div>
          <button class="btn">重新兑换</button>
          <button class="btn btn2">返回首页</button>
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
