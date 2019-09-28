<template>
  <div class="app">
    <van-nav-bar
      title="订单详情"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <ul class="content">
      <li>
        订单编号<span>{{ detail.sn }}</span>
      </li>
      <li>
        下单日期<span>{{ detail.create_time }}</span>
      </li>
      <li>
        商品<span>共{{ detail.goods_num }}个</span>
      </li>
      <li>品牌<span>LV</span></li>
      <li>
        金额<span class="red">￥{{ detail.actually_amount }}</span>
      </li>
      <li>
        状态<span class="red">{{ detail.order_status }}</span>
      </li>
      <li class="tips">提示：超过3天未支付的待付款订单将被系统自动清除</li>
      <li class="line"></li>
      <div class="address">
        <div>
          <div><img src="../../../static/images/weizhi.png" /></div>
          <div>
            <div>{{ detail.consignee }} {{ detail.mobile_phone }}</div>
            <div>收货地址：{{ detail.detail_address }}</div>
          </div>
        </div>
        <div>></div>
      </div>
    </ul>
    <div class="img"><img src="../../../static/images/a.jpg" alt="" /></div>
    <div class="list">
      <div v-for="(item, index) in detail.goods_list" :key="index">
        <div class="top"></div>
        <div class="product">
          <div><img :src="'https://worldview.com.cn/uploads/' + item.thumb_img" alt="" /></div>
          <div>
            <div>{{ item.name }}</div>
            <div>{{ item.specification }}</div>
            <div>品牌定制</div>
            <div class="price">
              <div>￥{{ item.price }}</div>
              <div>×{{ item.num }}</div>
            </div>
          </div>
          <!-- <div>共1件商品，小计:￥19822.00</div> -->
        </div>
        <div class="total">
          共1件商品，小计:<span class="red">￥{{ item.price * item.num }}</span>
        </div>
      </div>
    </div>
    <van-submit-bar
      v-if="this.detail.order_status == '待付款'"
      :price="totalPrice"
      button-text="去结算"
      @submit="popup"
      type="primary"
    />
    <!-- <van-submit-bar
      v-else-if="this.detail.order_status == '待收货'"
      :price="totalPrice"
      button-text="待收货"
      @submit="popup"
      type="primary"
    /> -->
    <div class="list2" v-else-if="this.detail.order_status == '待收货'">
      <div>查看物流</div>
      <div>通知平台已收货</div>
    </div>
    <div @click="comment" class="list2 list3" v-else-if="this.detail.order_status == '待评价'">
      评分评价
    </div>
    <!-- <van-submit-bar
      v-else-if="this.detail.order_status == '待评价'"
      :price="totalPrice"
      button-text="待评价"
      @submit="popup"
      type="primary"
    /> -->
    <div  class="list2 list3" v-else-if="this.detail.order_status == '已完成'">
     <div @click="commentDetail">查看评论</div>
      <div>申请售后</div>
    </div>
    <van-submit-bar
      v-else-if="this.detail.order_status == '售后'"
      :price="totalPrice"
      button-text="售后"
      @submit="popup"
      type="primary"
    />
    <van-popup
      v-model="show"
      class="eee"
      position="bottom"
      :style="{ height: '52%' }"
    >
      <van-nav-bar
        class="eee"
        title="选择结算方式"
        left-text=""
        left-arrow
        @click-left="onClick"
      />
      <van-radio-group v-model="radio" @change="onChange">
        <van-radio name="1">微信支付</van-radio>
        <van-radio name="2">支付宝支付</van-radio>
        <van-radio name="3">中国银联</van-radio>
        <van-radio name="4">钱包(￥{{amount}})</van-radio>
      </van-radio-group>
      <div class="account" @click="onSubmit">立即结算</div>
    </van-popup>
  </div>
</template>

<script>
import { getInfoHandle, paymentHandle } from '@/api/order'
import { getInfo, orderPayment } from '@/api/wallet'
export default {
  data () {
    return {
      detail: '',
      totalPrice: 0, // 合计价格
      url: '', // 支付返回的路径
      show: false, // 支付的弹窗
      radio: '1',
      pay_code: 1, // 支付方式
      id: '', // 订单ID
      amount: '' // 钱包余额
    }
  },
  created () {
    this.getInfoHandle()
    this.getInfo() // 钱包详情
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },

    // 获取订单详情
    getInfoHandle () {
      var id = {
        id: this.$route.params.id
      }
      getInfoHandle(id.id).then(res => {
        console.log(res.data.data)
        this.detail = res.data.data
        this.id = res.data.data.id
        this.sn = res.data.data.sn
        // 把订单状态转化为文字
        if (this.detail.order_status == 1) {
          this.detail.order_status = '待付款'
        }
        if (this.detail.order_status == 2) {
          this.detail.order_status = '待收货'
        }
        if (this.detail.order_status == 3) {
          this.detail.order_status = '待评价'
        }
        if (this.detail.order_status == 4) {
          this.detail.order_status = '已完成'
        }
        if (this.detail.order_status == 5) {
          this.detail.order_status = '已取消'
        }
        if (this.detail.order_status == 6) {
          this.detail.order_status = '售后'
        }
        // 合计总价
        this.totalPrice = this.detail.goods_list.reduce((total, item) => total + item.price * item.num * 100, 0)
      })
    },
    // 显示弹窗
    popup () {
      this.show = true
    },
    onChange (value) {
      console.log(value)
      this.pay_code = value
      console.log(typeof (this.pay_code))
    },
    // 去支付
    onSubmit () {
      let payParams = {
        order_sn: this.detail.sn,
        pay_code: this.pay_code
      }
      paymentHandle(payParams).then(res => {
        console.log(res.data.data.url)
        this.url = res.data.data.url
        console.log(this.pay_code, 'ss')
        if (this.pay_code == 4) {
          console.log('wwwwwwwwwwww')
          this.orderPayment() // 钱包支付
        } else {
          window.location.href = this.url
        }
      })
    },
    // 钱包支付
    orderPayment () {
      let payParams = {
        order_sn: this.detail.sn
      }
      orderPayment(payParams).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          this.$router.push({
            name: 'PaySuccess'
          })
        }
      })
    },
    // 关闭支付弹窗
    onClick () {
      this.show = false
      console.log('返回')
    },
    // 评价商品
    comment () {
      let id = this.sn
      console.log(id)
      this.$router.push({
        path: `/Edit/${id}`
      })
    },
    // 查看评论
    commentDetail () {
      let id = this.id
      console.log(id)
      this.$router.push({
        path: `/CommentDetail/${id}`
      })
    },
    // 获取钱包详情
    getInfo () {
      getInfo().then(res => {
        console.log(res, 'aaaaaa')
        console.log(res.data.data.amount)
        this.amount = res.data.data.amount
      })
    }

  }
}
</script>

<style lang="less" scoped>
  .app {
    background: #eee;
    .content {
      padding: 14px;
      padding-bottom: 8px;
      margin-top: 6px;
      background: #fff;
      li {
        margin-bottom: 4px;
        span {
          margin-left: 10px;
        }
      }
      .tips {
        font-size: 12px;
        color: #999;
      }
      .line {
        width: 100%;
        height: 1px;
        background: #ccc;
        margin: 6px 0 14px;
      }
      .address {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 15px;
        div:nth-of-type(1) {
          display: flex;
          align-items: center;
          > div:nth-of-type(1) {
            margin-right: 10px;
            width: 20px;
            img {
              width: 100%;
            }
          }
        }
      }
    }
    .img {
      width: 100%;
      background: #fff;
      img {
        width: 100%;
      }
    }
    .list {
      margin-bottom: 100px;
    }
    .top {
      height: 6px;
    }
    .product {
      background: #fff;
      display: flex;
      padding: 14px;
      border-bottom: 1px solid #ccc;
      > div:nth-of-type(1) {
        width: 100px;
        height: 100px;
        border: 1px solid #eee;
        margin-right: 10px;
        img {
          width: 100%;
        }
      }
      > div:nth-of-type(2) {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        .price {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .total {
      text-align: right;
      background: #fff;
      line-height: 30px;
      padding-right: 10px;
    }
  }
  .red {
    color: red;
  }
  .van-submit-bar__bar {
    border-top: 1px solid #ccc;
  }
  .account {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 36px;
    line-height: 36px;
    color: #fff;
    text-align: center;
    background: #39b249;
  }
  .eee {
    background: #eee;
  }
  /deep/.van-radio__icon--checked .van-icon {
    background-color: #39b249;
    border-color: #39b249;
  }
  .van-radio {
    padding: 10px 20px;
    background: #fff;
    margin: 10px 10px;
    border-radius: 5px;
  }
  .list2{
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    background: #00a0e8;
    color: #fff;
    display: flex;
    text-align: center;
    justify-content: center;
    >div:nth-of-type(1){
      width: 30%;
      background: #039a3d;
    }
    >div:nth-of-type(2){
      width: 70%;
    }
  }

</style>
