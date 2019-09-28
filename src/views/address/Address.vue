<template>
  <div>
    <van-nav-bar
      title="收货地址"
      left-text=""
      right-text="新增"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 列表 -->
    <van-address-list v-model="chosenAddressId" :list="list" @edit="onEdit" />
  </div>
</template>

<script>
import { addressHandle } from '@/api/address'
import areaList from '../../../static/js/area.js'
export default {
  data () {
    return {
      areaList,
      chosenAddressId: '',
      list: [{}]
    }
  },
  created () {
    this.addressHandle()
  },
  methods: {
    getCityFunc (content, key, jsonData) {
      for (var item in jsonData) {
        if (item == content) {
          key = jsonData[item]
        }
      }
      console.log(key)
      return key
    },
    onAdd () {
      this.$toast('新增地址')
    },
    onEdit (item, index) {
      console.log(item)
      let id = parseInt(item.id)
      this.$router.push({
        path: `/editaddress/${id}`
      })
      console.log('what')
      console.log(id, 'id')
    },
    // 获取收货地址
    addressHandle () {
      let _this = this
      addressHandle().then(res => {
        let { data } = { ...res.data }
        // console.log(data)
        // for (var index in data) {
        //   // console.log(index)
        //   console.log(data[index].province)
        //   // this.getCityFunc(data[index].province, this.province, this.areaList.province_list)
        // }
        var newArr = data.map(function (v, i) {
          console.log(v.province + '编码')
          console.log(v)
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
      })
    },
    // 导航栏
    onClickLeft () {
      console.log('返回')
      this.$router.push({
        name: 'User'
      })
    },
    onClickRight () {
      console.log('新增地址')
      this.$router.push({
        name: 'Addaddress'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .van-button--large {
    display: none;
  }
  .van-address-list {
    padding-bottom: 0px;
  }
</style>
