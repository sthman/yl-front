import request from '@/utils/request'

// 查询仓库类型列表
export function listCategory(query) {
  return request({
    url: '/storehouse/category/list',
    method: 'get',
    params: query
  })
}

// 查询仓库类型详细
export function getCategory(warehouseTypeId) {
  return request({
    url: '/storehouse/category/' + warehouseTypeId,
    method: 'get'
  })
}

// 新增仓库类型
export function addCategory(data) {
  return request({
    url: '/storehouse/category',
    method: 'post',
    data: data
  })
}

// 修改仓库类型
export function updateCategory(data) {
  return request({
    url: '/storehouse/category',
    method: 'put',
    data: data
  })
}

// 删除仓库类型
export function delCategory(warehouseTypeId) {
  return request({
    url: '/storehouse/category/' + warehouseTypeId,
    method: 'delete'
  })
}
