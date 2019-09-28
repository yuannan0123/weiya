import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index/Index.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'mui-active', // 覆盖默认的路由高亮的 类
  routes: [{
    path: '/',
    name: 'index',
    component: Index,
    meta: { title: '品牌定制' }
  },
  {
    path: '/weiya',
    name: 'weiya',
    component: () => import(/* webpackChunkName: "about" */ './views/weiya/Weiya.vue'),
    meta: { title: '众创空间' } // 走进维雅

  }, {
    path: '/store',
    name: 'Store',
    component: () => import(/* webpackChunkName: "factory" */ './views/store/Store.vue'),
    meta: { title: '智慧门店' } // 供应商
  }, {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ './views/cart/Cart.vue'),
    meta: { title: '采购车' } // 购物车
    // meta: { requireAuth: true }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ './views/user/User.vue'),
    meta: { title: '个人中心' }// 个人中心
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "user" */ './views/address/Address.vue'),
    // 个人中心收货地址
    meta: { requireAuth: true, title: '收货地址' }
  },
  {
    path: '/addaddress',
    name: 'Addaddress',
    component: () => import(/* webpackChunkName: "user" */ './views/address/Addaddress.vue'),
    meta: { title: '新增收货地址' } // 新增收货地址
  },
  {
    path: '/editaddress/:id',
    name: 'Editaddress',
    component: () => import(/* webpackChunkName: "user" */ './views/address/Editaddress.vue'),
    meta: { title: '编辑收货地址' } // 编辑收货地址
  },
  {
    path: '/advantage',
    name: 'Advantage',
    component: () => import(/* webpackChunkName: "user" */ './views/brand/Advantage.vue'),
    meta: { title: '品牌优势' }// 品牌优势
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "user" */ './views/detail/Detail.vue'),
    meta: { title: '商品详情' } // 详情
  },
  {
    path: '/confirmOrder/:id',
    name: 'ConfirmOrder',
    component: () => import(/* webpackChunkName: "cart" */ './views/order/confirmOrder.vue'), // 提交订单
    meta: { requireAuth: true, title: '提交订单' }
  }, {
    path: '/orderList/:id',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "cart" */ './views/order/orderList.vue'), // 全部订单
    meta: { requireAuth: true, title: '全部订单' }
  },
  {
    path: '/orderDetail/:id',
    name: 'OrderDetail',
    component: () => import(/* webpackChunkName: "cart" */ './views/order/orderDetail.vue'), // 订单详情
    meta: { requireAuth: true, title: '订单详情' }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "cart" */ './views/comment/edit.vue'), // 评价商品
    meta: { requireAuth: true, title: '评价商品' }
  },
  {
    path: '/success/:id',
    name: 'Success',
    component: () => import(/* webpackChunkName: "cart" */ './views/comment/success.vue'), // 评价成功
    meta: { requireAuth: true, title: '评价成功' }
  },
  {
    path: '/commentDetail/:id',
    name: 'CommentDetail',
    component: () => import(/* webpackChunkName: "cart" */ './views/comment/commentDetail.vue'), // 查看评论
    meta: { requireAuth: true, title: '查看评论' }
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import(/* webpackChunkName: "cart" */ './views/collection/collection.vue'), // 商品收藏
    meta: { requireAuth: true, title: '商品收藏' }
  },
  {
    path: '/setPassword',
    name: 'SetPassword',
    component: () => import(/* webpackChunkName: "cart" */ './views/wallet/setPassword.vue'), // 设置钱包密码
    meta: { requireAuth: true, title: '设置钱包密码' }
  },
  {
    path: '/paySuccess',
    name: 'PaySuccess',
    component: () => import(/* webpackChunkName: "cart" */ './views/order/paySuccess.vue'), // 钱包支付成功
    meta: { requireAuth: true, title: '钱包支付成功' }
  }

  ]
})
