import request from '@/utils/request'

// 查询仓库-物品关系列表
export function listWitem(query) {
  return request({
    url: '/storehouse/witem/list',
    method: 'get',
    params: query
  })
}

// 查询仓库-物品关系详细
export function getWitem(warehouseId) {
  return request({
    url: '/storehouse/witem/' + warehouseId,
    method: 'get'
  })
}

// 新增仓库-物品关系
export function addWitem(data) {
  return request({
    url: '/storehouse/witem',
    method: 'post',
    data: data
  })
}

// 修改仓库-物品关系
export function updateWitem(data) {
  return request({
    url: '/storehouse/witem',
    method: 'put',
    data: data
  })
}

// 删除仓库-物品关系
export function delWitem(warehouseId) {
  return request({
    url: '/storehouse/witem/' + warehouseId,
    method: 'delete'
  })
}
