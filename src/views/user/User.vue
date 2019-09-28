<template>
  <div>
    <Login :panelShow.sync="panelShow"></Login>
    <div>
      <div v-if="!status" class="top" @click="showPanel">
        <div class="user">
          <van-icon name="manager-o" />
        </div>
        <div>注册/登录</div>
      </div>
      <!-- 已登录 -->
      <div v-if="status === 'true'" class="top">
        <div class="login-user">
          <div class="login-info">
            <div><img src="../../../static/images/pro1.png" alt="" /></div>
            <div>{{ postData.mobile_phone }}</div>
          </div>
          <div @click="showPopupTop">设置 ></div>
        </div>
      </div>
      <!-- 弹窗 -->
      <van-popup position="top" :style="{ height: '46%' }" v-model="show1">
        <van-nav-bar
          title="设置"
          left-text=""
          right-text="确定"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
        <div class="line"></div>
        <div class="user-info">
          <div class="user-info-header">
            <div>头像</div>
            <div>
              <van-uploader
                v-model="fileList"
                multiple
                :max-count="1"
                @click="editAvatar"
              />
            </div>
          </div>
          <div class="user-info-name">
            <div>
              昵称<span @click="showPopup">{{newName ? newName : modelName}}</span>
            </div>
            <van-popup
              class="editName"
              v-model="show"
              position="top"
              :style="{ height: '20%' }"
            >
              <van-nav-bar
                title="修改昵称"
                left-text=""
                right-text="确定"
                left-arrow
                @click-left="onClickLeft"
                @click-right="editName"
              />
              <div>
                <input type="text" v-model="modelName" />
              </div>
            </van-popup>

            <div>
              <div>></div>
            </div>
          </div>
          <div class="user-info-name">
            <div @click="wallet">设置钱包账户安全密码</div>
            <div>></div>
          </div>
          <div class="user-info-name no-line">
            <div @click="logout">退出登录</div>
            <div>></div>
          </div>
        </div>
      </van-popup>
      <!-- 已登录 -->
      <van-grid :border="false" :column-num="4">
        <van-grid-item to="/collection">
          <van-icon name="comment-o" />
          <span @click="showPanel">我的消息</span>
        </van-grid-item>
        <van-grid-item to="/collection">
          <van-icon name="star-o" />
          <span @click="showPanel">商品收藏</span>
        </van-grid-item>
        <van-grid-item to="/collection">
          <van-icon name="qr-invalid" />
          <span @click="showPanel">分享码</span>
        </van-grid-item>
        <van-grid-item to="/collection">
          <van-icon name="qr-invalid" />
          <span @click="showPanel">收益账户</span>
        </van-grid-item>
      </van-grid>
      <div class="line"></div>
      <van-grid :border="false" :column-num="4">
        <van-grid-item to="/cart">
          <van-icon name="comment-o" />
          <span @click="showPanel">定制须知</span>
        </van-grid-item>
        <van-grid-item to="/collection">
          <van-icon name="shop-o" />
          <span @click="showPanel">采购账户</span>
        </van-grid-item>
        <van-grid-item to="/collection">
          <van-icon name="balance-o" />
          <span @click="showPanel">我的品牌</span>
        </van-grid-item>
        <van-grid-item to="/collection">
          <van-icon name="search" />
          <span @click="showPanel">我的报告</span>
        </van-grid-item>
      </van-grid>
      <div class="line"></div>
      <van-grid :border="false" :column-num="4">
        <van-grid-item to="/cart">
          <van-icon name="shopping-cart-o" />
          <span @click="showPanel">采购车</span>
        </van-grid-item>
        <van-grid-item to="/address">
          <van-icon name="shop-o" />
          <span @click="showPanel">收货地址</span>
        </van-grid-item>
        <van-grid-item to="/orderList/1">
          <van-icon name="search" :info="order1" />
          <span @click="showPanel">待付款</span>
        </van-grid-item>
        <van-grid-item to="/orderList/2">
          <van-icon name="search" :info="order2" />
          <span @click="showPanel">待收货</span>
        </van-grid-item>
      </van-grid>
      <van-grid :border="false" :column-num="4">
        <van-grid-item to="/orderList/3">
          <van-icon name="comment-o" :info="order3" />
          <span @click="showPanel">待评价</span>
        </van-grid-item>
        <van-grid-item to="/orderList/4">
          <van-icon name="shop-o" />
          <span @click="showPanel">已完成</span>
        </van-grid-item>
        <van-grid-item to="/collection">
          <van-icon name="search" />
          <span @click="showPanel">售后服务</span>
        </van-grid-item>
        <van-grid-item to="/orderList/0">
          <van-icon name="notes-o" />
          <span @click="showPanel">全部订单</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="msy">2014-2019 美尚云 网站备案号XXXXXXXXXXXX</div>

    <Tabbar msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import Login from '@/components/Login.vue'
import { logoutHandle, registerHandle, editAvatarHandle, editNameHandle } from '@/api/user'
import { setTimeout } from 'timers'
// import { getcarListHandle } from '@/api/cart'
import { getListHandle } from '@/api/order'
export default {
  name: 'user',
  components: {
    Tabbar, Login
  },
  data () {
    return {
      modelName: '',
      newName: '',
      panelShow: false,
      status: false,
      show: false, // tab切换
      show1: false, // 顶部划出遮罩
      // fileList: [], // 上传头像
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/cat.jpeg' }
      ],
      postData: {
        mobile_phone: '',
        password: ''
      },
      postData2: {
        mobile_phone: '',
        password: '',
        captcha: ''
      },
      getlist: {
        pageSize: 100,
        page: 1
      },
      total: '', // 购物车列表的总数
      order1: '', // 待付款订单数量
      order2: '', // 待收货订单数量
      order3: ''// 待评价订单数量
    }
  },
  created () {
    // 获取本地存储数据
    this.status = localStorage.getItem('status')
    this.postData.mobile_phone = localStorage.getItem('mobile_phone')
    this.newName = localStorage.getItem('name')
    console.log(this.newName, '000000000')
    console.log(this.status, '获取状态值11111')
    this.getListHandle()
  },
  methods: {
    // 修改用户名
    editName () {
      var nameParams = {
        name: this.modelName
      }
      editNameHandle(nameParams).then(res => {
        console.log(res.data.data.name)
        this.newName = res.data.data.name
        localStorage.setItem('name', this.newName)
        this.show = false
      })
    },
    showPanel () {
      let token = window.localStorage.getItem('mytoken')
      // 没有token显示弹窗
      if (!token) {
        this.panelShow = true
      } else {
        console.log(0)
      }
    },
    // 获取订单列表
    getListHandle () {
      let a = {
        page: this.getlist.page,
        pageSize: this.getlist.pageSize
      }
      let token = window.localStorage.getItem('mytoken')
      if (!token) {
        console.log('未登录')
      } else {
        getListHandle(a).then(res => {
          console.log(res)
          this.list = res.data.data.data
          console.log(this.list.filter(item => item.order_status == 1).length) // 待付款订单
          this.order1 = this.list.filter(item => item.order_status == 1).length
          this.order2 = this.list.filter(item => item.order_status == 2).length // 待收货
          this.order3 = this.list.filter(item => item.order_status == 3).length // 待评价
        })
      }
    },
    // tab切换
    showPopup () {
      this.show = true
    },
    // 从上滑出遮罩
    showPopupTop () {
      this.show1 = true
    },
    onClickLeft () {
      this.$router.go(0)
    },
    onClickRight () {
      this.show1 = false
    },
    // 用户注册，修改密码
    register () {
      var registerParams = {
        mobile_phone: this.postData2.mobile_phone,
        password: this.postData2.password,
        captcha: this.postData2.captcha
      }
      registerHandle(registerParams).then(res => {
        console.log(this.postData2.captcha)
        console.log(res.data)
        if (res.data.code === '1') {
          // 存储token值
          localStorage.setItem('mytoken', res.data.data.token)
          localStorage.setItem('status', 'true')
          localStorage.setItem('mobile_phone', res.data.data.user.mobile_phone)
          console.log(res.data)
          this.$router.go(0)
        }
      })
    },
    // 退出登录
    logout () {
      logoutHandle().then(res => {
        console.log(res.data)
        if (res.data.code === '1') {
          // 清除本地用户信息
          // localStorage.clear()
          localStorage.removeItem('mytoken')
          localStorage.removeItem('mobile_phone')
          localStorage.removeItem('name')
          localStorage.removeItem('status')
          // 跳到登录页
          setTimeout(() => {
            // 刷新当前页面
            this.$router.go(0)
          }, 300)
        }
      })
    },
    // 修改用户头像
    editAvatar () {
      editAvatarHandle().then(res => {
        console.log(res + '头像')
      })
    },
    // 收货地址
    address () {
      this.$router.push({
        name: 'Address'
      })
    },
    // 设置钱包密码
    wallet () {
      console.log('1')
      this.$router.push({
        name: 'SetPassword'
      })
    }

  }

}
</script>

<style lang="less" scoped>
  .van-grid-item {
    i {
      font-size: 26px;
      margin-bottom: 5px;
    }
    span {
      color: #7d7e80;
      font-size: 12px;
    }
  }
  .top {
    background-color: #c7aa53;
    padding: 26px 0;
    text-align: center;
    color: #fff;
    .user {
      width: 40px;
      height: 40px;
      line-height: 44px;
      font-size: 20px;
      border-radius: 50%;
      margin: 0 auto 6px;
      background-color: #fff;
      color: #c7aa53;
    }
    .login-user {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .login-info {
        display: flex;
        align-items: center;
        div:nth-of-type(1) {
          width: 40px;
          height: 40px;
          img {
            width: 100%;
          }
        }
        div:nth-of-type(2) {
          margin-left: 10px;
        }
      }
    }
  }
  .user-info {
    padding: 0 16px;
    .user-info-header,
    .user-info-name {
      display: flex;
      align-items: center;
      padding: 10px 0 12px;
      border-bottom: 1px solid #eee;
      div:nth-of-type(2) {
        margin-left: 10px;
      }
    }
    .user-info-name {
      justify-content: space-between;
      div:nth-of-type(1) {
        span {
          margin-left: 10px;
        }
      }
      div:nth-of-type(2) {
        margin-left: 10px;
        display: flex;
        // justify-content: space-between;
      }
    }
    .no-line {
      border-bottom: none;
    }
  }
  .line {
    background-color: #f2f2f2;
    height: 6px;
  }
  .msy {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 50px;
    font-size: 10px;
    color: #999;
  }
  .editName {
    flex-direction: column;
    margin-left: 0 !important;
    .van-nav-bar {
      width: 100%;
      div:nth-of-type(2) {
        justify-content: center;
        width: 100%;
        margin-left: 20%;
      }
    }
  }
</style>
