import request from '@/utils/request'

// 查询设施使用记录列表
export function listRecord(query) {
  return request({
    url: '/storehouse/record/list',
    method: 'get',
    params: query
  })
}

// 查询设施使用记录详细
export function getRecord(recordId) {
  return request({
    url: '/storehouse/record/' + recordId,
    method: 'get'
  })
}

// 新增设施使用记录
export function addRecord(data) {
  return request({
    url: '/storehouse/record',
    method: 'post',
    data: data
  })
}

// 修改设施使用记录
export function updateRecord(data) {
  return request({
    url: '/storehouse/record',
    method: 'put',
    data: data
  })
}

// 删除设施使用记录
export function delRecord(recordId) {
  return request({
    url: '/storehouse/record/' + recordId,
    method: 'delete'
  })
}
