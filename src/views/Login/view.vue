<template>
  <div class="login">
    <div class="container">
      <h1 class="logo">
        <a href="">中国建设银行浙江省分行</a>
      </h1>
      <div class="form">
        <p><input type="text" placeholder="请输入姓名" maxlength="10" v-model="name" /></p>
        <p><input type="text" placeholder="请输入身份证后6位" maxlength="6" v-model="idCard" /></p>
        <p><input type="text" placeholder="请输入手机号" maxlength="11" v-model="phone" /></p>
        <p>
          <input type="text" placeholder="请输入验证码" maxlength="6" v-model="codeNo" />
          <span v-show="show" @click="getCode">获取验证码</span>
          <span v-show="!show" class="count">{{count}} s</span>
          </p>
        <p><button @click="login">登录</button></p>
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
