// vuex本地存储永久化
// 所有本地持久化都建议统一管理, 键名不容易冲突

const INFO_KEY = 'vue_jd_demo'

export const getInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}

export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

const HISTORY_KEY = 'vue_jd_history'

export const getHistoryList = () => {
  const result = JSON.parse(localStorage.getItem(HISTORY_KEY))
  return result || []
}

export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
