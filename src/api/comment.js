import request from '@/utils/request'

// 评论 商品
export function commentEditHandle (data) {
  return request({
    url: '/weiya/Comment/edit',
    method: 'post',
    data: { data }
  })
}

// 查询 商品相关的评论
export function CommentListHandle (data) {
  return request({
    // url: `/weiya/Comment/getGoodsCommentList?pageIndex=${data.pageSize}&pageSize=${data.page}&goods_id=${data.goods_id}`,
    url: '/weiya/Comment/getGoodsCommentList' + '?' + 'pageSize=' + data.pageSize + '&' + 'page=' + data.page + '&' + 'goods_id=' + data.goods_id,
    method: 'get',
    data: { data }
  })
}

// 查看订单的评论
export function ordercommentHandle (data) {
  return request({
    url: `/weiya/Comment/getOrderCommentInfo?pageIndex=${data.pageSize}&pageSize=${data.page}&order_id=${data.order_id}`,
    method: 'get',
    data: { data }
  })
}
