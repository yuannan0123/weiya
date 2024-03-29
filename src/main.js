import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'
// 导入初始化文件
// import '../static/common/reset.css'

// 导入mui的样式
import '../static/css/mui.min.css'
import '../static/css/icons-extra.css'

// import '../static/js/mui'
// Vue.prototype.mui = mui
// Vue.use(mui)

// import 'lib-flexible/flexible.js'

// 导入适配 rem
// import '../static/js/rem.js'
import 'amfe-flexible'

import Vant from 'vant'
import 'vant/lib/index.css'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import './config/Validate' // 验证

import vueWechatTitle from 'vue-wechat-title'
Vue.use(vueWechatTitle)

// //可以给axios的ajax请求设置统一的主机和端口号
// axios.defaults.baseURL = 'https://hss.meishangyun.com'
// //将axios这个对象添加到Vue的原型对象中，在使用的时候就只需要使用this.对象名就可以了
Vue.prototype.$axios = request

Vue.use(Vant)
Vue.use(MintUI)

Vue.config.productionTip = false

// 导航守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('mytoken')
  // console.log(token, 'min路由拦截')
  // 如果已经登录，那我不干涉你，让你随便访问
  if (to.meta.requireAuth) {
    if (token) {
      // console.log(token, '进入路由拦截')
      next()
    } else {
      // 你访问的是忘记密码页面吗?如果是则直接跳转,如果不是,则判断是否访问其他页面
      if (to.path === '/index') {
        next()
      } else {
        if (to.path !== '/user') {
          // alert('未登录')
          // 如果没有登录，但你访问其他需要登录的页面，那我就让你跳到登录页面去
          next({ path: '/user' })
        } else {
        // 如果没有登录，但你访问的login，那就不干涉你，让你访问
          next()
        }
      }
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
