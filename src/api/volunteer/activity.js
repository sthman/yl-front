import request from '@/utils/request'

// 查询活动人员列表
export function listActivity(query) {
  return request({
    url: '/volunteer/activity/list',
    method: 'get',
    params: query
  })
}

// 查询活动人员详细
export function getActivity(activityId) {
  return request({
    url: '/volunteer/activity/' + activityId,
    method: 'get'
  })
}

// 新增活动人员
export function addActivity(data) {
  return request({
    url: '/volunteer/activity',
    method: 'post',
    data: data
  })
}

// 修改活动人员
export function updateActivity(data) {
  return request({
    url: '/volunteer/activity',
    method: 'put',
    data: data
  })
}

// 删除活动人员
export function delActivity(activityId) {
  return request({
    url: '/volunteer/activity/' + activityId,
    method: 'delete'
  })
}
