import request from '@/utils/request'

// 查询执行工单列表
export function listWorder(query) {
  return request({
    url: '/tickets/worder/list',
    method: 'get',
    params: query
  })
}

// 查询执行工单详细
export function getWorder(workOrderId) {
  return request({
    url: '/tickets/worder/' + workOrderId,
    method: 'get'
  })
}

// 新增执行工单
export function addWorder(data) {
  return request({
    url: '/tickets/worder',
    method: 'post',
    data: data
  })
}

// 修改执行工单
export function updateWorder(data) {
  return request({
    url: '/tickets/worder',
    method: 'put',
    data: data
  })
}

// 删除执行工单
export function delWorder(workOrderId) {
  return request({
    url: '/tickets/worder/' + workOrderId,
    method: 'delete'
  })
}
