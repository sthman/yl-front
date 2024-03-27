import request from '@/utils/request'

// 查询检查记录列表
export function listInspection(query) {
  return request({
    url: '/credit/inspection/list',
    method: 'get',
    params: query
  })
}

// 查询检查记录详细
export function getInspection(inspectionId) {
  return request({
    url: '/credit/inspection/' + inspectionId,
    method: 'get'
  })
}

// 新增检查记录
export function addInspection(data) {
  return request({
    url: '/credit/inspection',
    method: 'post',
    data: data
  })
}

// 修改检查记录
export function updateInspection(data) {
  return request({
    url: '/credit/inspection',
    method: 'put',
    data: data
  })
}

// 删除检查记录
export function delInspection(inspectionId) {
  return request({
    url: '/credit/inspection/' + inspectionId,
    method: 'delete'
  })
}
