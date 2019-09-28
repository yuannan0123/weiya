<template>
  <div>
    <van-nav-bar
      title="编辑收货地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-edit
      :area-list="areaList"
      :address-info="initAddress"
      :columns-num="3"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { editaddressHandle, deladdressHandle, getInfoaddressHandle } from '@/api/address'
import areaList from '../../../static/js/area.js'
export default {
  data () {
    return {
      areaList,
      searchResult: [],
      initAddress: {}
    }
  },
  created () {
    console.log(this.$route.params)
    this.getInfoaddressHandle()
  },
  methods: {
    // 把编码转成文字
    getCityFunc (content, key, jsonData) {
      for (var item in jsonData) {
        if (item == content) {
          key = jsonData[item]
        }
      }
      console.log(key)
      return key
    },
    // 把文字转成编码
    getCodeFunc (content, key, jsonData) {
      for (var item in jsonData) {
        if (jsonData[item] == content) {
          key = parseInt(item)
        }
      }
      console.log(key)
      return key
    },
    // 获取收货地址
    getInfoaddressHandle () {
      let id = this.$route.params.id
      console.log(id, '编辑id')
      getInfoaddressHandle(id).then(res => {
        console.log(res.data.data)
        this.initAddress = res.data.data
        console.log(this.initAddress, '编辑数据a')
        // this.initAddress.county = res.data.data.area// 区县
        // this.initAddress.city = res.data.data.city// 城市
        this.initAddress.name = res.data.data.consignee // 收货人
        this.initAddress.addressDetail = res.data.data.detail_address // 详细地址
        this.initAddress.id = res.data.data.id//
        this.initAddress.isDefault = res.data.data.is_default //
        this.initAddress.tel = res.data.data.mobile // 收货人电话
        this.initAddress.areaCode = res.data.data.province
        this.initAddress.province = this.getCityFunc(res.data.data.province, this.province, this.areaList.province_list)
        this.initAddress.city = this.getCityFunc(res.data.data.city, this.city, this.areaList.city_list)
        this.initAddress.county = this.getCityFunc(res.data.data.area, this.area, this.areaList.county_list)
        this.initAddress.area = this.getCityFunc(res.data.data.area, this.area, this.areaList.county_list)
        // console.log(res.data.data.province)
      })
    },
    // 返回上一个页面
    onClickLeft () {
      this.$router.push({
        name: 'Address'
      })
    },
    // 保存地址
    onSave (content) {
      let data = {
        consignee: content.name,
        mobile: content.tel,
        province: content.province,
        city: content.city,
        area: content.county,
        detail_address: content.addressDetail,
        is_default: content.isDefault,
        id: content.id
      }
      editaddressHandle(data).then(res => {
        console.log(res)
        // this.initAddress = res.data.data
        // console.log(this.initAddress)
        console.log(res.data.data)
        console.log(res.data.data.province + '省' + this.initAddress.city + this.initAddress.county)
        this.initAddress.province = this.getCodeFunc(res.data.data.province, this.province, this.areaList.province_list)
        this.initAddress.city = this.getCodeFunc(res.data.data.city, this.city, this.areaList.city_list)
        this.initAddress.county = this.getCodeFunc(res.data.data.area, this.area, this.areaList.area_list)
        this.$toast('添加成功')
        // this.$router.push({
        //   name: 'Address'
        // })
      })
    },
    // 删除地址
    onDelete () {
      console.log('delete')
      var id = {
        id: this.$route.params.id
      }
      console.log(id, '当前id')
      deladdressHandle(id).then(res => {
        console.log(res + 'del')
        this.$router.push({
          name: 'Address'
        })
      })
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style>
</style>
