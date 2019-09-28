<template>
  <div>
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
export default {

}
</script>

<style>
</style>
