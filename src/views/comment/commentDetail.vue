<template>
  <div>
    <van-nav-bar
      title="查看评论"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-for="(item, index) in list" :key="index">
      <div class="list">
        <div>{{ item.content ? item.content : "此用户没有填写评价。" }}</div>
        <div class="img" v-if="item.img.length!==0">
          <div class="commentImg" v-for="(v,i) in img" :key="i">
            <!-- <span>aaaa{{img}}</span> -->
            <img :src="'https://api.worldview.com.cn/uploads/'+v " />
          </div>
          <!-- <div class="commentImg">
            <img src="../../../static/images/pro1.png" alt="" />
          </div>
          <div class="commentImg">
            <img src="../../../static/images/pro1.png" alt="" />
          </div>
          <div class="commentImg">
            <img src="../../../static/images/pro1.png" alt="" />
          </div>
          <div class="commentImg">
            <img src="../../../static/images/pro1.png" alt="" />
          </div>
          <div class="commentImg">
            <img src="../../../static/images/pro1.png" alt="" />
          </div> -->
        </div>
        <div class="product">
          <div><img :src="'https://worldview.com.cn/uploads/' + item.thumb_img" alt="" /></div>
          <div>
            <div>{{ item.headline }}</div>
            <div>￥{{ item.bulk_price }}</div>
          </div>
        </div>
        <div class="start">
          <span>产品相符</span>
          <van-rate v-model="item.score" :size="25" color="#eb6202" />
        </div>
        <div class="start">
          <span>服务态度</span>
          <van-rate v-model="item.service_score" :size="25" color="#eb6202" />
        </div>
        <div class="start">
          <span>物流服务</span>
          <van-rate v-model="item.logistics_score" :size="25" color="#eb6202" />
        </div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
import { ordercommentHandle } from '@/api/comment.js'
export default {
  data () {
    return {
      pageSize: 10,
      page: 1,
      value: '5',
      list: '',
      list2: {
        score: '5'
      },
      goods_id: '',
      img: []
    }
  },
  created () {
    this.ordercommentHandle()
  },

  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 获取评论列表
    ordercommentHandle () {
      let id = {
        pageSize: this.pageSize,
        page: this.page,
        order_id: this.$route.params.id
      }
      ordercommentHandle(id).then(res => {
        console.log(res.data.data)
        console.log(res, 'ffffffff')
        this.list = res.data.data
        console.log(this.list.img, '11111111')
        // console.log(res.data.data, '评论')
        // 把goods_id抽出为单独数组
        // let id = res.data.data.map(function (item) {
        //   return item['goods_id']
        // })
        // console.log(id)
        // this.goods_id = id.join()
        // console.log(id.join(), '111111111')
        // console.log(typeof (res.data.data[0].score))
        for (var i = 0; i < res.data.data.length; i++) {
          // 把分数星星的值 字符串转为数值
          res.data.data[i].score = parseInt(res.data.data[i].score)
          res.data.data[i].service_score = parseInt(res.data.data[i].service_score)
          res.data.data[i].logistics_score = parseInt(res.data.data[i].logistics_score)

          console.log(res.data.data[i].img)
          this.img = res.data.data[i].img.split(',')
          console.log(this.img)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .list {
    padding: 20px 14px 10px;
    .img {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      .commentImg {
        width: 82px;
        height: 82px;
        margin-right: 6px;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .commentImg:nth-of-type(4){
        // border: 1px solid red;
        margin-right: 0;
      }
    }

    .product {
      background: #f1f1f1;
      display: flex;
      align-items: center;
      margin: 10px 0;
      > div:nth-of-type(1) {
        width: 100px;
        height: 100px;
        margin-right: 10px;
        border: 1px solid #ccc;
        img {
          width: 100%;

        }
      }
      > div:nth-of-type(2) {
        flex: 1;
        > div:nth-of-type(1) {
          margin-bottom: 10px;
        }
      }
    }
    .start {
      display: flex;
      align-items: center;
      margin-top: 4px;
      span {
        margin-right: 10px;
      }
    }
  }
  .line {
    width: 100%;
    height: 6px;
    background: #eee;
  }
</style>
