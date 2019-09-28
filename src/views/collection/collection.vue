<template>
  <div>
    <van-nav-bar
      title="商品收藏"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
      <van-list
        v-model="isUpLoading"
        :finished="upFinished"
        :offset="offset"
        finished-text="暂无更多数据"
        @load="onLoadList"
      >
        <div class="product">
          <div v-for="(item, index) in collectionlist" :key="index">
            <!-- <router-link
                  :to="{
                    path: `/detail/${item.id}`,
                    query: { pageSize: getlist.pageSize, page: getlist.page }
                  }"
                > -->
            <img
              :src="'https://worldview.com.cn/uploads/' + item.thumb_img"
              alt=""
            />
            <!-- </router-link> -->
            <div class="title">{{ item.headline }}</div>
            <div class="price">
              <div>￥{{ item.bulk_price }}</div>
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
                  <img
                    :src="
                      'https://worldview.com.cn/uploads/' +
                        clickcollectionlist.thumb_img
                    "
                    alt=""
                  />
                </div>
                <span>{{ clickcollectionlist.headline }}</span>
              </div>
              <div class="price_add">
                <div>￥{{ clickcollectionlist.bulk_price }}</div>
                <div>
                  <van-stepper v-model="value" />
                </div>
              </div>
              <div class="spec">
                <div>{{ clickcollectionlist.specification }}</div>
                <div>体验限购10盒</div>
              </div>
              <van-goods-action>
                <!-- <van-goods-action-icon text="合计" @click="onClickKefu" /> -->
                <div class="total">￥{{ total }}</div>
                <van-goods-action-icon
                  info="5"
                  icon="cart-o"
                  text="购物车"
                  @click="onClickIcon"
                />
                <!-- <van-goods-action-icon icon="" text="" /> -->
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
            </van-popup>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getListcollectionHandle } from '@/api/collection'
import { addCartHandle } from '@/api/cart'
export default {
  data () {
    return {
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      collectionlist: [], // 收藏商品列表数据
      clickcollectionlist: '', /// 点击时候根据索引获取到当面产品数据
      show: false,
      value: 1,
      getlist: {
        pageSize: 10, // 每页条数
        page: 0// 页码
      },
      id: ''
    }
  },
  created () {
    this.getListcollection()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 获取商品列表数据
    async getListcollection () {
      var getListParams = {
        pageSize: this.getlist.pageSize,
        page: this.getlist.page
      }
      await getListcollectionHandle(getListParams).then(res => {
        console.log(res)
        // this.collectionlist = res.data.data.data
        let productListData = res.data.data.data
        console.log(this.collectionlist)
        if (res.data.code === '1') { // 请求成功
          if (this.collectionlist.length) { // 当请求前有数据时 第n次请求
            if (this.isUpLoading) { // 上拉加载
              this.collectionlist = this.collectionlist.concat(productListData) // 上拉加载新数据添加到数组中
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
            this.collectionlist = productListData
          }
        }
      })
    },
    // 下拉刷新方法
    onDownRefresh () {
      this.getlist.page = 1
      this.isDownLoading = true
      this.getListcollection()
      console.log('下拉刷新111')
    },
    // 上拉加载请求方法
    onLoadList () {
      this.getlist.page++
      this.isUpLoading = true
      console.log('上拉加载222')
      this.getListcollection()// ajax请求
    },
    // 显示弹窗
    showPopup (index) {
      this.show = true
      console.log(this.collectionlist)
      console.log(index + '索引')
      console.log(parseInt(index))
      index = parseInt(index)
      console.log(this.collectionlist[index]) // 点击时候根据索引获取到当面产品数据
      this.clickcollectionlist = this.collectionlist[index]
    },
    //
    onClickKefu () {
      console.log('点击客服')
    },
    // 底下加入购物车
    onClickIcon () {
      this.$toast('点击图标')
    },
    // 加入购物车
    addCart () {
      var addCartDetail = [
        {
          foreign_id: this.id,
          num: this.value
          // goods_type: this.goods_type,
          // buy_type: this.buy_type
        }
      ]
      addCartHandle(addCartDetail).then(res => {
        console.log(res)
        this.$toast('加入购物车')
      })
    },
    onClickButton () {
      this.$toast('点击按钮1111')
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
        // display: flex;
        // align-content: center;
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
