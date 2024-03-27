import request from '@/utils/request'

// 查询志愿者列表
export function listVolunteer(query) {
  return request({
    url: '/volunteer/volunteer/list',
    method: 'get',
    params: query
  })
}

// 查询志愿者详细
export function getVolunteer(vStar) {
  return request({
    url: '/volunteer/volunteer/' + vStar,
    method: 'get'
  })
}

// 新增志愿者
export function addVolunteer(data) {
  return request({
    url: '/volunteer/volunteer',
    method: 'post',
    data: data
  })
}

// 修改志愿者
export function updateVolunteer(data) {
  return request({
    url: '/volunteer/volunteer',
    method: 'put',
    data: data
  })
}

// 删除志愿者
export function delVolunteer(vStar) {
  return request({
    url: '/volunteer/volunteer/' + vStar,
    method: 'delete'
  })
}
