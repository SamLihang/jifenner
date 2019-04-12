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
      }
    },
    methods: {
        //立即兑换
      onSelect() {
        // 点击选项时默认不会关闭菜单，可以手动关闭
          this.$get(API.GET_COMMODITY_ADDMMALLORDER, {userid: this.$store.state.userId, shippingid: this.$route.query.commodityid}).then(res => {
              this.createtime = res.data.createtime
              this.orderJiFen = res.data.orderJiFen
              this.orderno = res.data.orderno
              this.payment = res.data.payment
              this.orderName = res.data.orderName
              this.show = true
          })
      },
      //确定兑换
      confirm() {
          let code = (this.payment && this.orderJiFen) ? 1 : this.payment ? 0 : 2
          this.$get(API.GET_COMMODITY_PLACEANORDER, {
              userid: this.$store.state.userId,
              shippingid: this.$route.query.commodityid,
              orderno: this.orderno,
              code: code
          }).then(res => {
              debugger
              if(res.status  === 1) {
                  Toast(res.msg)
              } else {
                  location.href = res.data.requestUrl.replace('ccbMain', 'B2CMainPlat_05_EPAY')
              }
          })
      }
    },
    mounted() {
        this.$get(API.GET_COMMODITY_QUERYBYCOMMODITYID, {CommodityId: +this.$route.query.commodityid}).then(res => {
            this.commodityAmto = res.data.commodityAmto
            this.commodityImage = res.data.commodityImage
            this.commodityIntegral = res.data.commodityIntegral
            this.commodityName = res.data.commodityName
            this.stock = res.data.stock
        })
    }
  }
