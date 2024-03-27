import request from '@/utils/request'

// 查询健康信息列表
export function listInformation(query) {
  return request({
    url: '/health/information/list',
    method: 'get',
    params: query
  })
}

// 查询健康信息详细
export function getInformation(healthInformationId) {
  return request({
    url: '/health/information/' + healthInformationId,
    method: 'get'
  })
}

// 新增健康信息
export function addInformation(data) {
  return request({
    url: '/health/information',
    method: 'post',
    data: data
  })
}

// 修改健康信息
export function updateInformation(data) {
  return request({
    url: '/health/information',
    method: 'put',
    data: data
  })
}

// 删除健康信息
export function delInformation(healthInformationId) {
  return request({
    url: '/health/information/' + healthInformationId,
    method: 'delete'
  })
}
