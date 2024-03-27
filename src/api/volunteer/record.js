import request from '@/utils/request'

// 查询积分使用记录列表
export function listRecord(query) {
  return request({
    url: '/volunteer/record/list',
    method: 'get',
    params: query
  })
}

// 查询积分使用记录详细
export function getRecord(recordId) {
  return request({
    url: '/volunteer/record/' + recordId,
    method: 'get'
  })
}

// 新增积分使用记录
export function addRecord(data) {
  return request({
    url: '/volunteer/record',
    method: 'post',
    data: data
  })
}

// 修改积分使用记录
export function updateRecord(data) {
  return request({
    url: '/volunteer/record',
    method: 'put',
    data: data
  })
}

// 删除积分使用记录
export function delRecord(recordId) {
  return request({
    url: '/volunteer/record/' + recordId,
    method: 'delete'
  })
}
