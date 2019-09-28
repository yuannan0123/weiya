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
    this.getInfoaddressHandle()
  },
  methods: {
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
        console.log(res.data.data.province)
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
        province: content.city,
        area: content.county,
        detail_address: content.addressDetail,
        is_default: content.isDefault
      }
      editaddressHandle(data).then(res => {
        console.log(res)
        this.$toast('添加成功')
        this.$router.push({
          name: 'Address'
        })
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
