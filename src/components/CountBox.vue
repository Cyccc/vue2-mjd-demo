<template>
  <div class="count-box">
    <button @click="handleAdd(-1)" class="minus">-</button>
    <!-- change事件: 失焦, 回车触发 -->
    <input :value="value" @change="handleChange" class="inp" type="text">
    <button @click="handleAdd(1)" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleAdd (num) {
      if (this.value + num < 1) {
        return
      }
      this.$emit('input', this.value + num)
    },
    handleChange (e) {
      // console.log(e.target.value)
      const num = +e.target.value // 强转数字, 非数字会返回NaN
      if (isNaN(num) || num < 1) {
        e.target.value = this.value // 回退
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
