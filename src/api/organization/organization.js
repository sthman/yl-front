import request from '@/utils/request'

// 查询机构信息列表
export function listOrganization(query) {
  return request({
    url: '/organization/organization/list',
    method: 'get',
    params: query
  })
}

// 查询机构信息详细
export function getOrganization(orgId) {
  return request({
    url: '/organization/organization/' + orgId,
    method: 'get'
  })
}

// 新增机构信息
export function addOrganization(data) {
  return request({
    url: '/organization/organization',
    method: 'post',
    data: data
  })
}

// 修改机构信息
export function updateOrganization(data) {
  return request({
    url: '/organization/organization',
    method: 'put',
    data: data
  })
}

// 删除机构信息
export function delOrganization(orgId) {
  return request({
    url: '/organization/organization/' + orgId,
    method: 'delete'
  })
}
