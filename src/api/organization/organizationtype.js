import request from '@/utils/request'

// 查询机构类型列表
export function listOrganizationtype(query) {
  return request({
    url: '/organization/organizationtype/list',
    method: 'get',
    params: query
  })
}

// 查询机构类型详细
export function getOrganizationtype(orgTypeId) {
  return request({
    url: '/organization/organizationtype/' + orgTypeId,
    method: 'get'
  })
}

// 新增机构类型
export function addOrganizationtype(data) {
  return request({
    url: '/organization/organizationtype',
    method: 'post',
    data: data
  })
}

// 修改机构类型
export function updateOrganizationtype(data) {
  return request({
    url: '/organization/organizationtype',
    method: 'put',
    data: data
  })
}

// 删除机构类型
export function delOrganizationtype(orgTypeId) {
  return request({
    url: '/organization/organizationtype/' + orgTypeId,
    method: 'delete'
  })
}
