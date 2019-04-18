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
                '70': '兑换失败',
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
        },
        '$store.state.userId': {
            handler: function(newVal) {
                if(!newVal) return
                this[ReqUrl[this.$store.state.activeTab]]();
            },
            immediate: true
        }
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
        copyLink() {
            let clipboard1 = new this.$clipboard('.copy');
            this.$nextTick(() => {
                clipboard1.on('success', function(e) {
                    Toast.success('复制成功');
                    e.clearSelection();
                });
                clipboard1.on('error', function() {
                    Toast('复制失败，请手动复制');
                });
            })
        },
        //兑换记录
        getOrderList() {
            this.$post(API.POST_POINTS_ORDERLIST, {userId: this.$store.state.userId}).then( res => {
                this.orderList = res.data.orderList;
                this.totalPoints = res.data.totalPoints;
                if(this.orderList.length) {
                    this.loading = false
                    this.loadover = false
                    removeEventListener('scroll', this.$refs.content, this.scrollHandler)
                    this.scrollHandler()
                    this.addScrollEvent()
                }
            } )
        },
        //积分明细
        getPointList() {
            this.$post(API.POST_POINTS_POINTLIST, {userId: this.$store.state.userId}).then( res => {
                this.pointList = res.data.pointsList;
                this.totalPoints = res.data.totalPoints;
                if(this.pointList.length) {
                    this.loading = false
                    this.loadover = false
                    removeEventListener('scroll', this.$refs.content, this.scrollHandler)
                    this.scrollHandler()
                    this.addScrollEvent()
                }
            } )
        },
        scrollHandler(e) {
            e = e ? e.target : this.$refs.content
            if(this.loadover || this.loading) return
            if(e.scrollHeight - e.clientHeight - e.scrollTop < 50) {
                this.loading = true
                if(!this.active) {
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
                } else {
                    this.$post(API.POST_ORDER_DETAIL, {
                        userId: this.$store.state.userId,
                        date: this.orderList[this.orderList.length - 1].createtime,
                        pageSize: 5
                    }).then(res => {
                        this.loading = false
                        if(res.data.length) {
                            res.data.forEach(item => {
                                this.orderList.push(item)
                            })
                        } else {
                            this.loadover = true
                        }
                    })
                }
            }
        },
        addScrollEvent(type) {
            this.$refs.content.addEventListener('scroll', this.scrollHandler, false)
        }
    }
}
