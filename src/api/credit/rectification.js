import request from '@/utils/request'

// 查询整改记录列表
export function listRectification(query) {
  return request({
    url: '/credit/rectification/list',
    method: 'get',
    params: query
  })
}

// 查询整改记录详细
export function getRectification(rectificationId) {
  return request({
    url: '/credit/rectification/' + rectificationId,
    method: 'get'
  })
}

// 新增整改记录
export function addRectification(data) {
  return request({
    url: '/credit/rectification',
    method: 'post',
    data: data
  })
}

// 修改整改记录
export function updateRectification(data) {
  return request({
    url: '/credit/rectification',
    method: 'put',
    data: data
  })
}

// 删除整改记录
export function delRectification(rectificationId) {
  return request({
    url: '/credit/rectification/' + rectificationId,
    method: 'delete'
  })
}
