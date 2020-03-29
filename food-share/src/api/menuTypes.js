import axios from '../utils/axios'
// 菜谱类别增删改查
class MenuTypes {
  typeListAll(){
    let url = '/tiger/menutypes/all'
    return axios.get(url)
  }
  typesList(page=1,pageSize=5){
    let url = '/tiger/menutypes'
    return axios.get(url,{params:{page,pageSize}})
  }
  typesAdd(menutypesName){
    let url = '/tiger/menutypes'
    return axios.post(url,menutypesName)
  }
  typesDel(id){
    let url = '/tiger/menutypes/' + id
    return axios.delete(url)
  }
  typesUpdate(id,menutypesName){
    let url = '/tiger/menutypes/' + id
    return axios.put(url,{menutypesName})
  }
}
export default new MenuTypes()