<template>
  <div>
    <van-nav-bar
      title="支付成功"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
<div class="content">
  <van-icon name="passed" />
  <div>支付成功</div>
  <div class="back" @click="back">返回首页</div>
</div>
  </div>
</template>

<script>

export default {
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    back () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content{
  text-align: center;
  margin: 50px 0;
  i{
    font-size: 60px;
    color: #ccc;
  }
  .back{
    margin-top: 40px;
  }
}
</style>
