import request from '@/utils/request'

// 查询定期服务列表
export function listReservice(query) {
  return request({
    url: '/health/reservice/list',
    method: 'get',
    params: query
  })
}

// 查询定期服务详细
export function getReservice(reserviceId) {
  return request({
    url: '/health/reservice/' + reserviceId,
    method: 'get'
  })
}

// 新增定期服务
export function addReservice(data) {
  return request({
    url: '/health/reservice',
    method: 'post',
    data: data
  })
}

// 修改定期服务
export function updateReservice(data) {
  return request({
    url: '/health/reservice',
    method: 'put',
    data: data
  })
}

// 删除定期服务
export function delReservice(reserviceId) {
  return request({
    url: '/health/reservice/' + reserviceId,
    method: 'delete'
  })
}
