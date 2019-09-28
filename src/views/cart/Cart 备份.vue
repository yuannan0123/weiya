<template>
  <div class="cart-list-content">
    <van-nav-bar
      title="购物车"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 购物车没有商品 -->
    <div class="empty" v-if="list.length == 0">
      <div><van-icon name="shopping-cart-o" /></div>
      <div>采购车是空的</div>
      <span></span>
    </div>
    <!-- 购物车有商品 -->
    <div v-else>
        <van-checkbox-group class="card-goods" v-model="checkedGoods">
          <van-checkbox
            class="card-goods__item"
            v-for="(item, index) in list"
            :checked="true"
            :key="index"
            :name="item"
            v-model="checked"
          >
            <van-card
              :price="item.bulk_price"
              :desc="item.headline"
              :title="item.name"
              :thumb="'https://worldview.com.cn/uploads/' + item.thumb_img"
            >
              <div slot="bottom">
                <van-button
                  class="del"
                  @click="remove($event, index, item.cart_id)"
                  >删除</van-button
                >
                <van-button @click="jian($event, index)">-</van-button>
                <span class="num">{{ item.num }}</span>
                <van-button @click="add($event, index)">+</van-button>
              </div>
            </van-card>
          </van-checkbox>
        </van-checkbox-group>
    <van-submit-bar
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit(totalPrice)"
    >
      <van-checkbox @click="tap()" v-model="checked" class="all"
        >全选</van-checkbox
      >
    </van-submit-bar>
</div>
    <Tabbar />
  </div>
</template>
<script>
import Tabbar from '@/components/Tabbar.vue'
import { getcarListHandle, delCartHandle } from '@/api/cart'
import { generateHandle } from '@/api/order'
export default {
  components: {
    Tabbar
  },
  data () {
    return {
      checkedGoods: [],
      list: [],
      checked: false,
      panduan: true,
      midprc: '',
      getlist: {
        pageSize: 100,
        page: 0
      },
      id: '33',
      goods_type: '1',
      value: '1',
      buy_type: '1'
    }
  },
  mounted () {
    // this.getCartListHandle()
  },

  computed: {
    submitBarText: {
      get: function () {
        var count = this.checkedGoods.length
        console.log(count)
        this.$store.dispatch('getUpdatacountActions', count)
        return '结算' + (count ? `(${count})` : '')// 模板字符串${count}
      },
      set: function (val) {
      }
    },
    totalPrice: {
      get: function () {
        return this.list.reduce((total, item) => total + (this.checkedGoods.indexOf(item) !== -1 ? item.bulk_price * 100 * item.num : 0)
          , 0)
      }

    }
  },
  watch: {
    checkedGoods: {
      handler: function () {
        if (this.checkedGoods.length == this.list.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      }
    }
  },
  created () {
    let token = localStorage.getItem('mytoken')
    if (token) {
      console.log('登录了 有token')
      this.getCartListHandle()
    }
    if (!token) {
      console.log('没有token')
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 获取购物车列表
    async getCartListHandle () {
      var getListParams = {
        pageSize: this.getlist.pageSize,
        page: this.getlist.page
      }
      await getcarListHandle(getListParams).then(res => {
        this.list = res.data.data.data
        console.log(this.list, 'bbbbbbbbb')
        console.log(this.list.length)
        // this.$store.commit('updatacount', this.list.length)
      })
    },
    onSubmit (a) {
      let cartGoodsList = []
      console.log(this.checkedGoods)
      this.checkedGoods.map((item, i) => {
        cartGoodsList.push({ // 购物车中选中的商品
          goods_id: item.id,
          num: item.num,
          buy_type: this.buy_type
        })
      })
      console.log(cartGoodsList, '购物车中选中的商品')
      let generateParams = cartGoodsList
      generateHandle(generateParams).then(res => {
        console.log(generateParams)
        console.log(res.data.data.order_sn)
        let id = res.data.data.order_sn
        this.$router.push({
          path: `/ConfirmOrder/${id}`
        })
      })
    },
    tap () {
      if (this.checked) {
        this.checkedGoods = []
      } else {
        this.checkedGoods = []
        this.list.forEach((item) => {
          this.checkedGoods.push(item)
        })
      }
    },
    remove (e, index, id) {
      e.cancelBubble = true
      let ids = [id]
      this.$dialog.confirm({
        title: '确定删除?'
      }).then(() => {
        delCartHandle({ ids: ids }).then(res => {
          console.log(res)
          this.list.splice(index, 1)
          this.checkedGoods = []
          console.log(index, 'aaaaa')
          this.list.forEach((item) => {
            this.checkedGoods.push(item)
          })
        })
      }).catch(() => {
        // on cancel
      })
    },
    add (e, a) {
      e.cancelBubble = true
      this.list[a].num++
    },
    jian (e, a) {
      e.cancelBubble = true
      if (this.list[a].num <= 1) {
        this.list[a].num = 1
      } else {
        this.list[a].num--
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .empty {
    text-align: center;
    color: #999;
    > div:nth-of-type(1) {
      margin-top: 60px;
      font-size: 90px;
      color: #ccc;
    }
    > div:nth-of-type(2) {
      margin-top: 10px;
    }
  }
  .cart-list-content {
    padding: 0 0 40px;
    .card-goods__item {
      border-bottom: 5px solid #f2f2f2;
      margin: 0 0 20px 0;
      padding: 10px 10px;
    }
    .van-card__content {
      text-align: left;
    }
    .van-ellipsis {
      white-space: inherit;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  /deep/.van-image__img {
    border: 1px solid #ddd;
  }
  /deep/.van-checkbox__label {
    margin-left: 0;
  }
  .van-button--normal {
    height: 30px;
    line-height: 30px;
  }
  .del {
    padding: 0 8px;
    margin-right: 60px;
  }
  .num {
    height: 30px;
    line-height: 30px;
    padding: 0 5px;
    border-top: 1px solid #ebedf0;
    border-bottom: 1px solid #ebedf0;
    display: inline-block;
  }
  /deep/.van-submit-bar__bar {
    margin-bottom: 50px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .van-submit-bar {
    bottom: 50px !important;
    height: 50px;
  }
  .card-goods {
    margin-bottom: 60px;
  }
  .all {
    margin-left: 10px;
  }
</style>
