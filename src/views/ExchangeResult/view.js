import { Toast } from "vant";
import { async } from "q";
import API from './../../assets/api.js';
export default {
    name: 'exchangeResult',
    data() {
        return {
            showStatus: null, //显示控制，SUCCESS为成功，否则为失败
            cardnumber: "",
            kalman: "",
            errMsg: "",
            from: {path: '/detail', query: {commodityid: localStorage.commodityid}}
        }
    },
    mounted() {
        if(this.showStatus === "SUCCESS") {
            let clipboard1 = new this.$clipboard('.copy');
            clipboard1.on('success', function(e) {
                Toast.success('复制成功');
                e.clearSelection();
            });
            clipboard1.on('error', function() {
                Toast('复制失败，请手动复制');
            });
        }
    },
    watch: {
        '$store.state.userId': {
            handler: function(newVal) {
                if(!newVal) return
                this.$get(API.GET_COMMODITY_QUERYBYMMALLORDER, {orderNo: localStorage.orderno}).then(res => {
                    if(res.status === 1) {
                        this.showStatus = 'ERROR'
                        this.errMsg = res.msg
                    } else {
                        this.showStatus = 'SUCCESS'
                        this.cardnumber = res.data.cardnumber
                        this.kalman = res.data.kalman
                    }
                })
            },
            immediate: true
        }
    },
}
