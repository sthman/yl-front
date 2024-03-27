import request from '@/utils/request'

// 查询话务工单列表
export function listTelwork(query) {
  return request({
    url: '/tickets/telwork/list',
    method: 'get',
    params: query
  })
}

// 查询话务工单详细
export function getTelwork(telworkId) {
  return request({
    url: '/tickets/telwork/' + telworkId,
    method: 'get'
  })
}

// 新增话务工单
export function addTelwork(data) {
  return request({
    url: '/tickets/telwork',
    method: 'post',
    data: data
  })
}

// 修改话务工单
export function updateTelwork(data) {
  return request({
    url: '/tickets/telwork',
    method: 'put',
    data: data
  })
}

// 删除话务工单
export function delTelwork(telworkId) {
  return request({
    url: '/tickets/telwork/' + telworkId,
    method: 'delete'
  })
}
