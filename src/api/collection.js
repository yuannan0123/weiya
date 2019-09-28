import request from '@/utils/request'

// 商品收藏
export function collectionHandle (data) {
  return request({
    url: '/weiya/Collection/collect',
    method: 'post',
    data
  })
}

// 商品收藏列表
export function getListcollectionHandle (getList) {
  console.log(getList + '1111111111111111111111111111111111')
  return request({
    url: '/weiya/Goods/getList' + '?' + 'pageSize=' + getList.pageSize + '&' + 'page=' + getList.page,
    method: 'get',
    data: { getList }
  })
}

// 删除 或 取消商品收藏
export function delcollectionHandle (data) {
  return request({
    url: '/weiya/Collection/del',
    method: 'post',
    data
  })
}
