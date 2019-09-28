<template>
  <div class="content">
    <Login :panelShow.sync="panelShow"></Login>
    <div class="back" @click="back"><</div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in main_img" :key="index">
        <img v-lazy="'https://worldview.com.cn/uploads/' + image" />
      </van-swipe-item>
    </van-swipe>
    <div class="price">
      <div class="price-detail">
        <div>￥{{ bulk_price }}</div>
        <div><van-stepper v-model="value" /></div>
      </div>
      <div class="title">
        {{ title }}
      </div>
      <div class="spec">
        <div>{{ specification }} {{ bulk_price }}</div>
        <div>300盒起订 阶梯式结算价格</div>
      </div>
      <div class="intro">{{ intro }}</div>
      <div class="tag">
        <div>
          <span v-for="(item, index) in tag" :key="index">{{ item }}</span>
        </div>
        <div>
          <span><van-icon name="star-o" @click="collection"/></span
          ><span><van-icon name="comment-o"/></span
          ><span><van-icon name="share"/></span>
        </div>
      </div>
      <div class="similar">
        <span>限量购买同款魅力期品牌样品</span><span>></span>
      </div>
    </div>
    <div class="line"></div>
    <div class="tips">
      <div class="tips-in">
        温馨提示：3万起联合品牌定制科技美肤品类产品，阶梯式订单结算价格，最快今天下单明天出货，客户订单结算截止至当天夜里12:00。
      </div>
      <div class="logo">
        <div>111</div>
        <div>倒计时</div>
      </div>
      <div class="score">
        <div><van-rate v-model="rate.value" /></div>
        <div>查看评分评论 ></div>
      </div>
      <van-tabs class="order-tabs" v-model="active">
        <van-tab v-html="parameters" title="商品参数" class="parameters">{{
          parameters
        }}</van-tab>
        <van-tab title="商品详情"
          ><span
            class="image_img"
            v-for="(image, index) in detail_img"
            :key="index"
            ><img :src="'https://worldview.com.cn/uploads/' + image"/></span
        ></van-tab>
        <van-tab title="评分评价">
          <van-pull-refresh
            v-model="isDownLoading"
            @refresh="onDownRefresh"
            v-if="commentList.length > 0"
          >
            <van-list
              v-model="isUpLoading"
              :finished="upFinished"
              :offset="offset"
              finished-text="暂无更多数据"
              @load="onLoadList"
            >
              <div
                class="comment"
                v-for="(item, index) in commentList"
                :key="index"
              >
                <div class="top">
                  <div>
                    <span class="user"
                      ><img
                        src="../../../static/images/ucenter_logo.png"
                        alt=""/></span
                    >{{
                      item.mobile_phone
                        ? item.mobile_phone.replace(
                            /^(\d{3})\d+(\d{3})$/,
                            "$1****$2"
                          )
                        : ""
                    }}
                  </div>
                  <div>{{ item.create_time }}</div>
                </div>
                <div class="content">
                  <div><van-rate v-model="item.score" /></div>
                  <div>{{ item.content ? item.content : "默认好评！" }}</div>
                  <div>
                    <!-- <div> -->
                    <img
                      v-if="item.img[0] !== ''"
                      v-for="(v, i) in item.img"
                      :key="i"
                      :src="'https://api.worldview.com.cn/uploads/' + v"
                    />
                    <!-- <img src="../../../static/images/pro1.png" alt=""/>
                <img src="../../../static/images/pro1.png" alt=""/>
                <img src="../../../static/images/pro1.png" alt=""/>
                <img src="../../../static/images/pro1.png" alt=""/> -->
                  </div>
                  <!-- <div>采购时间 2018-220-55</div> -->
                </div>
                <div class="line"></div>
              </div>
            </van-list>
          </van-pull-refresh>
          <div v-else class="noComment">暂无评论!</div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <GoodsAction /> -->
    <van-goods-action>
      <van-goods-action-icon text="客服" />
      <van-goods-action-icon
        :info="this.$store.state.totalcount"
        icon="cart-o"
        text="购物车"
        @click="onClickIcon"
      />
      <van-goods-action-icon icon="" text="" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="onClickButton"
      />
    </van-goods-action>
  </div>
</template>

<script>
// 商品导航
// import GoodsAction from '@/components/GoodsAction.vue'
import { getInfoHandle } from '@/api/detail'
import { addCartHandle, getcarListHandle } from '@/api/cart'
import { collectionHandle } from '@/api/collection'
import { generateHandle } from '@/api/order'
import { CommentListHandle } from '@/api/comment.js'
import Login from '@/components/Login.vue'
export default {
  components: {
    Login
  },
  data () {
    return {
      goodsArr: [],
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      rate: {
        value: 3 // 好评
      },
      active: 0, // tab栏
      time: 30 * 60 * 60 * 1000,
      value: 1, // 增加减少数量
      main_img: [], // 主图
      bulk_price: '', // 价格
      title: '', // 标题
      intro: '', // 简介
      tag: [], // 标签
      parameters: '', // 参数
      detail_img: [], // 详情图片
      thumb_img: '',
      specification: '',
      id: '', // 商品ID,
      name: '',
      goods_type: '1', // 商品类型
      buy_type: '1', // 购买类型
      getlist: {
        pageSize: 10, // 每页条数
        page: 1 // 页码
      },
      commentList: '', // 评论列表
      panelShow: false
    }
  },

  created () {
    let carlist = JSON.parse(localStorage.getItem('addCart')) || []
    this.goodsArr.push(...carlist)
    this.getInfoHandle()
    this.CommentList()
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
    // 获取详情信息
    getInfoHandle () {
      let id = this.$route.params.id
      let page = this.$route.query.page
      let pageSize = this.$route.query.pageSize
      // console.log(id)
      let data = {
        id,
        page,
        pageSize
      }
      getInfoHandle(data).then(res => {
        // console.log(res, '数据')
        // console.log(res.data.data)
        let { data } = { ...res.data }
        this.main_img = data.main_img // 主图
        this.thumb_img = data.thumb_img
        this.bulk_price = data.bulk_price // 价格
        this.title = data.headline // 标题
        this.intro = data.intro // 简介
        this.tag = data.tag // 标签
        this.parameters = data.parameters // 参数
        this.detail_img = data.detail_img // 详情图片
        this.specification = data.specification // 规范
        this.id = data.id
        this.name = data.name
        // console.log(res.data.data.tag)
      })
    },
    // 返回上一页
    back () {
      this.$router.go(-1)
    },
    // 点击跳转购物车列表页面
    onClickIcon () {
      this.$router.push({
        name: 'Cart'
      })
    },

    // 立即购买   生成预订单
    onClickButton () {
      let token = window.localStorage.getItem('mytoken')
      let generateParams = [
        {
          goods_id: parseInt(this.id),
          buy_type: parseInt(this.goods_type),
          num: this.value
        }
      ]
      if (!token) {
        // console.log('没有token')
        this.panelShow = true
      } else {
        generateHandle(generateParams).then(res => {
          console.log(res.data.data.order_sn)
          let id = res.data.data.order_sn
          // console.log(generateParams)
          this.$router.push({
            path: `/ConfirmOrder/${id}`
          })
        })
      }
    },

    // 加入购物车
    addCart () {
      let token = window.localStorage.getItem('mytoken')
      var addCartDetail = [
        {
          foreign_id: this.id,
          num: this.value,
          goods_type: this.goods_type,
          buy_type: this.buy_type
        }
      ]
      if (!token) {
        // console.log(addCartDetail)
        console.log(this.goodsArr, 'ssssssssssssss')
        let obj = {
          foreign_id: this.id,
          id: this.id,
          headline: this.title,
          bulk_price: this.bulk_price,
          name: this.name,
          num: this.value,
          thumb_img: this.thumb_img
        }
        // console.log(obj)
        this.goodsArr.push(obj)
        // console.log(this.goodsArr, 'aaaaaaaaaa')
        let strArr = JSON.stringify(this.goodsArr)
        console.log(strArr)
        let carlist = JSON.parse(strArr)
        console.log(carlist)

        // js实现数组中id去重相同id下的value值相加，
        let newArr = []
        carlist.forEach(el => {
          const result = newArr.findIndex(ol => { return el.id === ol.id })
          if (result !== -1) {
            console.log(newArr[result].num)
            newArr[result].num = newArr[result].num + el.num
          } else {
            newArr.push(el)
          }
          console.log(result)
        })
        console.log(newArr)

        localStorage.setItem('addCart', JSON.stringify(newArr))
      } else {
        addCartHandle(addCartDetail).then(res => {
          // console.log(res)
          // console.log(addCartDetail)
          // console.log(this.$store.state.cartList, '购物车数据')
          // let cartList = this.$store.state.cartList
          // for (let i = 0; i < cartList.length; i++) {
          //   for (let j = 0; j < addCartDetail.length; i++) {
          //     if (cartList[i].id === addCartDetail[j].foreign_id) {
          //       console.log('有重复')
          //       return false
          //     } else {
          //       console.log('++数据++++1')
          //       this.$store.state.totalcount++
          //     }
          //   }
          // }
          // this.$store.commit('updatacount', num)
          this.$toast('加入到购物车')
        })
      }
    },
    // 点击收藏
    collection () {
      var data = {
        data: {
          goods_id: this.id
        }
      }
      collectionHandle(data).then(res => {
        console.log(res)
        this.$toast('收藏成功')
      })
    },
    // 商品评价
    CommentList () {
      // console.log(this.$route.params.id, 'ssss')
      let CommentParams = {
        goods_id: this.$route.params.id,
        pageSize: this.getlist.pageSize,
        page: this.getlist.page
      }
      CommentListHandle(CommentParams).then(res => {
        // console.log(res)
        // console.log(res.data.data.data)
        // this.commentList = res.data.data.data
        let commentList = res.data.data.data
        //  把分数星星的值 字符串转为数值
        for (var i = 0; i < commentList.length; i++) {
          commentList[i].score = parseInt(commentList[i].score)
        }
        if (res.data.code === '1') { // 请求成功
          if (this.commentList.length) { // 当请求前有数据时 第n次请求
            if (this.isUpLoading) { // 上拉加载
              this.commentList = this.commentList.concat(commentList) // 上拉加载新数据添加到数组中
              this.$nextTick(() => { // 在下次 DOM 更新循环结束之后执行延迟回调
                this.isUpLoading = false// 关闭上拉加载中
              })
              if (commentList.length < 10) { // 没有更多数据
                this.upFinished = true // 上拉加载完毕
              }
            }
            if (this.isDownLoading) { // 关闭下拉刷新
              this.isDownLoading = false // 关闭下拉刷新中
              this.commentList = commentList // 重新给数据赋值
              if (this.upFinished) { // 如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                this.upFinished = false
              }
            }
          } else { // 当请求没有数据时 第一次请求
            this.commentList = commentList
          }
        }
      })
    },
    // 下拉刷新方法
    onDownRefresh () {
      this.getlist.page = 1
      this.isDownLoading = true
      this.CommentList()
      // console.log('下拉刷新111')
    },
    // 上拉加载请求方法
    onLoadList () {
      this.getlist.page++
      this.isUpLoading = true
      // console.log('上拉加载222')
      this.CommentList()// ajax请求
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    margin-bottom: 14px;
    .back {
      width: 30px;
      height: 30px;
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 99;
      border-radius: 50%;
      line-height: 30px;
      text-align: center;
      color: #fff;
    }
    .van-swipe-item {
      img {
        width: 100%;
      }
    }
    .price {
      padding: 10px;
      .price-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div:nth-of-type(1) {
          color: red;
          font-size: 22px;
        }
        div:nth-of-type(2) {
          .van-stepper {
            display: flex;
            align-items: center;
            width: 90px;
            /deep/input {
              height: 28px;
            }
          }
        }
      }
      .title {
        margin: 0.3rem 0 0.1rem;
      }
      .spec {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #ccc;
      }
      .intro {
        margin-top: 0.3rem;
      }
      .tag {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 0.3rem 0 0.2rem;
        div:nth-of-type(1) {
          color: #eb6100;
          span {
            margin-right: 0.2rem;
          }
        }
        div:nth-of-type(2) {
          color: #009a3e;
          font-size: 0.5rem;
          span {
            margin-left: 0.3rem;
          }
        }
      }
      .similar {
        display: flex;
        justify-content: space-between;
        margin-top: 0.2rem;
      }
    }
    .line {
      width: 100%;
      height: 6px;
      background: #f1f1f1;
    }
    .tips {
      // padding: 0.2rem 0.2rem;
      .tips-in {
        color: #999;
        padding: 6px 10px;
      }
      .logo {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 6px 10px;
      }
      .score {
        display: flex;
        justify-content: space-between;
        padding: 6px 10px;
      }
      .image_img {
        width: 100%;
        img {
          width: 100%;
        }
      }
      .comment {
        width: 100%;
        padding-bottom: 10px;
        padding-top: 10px;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          div:nth-of-type(1) {
            display: flex;
            align-items: center;
            .user {
              width: 1rem;
              height: 1rem;
              margin-right: 0.2rem;
              border-radius: 50%;
              border: 1px solid #ccc;
              img {
                width: 100%;
                border-radius: 50%;
              }
            }
          }
        }
        > .content {
          width: 100%;
          padding: 0 10px;
          div:nth-of-type(1) {
            display: flex;
            align-items: center;
            margin: 0.1rem 0;
          }
          div:nth-of-type(3) {
            display: flex;
            margin: 0.1rem 0;
            width: 100%;
            flex-wrap: wrap;
            img {
              width: 84px;
              height: 84px;
              margin-right: 6px;
              margin-top: 6px;
            }
            img:nth-of-type(4) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .van-tab__pane {
    margin-bottom: 60px;
  }
  .van-goods-action {
    border-top: 1px solid #eee;
    z-index: 999;
  }
  .noComment {
    padding: 30px 0 0 10px;
    margin-bottom: 90px;
  }
  .parameters {
    padding: 0 10px;
  }
</style>
