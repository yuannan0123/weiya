<template>
  <div class="body">
    <van-nav-bar
      title="订单管理"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs v-model="active">
      <van-tab title="全部订单">
        <div class="noOrder" v-if="list == 0">
          没有相关订单。
        </div>
        <ul
          v-else
          @click="clickList(index)"
          class="order_content"
          v-for="(item, index) in list"
          :key="index"
        >
          <li>流水号：{{ item.sn }}</li>
          <li>下单日期：{{ item.create_time }}</li>
          <li>商品：共{{ item.goods_num }}个</li>
          <li>品牌：LV</li>
          <li>
            金额：<span class="red">￥{{ item.actually_amount }}</span>
          </li>
          <li>
            状态：<span class="red">{{ item.order_status }}</span>
          </li>
          <li class="tips">提示：收到订单货品请及时通知平台客服</li>
          <div class="line"></div>
          <div class="info">
            <div><img src="../../../static/images/weizhi.png" alt="" /></div>
            <div class="detail">
              <div>{{ item.consignee }} &nbsp;{{ item.mobile }}</div>
              <div>收货地址：{{ item.detail_address }}</div>
            </div>
          </div>
        </ul>
      </van-tab>
      <van-tab title="待付款">
        <div class="noOrder" v-if="list1 == 0">
          没有待付款订单。
          <p>提示：超过3天未支付的待付款订单将被系统自动清除</p>
        </div>
        <ul
          v-else
          @click="clickList1(index)"
          class="order_content"
          v-for="(item, index) in list1"
          :key="index"
        >
          <li>流水号：{{ item.sn }}</li>
          <li>下单日期：{{ item.create_time }}</li>
          <li>商品：共{{ item.goods_num }}个</li>
          <li>品牌：LV</li>
          <li>
            金额：<span class="red">￥{{ item.actually_amount }}</span>
          </li>
          <li>
            状态：<span class="red">{{ item.order_status }}</span>
          </li>
          <li class="tips">提示：收到订单货品请及时通知平台客服</li>
          <div class="line"></div>
          <div class="info">
            <div><img src="../../../static/images/weizhi.png" alt="" /></div>
            <div class="detail">
              <div>{{ item.consignee }} &nbsp;{{ item.mobile }}</div>
              <div>收货地址：{{ item.detail_address }}</div>
            </div>
          </div>
        </ul>
      </van-tab>
      <van-tab title="待收货">
        <div class="noOrder" v-if="list2 == 0">
          没有相关订单。
        </div>
        <ul
          v-else
          @click="clickList2(index)"
          class="order_content"
          v-for="(item, index) in list2"
          :key="index"
        >
          <li>流水号：{{ item.sn }}</li>
          <li>下单日期：{{ item.create_time }}</li>
          <li>商品：共{{ item.goods_num }}个</li>
          <li>品牌：LV</li>
          <li>
            金额：<span class="red">￥{{ item.actually_amount }}</span>
          </li>
          <li>
            状态：<span class="red">{{ item.order_status }}</span>
          </li>
          <li class="tips">提示：收到订单货品请及时通知平台客服</li>
          <div class="line"></div>
          <div class="info">
            <div><img src="../../../static/images/weizhi.png" alt="" /></div>
            <div class="detail">
              <div>{{ item.consignee }} &nbsp;{{ item.mobile }}</div>
              <div>收货地址：{{ item.detail_address }}</div>
            </div>
          </div>
        </ul>
      </van-tab>
      <van-tab title="待评价">
        <div class="noOrder" v-if="list3 == 0">
          没有相关订单。
        </div>
        <ul
          v-else
          @click="clickList3(index)"
          class="order_content"
          v-for="(item, index) in list3"
          :key="index"
        >
          <li>流水号：{{ item.sn }}</li>
          <li>下单日期：{{ item.create_time }}</li>
          <li>商品：共{{ item.goods_num }}个</li>
          <li>品牌：LV</li>
          <li>
            金额：<span class="red">￥{{ item.actually_amount }}</span>
          </li>
          <li>
            状态：<span class="red">{{ item.order_status }}</span>
          </li>
          <li class="tips">提示：收到订单货品请及时通知平台客服</li>
          <div class="line"></div>
          <div class="info">
            <div><img src="../../../static/images/weizhi.png" alt="" /></div>
            <div class="detail">
              <div>{{ item.consignee }} &nbsp;{{ item.mobile }}</div>
              <div>收货地址：{{ item.detail_address }}</div>
            </div>
          </div>
        </ul>
      </van-tab>
      <van-tab title="已完成">
        <div class="noOrder" v-if="list4 == 0">
          没有相关订单。
        </div>
        <ul
          @click="clickList4(index)"
          class="order_content"
          v-for="(item, index) in list4"
          :key="index"
        >
          <li>流水号：{{ item.sn }}</li>
          <li>下单日期：{{ item.create_time }}</li>
          <li>商品：共{{ item.goods_num }}个</li>
          <li>品牌：LV</li>
          <li>
            金额：<span class="red">￥{{ item.actually_amount }}</span>
          </li>
          <li>
            状态：<span class="red">{{ item.order_status }}</span>
          </li>
          <li class="tips">提示：收到订单货品请及时通知平台客服</li>
          <div class="line"></div>
          <div class="info">
            <div><img src="../../../static/images/weizhi.png" alt="" /></div>
            <div class="detail">
              <div>{{ item.consignee }} &nbsp;{{ item.mobile }}</div>
              <div>收货地址：{{ item.detail_address }}</div>
            </div>
          </div>
        </ul>
      </van-tab>
      <van-tab title="售后服务">
        111
        <div class="noOrder" v-if="list6 == 0">
          没有相关订单。
        </div>
        <ul
          v-else
          @click="clickList6(index)"
          class="order_content"
          v-for="(item, index) in list6"
          :key="index"
        >
          <li>流水号：{{ item.sn }}</li>
          <li>下单日期：{{ item.create_time }}</li>
          <li>商品：共{{ item.goods_num }}个</li>
          <li>品牌：LV</li>
          <li>
            金额：<span class="red">￥{{ item.actually_amount }}</span>
          </li>
          <li>
            状态：<span class="red">{{ item.order_status }}</span>
          </li>
          <li class="tips">提示：收到订单货品请及时通知平台客服</li>
          <div class="line"></div>
          <div class="info">
            <div><img src="../../../static/images/weizhi.png" alt="" /></div>
            <div class="detail">
              <div>{{ item.consignee }} &nbsp;{{ item.mobile }}</div>
              <div>收货地址：{{ item.detail_address }}</div>
            </div>
          </div>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getListHandle } from '@/api/order'
import areaList from '../../../static/js/area.js'
// import { constants } from 'crypto'
export default {
  data () {
    return {
      areaList,
      active: 0,
      order_status: '',
      list: [], // 全部订单列表
      list1: [], // 待付款
      list2: [], // 待收货
      list3: [], // 待评价
      list4: [], // 已完成
      list5: [], // 已取消
      list6: [], // 售后
      getlist: {
        pageSize: 30, // 每页条数
        page: 1 // 页码
      }
    }
  },
  created () {
    this.active = this.$route.params.id
    // this.getListHandle()
    this.getListHandle1()
  },
  methods: {
    // getCityFunc (content, key, jsonData) {
    //   for (var item in jsonData) {
    //     if (item == content) {
    //       key = jsonData[item]
    //     }
    //   }
    //   console.log(key)
    //   return key
    // },
    onClickLeft () {
      this.$router.go(-1)
    },
    // // 获取全部用户订单列表
    // getListHandle () {
    //   let data = {
    //     id: this.order_status,
    //     page: this.getlist.page,
    //     pageSize: this.getlist.pageSize
    //   }
    //   getListHandle(data).then(res => {
    //     console.log(res)
    //     let data = res.data.data.data
    //     console.log(data, '订单列表')
    //     this.list = data
    //     // 过滤订单状态
    //     console.log(this.list.filter(item => item.order_status == 1)) // 待付款订单
    //     this.list1 = this.list.filter(item => item.order_status == 1) // 待付款订单
    //     this.list2 = this.list.filter(item => item.order_status == 2) // 待收货订单
    //     // this.list3 = this.list.filter(item => item.order_status == 3) // 待评价订单
    //     this.list4 = this.list.filter(item => item.order_status == 4) // 已完成
    //     this.list5 = this.list.filter(item => item.order_status == 5) // 已取消
    //     this.list6 = this.list.filter(item => item.order_status == 6) // 售后
    //     // 循环每个数组里面的订单状态
    //     this.list.forEach(function (value) {
    //       console.log(value.order_status)
    //       // 把订单状态转化为文字
    //       if (value.order_status == 1) {
    //         value.order_status = '待付款'
    //       }
    //       if (value.order_status == 2) {
    //         value.order_status = '待收货'
    //       }
    //       if (value.order_status == 3) {
    //         value.order_status = '待评价'
    //       }
    //       if (value.order_status == 4) {
    //         value.order_status = '已完成'
    //       }
    //       if (value.order_status == 5) {
    //         value.order_status = '已取消'
    //       }
    //       if (value.order_status == 6) {
    //         value.order_status = '售后'
    //       }
    //     })
    //   })
    // },
    // 获取待付款订单列表
    getListHandle1 () {
      let data = {
        order_status: '0',
        page: this.getlist.page,
        pageSize: this.getlist.pageSize
      }
      console.log(data, '222222')
      getListHandle(data).then(res => {
        console.log(res)
        let data = res.data.data.data
        console.log(data, '待付款')
        this.list = data
        // this.list3 = this.list.filter(item => item.order_status == 3) // 待评价订单
        // 循环每个数组里面的订单状态
        this.list.forEach(function (value) {
          console.log(value.order_status)
          // 把订单状态转化为文字
          // if (value.order_status == 3) {
          //   value.order_status = '待评价'
          // }
        })
      })
    },
    // 点击订单列表跳转详情
    clickList (index) {
      console.log(this.list[index].sn)
      console.log(index)
      let id = this.list[index].sn
      this.$router.push({
        path: `/OrderDetail/${id}`
      })
    },
    // 点击代发货
    clickList1 (index) {
      console.log(this.list1[index].sn)
      console.log(index)
      let id1 = this.list1[index].sn
      this.$router.push({
        path: `/OrderDetail/${id1}`
      })
    },
    // 点击代发货
    clickList2 (index) {
      console.log(this.list2[index].sn)
      console.log(index)
      let id2 = this.list2[index].sn
      this.$router.push({
        path: `/OrderDetail/${id2}`
      })
    },
    // 点击代发货
    clickList3 (index) {
      console.log(this.list3[index].sn)
      console.log(index)
      let id3 = this.list3[index].sn
      this.$router.push({
        path: `/OrderDetail/${id3}`
      })
    },
    // 点击代发货
    clickList4 (index) {
      console.log(this.list4[index].sn)
      console.log(index)
      let id4 = this.list4[index].sn
      this.$router.push({
        path: `/OrderDetail/${id4}`
      })
    },
    // 点击代发货
    clickList6 (index) {
      console.log(this.list6[index].sn)
      console.log(index)
      let id6 = this.list6[index].sn
      this.$router.push({
        path: `/OrderDetail/${id6}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .body {
    background: #eee;
    height: 100vh;
  }
  .van-tab__pane {
    height: 100%;
  }
  .van-tabs--line {
    background: #eee;
  }
  .order_content {
    padding: 10px 10px;
    margin-bottom: 10px;
    background: #fff;
    li {
      padding: 3px;
    }
    .tips {
      font-size: 12px;
      color: #999;
    }
    .line {
      width: 100%;
      height: 1px;
      margin-top: 2px;
      background: #ccc;
    }
    .info {
      display: flex;
      padding: 0.2rem 0;
      > div:nth-of-type(1) {
        width: 0.5rem;
        height: 0.5rem;
        img {
          width: 100%;
        }
      }
      .detail {
        margin-left: 0.2rem;
      }
    }
  }
  /deep/.van-tab {
    flex-basis: 16.7% !important;
    background: #eee;
    width: 100%;
  }
  .red {
    color: red;
  }
  .noOrder {
    background: #fff;
    padding: 16px 10px;
    height: 200px;
    p {
      color: #ccc;
      font-size: 12px;
      margin-top: 5px;
    }
  }
</style>
