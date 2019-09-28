import request from '@/utils/request'

// 加入购物车
export function addCartHandle (data) {
  return request({
    url: '/weiya/Cart/add',
    method: 'post',
    data: { data }
  })
}

// 购物车商品列表
export function getcarListHandle (getList) {
  console.log(getList)
  return request({
    url: '/weiya/Cart/getlist' + '?' + 'pageSize=' + getList.pageSize + '&' + 'page=' + getList.page,
    method: 'get',
    data: { getList }
  })
}

// 删除购物车 可批量删除
export function delCartHandle (data) {
  return request({
    url: '/weiya/Cart/del',
    method: 'post',
    data: { data }
  })
}
