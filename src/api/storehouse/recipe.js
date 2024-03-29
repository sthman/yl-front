import request from '@/utils/request'

// 查询食谱列表
export function listRecipe(query) {
  return request({
    url: '/storehouse/recipe/list',
    method: 'get',
    params: query
  })
}

// 查询食谱详细
export function getRecipe(recipeId) {
  return request({
    url: '/storehouse/recipe/' + recipeId,
    method: 'get'
  })
}

// 新增食谱
export function addRecipe(data) {
  return request({
    url: '/storehouse/recipe',
    method: 'post',
    data: data
  })
}

// 修改食谱
export function updateRecipe(data) {
  return request({
    url: '/storehouse/recipe',
    method: 'put',
    data: data
  })
}

// 删除食谱
export function delRecipe(recipeId) {
  return request({
    url: '/storehouse/recipe/' + recipeId,
    method: 'delete'
  })
}
