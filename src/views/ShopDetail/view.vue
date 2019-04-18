<template>
  <div class="shopDetail">
        <div class="banner" :style="`background-image: url(${commodityImage}); background-size: cover; background-position: 50% 50%`">
        </div>
        <div class="info">
            <div class="flex">
                <h2>{{commodityName}}</h2>
                <span class="span1">{{+$route.query.commodityid === 1000 ? "" : `剩余${stock}件`}}</span>
            </div>
            <span class="span2">{{commodityAmto? `¥${commodityAmto}` : ""}}{{commodityIntegral? `+${commodityIntegral}积分`: ""}}</span>
        </div>
        <div class="explain">
            <h3>兑换说明</h3>
            <ol v-if="+$route.query.commodityid === 1000">
                <li>1. 每位新注册的用户可享受一次0.01元兑换5元话费的见面礼；</li>
                <li>2. 话费将在1-2个工作日充值到您注册的手机号呢；</li>
            </ol>
            <ol v-else>
                <li>1. 兑换成功后，电子劵将通过卡号与卡密的方式进行发放，可在兑换详情中查看电子劵的卡号与卡密（部分商品仅需卡号即可使用）；</li>
                <li>2. 电子劵产品为一次性产品，不允许退换；</li>
                <li>3. 电子劵使用方式：到相应门店或网站出示卡号与卡密即可使用；</li>
                <li>4. 如遇兑换失败，请联系客服4000090801。</li>
            </ol>
        </div>
        <button class="exchange" @click="onSelect">立即兑换</button>
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
            <button class="confirmbutn" @click="confirm">确认兑换</button>
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

