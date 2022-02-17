import {useState, useEffect} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import newOrderApi from '../../api/newOrderApi';
import { Loader } from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import Pagination from '../../components/Pagination/Pagination';
import './cargos.css';

export const Cargos = () => {
   const [cargos, setCargos] = useState([]);
   const [loading, setLoading] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [pageCount, setPageCount] = useState(0)

   const getCargos = async () => {
      try {
         const res = await newOrderApi.getOrder()
         setPageCount(Math.ceil(res.data.count / 10))
         setCargos(res.data.results.reverse());
         setLoading(true)
      } catch (err) {}
   }

   useEffect(() => {
      getCargos();
   }, [])

   const deleteCargo = async (e, barcode) => {
      e.preventDefault();
      try {
         await newOrderApi.deleteOrder(barcode);
         getCargos();
         toast.success("Ma'lumot o'chirildi");
      } catch (err) {
         console.log(err.response);
      }
   }

   return (
      <div className='panel p-4'>
         <Navbar/>
         <div className='container'>
            {loading ? (
               <div className='row'>
                  <div className='col-12'>
                     <table className='table table-bordered text-center fw-bold'>
                        <thead>
                           <tr>
                              <td>#</td>
                              <td>Client number</td>
                              <td>Shtrix kodi</td>
                              <td>Og'irligi</td>
                              <td>Delete</td>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              cargos.map((item, index) => (
                                 <tr key={index} 
                                    className={
                                       item.status === '1' ? 'bg-warning text-white' : item.status === '2' ? 'bg-info text-white' : item.status === '3' ? 'bg-primary text-white' : 'bg-success text-white'
                                    }
                                 >
                                    <td>{currentPage === 1 ? index + 1 : index  + (currentPage - 1) * 10 + 1}</td>
                                    <td>{item.client.number}</td>
                                    <td>{item.barcode}</td>
                                    <td>{item.weight} kg</td>
                                    <td>
                                       <button className='btn btn-danger' onClick={(e) => {
                                          deleteCargo(e, item.barcode)
                                       }}>
                                          <i className="bi bi-trash"></i>
                                       </button>
                                    </td>
                                 </tr>
                              ))
                           }
                        </tbody>
                     </table>
                     <Pagination cargos={cargos} pageCount={pageCount} setCargos={setCargos} setCurrentPage={setCurrentPage} currentPage={currentPage} setLoading={setLoading} />
                  </div>
               </div>
            ): (
               <div style={{ height: '80vh' }} className='d-flex align-items-center justify-content-center'>
                  <Loader/>
               </div>
            )}
         </div>
         <ToastContainer/>
      </div>
   )
};
