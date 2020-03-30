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

}

export default Admin;