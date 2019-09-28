<template>
  <div class="box">
    <div class="empty" v-if="list.length == 0">
      <div><van-icon name="shopping-cart-o" /></div>
      <div>采购车是空的</div>
      <span></span>
    </div>
    <div class="main" v-else>
      <div class="list" v-for="(item, index) in list" :key="index">
        <div><van-checkbox v-model="checked"></van-checkbox></div>
        <div><img :src="'https://worldview.com.cn/uploads/' + item.thumb_img" alt="" /></div>
        <div class="price">
          <div>{{ item.headline }}</div>
          <div>{{ item.name }}</div>
          <div>
            <div>￥{{ item.bulk_price }}</div>
            <div @click="del(index)" class="del">删除</div>
            <div><van-stepper v-model="item.num" /></div>
          </div>
        </div>
      </div>
      <van-submit-bar
  :price="3050"
  button-text="结算"
  @submit="onSubmit"
>
  <!-- <input class="ipt" type="checkbox" @click="updateChecked(isAllChecked)" :checked="isAllChecked"><div>全选</div> -->
</van-submit-bar>
    </div>

    <!-- <div class="main">
      <div class="list">
        <div><input type="checkbox" /></div>
        <div><img src="../../../static/images/pro1.png" alt="" /></div>
        <div class="price">
          <div>
            标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
          </div>
          <div>标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
          <div>
            <div>￥500</div>
            <div @click="del">删除</div>
            <div><van-stepper v-model="value" /></div>
          </div>
        </div>
      </div>
     </div> -->

    <Tabbar msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Tabbar from '@/components/Tabbar.vue'
import { getListHandle, delCartHandle } from '@/api/cart'

export default {
  name: 'home',
  components: {
    Tabbar
  },
  data () {
    return {
      list: [], // 地址列表
      value: 1, // 加减初始值
      cart_id: '', // 购物车列表ID
      id: '',
      num: '', // 购物车列表数量
      checked: false // 商店选择的状态
    }
  },
  created () {
    this.getListHandle()
  },
  methods: {
    // 获取购物车列表
    getListHandle () {
      getListHandle().then(res => {
        console.log(res.data)
        console.log(res.data.data.data)
        console.log(res.data.data.total) // 购物车列表数量
        this.num = res.data.data.total
        // console.log(this.list + '列表')
        for (var index in res.data.data.data) {
          // console.log(index)
          // console.log(res.data.data.data[0].cart_id + '购物车ID')
          this.cart_id = res.data.data.data[index].cart_id
          this.list = res.data.data.data
          // console.log(res.data.data.data.length)
          console.log(this.cart_id + '购物车列表cart_id')
        }
      })
    },
    // 删除购物车
    del (index) {
      let id = {
        ids: [this.list[index].cart_id]
      }
      console.log(this.list[index].cart_id)
      console.log(index + '删除时候')
      delCartHandle(id).then(res => {
        console.log(res)
        this.getListHandle()
        console.log(this.num + '我在删除')
        if (this.num === 1) {
          this.$router.go(0)
        }
      })
    },
    // 结算
    onSubmit () {
      console.log('结算')
    }
  }
}
</script>
<style lang="less" scoped>
  .empty {
    text-align: center;
    color: #999;
    > div:nth-of-type(1) {
      margin-top:60px;
      font-size: 90px;
      color: #ccc;
    }
    > div:nth-of-type(2) {
      margin-top: 10px;
    }
  }
  .main {
    margin-bottom: 100px;
    .list {
      display: flex;
      align-items: center;
      padding:20px 8px;
      border-bottom: 1px solid #ccc;
      > div:nth-of-type(1) {
        flex: 1;
      }
      > div:nth-of-type(2) {
        flex: 3;
        margin-right: 10px;
        img {
          width: 100px;
          height: 100px;
          border: 1px solid #ccc;
        }
      }
      > div:nth-of-type(3) {
        flex: 8;
      }
      .price {
        >div:nth-of-type(2){
          font-size: 14px;
          color: #666
        }
        > div:nth-of-type(3) {
          margin-top: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: red;
          .del{
            background: red;
            color: #fff;
            padding: 2px 6px;
            border-radius: 4px;
          }
          > div:nth-of-type(3) {
            display: flex;
            .van-stepper {
              width: 90px;
              display: flex;
              align-items: center;
              /deep/input {
                height: 28px !important;
              }
            }
          }
        }
      }
    }
    /deep/.list:last-child {
      border: none !important;
    }
  }
  .van-submit-bar{
    border-top: 1px solid #ccc;
    padding-left: 10px;
    margin-bottom: 50px;
  }
  .van-button--danger{
    background: #ff7aab ;
    border:1px solid #ff7aab;
    border-radius: 8px;
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-right: 10px;
  }
  .ipt{
    border:1px solid red !important;
  }
</style>
