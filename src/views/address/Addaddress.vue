<template>
  <div>
    <van-nav-bar
      title="新增收货地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
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
  </div>
</template>

<script>
import { editaddressHandle, deladdressHandle, getInfoaddressHandle } from '@/api/address'
import areaList from '../../../static/js/area.js'
export default {
  data () {
    return {
      areaList,
      searchResult: []
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
      })
    },
    // 返回上一个页面
    onClickLeft () {
      this.$router.push({
        name: 'Address'
      })
    },
    getCodeFunc (content, key, jsonData) {
      for (var item in jsonData) {
        if (jsonData[item] == content) {
          key = parseInt(item)
        }
      }
      console.log(key)
      return key
    },
    // 保存地址
    onSave (content) {
      let data = {
        consignee: content.name,
        mobile: content.tel,
        // province: content.city,
        // area: content.county,
        detail_address: content.addressDetail,
        is_default: content.isDefault,
        province: this.getCodeFunc(content.province, this.province, this.areaList.province_list),
        city: this.getCodeFunc(content.city, this.city, this.areaList.city_list),
        area: this.getCodeFunc(content.county, this.county, this.areaList.county_list)
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
      deladdressHandle().then(res => {
        console.log(res)
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
