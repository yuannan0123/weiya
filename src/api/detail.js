import request from '@/utils/request'

// 商品列表
// export function getInfoHandle (data) {
//   console.log(1)
//   return request({
//     // url: '/weiya/Goods/getList' + '?' + 'pageSize=' + getlist.pageSize + '&' + 'page=' + getlist.page,
//     url: '/weiya/Goods/getInfo',
//     method: 'GET',
//     // headers: { 'Content-Type': 'application/json;charset=utf8' },
//     data: data
//   })
// }

export function getInfoHandle (data) {
  return request({
    url: `/weiya/Goods/getInfo?pageIndex=${data.pageSize}&pageSize=${data.page}&id=${data.id}`,
    method: 'GET',
    data
  })
}
