import axios from '../utils/axios'
class Menus{
  list(page = 1,pageSize = 2){
    let url = '/tiger/goods'
    return axios.get(url,{params:{page,pageSize}})
  }
  del(_id){
    let url = `/tiger/goods/${_id}`
    return axios.delete(url)
  }
}
export default new Menus()