import request from '@/utils/request'

// 商品列表
export function getListHandle (getlist) {
  console.log(getlist)
  return request({
    url: '/weiya/Goods/getList' + '?' + 'pageSize=' + getlist.pageSize + '&' + 'page=' + getlist.page,
    method: 'get',
    // headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: { getlist }
  })
}
