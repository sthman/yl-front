import request from '@/utils/request'

// 查询银行信息列表
export function listBank(query) {
  return request({
    url: '/bank/bank/list',
    method: 'get',
    params: query
  })
}

// 查询银行信息详细
export function getBank(bankId) {
  return request({
    url: '/bank/bank/' + bankId,
    method: 'get'
  })
}

// 新增银行信息
export function addBank(data) {
  return request({
    url: '/bank/bank',
    method: 'post',
    data: data
  })
}

// 修改银行信息
export function updateBank(data) {
  return request({
    url: '/bank/bank',
    method: 'put',
    data: data
  })
}

// 删除银行信息
export function delBank(bankId) {
  return request({
    url: '/bank/bank/' + bankId,
    method: 'delete'
  })
}
