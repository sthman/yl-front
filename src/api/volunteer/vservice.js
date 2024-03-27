import request from '@/utils/request'

// 查询积分服务列表
export function listVservice(query) {
  return request({
    url: '/volunteer/vservice/list',
    method: 'get',
    params: query
  })
}

// 查询积分服务详细
export function getVservice(vServiceId) {
  return request({
    url: '/volunteer/vservice/' + vServiceId,
    method: 'get'
  })
}

// 新增积分服务
export function addVservice(data) {
  return request({
    url: '/volunteer/vservice',
    method: 'post',
    data: data
  })
}

// 修改积分服务
export function updateVservice(data) {
  return request({
    url: '/volunteer/vservice',
    method: 'put',
    data: data
  })
}

// 删除积分服务
export function delVservice(vServiceId) {
  return request({
    url: '/volunteer/vservice/' + vServiceId,
    method: 'delete'
  })
}
