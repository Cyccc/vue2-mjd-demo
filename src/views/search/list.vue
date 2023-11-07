<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div @click="sortByDefault" class="sort-item">综合</div>
      <div @click="sortByCount" class="sort-item">销量</div>
      <div @click="sortByPrice" class="sort-item">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProList } from '@/api/product'
export default {
  name: 'SearchIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      page: 1,
      proList: [],
      sortPrice: true
    }
  },
  computed: {
    querySearch () {
      return this.$route.query.search // 接收来自url的参数
    }
  },
  async created () {
    const { data: { list } } = await getProList({
      categoryId: this.$route.query.categoryId,
      goodsName: this.querySearch,
      page: this.page
    })
    this.proList = list.data
  },
  methods: {
    async sortByDefault () {
      const { data: { list } } = await getProList({
        goodsName: this.querySearch,
        page: this.page
      })
      this.proList = list.data
    },
    async sortByCount () {
      const { data: { list } } = await getProList({
        sortType: 'sales',
        goodsName: this.querySearch,
        page: this.page
      })
      this.proList = list.data
    },
    async sortByPrice () {
      this.sortPrice = !this.sortPrice
      const { data: { list } } = await getProList({
        sortType: 'price',
        sortPrice: Number(this.sortPrice),
        goodsName: this.querySearch,
        page: this.page
      })
      this.proList = list.data
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
