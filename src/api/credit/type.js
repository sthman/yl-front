import request from '@/utils/request'

// 查询检查记录类型列表
export function listType(query) {
  return request({
    url: '/credit/type/list',
    method: 'get',
    params: query
  })
}

// 查询检查记录类型详细
export function getType(inspectionTypeId) {
  return request({
    url: '/credit/type/' + inspectionTypeId,
    method: 'get'
  })
}

// 新增检查记录类型
export function addType(data) {
  return request({
    url: '/credit/type',
    method: 'post',
    data: data
  })
}

// 修改检查记录类型
export function updateType(data) {
  return request({
    url: '/credit/type',
    method: 'put',
    data: data
  })
}

// 删除检查记录类型
export function delType(inspectionTypeId) {
  return request({
    url: '/credit/type/' + inspectionTypeId,
    method: 'delete'
  })
}
