<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon text="客服" />
      <van-goods-action-icon
        info="5"
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
import { addCartHandle } from '@/api/cart'
export default {
  methods: {
    onClickIcon () {
      console.log('点击图标')
    },
    onClickButton () {
      console.log('点击按钮')
    },
    // 加入购物车
    addCart () {
      var addCartDetail = [
        {
          foreign_id: 56,
          num: 1
          // goods_type: 1,
          // buy_type: 1
          // brand_name: 'gasfddg',
          // brand_id: 5
        }
      ]
      addCartHandle(addCartDetail).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
</style>
