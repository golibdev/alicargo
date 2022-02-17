import {useEffect, useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { airoportApi } from '../../api/airoportApi';
import { Loader } from '../../components/Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';

const AiroportItems = () => {
   const {id} = useParams();
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [data, setData] = useState([]); 
   const [loading, setLoading] = useState(false);

   const getData = async () => {
      try {
         const res = await airoportApi.getAiroport(id);
         setData(res.data);
         setLoading(true);
      } catch (err) { }
   }

   useEffect(() => {
      const getData = async () => {
         try {
            const res = await airoportApi.getAiroport(id);
            setData(res.data);
            setLoading(true);
         } catch (err) { }
      }
      getData();
   }, [id])

   const deleteAiroportHandler = async (e, id) => {
      e.preventDefault();
      try {
         await airoportApi.deleteAiroport(id)
         toast.success('Muvaffaqqiyatli o\'chirildi')
         navigate('/home/airoport')
      } catch (err) {
         console.log(err.response);
      }
   }

   const updateHandler = async (e, id) => {
      e.preventDefault();
      
      const check = {
         name: name.trim().length === 0
      }
      
      if(check.name){
         toast.warning('Maydon to\'ldirilmagan');
         return;
      }
      
      const params = {
         name
      }
      
      try {
         await airoportApi.updateAiroport(id, params);
         getData();
         toast.success('Airoport yangilandi');
         setName('');
         setTimeout(() => {
            window.location.reload();
         }, 1500);
      } catch (err) {}
   }
   return (
      <div className='panel p-4'>
         <Navbar/>

         <div className='container'>
            <div className='row'>
               <div className='col-12'>
                  <Link className='btn btn-primary mb-4' to='/home/airoport'>Airoportlar</Link>
                  {loading ? (
                     <table className='table table-bordered text-center fw-bold'>
                        <thead>
                           <tr>
                              <th>Airoport ID</th>
                              <th>Name</th>
                              <th>Is Active</th>
                              <th>Update</th>
                              <th>Delete</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr className='text-center'>
                              <td>{data.id}</td>
                              <td>{data.name}</td>
                              <td>{data.is_active ? 'Aktiv' : 'Aktiv emas'}</td>
                              <td className='text-center'>
                                 <button className='btn btn-warning fw-bold text-white' data-bs-toggle="modal" data-bs-target={`#update${data.id}`} onClick={() => {
                                    setName(data.name)
                                 }}>
                                    <i className='bi bi-pencil'></i>
                                 </button>
                                 <div className="modal fade" id={`update${data.id}`} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                       <div className="modal-content">
                                          <div className="modal-header">
                                             <h5 className="modal-title" id="exampleModalLabel">Tahrirlash</h5>
                                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">
                                             <form onSubmit={(e) => {
                                                updateHandler(e, data.id)
                                             }}>
                                                <div className='mb-3'>
                                                   <input className='form-control' type='text' id='name' placeholder='name'
                                                   value={name}
                                                   onChange={e=>setName(e.target.value)}
                                                   />
                                                </div>
                                                <div>
                                                   <button 
                                                      className='btn btn-success d-block'
                                                   >
                                                      Saqlash
                                                   </button>
                                                </div>
                                             </form>
                                          </div>
                                          <div className="modal-footer">
                                             <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td>
                                 <button className='btn btn-danger fw-bold' onClick={(e) => {
                                    deleteAiroportHandler(e, data.id)
                                 }}>
                                    <i className='bi bi-trash'></i>
                                 </button>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  ): (
                     <div className='d-flex justify-content-center'>
                        <Loader/>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <ToastContainer/>
      </div>
   )
};

export default AiroportItems;
