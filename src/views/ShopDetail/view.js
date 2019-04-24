import API from './../../assets/api.js';
import { Toast } from 'vant';

export default {
    name: 'shopDetail',
    data() {
      return {
          show: false,
          commodityAmto: "",
          commodityImage: '',
          commodityIntegral: '',
          commodityName: '',
          stock: "",
          createtime: "",
          orderJiFen: "",
          orderno: "",
          payment: "",
          orderName: "",
          detail: "",
          payshow: false,
      }
    },
    methods: {
        //立即兑换
      onSelect() {
        if(+this.$route.query.commodityid !== 1000 && !+this.stock) {
            Toast('库存不足')
            return
        }
        // 点击选项时默认不会关闭菜单，可以手动关闭
        if(+this.$route.query.commodityid === 1000) {
            this.$get(API.GET_COMMODITY_KmhAddMmallOrder, {userid: this.$store.state.userId, shippingid: this.$route.query.commodityid, status: 40}).then(res => {
                if(res.status === 1) {
                    if(res.msg === "你已经参加了开门红活动,谢谢!")  {
                        Toast('您已经参加了"刚好遇建你"活动')
                    } else {
                        Toast(res.msg)
                    }
                    return
                }
                this.createtime = res.data.createtime
                this.orderJiFen = res.data.orderJiFen
                this.orderno = res.data.orderno
                this.payment = res.data.payment
                this.orderName = res.data.orderName
                this.show = true
            })
        } else {
            this.$get(API.GET_COMMODITY_ADDMMALLORDER, {userid: this.$store.state.userId, shippingid: this.$route.query.commodityid}).then(res => {
                this.createtime = res.data.createtime
                this.orderJiFen = res.data.orderJiFen
                this.orderno = res.data.orderno
                this.payment = res.data.payment
                this.orderName = res.data.orderName
                this.show = true
            })
        }
    },
    wePay() {
        this.$get(API.GET_COMMODITY_PLACEANORDER, {
            userid: this.$store.state.userId,
            shippingid: this.$route.query.commodityid,
            orderno: this.orderno,
            code: 3
        }).then(res => {
            if(res.status === 1) {
                Toast(res.msg)
                return
            } else {
                localStorage.orderno = this.orderno
                localStorage.commodityid = this.$route.query.commodityid
                location.href = decodeURIComponent(res.data.requestUrl)
            }
        })
    },
    lianPay() {
         let code = (this.payment && this.orderJiFen) ? 1 : this.payment ? 0 : 2
          this.$get(API.GET_COMMODITY_PLACEANORDER, {
              userid: this.$store.state.userId,
              shippingid: this.$route.query.commodityid,
              orderno: this.orderno,
              code: +this.$route.query.commodityid === 1000 ? 0 : code
          }).then(res => {
              if(res.status  === 1) {
                  Toast(res.msg)
                  return
              } else {
                  localStorage.orderno = this.orderno
                  localStorage.commodityid = this.$route.query.commodityid
                  location.href = res.data.requestUrl
              }
          })
    },
      //确定兑换
      confirm() {
          this.lianPay()
        // this.payshow = true
      }
    },
    watch: {
        '$store.state.userId': {
            handler: function (newVal) {
                if(newVal) {
                    this.$get(API.GET_COMMODITY_QUERYBYCOMMODITYID, {CommodityId: +this.$route.query.commodityid}).then(res => {
                        this.commodityAmto = res.data.commodityAmto
                        this.commodityImage = res.data.commodityImage
                        this.commodityIntegral = res.data.commodityIntegral
                        this.commodityName = res.data.commodityName
                        this.stock = res.data.stock
                        this.detail = res.data.detail.replace(/\n/g,"<br/>").replace(/：/g, "：<br/>").replace(/。/g, "<br/>")

                    })
                }
            },
            immediate: true
        }
    },
  }
