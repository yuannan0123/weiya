<template>
  <div class="home">

    <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
      <van-list
        v-model="isUpLoading"
        :finished="upFinished"
        :offset="offset"
        finished-text="暂无更多数据"
        @load="onLoadList"
      >
        <!-- <p>刷新次数: {{ count }}</p> -->
        <Login :panelShow.sync="panelShow"></Login>
        <div @click="advantage" class="top_img">
          <img src="../../../static/images/home-banner1.jpg" />
        </div>
        <div class="content">
          <!--轮播图-->
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image" />
            </van-swipe-item>
          </van-swipe>
          <!-- 快报 -->
          <div class="news">
            <div class="top">
              <div>维雅快报</div>
              <div><span>最新</span>是非成败转头空，青山依旧在，惯看风</div>
              <div>|更多</div>
            </div>
            <div class="bottom">
              <div>
                <span>[客户昵称]</span><span>[手机号码]</span
                ><span>[下单日期]</span><span>[发货日期]</span>
              </div>
              <div>
                <span>[客户昵称]</span><span>[手机号码]</span
                ><span>[下单日期]</span><span>[发货日期]</span>
              </div>
              <div>
                <span>[客户昵称]</span><span>[手机号码]</span
                ><span>[下单日期]</span><span>[发货日期]</span>
              </div>
              <div>
                <span>[客户昵称]</span><span>[手机号码]</span
                ><span>[下单日期]</span><span>[发货日期]</span>
              </div>
            </div>
          </div>
          <!-- 二十款明星单品 -->
          <div class="single">
            <div class="top">
              <div>二十款明星单品</div>
              <div>新零售社交电商爆款</div>
            </div>
          </div>

          <!-- 二十款明星单品 -->
          <div class="project">
            <div class="top">
              <div>十大热门项目</div>
              <div>热推门店科技美肤项目</div>
            </div>
          </div>
          <!-- 科技美肤精选 -->
          <div class="selected">
            <div class="title">
              <span></span>科技美肤精选<span></span>
            </div>
            <!-- 组件 -->
            <!-- <Productcard /> -->
            <div class="product">
              <div v-for="(item, index) in productlist" :key="index">
                <router-link
                  :to="{
                    path: `/detail/${item.id}`,
                    query: { pageSize: getlist.pageSize, page: getlist.page }
                  }"
                >
                  <img
                    :src="'https://worldview.com.cn/uploads/' + item.thumb_img"
                    alt=""
                  />
                </router-link>
                <div class="title">{{ item.headline }}</div>
                <div class="price">
                  <div>{{ item.bulk_price }}</div>
                  <div @click="showPopup(index)">
                    <img
                      src="../../../static/images/shopping-cart-icons.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <!-- 弹窗 -->
              <div class="popup">
                <van-popup
                  v-model="show"
                  position="bottom"
                  round
                  :style="{ width: '100%', height: '32%' }"
                >
                  <div class="top">
                    <div>
                      <img :src="'https://worldview.com.cn/uploads/'+clickproductlist.thumb_img" alt="" />
                    </div>

                    <span>{{ clickproductlist.headline }}</span>
                  </div>
                  <div class="price_add">
                    <div>￥{{ clickproductlist.bulk_price }}</div>
                    <div>
                      <van-stepper v-model="value" />
                    </div>
                  </div>
                  <div class="spec">
                    <div>{{ clickproductlist.specification }}</div>
                    <div>体验限购10盒</div>
                  </div>
                  <van-goods-action>
                    <div class="total">￥{{ total }}</div>
                    <van-goods-action-icon
                      :info=this.$store.state.totalcount
                      icon="cart-o"
                      text="购物车"
                      @click="onClickIcon"
                    />

                    <!-- <van-goods-action-icon icon="" text="" /> -->
                    <van-goods-action-button
                      type="warning"
                      text="加入购物车"
                      @click="addCart()"
                    />
                    <van-goods-action-button
                      type="danger"
                      text="立即购买"
                      @click="onClickButton"
                    />
                  </van-goods-action>
                </van-popup>
              </div>
            </div>
          </div>
        </div>

      </van-list>
    </van-pull-refresh>

    <Tabbar />

  </div>
</template>

<script>
// tabbar
import Tabbar from '@/components/Tabbar.vue'
import Login from '@/components/Login.vue'
import img from '../../../static/images/banner-1.jpg'
import img0 from '../../../static/images/banner-0.jpg'
import { getListHandle } from '@/api/product'
import { addCartHandle, getcarListHandle } from '@/api/cart'
import { generateHandle } from '@/api/order'

export default {
  name: 'index',
  components: {
    Tabbar, Login

  },
  data () {
    return {

      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      getlist: {
        category_id: '',
        keyword: '',
        pageSize: 10, // 每页条数
        page: 1// 页码
      },
      productlist: [], // 商品列表数据
      clickproductlist: '', //  点击时候根据索引获取到当面产品数据
      images: [
        img,
        img0
      ],
      panelShow: false,
      show: false,
      value: '1',
      price: '',
      id: '', // 商品ID
      goods_type: '1', // 商品类型
      buy_type: '1', // 购买类型
      cartotal: '' // 购物车列表总数
    }
  },
  created () {
    this.getListHandle()// 获取列表信息
    // 获取本地存储数据
    // this.carttotal = localStorage.getItem('carttotal')
    // console.log(this.carttotal)
    let token = localStorage.getItem('mytoken')
    if (token) {
      this.getcarListHandle()
    }
  },
  methods: {
    // 获取购物车列表
    getcarListHandle () {
      var getListParams = {
        pageSize: this.getlist.pageSize,
        page: this.getlist.page
      }
      getcarListHandle(getListParams).then(res => {
        console.log(res.data.data.total)
        let carlist = JSON.parse(localStorage.getItem('addCart')) || []
        console.log(carlist.length)
        var cartotal = res.data.data.total
        console.log(cartotal)

        // 把获取到的购物车的长度存到本地
        sessionStorage.setItem('cartLength', cartotal)
        this.$store.dispatch('getUpdatacountActions', cartotal)
        console.log(this.$store.state.totalcount, '获取购物车长度')
      })
    },
    // 获取商品列表
    async getListHandle () {
      var getListParams = {
        category_id: this.getlist.category_id,
        keyword: this.getlist.keyword,
        pageSize: this.getlist.pageSize,
        page: this.getlist.page
      }
      await getListHandle(getListParams).then(res => {
        let productListData = res.data.data.data
        console.log(productListData, 'aaaaa')
        if (res.data.code === '1') { // 请求成功
          if (this.productlist.length) { // 当请求前有数据时 第n次请求
            if (this.isUpLoading) { // 上拉加载
              this.productlist = this.productlist.concat(productListData) // 上拉加载新数据添加到数组中
              this.$nextTick(() => { // 在下次 DOM 更新循环结束之后执行延迟回调
                this.isUpLoading = false// 关闭上拉加载中
              })
              if (productListData.length < 10) { // 没有更多数据
                this.upFinished = true // 上拉加载完毕
              }
            }
            if (this.isDownLoading) { // 关闭下拉刷新
              this.isDownLoading = false // 关闭下拉刷新中
              this.productlist = productListData // 重新给数据赋值
              if (this.upFinished) { // 如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                this.upFinished = false
              }
            }
          } else { // 当请求没有数据时 第一次请求
            this.productlist = productListData
          }
        }
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
    showPopup (index) {
      this.show = true
      console.log(this.productlist)
      console.log(index)
      console.log(this.productlist[index])
      this.clickproductlist = this.productlist[index]
      this.price = this.productlist[index].bulk_price
      this.id = this.productlist[index].id
    },
    // 点击图片跳转定制优势
    advantage () {
      this.$router.push({
        name: 'Advantage'
      })
    },
    // 底下加入购物车
    onClickIcon () {
      this.$toast('点击图标')
      // this.getcarListHandle()
      console.log('加入购物车')
    },
    // 点击立即购买
    onClickButton () {
      let token = window.localStorage.getItem('mytoken')
      let generateParams = [
        {
          goods_id: this.clickproductlist.id,
          num: this.value + '',
          buy_type: this.buy_type
        }
      ]
      if (!token) {
        this.show = false
        this.panelShow = true
        console.log(0)
      } else {
        generateHandle(generateParams).then(res => {
          console.log(res)
          console.log(generateParams)
          let id = res.data.data.order_sn
          console.log(id)
          this.$router.push({
            path: `/ConfirmOrder/${id}`
          })
        })
      }
      // console.log(this.value)
      // console.log(this.clickproductlist.id)
    },
    onClickKefu () {
      console.log('点击客服')
    },
    // 加入购物车
    addCart (index) {
      var addCartDetail = [
        {
          foreign_id: this.id,
          num: this.value,
          goods_type: this.goods_type,
          buy_type: this.buy_type
        }
      ]
      addCartHandle(addCartDetail).then(res => {
        console.log(res)
        this.$toast('加入购物车')
      })
    }

  },
  computed: {
    // 计算合计
    total: function () {
      return this.value
    }
  }

}
</script>
<style lang="less" scoped>
  /deep/.van-list__finished-text {
    margin-bottom: 50px;
  }
  .top_img img {
    width: 100%;
  }
  .content {
    padding: 6px;
    background: #efefef;
    // margin-bottom: 80px;
    .van-swipe {
      .van-swipe-item {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
    .news {
      background: #fff;
      margin-top: 6px;
      padding: 6px;
      .top {
        display: flex;
        font-size: 13px;
        justify-content: space-between;
        padding-bottom: 4px;
        border-bottom: 1px solid #eee;
        span {
          color: red;
        }
      }
      .bottom {
        color: #c7aa53;
        background: #fff;
        div {
          display: flex;
          justify-content: space-between;
          margin: 3px 0;
        }
      }
    }
    .single {
      background: #fff;
      margin-top: 6px;
    }
    .project {
      background: #fff;
      margin-top: 6px;
    }
    .selected {
      > .title {
        margin: 6px 0 2px;
        text-align: center;
        span {
          width: 20px;
          height: 6px;
          display: inline-block;
        }
        span:nth-of-type(1) {
          background: url("../../../static/images/icon_left.png") no-repeat;
          background-size: 16px auto;
        }
        span:nth-of-type(2) {
          background: url("../../../static/images/icon_right.png") no-repeat;
          background-size: 16px auto;
          margin-left: 6px;
        }
      }
    }
  }

  // 组件
  .product {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: #efefef;
    padding-top: 8px;
    & > div {
      width: 49%;
      background: #fff;
      margin-bottom: 7px;
      img {
        width: 100%;
      }
      .title {
        width: 100%;
        padding: 2px 6px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .price {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 4px;
        margin-bottom: 6px;
        div:nth-of-type(1) {
          color: #ff6482;
        }
        div:nth-of-type(2) {
          width: 22px;
        }
      }
    }
    > div:nth-of-type(2n-1) {
      margin-right: 2%;
    }
    .top {
      display: flex;
      align-items: center;
      margin: 6px 0 0 6px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ccc;
      div {
        width: 100px;
        border: 1px solid #ccc;
      }
      img {
        width: 100%;
        height: 100%;
      }
      > span {
        padding: 0 6px;
      }
    }
    .price_add {
      padding: 2px 6px;
      margin: 4px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div:nth-of-type(1) {
        color: red;
      }
      div:nth-of-type(2) {
        .van-stepper {
          display: flex;
          align-items: center;
          width: 100px;
          input {
            background: red;
          }
        }
      }
    }
    .spec {
      display: flex;
      justify-content: space-between;
      margin: 6px;
      border-top: 1px solid #ccc;
      padding: 6px 0;
    }
  }
  .popup {
    & > div {
      width: 100%;

      margin-bottom: 0;
    }
  }
  .van-stepper {
    /deep/input {
      height: 28px;
    }
  }
  .van-goods-action {
    border-top: 1px solid #eee;
    z-index: 999;
    .total {
      color: red;
      width: 60px;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .van-goods-action-icon {
    min-width: 30%;
  }
</style>
