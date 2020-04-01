import axios from '../utils/axios'
class Admin {
    list(page = 1, pageSize = 5) {
        let url = '/tiger/user'
        return axios.get(url, { params: { page, pageSize } })
    }

    insert(userName, passWord) {
        let url = '/tiger/user'
        return axios.post(url, { userName, passWord })
    }



    login(userName, passWord) {
        let url = '/tiger/user/login'
        return axios.post(url, { userName, passWord })
    }


    del(_id) {
        let url = '/tiger/user'
        return axios.delete(url + '/' + _id)
    }

     change(_id,{userName,passWord}){
      let url ='/tiger/user'
      return axios.put(url+'/'+_id,{userName,passWord})
    } 
}

export default new Admin()