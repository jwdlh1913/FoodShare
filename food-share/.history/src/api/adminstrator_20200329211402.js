import axios from '../utils/axios'

class Admin {
 List(){
     let url = '/tiger/admin'
     return axios.get(url)
 }
 add(userName,passWord){
     let url = '/tiger/admin'
     return axios.post(url,{userName,passWord})
 }
 del(_id){
    let url ='/tiger/admin'
    return axios.delete(url+'/'+_id)
  }
  put(_id){
    let url ='/tiger/admin'
    return axios.delete(url+'/'+_id)
  }
}

export default Admin;