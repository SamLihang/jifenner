import API from './../../assets/api.js';
import { Toast } from 'vant';
export default {
    name: 'home',
    data() {
      return {
        //签到弹窗显隐
        show: false,
        banner: [],
        sign: '0001000', //签到信息 0为未签到，1为已签到
        current: 0,
        //用户积分总数
        points: 1,
        //热门推荐
        hotList: [],
        //全部商品
        commodityList: [],
        //日期map
        weekDay: {
          "0": "一",
          "1": "二",
          "2": "三",
          "3": "四",
          "4": "五",
          "5": "六",
          "6": "日",
        },
      }
    },
    mounted() {
    },
    methods: {
        invateFriend() {
          this.$router.push('/share')
        },
        //签到
        signToday() {
          this.$post(API.POST_POINTS_SIGN, {userId: this.$store.state.userId}).then( res => {
            if(res.status === 0) {
              this.sign = res.data.signDetail;
              Toast.success(res.msg);
            } else {
              Toast(res.msg);
            }
          });
        },
        transSignIn(item, index) {
            let newDay = new Date().getDay()
            if(+item === 1) {
                return '已签'
            } else if(!newDay || index < newDay) {
                return '未签'
            } else {
                return '待签'
            }
        },
        //获取已签到信息
        getDailySign() {
          this.$post(API.POST_POINTS_DAILYSIGN, {userId: this.$store.state.userId}).then( res => {
              this.show = true
            this.sign = res.data.signDetail;
          });
        },
        //前往积分明细页面函数
        goIntegral(active = 1) {
          this.$store.commit('changeState', {
            k: "activeTab",
            v: active
          });
          this.$router.push('/integralDetail');
        },
        //切换轮播图的焦点触发轮播
        onChange(index) {
          this.current = index;
        },
        //点击进入详情页
        detail(id) {
          this.$router.push({path: '/detail', query: {commodityid: id}});
        },
        //获取总积分数量
        getTotalPoints() {
          this.$post(API.POST_POINTS_POINTLIST, { userId: this.$store.state.userId }).then(res => {
            let data = res.data;
            this.totalPoints = data.totalPoints.totalGetPoints || 0;
          });
        },
        //获取首页展示信息
        getHomeList() {
          this.$post(API.POST_USER_INDEX, { userId: this.$store.state.userId }).then(res => {
              if(!res.data) {return}
            let data = res.data;
            this.hotList = data.hotList;
            this.commodityList = data.commodityList;
            this.points = data.points
          })
          this.$post(API.QUERYADCAROUSEAll).then(res => {
              this.banner = Array.from(res.data, element => {
                  return {id: element.id, imgurl: element.picture, link: element.link}
              })
          })
        }
    },
    watch: {
        '$store.state.userId': {
            handler: function (newVal) {
                if(newVal) {
                    this.getHomeList();
                }
            },
            immediate: true
        }
    },
  }
