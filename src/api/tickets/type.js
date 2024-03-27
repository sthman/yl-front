import request from '@/utils/request'

// 查询工单类型列表
export function listType(query) {
  return request({
    url: '/tickets/type/list',
    method: 'get',
    params: query
  })
}

// 查询工单类型详细
export function getType(orderTypeId) {
  return request({
    url: '/tickets/type/' + orderTypeId,
    method: 'get'
  })
}

// 新增工单类型
export function addType(data) {
  return request({
    url: '/tickets/type',
    method: 'post',
    data: data
  })
}

// 修改工单类型
export function updateType(data) {
  return request({
    url: '/tickets/type',
    method: 'put',
    data: data
  })
}

// 删除工单类型
export function delType(orderTypeId) {
  return request({
    url: '/tickets/type/' + orderTypeId,
    method: 'delete'
  })
}
