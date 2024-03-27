import request from '@/utils/request'

// 查询物品-食谱关系列表
export function listRecipe(query) {
  return request({
    url: '/storehouse/recipe/list',
    method: 'get',
    params: query
  })
}

// 查询物品-食谱关系详细
export function getRecipe(itemId) {
  return request({
    url: '/storehouse/recipe/' + itemId,
    method: 'get'
  })
}

// 新增物品-食谱关系
export function addRecipe(data) {
  return request({
    url: '/storehouse/recipe',
    method: 'post',
    data: data
  })
}

// 修改物品-食谱关系
export function updateRecipe(data) {
  return request({
    url: '/storehouse/recipe',
    method: 'put',
    data: data
  })
}

// 删除物品-食谱关系
export function delRecipe(itemId) {
  return request({
    url: '/storehouse/recipe/' + itemId,
    method: 'delete'
  })
}
