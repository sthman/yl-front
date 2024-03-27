import request from '@/utils/request'

// 查询补贴信息列表
export function listInfo(query) {
  return request({
    url: '/funds/info/list',
    method: 'get',
    params: query
  })
}

// 查询补贴信息详细
export function getInfo(subsidyInfoId) {
  return request({
    url: '/funds/info/' + subsidyInfoId,
    method: 'get'
  })
}

// 新增补贴信息
export function addInfo(data) {
  return request({
    url: '/funds/info',
    method: 'post',
    data: data
  })
}

// 修改补贴信息
export function updateInfo(data) {
  return request({
    url: '/funds/info',
    method: 'put',
    data: data
  })
}

// 删除补贴信息
export function delInfo(subsidyInfoId) {
  return request({
    url: '/funds/info/' + subsidyInfoId,
    method: 'delete'
  })
}
