import request from '@/utils/request'

export const addCart = (goodsId, goodsNum, goodsSkuId) => { // goodsSkuId为规格id, 关系到库存
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}

export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

export const delSelCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
