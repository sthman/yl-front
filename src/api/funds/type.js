import request from '@/utils/request'

// 查询补贴类型列表
export function listType(query) {
  return request({
    url: '/funds/type/list',
    method: 'get',
    params: query
  })
}

// 查询补贴类型详细
export function getType(subsidyTypeId) {
  return request({
    url: '/funds/type/' + subsidyTypeId,
    method: 'get'
  })
}

// 新增补贴类型
export function addType(data) {
  return request({
    url: '/funds/type',
    method: 'post',
    data: data
  })
}

// 修改补贴类型
export function updateType(data) {
  return request({
    url: '/funds/type',
    method: 'put',
    data: data
  })
}

// 删除补贴类型
export function delType(subsidyTypeId) {
  return request({
    url: '/funds/type/' + subsidyTypeId,
    method: 'delete'
  })
}
