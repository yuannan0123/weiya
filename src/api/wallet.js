import request from '@/utils/request'

// 设置钱包密码
export function forgetPassword (data) {
  return request({
    url: '/weiya/Wallet/forgetPassword',
    method: 'post',
    data: { data }
  })
}

// 获取钱包详情
export function getInfo (data) {
  return request({
    url: '/weiya/Wallet/getInfo',
    method: 'get',
    data: { data }
  })
}

// 获取钱包详情列表
export function getWalletDetailst (data) {
  return request({
    url: '/weiya/Wallet/getWalletDetails',
    method: 'get',
    data: { data }
  })
}

// 钱包订单支付
export function orderPayment (data) {
  return request({
    url: '/weiya/Wallet/orderPayment',
    method: 'post',
    data: { data }
  })
}
