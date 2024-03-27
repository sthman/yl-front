import request from '@/utils/request'

// 查询奖惩记录列表
export function listPunishment(query) {
  return request({
    url: '/credit/punishment/list',
    method: 'get',
    params: query
  })
}

// 查询奖惩记录详细
export function getPunishment(rewardPunishmentId) {
  return request({
    url: '/credit/punishment/' + rewardPunishmentId,
    method: 'get'
  })
}

// 新增奖惩记录
export function addPunishment(data) {
  return request({
    url: '/credit/punishment',
    method: 'post',
    data: data
  })
}

// 修改奖惩记录
export function updatePunishment(data) {
  return request({
    url: '/credit/punishment',
    method: 'put',
    data: data
  })
}

// 删除奖惩记录
export function delPunishment(rewardPunishmentId) {
  return request({
    url: '/credit/punishment/' + rewardPunishmentId,
    method: 'delete'
  })
}
