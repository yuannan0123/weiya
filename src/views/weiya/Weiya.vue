<template>
  <div>
    <div class="top">
      <div class="inp">
        <div><input type="text" placeholder="请输入搜索关键词" /></div>
        <div><van-icon name="photo-o" /></div>
      </div>
      <van-tabs v-model="active">
        <van-tab title="关注">内容 1</van-tab>
        <van-tab title="推荐">
          <div class="recommend">
            <div class="title">
              <div>推荐关注</div>
              <div>换一批 ></div>
            </div>
            <div class="content">
              <div>
                <div><img src="../../../static/images/11.png" alt="" /></div>
                <!-- <div></div> -->
                <div>标题标题标题标</div>
                <div>描述</div>
                <div>+关注</div>
              </div>
              <div>
                <div><img src="../../../static/images/11.png" alt="" /></div>
                <!-- <div></div> -->
                <div>标题标题标题标</div>
                <div>描述</div>
                <div>+关注</div>
              </div>
              <div>
                <div><img src="../../../static/images/11.png" alt="" /></div>
                <!-- <div></div> -->
                <div>标题标题标题标</div>
                <div>描述</div>
                <div>+关注</div>
              </div>
              <div>
                <div><img src="../../../static/images/11.png" alt="" /></div>
                <!-- <div></div> -->
                <div>标题标题标题标</div>
                <div>描述</div>
                <div>+关注</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="XX">内容 3</van-tab>
        <van-tab title="XX">内容 4</van-tab>
        <van-tab title="XX">内容 4</van-tab>
        <van-tab title="XX">内容 4</van-tab>
        <van-tab title="XX">内容 4</van-tab>
        <van-tab title="XX">内容 4</van-tab>
        <van-tab title="XX">内容 4</van-tab>
        <van-tab title="XX">内容 4</van-tab>
      </van-tabs>
    </div>
    <div class="detail">
      <div class="user">
        <div>
          <div><img src="../../../static/images/11.png" alt="" /></div>
          <div class="name">
            <div>标题标题</div>
            <div>详情详情</div>
          </div>
        </div>
        <div class="btn">
          <div>关注</div>
          <div>111人</div>
        </div>
      </div>
      <div class="text">
        是非成败转头空，青山依旧在，惯看风是非成败转头空，青山依旧在，惯看风是非成败转头空，青山依旧在，惯看风是非成败转头空，青山依旧在，惯看风是非成败转头空，青山依旧在，惯看风
      </div>
      <div class="img">
        <img src="../../../static/images/pro1.png" alt="" />
        <img src="../../../static/images/pro1.png" alt="" />
        <img src="../../../static/images/pro1.png" alt="" />
        <img src="../../../static/images/pro1.png" alt="" />
        <img src="../../../static/images/pro1.png" alt="" />
        <img src="../../../static/images/pro1.png" alt="" />
      </div>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
export default {
  components: {
    Tabbar
  },
  data () {
    return {
      active: 1
    }
  }
}
</script>

<style lang="less" scoped>
  .top {
    background: red;
    .inp {
      display: flex;
      padding: 10px;
      align-items: center;
      div:nth-of-type(1) {
        flex: 1;
        input {
          height: 30px;
        }
      }
      div:nth-of-type(2) {
        width: 40px;
        text-align: center;
        font-size: 26px;
        color: #fff;
      }
      .van-search {
        padding: 0;
      }
    }
    /deep/.van-tabs__wrap--scrollable .van-tab {
      background: red;
      color: #fff;
      border: 1px solid red;
      height: 30px;
    }
    /deep/.van-tabs--line .van-tabs__wrap {
      border: 1px solid red !important;
      height: 30px;
    }
    /deep/.van-tab {
      flex-basis: 16.7% !important;
      background: #eee;
      width: 100%;
      line-height: 30px;
    }
    /deep/.van-tabs__content {
      background: #fff;
    }
    /deep/.van-tabs__line {
      background-color: #fff;
    }
    .recommend {
      > .title {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        font-size: 12px;
        color: #999;
      }
      .content {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        > div {
          width: 25%;
          border: 1px solid #ccc;
          margin-right: 6px;
          border-radius: 6px;
          text-align: center;
          padding-bottom: 6px;
          > div:nth-of-type(1) {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 10px auto;
            img {
              width: 100%;
              border-radius: 50%;
            }
          }
          > div:nth-of-type(2) {
            font-size: 10px;
            // color: #ccc;
          }
          > div:nth-of-type(3) {
            font-size: 10px;
            color: #ccc;
          }
          > div:nth-of-type(4) {
            border: 1px solid red;
            width: 60%;
            margin: 0 auto;
            font-size: 10px;
            color: red;
            border-radius: 4px;
          }
        }
        > div:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .detail {
    padding: 20px 10px 10px;
    margin-bottom: 60px;
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div:nth-of-type(1) {
        display: flex;
        align-items: center;
        > div:nth-of-type(1) {
          margin-right: 10px;
        }
        .name {
          > div:nth-of-type(2) {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .btn {
        width: 80px;
        text-align: center;
        > div:nth-of-type(1) {
          width: 50px;
          margin: 0 auto;
          background: red;
          color: #fff;
          padding: 2px 0;
          border-radius: 4px;
        }
      }
    }
    .text {
      overflow: hidden;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .img{
      display: flex;
      flex-wrap: wrap;
      img{
        width: 111px;
        height: 111px;
        margin:10px 10px 0 0;
      }
      img:nth-of-type(3n){
        margin-right: 0;
      }
    }
  }
</style>
