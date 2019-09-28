<template>
  <div class="body">
    <van-nav-bar
      title="订单管理"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs v-model="active" @click="onClick">
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
      <van-list
        v-model="isUpLoading"
        :finished="upFinished"
        :offset="offset"
        finished-text="暂无更多数据"
        @load="onLoadList"
      >
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
      <van-tab title="待付款" >
        <div class="noOrder" v-if="list == 0">
          没有待付款订单。
          <p>提示：超过3天未支付的待付款订单将被系统自动清除</p>
        </div>
        <ul
          v-else
          @click="clickList1(index)"
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
      <van-tab title="待收货">
        <div class="noOrder" v-if="list == 0">
          没有相关订单。
        </div>
        <ul
          v-else
          @click="clickList2(index)"
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
      <van-tab title="待评价">
        <div class="noOrder" v-if="list == 0">
          没有相关订单。
        </div>
        <ul
          v-else
          @click="clickList3(index)"
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
      <van-tab title="已完成">
        <div class="noOrder" v-if="list == 0">
          没有相关订单。
        </div>
        <ul
          @click="clickList4(index)"
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
      <van-tab title="售后服务">
        111
        <div class="noOrder" v-if="list == 0">
          没有相关订单。
        </div>
        <ul
          v-else
          @click="clickList6(index)"
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
       </van-list>
    </van-pull-refresh>
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
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      areaList,
      active: 0,
      order_status: '0',
      list: [], // 全部订单列表
      getlist: {
        pageSize: 10, // 每页条数
        page: 0 // 页码
      }
    }
  },
  created () {
    this.active = this.$route.params.id
    // 订单类型是根据order_status过滤
    this.order_status = this.$route.params.id
    // this.getListHandle()
    this.getListHandle()
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
    // 获取待付款订单列表
    async getListHandle () {
      let data = {
        order_status: this.order_status,
        page: this.getlist.page,
        pageSize: this.getlist.pageSize
      }
      await getListHandle(data).then(res => {
        console.log(res, '11111111')
        let data = res.data.data.data
        console.log(data, '订单')
        this.list = data
        let productListData = res.data.data.data
        if (res.data.code === '1') { // 请求成功
          if (this.list.length) { // 当请求前有数据时 第n次请求
            if (this.isUpLoading) { // 上拉加载
              this.list = this.list.concat(productListData) // 上拉加载新数据添加到数组中
              this.$nextTick(() => { // 在下次 DOM 更新循环结束之后执行延迟回调
                this.isUpLoading = false// 关闭上拉加载中
              })
              if (productListData.length < 10) { // 没有更多数据
                this.upFinished = true // 上拉加载完毕
              }
            }
            if (this.isDownLoading) { // 关闭下拉刷新
              this.isDownLoading = false // 关闭下拉刷新中
              this.list = productListData // 重新给数据赋值
              if (this.upFinished) { // 如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                this.upFinished = false
              }
            }
          } else { // 当请求没有数据时 第一次请求
            this.list = productListData
          }
        }
        // 循环每个数组里面的订单状态
        this.list.forEach(function (value) {
          // console.log(value.order_status)
          // 把订单状态转化为文字
          if (value.order_status == 1) {
            value.order_status = '待付款'
          }
          if (value.order_status == 2) {
            value.order_status = '待收货'
          }
          if (value.order_status == 3) {
            value.order_status = '待评价'
          }
          if (value.order_status == 4) {
            value.order_status = '已完成'
          }
          if (value.order_status == 5) {
            value.order_status = '已取消'
          }
          if (value.order_status == 6) {
            value.order_status = '售后'
          }
        })
      })
    },
    // 下拉刷新方法
    onDownRefresh () {
      this.getlist.page = 1
      this.isDownLoading = true
      this.getListHandle()
      console.log('下拉刷新111')
    },
    // 上拉加载请求方法
    onLoadList () {
      this.getlist.page++
      this.isUpLoading = true
      console.log('上拉加载222')
      this.getListHandle()// ajax请求
    },
    onClick (name, title) {
      console.log(title)
      if (title == '全部订单') {
        console.log('pppp')
        this.order_status = '0'
        this.getListHandle()
      }
      if (title == '待付款') {
        console.log('pppp')
        this.order_status = '1'
        this.getListHandle()
      }
      if (title == '待收货') {
        console.log('pppp')
        this.order_status = '2'
        this.getListHandle()
      }
      if (title == '待评价') {
        console.log('pppp')
        this.order_status = '3'
        this.getListHandle()
      }
      if (title == '已完成') {
        console.log('pppp')
        this.order_status = '4'
        this.getListHandle()
      }
      if (title == '售后服务') {
        console.log('pppp')
        this.order_status = '6'
        this.getListHandle()
      }
    },
    // 点击订单列表跳转详情
    clickList (index) {
      console.log(this.list[index].sn, '11111111')
      console.log(index)
      let id = this.list[index].sn
      this.$router.push({
        path: `/OrderDetail/${id}`
      })
    },
    // 点击待付款
    clickList1 (index) {
      console.log(this.list[index].sn)
      console.log(index, '11111111')
      let id = this.list[index].sn
      this.$router.push({
        path: `/OrderDetail/${id}`
      })
    },
    // 点击待收货
    clickList2 (index) {
      console.log(this.list[index].sn)
      console.log(index)
      let id = this.list[index].sn
      this.$router.push({
        path: `/OrderDetail/${id}`
      })
    },
    // 点击待评价
    clickList3 (index) {
      console.log(this.list[index].sn)
      console.log(index)
      let id = this.list[index].sn
      this.$router.push({
        path: `/OrderDetail/${id}`
      })
    },
    // 点击已完成
    clickList4 (index) {
      console.log(this.list[index].sn)
      console.log(index)
      let id = this.list[index].sn
      this.$router.push({
        path: `/OrderDetail/${id}`
      })
    },
    // 点击售后服务
    clickList6 (index) {
      console.log(this.list[index].sn)
      console.log(index)
      let id = this.list[index].sn
      this.$router.push({
        path: `/OrderDetail/${id}`
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
