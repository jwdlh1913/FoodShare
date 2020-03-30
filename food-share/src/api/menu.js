import axios from '../utils/axios'
class Menus{
  list(page = 1,pageSize = 2){
    let url = '/tiger/goods'
    return axios.get(url,{params:{page,pageSize}})
  }
  // 查找某一条数据
  getOne(id){
    let url = '/tiger/goods/'+id
    return axios.get(url)
  }
  del(_id){
    let url = `/tiger/goods/${_id}`
    return axios.delete(url)
  }
  img(payload){
    let url = '/tiger/upload'
    return axios.post(url,payload)
  }
  add(payload){
    let url = '/tiger/goods'
    return axios.post(url,payload)
  }
}
export default new Menus()