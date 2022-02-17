import axios from "axios";
export const clientApi = {
   add: (params) => axios.post(
      'https://api.alicargo.uz/api/clients/',
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
   ),
   getAllClient: () => axios.get(
      'https://api.alicargo.uz/api/clients/',
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
   ),
   getPageClient: (page) => axios.get(
      `https://api.alicargo.uz/api/clients/?page=${page}`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
  ),
   getLimitClient: (page) => axios.get(
      `https://api.alicargo.uz/api/clients/?page=${page}`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
   ),
   getClient: (id) => axios.get(
      `https://api.alicargo.uz/api/clients/${id}/`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
   ),
   upateClient: (id, params) => axios.put(
      `https://api.alicargo.uz/api/clients/${id}/`,
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
   ),
   deleteClient: (id) => axios.delete(
      `https://api.alicargo.uz/api/clients/${id}/`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
         }
      }
   ),
}