import axios from '../utils/axios'

class Admin {
  list() {
    let url = '/tiger/admin'
    return axios.get(url)
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