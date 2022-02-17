import axios from "axios";
const authApi = {
   login: (params) => axios.post(
      'https://api.alicargo.uz/api/auth/', 
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
         }
      }
   )
}

export default authApi