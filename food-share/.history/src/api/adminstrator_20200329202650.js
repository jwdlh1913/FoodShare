import axios from '../utils/axios'

class Admin {
 List(){
     let url = '/tiger/admin'
     return axios.get(url)
 }
 add(){
     let url = '/tiger/admin'

 }

}

export default Admin;