import state from './state.js'

export default (prevstate = state ,actions) => {
  let newData = JSON.parse(JSON.stringify(prevstate))
  // 处理数据

  return newData
}