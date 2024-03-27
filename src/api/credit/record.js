import request from '@/utils/request'

// 查询机构信用记录列表
export function listRecord(query) {
  return request({
    url: '/credit/record/list',
    method: 'get',
    params: query
  })
}

// 查询机构信用记录详细
export function getRecord(recordId) {
  return request({
    url: '/credit/record/' + recordId,
    method: 'get'
  })
}

// 新增机构信用记录
export function addRecord(data) {
  return request({
    url: '/credit/record',
    method: 'post',
    data: data
  })
}

// 修改机构信用记录
export function updateRecord(data) {
  return request({
    url: '/credit/record',
    method: 'put',
    data: data
  })
}

// 删除机构信用记录
export function delRecord(recordId) {
  return request({
    url: '/credit/record/' + recordId,
    method: 'delete'
  })
}
