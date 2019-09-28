<template>
  <div>
    <van-nav-bar
      title="提交订单"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-if="list.length == 0" class="addaddress">
      <div type="primary" @click="showPopup">
        <div class="add"><van-icon name="plus" /></div>
        <div>添加收货地址</div>
        <!-- 没有地址列表 弹出新增地址 -->
        <!-- <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
          <van-nav-bar
            title="新增收货地址"
            left-text="关闭"
            left-arrow
            @click-left="onClick"
          />
          <van-address-edit
            :area-list="areaList"
            :columns-num="3"
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
          />
        </van-popup> -->
        <!-- 没有地址列表 弹出新增地址 -->
      </div>
      <div><van-icon name="arrow" /></div>
    </div>
    <div v-else class="default">
      <div v-for="(item, index) in defaultAddress" :key="index">
        <div>
          <span>{{ item.name }}</span
          ><span>{{ item.tel }}</span>
        </div>
        <div>{{ item.address }}</div>
      </div>
      <div @click="showPopup">选择地址 ></div>
    </div>
    <!-- 地址弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
      <van-nav-bar
        title="收货地址"
        left-text=""
        left-arrow
        @click-left="back"
      />
      <!-- 地址列表 -->
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>

    <!-- 地址弹出层 -->
    <div class="product_list">
      <div class="list" v-for="(item, index) in goods_list" :key="index">
        <div>
          <img
            :src="'https://worldview.com.cn/uploads/' + item.thumb_img"
            alt=""
          />
        </div>
        <div class="product">
          <div>{{ item.name }}</div>
          <div>{{ item.specification }}</div>
          <div class="price">
            <div>￥{{ item.price }}</div>
            <div>X{{ item.num }}</div>
          </div>
        </div>
      </div>
    </div>
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { getInfoHandle, confirmHandle } from '@/api/order'
import { addressHandle, editaddressHandle, deladdressHandle, getInfoaddressHandle } from '@/api/address'
import areaList from '../../../static/js/area.js'
import { filter } from 'minimatch'

export default {
  data () {
    return {
      areaList,
      chosenAddressId: '',
      list: [{}],
      show: false, // 添加地址弹出层
      totalPrice: 0, // 合计价格
      goods_list: '', // 商品列表
      defaultAddress: [], // 默认地址
      firstAddress: [], // 第一个地址
      order_id: ''
    }
  },
  created () {
    this.getInfoHandle()
    this.addressHandle()
  },
  // computed: {
  //   totalPrice: {
  //     get: function () {
  //       return this.list.reduce((total, item) => total + (this.checkedGoods.indexOf(item) !== -1 ? item.bulk_price * 100 * item.num : 0)
  //         , 0)
  //     }

  //   }
  // },
  methods: {
    getCityFunc (content, key, jsonData) {
      for (var item in jsonData) {
        if (item == content) {
          key = jsonData[item]
        }
      }
      // console.log(key)
      return key
    },
    // 添加地址弹出层
    showPopup () {
      this.show = true
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    // 新增地址里面关闭弹窗
    // onClick () {
    //   this.show = false
    //   console.log(0)
    // },
    // 隐藏弹出层
    back () {
      this.show = false
      // console.log(11)
    },
    // 获取收货地址
    addressHandle () {
      let _this = this
      addressHandle().then(res => {
        let { data } = { ...res.data }
        console.log(data)
        // for (var index in data) {
        //   // console.log(index)
        //   console.log(data[index].province)
        //   // this.getCityFunc(data[index].province, this.province, this.areaList.province_list)
        // }
        var newArr = data.map(function (v, i) {
          // console.log(v.province + '编码')
          // console.log(v)
          return {
            id: v.id, // 每条地址的唯一标识
            name: v.consignee, // 收货人姓名
            tel: v.mobile, // 收货人姓名
            address: _this.getCityFunc(v.province, _this.province, _this.areaList.province_list) + _this.getCityFunc(v.city, _this.city, _this.areaList.city_list) + _this.getCityFunc(v.area, _this.area, _this.areaList.county_list) + v.detail_address, // 收货地址
            area: v.area, // 城市
            city: v.city,
            county: v.province,
            isDefault: v.is_default// 是否默认收货状态
          }
        })
        this.list = newArr
        console.log(this.list, 'sss')
        // 过滤有默认状态为 1 的数组
        console.log(this.list.filter(item => item.isDefault == 1))
        this.defaultAddress = this.list.filter(item => item.isDefault == 1)
        // 地址列表第一个数组
        console.log(this.list)
        this.firstAddress = this.list.slice(1)
        console.log(this.firstAddress, '默认第一个')
        console.log(this.list.slice(1), '2222222222222')
        // 如果没有默认的地址  就把第一个地址赋值给默认地址
        if (this.defaultAddress == '') {
          this.defaultAddress = this.firstAddress
        }
      })
    },
    // 编辑地址
    onEdit () {
      // console.log('编辑地址')
    },
    // 没有地址列表的时候  新增地址
    addAddress () {
      console.log(0)
    },
    // 选择地址
    onSelect (item) {
      console.log([item])
      this.defaultAddress = [item]
      this.show = false
    },
    // 显示弹窗
    popup () {
      this.show = true
    },
    // 确定订单
    onSubmit () {
      console.log(this.$route.params.id)
      let orderParams = {
        order_id: this.order_id,
        consignee: this.defaultAddress[0].name,
        mobile: this.defaultAddress[0].tel,
        province: this.defaultAddress[0].county,
        city: this.defaultAddress[0].city,
        area: this.defaultAddress[0].area,
        detail_address: this.defaultAddress[0].address

      }
      confirmHandle(orderParams).then(res => {
        console.log(res)
        console.log(this.defaultAddress)
        let id = this.$route.params.id
        this.$router.push({
          path: `/OrderDetail/${id}`
        })
      })
    },
    // 获取订单详情
    getInfoHandle () {
      var id = {
        id: this.$route.params.id
      }
      // console.log(id.id)
      getInfoHandle(id.id).then(res => {
        console.log(res, '订单详情')
        console.log(res.data.data.goods_list)
        console.log(res.data.data.id)
        this.order_id = res.data.data.id
        this.goods_list = res.data.data.goods_list
        console.log(this.goods_list, 'sssssssssss')
        // 合计总价
        this.totalPrice = this.goods_list.reduce((total, item) => total + item.price * item.num * 100, 0)
        // console.log(typeof (parseInt(this.goods_list[0].price)))

        console.log(res.data.data.goods_list)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .default {
    display: flex;
    justify-content: space-between;
    padding: 10px 16px;
    border-bottom: 1px solid #ccc;
    align-items: center;
  }
  .addaddress {
    border-top: 3px solid #efefef;
    border-bottom: 3px solid #efefef;
    height: 40px;
    padding: 0 10px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    > div:nth-of-type(1) {
      display: flex;
    }
    .add {
      width: 16px;
      height: 16px;
      line-height: 16px;
      background: red;
      text-align: center;
      color: #fff;
      margin-right: 4px;
    }
  }
  .product_list {
    margin-bottom: 100px;
  }
  .list {
    display: flex;
    padding: 14px;
    border-bottom: 1px solid #ddd;
    > div:nth-of-type(1) {
      width: 100px;
      img {
        width: 100%;
      }
    }
    > div:nth-of-type(2) {
      flex: 1;
    }
    .product {
      margin-left: 8px;
      .price {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
        > div:nth-of-type(1) {
          color: red;
        }
      }
      > div:nth-of-type(2) {
        color: #999;
        margin: 2px 0;
      }
    }
  }
  .van-submit-bar {
    border-top: 1px solid #ccc;
  }
</style>
