import axios from '../utils/axios'

class Admin {
updatePassword(id,oldPassword,newPassword){
    let url = '/tiger/admin/updatePassword/' + id
    return axios.put(url,{oldPassword,newPassword})
  }
login(userName,passWord){
  let url = '/tiger/admin/login'
  return axios.post(url,{userName,passWord})
}

 list(page=1,pageSize=5){
     let url = '/tiger/admin'
     return axios.get(url,{params:{page,pageSize}})
 }
 add(userName,passWord){
     let url = '/tiger/admin'
     return axios.post(url,{userName,passWord})
 }
 del(_id){
    let url ='/tiger/admin'
    return axios.delete(url+'/'+_id)
  }
  add(userName, passWord) {
    let url = '/tiger/admin'
    return axios.post(url, { userName, passWord })
  }
  del(_id) {
    let url = '/tiger/admin'
    return axios.delete(url + '/' + _id)
  }
  /*   put(_id,userName,passWord){
      let url ='/tiger/admin'
      return axios.put(url+'/'+_id,{userName,passWord})
    } */
}

export default new Admin();