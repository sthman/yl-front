import request from '@/utils/request'

// 查询老人信息列表
export function listOlder(query) {
  return request({
    url: '/government/older/list',
    method: 'get',
    params: query
  })
}

// 查询老人信息详细
export function getOlder(olderAge) {
  return request({
    url: '/government/older/' + olderAge,
    method: 'get'
  })
}

// 新增老人信息
export function addOlder(data) {
  return request({
    url: '/government/older',
    method: 'post',
    data: data
  })
}

// 修改老人信息
export function updateOlder(data) {
  return request({
    url: '/government/older',
    method: 'put',
    data: data
  })
}

// 删除老人信息
export function delOlder(olderAge) {
  return request({
    url: '/government/older/' + olderAge,
    method: 'delete'
  })
}
