import axios from "axios";

export const wareHouseApi = {
   add: (params) => axios.post(
      'https://api.alicargo.uz/api/warehouses/',
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
   ),
   getAll: () => axios.get(
      'https://api.alicargo.uz/api/warehouses/?no_page=1',
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
   ),
   getById: (id) => axios.get(
      `https://api.alicargo.uz/api/warehouses/${id}/`,
      {
         headers: {
            'Content-Type': 'aplication/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
   ),
   edit: (id, params) => axios.put(
      `https://api.alicargo.uz/api/warehouses/${id}/`,
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
   ),
   delete: (id) => axios.delete(
      `https://api.alicargo.uz/api/warehouses/${id}/`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
   )
}