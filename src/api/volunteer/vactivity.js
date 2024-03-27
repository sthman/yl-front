import request from '@/utils/request'

// 查询志愿者招募列表
export function listVactivity(query) {
  return request({
    url: '/volunteer/vactivity/list',
    method: 'get',
    params: query
  })
}

// 查询志愿者招募详细
export function getVactivity(vactivityId) {
  return request({
    url: '/volunteer/vactivity/' + vactivityId,
    method: 'get'
  })
}

// 新增志愿者招募
export function addVactivity(data) {
  return request({
    url: '/volunteer/vactivity',
    method: 'post',
    data: data
  })
}

// 修改志愿者招募
export function updateVactivity(data) {
  return request({
    url: '/volunteer/vactivity',
    method: 'put',
    data: data
  })
}

// 删除志愿者招募
export function delVactivity(vactivityId) {
  return request({
    url: '/volunteer/vactivity/' + vactivityId,
    method: 'delete'
  })
}
