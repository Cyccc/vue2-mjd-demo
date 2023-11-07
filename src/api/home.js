import request from '@/utils/request'

export const getHomeData = () => {
  return request.get('/page/detail', {
    params: { // get请求传参
      pageId: 0
    }
  })
}
