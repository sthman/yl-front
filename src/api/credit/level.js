import request from '@/utils/request'

// 查询奖惩级别列表
export function listLevel(query) {
  return request({
    url: '/credit/level/list',
    method: 'get',
    params: query
  })
}

// 查询奖惩级别详细
export function getLevel(rewardPunishmentLevelId) {
  return request({
    url: '/credit/level/' + rewardPunishmentLevelId,
    method: 'get'
  })
}

// 新增奖惩级别
export function addLevel(data) {
  return request({
    url: '/credit/level',
    method: 'post',
    data: data
  })
}

// 修改奖惩级别
export function updateLevel(data) {
  return request({
    url: '/credit/level',
    method: 'put',
    data: data
  })
}

// 删除奖惩级别
export function delLevel(rewardPunishmentLevelId) {
  return request({
    url: '/credit/level/' + rewardPunishmentLevelId,
    method: 'delete'
  })
}
