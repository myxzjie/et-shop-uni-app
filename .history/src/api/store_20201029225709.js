import request from '@/utils/request'

/*
 * 商品分类
 * */
export function getCategory() {
  return request({
    url: '/category', 
    {}, { login: false })
}