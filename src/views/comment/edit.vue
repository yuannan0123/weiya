<template>
  <div>
    <van-nav-bar
      title="发表评论"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
  <div class="aaa">
    <div v-for="(item, index) in detail.goods_list" :key="index" class="product"  >
      <div  class="score">
        <div><img :src="'https://worldview.com.cn/uploads/' + item.thumb_img" /></div>
        <div>
          <span>描述相符</span>
          <van-rate v-model="data.goods_comment[index].score" :size="25" color="#eb6202" />
        </div>
        <div>{{data.goods_comment[index].score>=4?'非常好':'一般'}}</div>
      </div>
      <div>
      <div class="content">
        <textarea
          placeholder="欢迎评论，说说产品的优点和美中不足的地方吧！"
          maxlength="500"
          @input="descInput"
          v-model="data.goods_comment[index].content"
          @change="text($event)"
        />
      </div>
      <div class="img"  @click='commentImg(data.goods_comment[index].img)'>
        <van-uploader
          :after-read="onRead"
          v-model="data.goods_comment[index].imgList"
          multiple
          :max-count="5"
        >
          <img
            class="head-img"
            src="../../../static/images/addimg.png"
            ref="goodsImg"
          />
        </van-uploader>
      </div>
      <div class="anonymous">
        <van-checkbox v-model="data.goods_comment[index].anonymous">匿名</van-checkbox>
        <div>您的评价对其他小伙伴很重要哦！</div>
      </div>
      <div class="line"></div>
      </div>
    </div>
    <!-- 店铺评价 -->
    <div class="store">
      <div>店铺评价</div>
      <div>
        <span>物流服务</span>
        <van-rate v-model="value1" :size="25" color="#eb6202" />
      </div>
      <div>
        <span>服务态度</span>
        <van-rate v-model="value2" :size="25" color="#eb6202" />
      </div>
    </div>
  </div>
    <div class="btn" @click="commentEditHandle">发布</div>
  </div>
</template>

<script>
import { uploadFileHandle } from '@/api/upload'
import { commentEditHandle } from '@/api/comment'
import { getInfoHandle } from '@/api/order'
export default {
  data () {
    return {
      img: [],
      // value: 5, // 星星
      value1: 5, // 物流服务
      value2: 5, // 服务态度
      data: {
        order_id: '',
        service_score: '',
        logistics_score: '',
        goods_comment: [ ]
      },
      desc: '',
      txtVal: '', // 文本域的长度
      file: '',
      fileList: [
        // { url: 'https://worldview.com.cn/uploads/static/images/addimg.png' },
        // // Uploader 根据文件后缀来判断是否为图片文件
        // // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: 'https://cloud-image', isImage: true }
      ],
      checked: true, // 匿名
      // radio: '1', // 单选框
      detail: '', // 商品详情
      id: '',
      // img: [],// 添加的图片
      itemImg: []

    }
  },
  created () {
    this.getInfoHandle()
  },
  methods: {

    onClickLeft () {
      this.$router.go(-1)
    },
    // 文本域
    descInput () {
      // console.log(this.desc.length)
      // this.txtVal = this.desc.length
    },
    // 获取文本域输入的内容
    text (e) {
      console.log(e.target.value, '2222222')
    },
    commentImg (itemImg) {
      this.itemImg = itemImg
    },
    // // 选择图片后执行
    onRead (file) {
      // console.log(file.content)
      // // 将原图片显示为选择的图片
      this.$refs.goodsImg.src = file.content
      // console.log(file.content)
      let a = {
        fileBase64: [file.content]
      }
      uploadFileHandle(a).then(res => {
        console.log(res)
        console.log(res.data.data[0])
        this.itemImg.push(res.data.data[0])
        // data.goods_comment[index].img
        console.log(this.itemImg, 'aaaaaaaaaa')
      })
    },
    // 获取订单详情
    getInfoHandle () {
      var id = {
        id: this.$route.params.id
      }
      getInfoHandle(id.id).then(res => {
        console.log(res.data.data.id)
        this.id = res.data.data.id
        this.detail = res.data.data
        console.log(res)
        this.data.goods_comment = []
        for (let i = 0; i < this.detail.goods_list.length; i++) {
          let newdata = {
            img: [],
            order_id: this.id,
            goods_id: this.detail.goods_list[i].goods_id,
            content: '',
            score: 5,
            anonymous: true
          }
          console.log(this.data.goods_comment, '2222222222222')
          this.data.goods_comment.push(newdata)
        }
        console.log(this.data.goods_comment, '总公共有几条')
      })
    },
    // 发布评论
    commentEditHandle () {
      this.data.goods_comment.filter(v => {
        delete v.imgList
      })
      console.log(this.data.goods_comment)
      this.data.order_id = this.id // 订单ID
      this.data.logistics_score = this.value1 // 物流评分
      this.data.service_score = this.value2 // 服务评分
      console.log(this.detail.goods_list)
      // 把匿名的 false 与 true 转为  0 和 1
      for (let i = 0; i < this.data.goods_comment.length; i++) {
        if (this.data.goods_comment[i].anonymous === true) {
          this.data.goods_comment[i].anonymous = 1
        } else {
          this.data.goods_comment[i].anonymous = 0
        }
      }

      let data = this.data
      console.log(data, '22')
      commentEditHandle(data).then(res => {
        console.log(res.data.code)
        if (res.data.code == 1) {
          let id = this.id
          this.$router.push({
            path: `/Success/${id}`
          })
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.aaa{
  margin-bottom: 100px;
  height: 100%;
}
  .score {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #eee;
    > div:nth-of-type(1) {
      width: 40px;
      height: 40px;
      border: 1px solid #ccc;
      img {
        width: 100%;
      }
    }
    > div:nth-of-type(2) {
      flex: 1;
      margin-left: 10px;
      display: flex;
      align-items: center;
      span {
        margin-right: 10px;
      }
      > div {
        > div {
          margin-left: 5px;
        }
      }
    }
  }
  .content {
    margin: 10px;
    textarea {
      height: 100px;
      border: none;
      padding: 0px;
    }
  }
  .img {
    margin: 10px;
    // width: 70px;
    /deep/.van-uploader__input-wrapper {
      width: 78px;
      height: 78px;
      border: 1px dashed #ccc;
      img {
        width: 100%;
      }
    }
    /deep/.van-uploader__preview {
      width: 78px;
      height: 78px;
      img {
        width: 78px;
        height: 78px;
      }
    }
  }
  .anonymous {
    border-top: 1px solid #eee;
    margin: 0 10px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div:last-child {
      color: #999;
    }
   /deep/.van-checkbox__icon--checked .van-icon{
       background-color: #eb6202;
      border-color: #eb6202;
    }
  }
  .line {
    width: 100%;
    height: 6px;
    background: #eee;
  }
  .store {
    padding: 10px;
    > div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span {
        margin-right: 10px;
      }
    }
  }
  .btn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #00a0e8;
    text-align: center;
    color: #fff;
    position: fixed;
    bottom: 0;
  }
</style>
