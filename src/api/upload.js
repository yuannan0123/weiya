import request from '@/utils/request'

// 上传图片
export function uploadFileHandle (data) {
  return request({
    url: '/ucenter/Upload/uploadFile',
    method: 'post',
    data: { data }
  })
}
