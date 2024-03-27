import request from '@/utils/request'

// 查询物品类型列表
export function listType(query) {
  return request({
    url: '/storehouse/type/list',
    method: 'get',
    params: query
  })
}

// 查询物品类型详细
export function getType(itemTypeId) {
  return request({
    url: '/storehouse/type/' + itemTypeId,
    method: 'get'
  })
}

// 新增物品类型
export function addType(data) {
  return request({
    url: '/storehouse/type',
    method: 'post',
    data: data
  })
}

// 修改物品类型
export function updateType(data) {
  return request({
    url: '/storehouse/type',
    method: 'put',
    data: data
  })
}

// 删除物品类型
export function delType(itemTypeId) {
  return request({
    url: '/storehouse/type/' + itemTypeId,
    method: 'delete'
  })
}
