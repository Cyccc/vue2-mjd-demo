import request from '@/utils/request'

export const getProList = (obj) => {
  const { categoryId, goodsName, page, sortType, sortPrice } = obj
  return request.get('/goods/list', {
    // 非必需也可填, axios会自动判断, 传来假值则不传送到服务器
    params: {
      categoryId,
      goodsName,
      page,
      sortType,
      sortPrice
    }
  })
}

// 获取商品详情

export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
