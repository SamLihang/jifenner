<template>
<div class='integralDetail' ref="content">
    <router-link to="/home" class="back">返回首页</router-link>
    <div class="banner">
        <img :src="img" alt="">
        <p class="flex">
            <span class="span1">{{totalPoints.points || 0}}</span>
            <span class="span2">当前积分</span>
        </p>
    </div>
    <van-tabs v-model="active" animated swipeable>
        <van-tab title="积分明细">
            <div class="total flex">
                <span>累计获得积分：{{totalPoints.totalGetPoints || 0}}</span>
                <span>累计消耗积分：{{totalPoints.totalUsePoints || 0}}</span>
            </div>
            <ul class="list">
                <li class="flex" v-for="(item, index) in pointList" :key="index">
                    <div>
                        <h3>{{item.action}}</h3>  
                        <time>{{item.createTime ? item.createTime : ''}}</time>
                    </div>
                    <span>{{item.points >= 0 ? '+' + item.points : item.points}}</span>  
                </li>
            </ul>
        </van-tab>
        <van-tab title="兑换记录">
            <div class="total flex">
                <span>累计获得积分：{{totalPoints.totalGetPoints || 0}}</span>
                <span>累计消耗积分：{{totalPoints.totalUsePoints || 0}}</span>
            </div>
            <ul class="list2">
                <template v-for="(item, index) in orderList">
                    <li class="flex" :key="index" v-if="+item.status !== 10">
                        <div class="flex">
                            <img :src="item.commodityimage" alt="">
                            <p class="flex">
                                <span class="span3">{{item.orderName}}</span>
                                <span>{{item.payment? `¥${item.payment}` : ""}}{{item.orderJiFen? `+${item.orderJiFen}积分`: ""}}</span>
                            </p>
                        </div>
                        <div class="content">
                        <span class="success">{{statusMap[item.status]}}</span>
                        <p class="p1">订单编号：{{item.orderno}}</p>
                        <p class="p2">兑换日期：{{item.createtime ? item.createtime : ""}}</p>
                        <p class="p3 flex" v-if="[20, 50].includes(item.status)">
                            <span>卡号：{{item.cardNumber}}</span>
                            <button class="copy" :data-clipboard-text="item.cardNumber">复制</button>
                        </p>
                        <p class="p4 flex" v-if="[20, 50].includes(item.status)">
                            <span>卡密：{{item.kalman}}</span>
                            <button class="copy" :data-clipboard-text="item.kalman">复制</button>
                        </p>
                        </div>
                    </li>
                </template>
            </ul>
        </van-tab>
    </van-tabs>
</div>
</template>
<style lang="less">
    @import './view.less';
</style>
<script>
import JS from './view.js';
import moment from 'moment';
export default {
    ...JS
}
</script>

