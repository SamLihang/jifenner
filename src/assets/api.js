const API = {
    //官微跳转地址
    OFFICIAL_URL: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA4MTU0NTQxNw==&scene=126&bizpsid=0#wechat_redirect',
    //首页请求数据
    POST_USER_INDEX: '/user/index',
    //积分明细入口
    POST_POINTS_POINTLIST: '/points/pointList',
    //
    POST_ORDER_DETAIL: '/points/orderDetail',
    POST_POINT_DETAIL: '/points/pointDetail',

    //兑换记录入口
    POST_POINTS_ORDERLIST: '/points/orderList',
    //积分明细入口
    POST_POINTS_POINTLIST: '/points/pointList',
    //用户登录
    POST_USER_LOGIN: '/user/login',
    //发送验证码
    GET_USER_SENDCODE: '/user/sendCode',
    //用户注册
    POST_USER_REGISTER: '/user/register',
    //每日签到入口
    POST_POINTS_DAILYSIGN: '/points/dailySign',
    //签到
    POST_POINTS_SIGN: '/points/sign',
    //查询商品详情
    GET_COMMODITY_QUERYBYCOMMODITYID: '/commodity/queryByCommodityId',
    //查询订单详情接口
    GET_COMMODITY_QUERYBYMMALLORDER: '/commodity/queryByMmallOrder',
    //生成订单接口
    GET_COMMODITY_ADDMMALLORDER: '/commodity/addMmallOrder',
    //开门红话费
    GET_COMMODITY_KmhAddMmallOrder: '/commodity/KmhAddMmallOrder',
    //下单接口
    GET_COMMODITY_PLACEANORDER: '/commodity/PlaceAnOrder',
    //轮播图
    QUERYADCAROUSEAll: 'user/queryAdCarouselAll',
    //支付
    SENDHENDCCB: 'commodity/sendHendCcb'
}

export default API;
