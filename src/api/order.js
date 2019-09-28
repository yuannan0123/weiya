import request from '@/utils/request'

// 生成预订单
export function generateHandle (data) {
  return request({
    url: '/weiya/Order/generate',
    method: 'post',
    data: { data }
  })
}

// 获取订单详情
export function getInfoHandle (id) {
  console.log(id + '订单ID')
  return request({
    url: `/weiya/Order/getInfo?order_sn=${id}`,
    method: 'get',
    data: id
  })
}

// 确定订单
export function confirmHandle (data) {
  return request({
    url: '/weiya/Order/confirm',
    method: 'post',
    data: { data }
  })
}

// 订单列表
export function getListHandle (data) {
  return request({
    // url: `/weiya/Order/getList`,
    url: '/weiya/Order/getList' + '?' + 'pageSize=' + data.pageSize + '&' + 'page=' + data.page + '&' + 'order_status=' + data.order_status,
    method: 'get',
    data: { data }
  })
}

// 支付
export function paymentHandle (data) {
  return request({
    url: '/weiya/Order/topay',
    method: 'post',
    data: { data }
  })
}
