import axios from "axios";
const token = localStorage.getItem("token");

export const staffsApi = {
   getStaffs: () => axios.get(
      'https://api.alicargo.uz/api/staffs/?no_page=1',
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
         }
      }
   ),
   getStaff: (id) => axios.get(
      `https://api.alicargo.uz/api/staffs/${id}/`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
         }
      }
   ),
   createStaff: (params) => axios.post(
      'https://api.alicargo.uz/api/staffs/',
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
         }
      }
   ),
   updateStaff: (id, params) => axios.put(
      `https://api.alicargo.uz/api/staffs/${id}/`,
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
         }
      }
   ),
   deleteStaff: (id) => axios.delete(
      `https://api.alicargo.uz/api/staffs/${id}/`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
         }
      }
   ),

}