import { getCartList, changeCount, delSelCart } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  // 异步放这
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 复选框自己加
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 本地与后台都需更新
      context.commit('changeCount', { goodsId, goodsNum })
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    async delSelAction (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelCart(cartIds)
      Toast('删除成功')
      // 重新拉数据
      context.dispatch('getCartAction')
    }
  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => {
        return sum + item.goods_num
      }, 0)
    },
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num
      }, 0)
    },
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    isAllCheck (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
