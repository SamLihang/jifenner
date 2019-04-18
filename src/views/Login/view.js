import API from './../../assets/api';
import { Toast, Dialog } from 'vant';
import jsonp from 'jsonp';
import { axios } from '../../../config/axios' 
export default {
    name: 'login',
    data() {
      return {
        //验证码显隐
        show: true,
        count: '',
        timer: null,
        name: '', //姓名
        idCard: '', //身份证后六位
        codeNo: '', //验证码
        phone: '', //手机号      
      }
    },
    methods: {
      //输入框验证
      validateInputInfo() {
        if(!this.name || !(/^1[34578]\d{9}$/.test(this.phone)) || !(/^\d{6}$/.test(this.idCard)) || !(/^\d{6}$/.test(this.codeNo))){
          Toast('请填写正确的信息');
          return false;
        }
        return true;
      },
      //验证是否为浙江手机号
      validatePhonePos(tel) {
        jsonp('http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel='+tel, null, (err, data) => {
          if(data.province == "浙江") {
            return true;
          } else {
            Toast('请输入浙江地区的手机号');
            return false;
          }
        })
      },
      //获取短信验证码
      getCode(){
        const TIME_COUNT = 60;
        if(!(/^1[345789]\d{9}$/.test(this.phone))) {
          Toast('请填写正确的手机号');
          return false;
        }
        if(!this.validatePhonePos(this.phone)) {
          return false;
        }
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              }
          }, 1000);
          this.$get(API.GET_USER_SENDCODE, { phone: this.phone }).then(res => {
            if(res.status === 0) {
              Toast.success(res.msg);
            } else {
              Toast.fail(res.msg);
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }).catch(() => {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
          })
        }
      },
      login() {
        if(this.validateInputInfo()) {
          this.$post(API.POST_USER_REGISTER, {
            openid: this.$store.state.openid,
            name: this.name,
            phone: this.phone,
            idCard: this.idCard,
            codeNo: this.codeNo
          }).then( res => {
            if(res.status === 0) {
              Toast.success(res.msg);
              this.$store.commit('changeState', {
                k: 'userId',
                v: res.data.id
              });
              this.$post(API.POST_USER_LOGIN, { openid: this.$store.state.openid }).then( res => {
                if(res.status === 0) {
                  //此情况说明登录成功
                  this.$store.commit('changeState', {
                    k: 'userId',
                    v: res.data.userId
                  });
                  this.$store.commit('changeState', {
                    k: 'token',
                    v: res.data.token
                  });
                  axios.defaults.headers.Token = res.data.token
                  if(this.$route.path === '/login') {
                    this.$router.replace('/home');
                  }
                } 
              })
            } else {
              Toast.fail(res.msg);
            }
          })
        }
      } 
    }
  }
