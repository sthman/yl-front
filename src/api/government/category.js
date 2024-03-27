import request from '@/utils/request'

// 查询知识库列表
export function listCategory(query) {
  return request({
    url: '/government/category/list',
    method: 'get',
    params: query
  })
}

// 查询知识库详细
export function getCategory(categoryId) {
  return request({
    url: '/government/category/' + categoryId,
    method: 'get'
  })
}

// 新增知识库
export function addCategory(data) {
  return request({
    url: '/government/category',
    method: 'post',
    data: data
  })
}

// 修改知识库
export function updateCategory(data) {
  return request({
    url: '/government/category',
    method: 'put',
    data: data
  })
}

// 删除知识库
export function delCategory(categoryId) {
  return request({
    url: '/government/category/' + categoryId,
    method: 'delete'
  })
}
