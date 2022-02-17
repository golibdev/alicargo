import axios from "axios";

export const airoportApi = {
   getAllAiroports: () => axios.get(
      "https://api.alicargo.uz/api/airports/?no_page=1",
      {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
         }
      }
   ),
   getAiroport: (id) => axios.get(
      `https://api.alicargo.uz/api/airports/${id}/`,
      {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
         }
      }
   ),
   createAiroport: (params) => axios.post(
      "https://api.alicargo.uz/api/airports/",
      params,
      {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
         }
      }
   ),
   updateAiroport: (id, params) => axios.put(
      `https://api.alicargo.uz/api/airports/${id}/`,
      params,
      {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
         }
      }
   ),
   deleteAiroport: (id) => axios.delete(
      `https://api.alicargo.uz/api/airports/${id}/`,
      {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
         }
      }
   )
}