<template>
  <div class="shopDetail">
        <div class="banner" :style="`background-image: url(${commodityImage}); background-size: cover; background-position: 50% 50%`">
        </div>
        <div class="info">
            <div class="flex">
                <h2>{{commodityName}}</h2>
                <span class="span1">剩余{{stock}}件</span>
            </div>
            <span class="span2">{{commodityAmto? `¥${commodityAmto}` : ""}}{{commodityIntegral? `+${commodityIntegral}积分`: ""}}</span>
        </div>
        <div class="explain">
            <h3>兑换说明</h3>
            <ol>
                <li>1.换通过卡密的方式进行发放；</li>
                <li>2.虚拟礼品已经发放，不能退；</li>
                <li>3.虚拟礼品有效期为4个月；</li>
            </ol>
        </div>
        <button class="exchange" @click="onSelect" :disabled="!+stock">立即兑换</button>
        <van-actionsheet v-model="show">
            <div class="alert flex">
                <img :src="commodityImage" alt="">
                <div>
                    <h3>{{orderName}}</h3>
                    <span>¥{{payment}}+{{orderJiFen}}积分</span>
                </div>
            </div>
            <div class="date">
                <span>订单编号：{{orderno}}</span>
                <span>兑换日期：{{createtime}}</span>
            </div>
            <button @click="confirm">确认兑换</button>
        </van-actionsheet>
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

