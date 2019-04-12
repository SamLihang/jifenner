import API from './../../assets/api.js';
const ReqUrl = {
    '0': 'getPointList',
    '1': 'getOrderList'
}
export default {
    data() {
        return {
            img: require('@/assets/images/integralDetail/banner.png'),
            img2: require('@/assets/images/integralDetail/img2.jpg'),
            orderList: [], //兑换记录
            pointList: [], //积分明细
            totalPoints: {}, //用户积分
            statusMap: {
                '0': '已取消',
                '10': '未付款',
                '20': '已付款',
                '40': '已发货',
                '50': '交易成功',
                '60': '交易关闭',
                '70': '积分已退',
            },
            loadover: false,
            loading: false,
        };
    },
    computed: {
        active: {
            get () {
                return this.$store.state.activeTab
            },
            set (index) {
                this.$store.commit('changeState', {
                    k: 'activeTab',
                    v: index
                });
            }
        }
    },
    watch: {
        active() {
            this[ReqUrl[this.$store.state.activeTab]]();
        }
    },
    created() {
        this[ReqUrl[this.$store.state.activeTab]]();
    },
    mounted() {
        let clipboard1 = new this.$clipboard('.copy');
        clipboard1.on('success', function(e) {
            Toast.success('复制成功');
            e.clearSelection();
        });
        clipboard1.on('error', function() {
            Toast('复制失败，请手动复制');
        });
    },
    methods: {
        //兑换记录
        getOrderList() {
            this.$post(API.POST_POINTS_ORDERLIST, {userId: this.$store.state.userId}).then( res => {
                this.orderList = res.data.orderList;
                this.totalPoints = res.data.totalPoints;
                if(this.orderList.length) {
                    this.addScrollEvent(1)
                }
            } )
        },
        //积分明细
        getPointList() {
            this.$post(API.POST_POINTS_POINTLIST, {userId: this.$store.state.userId}).then( res => {
                this.pointList = res.data.pointsList;
                this.totalPoints = res.data.totalPoints;
                if(this.pointList.length) {
                    this.addScrollEvent(2)
                }
            } )
        },
        addScrollEvent(type) {
            this.$refs.content.addEventListener('scroll', e => {
                if(this.loadover) return
                if(e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 50) {
                    if(this.loading) return
                    this.loading = true
                    if(type === 1) {
                        this.$post(API.POST_POINT_DETAIL, {
                            userId: this.$store.state.userId,
                            date: this.pointList[this.pointList.length - 1].createTime,
                            pageSize: 5
                        }).then(res => {
                            this.loading = false
                            if(res.data.length) {
                                res.data.forEach(item => {
                                    this.pointList.push(item)
                                })
                            } else {
                                this.loadover = true
                            }
                        })
                    }
                }
            }, false)
        }
    }
}
