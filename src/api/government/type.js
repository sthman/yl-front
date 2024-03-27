import request from '@/utils/request'

// 查询知识库类别列表
export function listType(query) {
  return request({
    url: '/government/type/list',
    method: 'get',
    params: query
  })
}

// 查询知识库类别详细
export function getType(categoryTypeId) {
  return request({
    url: '/government/type/' + categoryTypeId,
    method: 'get'
  })
}

// 新增知识库类别
export function addType(data) {
  return request({
    url: '/government/type',
    method: 'post',
    data: data
  })
}

// 修改知识库类别
export function updateType(data) {
  return request({
    url: '/government/type',
    method: 'put',
    data: data
  })
}

// 删除知识库类别
export function delType(categoryTypeId) {
  return request({
    url: '/government/type/' + categoryTypeId,
    method: 'delete'
  })
}
