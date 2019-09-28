import request from '@/utils/request'

// 收货地址
export function addressHandle () {
  return request({
    url: '/ucenter/Address/getList',
    method: 'get',
    // headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: { }
  })
}

// 地址 增加 修改
export function editaddressHandle (data) {
  return request({
    url: '/ucenter/Address/edit',
    method: 'post',
    data: { data }
  })
}

// 地址删除
export function deladdressHandle (data) {
  return request({
    url: '/ucenter/Address/del',
    method: 'post',
    data: { data }
  })
}

// 获取单个地址详细信息
export function getInfoaddressHandle (id) {
  console.log(id, '接口')
  return request({
    url: `/ucenter/Address/getInfo?id=${id}`,
    method: 'get',
    data: id
  })
}
