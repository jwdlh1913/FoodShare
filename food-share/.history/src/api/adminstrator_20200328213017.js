import axios from '../utils/axios'

class Admin {
 List(){
     let url = '/tiger/'
     return axios.get(url)
 }

}

export default Admin;