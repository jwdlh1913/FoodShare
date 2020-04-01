import axios from '../utils/axios'
class Admin {
    list(page = 1, pageSize = 5) {
        let url = '/tiger/user'
        return axios.get(url, { params: { page, pageSize } })
    }

    insert(userName, passWord) {
        let url = '/tiger/user/create'
        return axios.post(url, { userName, passWord })
    }



    login(userName, passWord) {
        let url = '/tiger/user/login'
        return axios.post(url, { userName, passWord })
    }


    del(_id) {
        let url = '/tiger/user/del'
        return axios.delete(url + '/' + _id)
    }
    /*   put(_id,userName,passWord){
        let url ='/tiger/admin'
        return axios.put(url+'/'+_id,{userName,passWord})
      } */
}

export default new Admin()