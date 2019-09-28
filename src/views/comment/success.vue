<template>
  <div>
    <van-nav-bar
      title="评价成功"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="top"><van-icon name="success" />评价成功</div>
    <div class="btn">
      <div @click="back">返回首页</div>
      <div @click="commentdetail">查看评价</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 返回首页
    back () {
      this.$router.push({
        path: '/'
      })
    },
    // 查看评论
    commentdetail () {
      let id = this.$route.params.id
      this.$router.push({
        path: `/CommentDetail/${id}`
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .top {
    text-align: center;
    margin:50px 0;
  }
  .btn{
    display: flex;
    padding: 0 30px;
    justify-content: space-between;
  }
</style>
