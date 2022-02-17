import axios from "axios";

const newOrderApi = {
    newOrder: (params) => axios.post(
        'https://api.alicargo.uz/api/cargos/', 
        params,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
    ),
    getPageOrder: (page) => axios.get(
        `https://api.alicargo.uz/api/cargos/?page=${page}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
    ),
    getOrder: () => axios.get(
        'https://api.alicargo.uz/api/cargos',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
    ),
    getOderById: (id) => axios.get(
        `https://api.alicargo.uz/api/cargos/${id}/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
    ),
    getOrderByClient: (id) => axios.get(
        `https://api.alicargo.uz/api/cargos/?no_page=1&client=${id}`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ),
    deleteOrder: (barcode) => axios.delete(
        `https://api.alicargo.uz/api/cargos/${barcode}/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
    ),
    getOrderByNumber: (number) => axios.get(
        `https://api.alicargo.uz/api/cargos/?client__number=${number}`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ),
    updateOrder: (id, params) => axios.patch(
        `https://api.alicargo.uz/api/cargos/${id}/`,
        params,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
    ),
    getStatus: (status) => axios.get(
        `https://api.alicargo.uz/api/cargos/?status=${status}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
    ),
    getStatusAll: (status) => axios.get(
        `https://api.alicargo.uz/api/cargos/?no_page=1&status=${status}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
    ),
    getPageStatusOrder: (status, page) => axios.get(
        `https://api.alicargo.uz/api/cargos/?status=${status}&page=${page}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
    )
}

export default newOrderApi