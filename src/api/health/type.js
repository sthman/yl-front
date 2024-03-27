import request from '@/utils/request'

// 查询服务类型列表
export function listType(query) {
  return request({
    url: '/health/type/list',
    method: 'get',
    params: query
  })
}

// 查询服务类型详细
export function getType(reserviceTypeId) {
  return request({
    url: '/health/type/' + reserviceTypeId,
    method: 'get'
  })
}

// 新增服务类型
export function addType(data) {
  return request({
    url: '/health/type',
    method: 'post',
    data: data
  })
}

// 修改服务类型
export function updateType(data) {
  return request({
    url: '/health/type',
    method: 'put',
    data: data
  })
}

// 删除服务类型
export function delType(reserviceTypeId) {
  return request({
    url: '/health/type/' + reserviceTypeId,
    method: 'delete'
  })
}
