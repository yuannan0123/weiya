<template>
  <div class="body">
    <div class="top_img">
      <img src="../../../static/images/store-banner.jpg" />
    </div>
    <div class="icon">
      <div>
        <div></div>
        <span>客户</span>
      </div>
      <div>
        <div></div>
        <span>订单</span>
      </div>
      <div>
        <div></div>
        <span>收银</span>
      </div>
      <div>
        <div></div>
        <span>库房</span>
      </div>
      <div>
        <div></div>
        <span>店务</span>
      </div>
      <div>
        <div></div>
        <span>新零售</span>
      </div>
      <div>
        <div></div>
        <span>创客管理</span>
      </div>
      <div>
        <div></div>
        <span>经营报表</span>
      </div>
      <div>
        <div></div>
        <span>店长专区</span>
      </div>
      <div>
        <div></div>
        <span>入驻部署</span>
      </div>
    </div>
    <div class="message">
      <van-tabs v-model="active">
        <van-tab title="消息">
          <div class="xiaoxi">
            <div class="top">
              <div class="img">
                <div><img src="../../../static/images/11.png" alt="" /></div>
                智慧门店客服团队
                <div></div>
              </div>
              <div>2019-03-20 10:30</div>
            </div>
            <div class="bottom">
              消息消息消息消息消息,消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消消,息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消,息消息消息消息消息消息消息消息消息消息消息消息消息消息
            </div>
          </div>
          <div class="xiaoxi">
            <div class="top">
              <div class="img">
                <div><img src="../../../static/images/11.png" alt="" /></div>
                智慧门店客服团队
                <div></div>
              </div>
              <div>2019-03-20 10:30</div>
            </div>
            <div class="bottom">
              消息消息消息消息消息,消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消消,息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消,息消息消息消息消息消息消息消息消息消息消息消息消息消息
            </div>
          </div>
          <div class="xiaoxi">
            <div class="top">
              <div class="img">
                <div><img src="../../../static/images/11.png" alt="" /></div>
                智慧门店客服团队
                <div></div>
              </div>
              <div>2019-03-20 10:30</div>
            </div>
            <div class="bottom">
              消息消息消息消息消息,消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消消,息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消,息消息消息消息消息消息消息消息消息消息消息消息消息消息
            </div>
          </div>
        </van-tab>
        <van-tab title="服务预约">服务预约</van-tab>
        <van-tab title="服务接单">
          服务接单
        </van-tab>
        <van-tab title="新建客户">新建客户</van-tab>
        <van-tab title="开卡充值">开卡充值</van-tab>
        <van-tab title="客户开单">客户开单</van-tab>
      </van-tabs>
    </div>
    <Tabbar  />
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
      active: 0
    }
  },
  methods: {


  }
}
</script>

<style lang="less" scoped>
  .body {
    background: #f1f1f1;
    // position: absolute;
  }
  .top_img img {
    width: 100%;
  }
  .icon {
    background: #fff;
    margin: 0 8px;
    border-radius: 10px;
    position: absolute;
    top: 150px;
    padding: 10px 4px;
    display: flex;
    flex-wrap: wrap;
    & > div {
      width: 70px;
      height: 80px;
      text-align: center;
      & > div {
        width: 50px;
        height: 50px;
        margin: 0 auto;
        background-image: url("../../../static/images/store-icon.png");
        background-size: 260px;
        border-radius: 50%;
        margin-bottom: 4px;
      }
      & > span {
        font-size: 12px;
        color: #666;
      }
    }
    & > div:nth-of-type(2) {
      > div:nth-of-type(1) {
        background-position: -52px -2px;
      }
    }
    & > div:nth-of-type(3) {
      > div:nth-of-type(1) {
        background-position: -104px -3px;
      }
    }
    & > div:nth-of-type(4) {
      > div:nth-of-type(1) {
        background-position: -156px -3px;
      }
    }
    & > div:nth-of-type(5) {
      > div:nth-of-type(1) {
        background-position: -208px -3px;
      }
    }
    & > div:nth-of-type(6) {
      > div:nth-of-type(1) {
        background-position: 0px -59px;
      }
    }
    & > div:nth-of-type(7) {
      > div:nth-of-type(1) {
        background-position: -54px -56px;
      }
    }
    & > div:nth-of-type(8) {
      > div:nth-of-type(1) {
        background-position: -104px -56px;
      }
    }
    & > div:nth-of-type(9) {
      > div:nth-of-type(1) {
        background-position: -156px -56px;
      }
    }
    & > div:nth-of-type(10) {
      > div:nth-of-type(1) {
        background-position: -208px -56px;
      }
    }
  }
  .message {
    margin-top: 130px;
    background: #f1f1f1;
    /deep/.van-tab {
      background: #f1f1f1;
      flex-basis: 16.7% !important;
      font-size: 12px;
    }
    .xiaoxi {
      background: #fff;
      margin: 8px 10px 0;
      border-radius: 8px;
      padding: 10px;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .img {
          display: flex;
          align-items: center;
          > div:nth-of-type(1) {
            margin-right: 8px;
          }
        }
      }
      .bottom {
        overflow: hidden;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
    .xiaoxi:last-child {
      margin-bottom: 80px;
    }
  }
  .van-tabs--line {
    padding-bottom: 10px;
  }
</style>
