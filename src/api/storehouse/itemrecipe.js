import request from '@/utils/request'

// 查询物品-食谱关系列表
export function listItemrecipe(query) {
  return request({
    url: '/storehouse/itemrecipe/list',
    method: 'get',
    params: query
  })
}

// 查询物品-食谱关系详细
export function getItemrecipe(itemId) {
  return request({
    url: '/storehouse/itemrecipe/' + itemId,
    method: 'get'
  })
}

// 新增物品-食谱关系
export function addItemrecipe(data) {
  return request({
    url: '/storehouse/itemrecipe',
    method: 'post',
    data: data
  })
}

// 修改物品-食谱关系
export function updateItemrecipe(data) {
  return request({
    url: '/storehouse/itemrecipe',
    method: 'put',
    data: data
  })
}

// 删除物品-食谱关系
export function delItemrecipe(itemId) {
  return request({
    url: '/storehouse/itemrecipe/' + itemId,
    method: 'delete'
  })
}
