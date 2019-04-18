<template>
  <div class="home">
    <van-popup v-model="show">
      <div class="popup-box flex">
        <h2>每日签到</h2>
        <p>连续签到7天可获得额外积分哦~</p>
        <ul>
          <li class="flex" v-for="(item, index) in sign" :key="index" :class="{pass: ['未签', '已签'].includes(transSignIn(item, index))}">
            <span>周{{weekDay[index]}}</span>
            <span class="qian" v-if="transSignIn(item,index) !== '已签'">{{transSignIn(item,index)}}</span>
            <van-icon name="success" size="35px" color="#3c8ce7" v-else/>
          </li>
        </ul>
        <button @click="signToday">签到</button>
      </div>
      <i class="off" @click="show=false"></i>
    </van-popup>
    <!-- 轮播图盒子 -->
    <div class="banner">
      <van-swipe :autoplay="5000" @change="onChange" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner" :key="index" style="float:left;">
          <a :href="item.link"><img v-lazy="item.imgurl" alt=""></a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 导航盒子 -->
    <ul class="nav flex">
      <li @click="getDailySign">
        <i class="icon1"></i>
        <span>每日签到</span>
      </li>
      <li @click="invateFriend">
        <i class="icon2"></i>
        <span>邀请好友</span>
      </li>
      <router-link :to="{path:'/detail', query: {commodityid: 1000}}">
        <li>
          <i class="icon3"></i>
          <span>建面礼</span>
        </li>
      </router-link>
      <li @click="goIntegral(1)">
        <i class="icon4"></i>
        <span>兑换详情</span>
      </li>
    </ul>
    <!-- 积分数盒子 -->
    <div class="jifen">
      <hr class="hr1">
      <div class="flex">
        <h2>积分<span>{{points}}</span></h2>
        <h3 @click="goIntegral(0)">了解明细</h3>
      </div>
    </div>
    <!-- 热门推荐盒子 -->
    <div class="recommend">
      <h2>热门推荐</h2>
      <ul class="list">
        <li class="flex" v-for="(item,index) in hotList" :key="index"> 
          <div class="recomment_img" :style="`background-image: url(${item.commodityImage}); background-size: cover; background-position: 50% 50%`">
          </div>
          <h3>{{item.commodityName}}</h3>
          <span>{{item.commodityAmto? `¥${item.commodityAmto}` : ""}}{{item.commodityIntegral? `+${item.commodityIntegral}积分`: ""}}</span>
          <button @click="detail(item.commodityId)">立即兑换</button>
        </li>       
      </ul>
    </div>
    <!-- 全部商品盒子 -->
    <div class="recommend">
      <h2 class="allshop">全部商品</h2>
      <ul class="list">
        <li class="flex" v-for="(items,index) in commodityList" :key="index"> 
          <div class="recomment_img" :style="`background-image: url(${items.commodityImage}); background-size: cover; background-position: 50% 50%`">
          </div>
          <h3>{{items.commodityName}}</h3>
          <span>{{items.commodityAmto? `¥${items.commodityAmto}` : ""}}{{items.commodityIntegral? `+${items.commodityIntegral}积分`: ""}}</span>
          <button @click="detail(items.commodityId)">立即兑换</button>
        </li>       
      </ul>
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
