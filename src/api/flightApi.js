import axios from "axios";
const token = localStorage.getItem("token");

export const flightApi = {
   getAll: () => axios.get(
      'https://api.alicargo.uz/api/flights/?no_page=1',
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
         }
      }
   ),
   getOne: (id) => axios.get(
      `https://api.alicargo.uz/api/flights/${id}/`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
         }
      }
   ),
   create: (params) => axios.post(
      'https://api.alicargo.uz/api/flights/',
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
         }
      }
   ),
   update: (id, params) => axios.put(
      `https://api.alicargo.uz/api/flights/${id}/`,
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
         }
      }
   ),
   delete: (id) => axios.delete(
      `https://api.alicargo.uz/api/flights/${id}/`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
         }
      }
   )
}