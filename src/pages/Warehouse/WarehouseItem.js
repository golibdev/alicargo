import {useEffect, useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from '../../components/Loader/Loader';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { wareHouseApi } from '../../api/wareHouseApi';

const WarehouseItem = () => {
   const role = localStorage.getItem('role')
   const id = useParams().id;
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState([]);
   const [editName, setEditName] = useState('');
   const [editAddres, setEditAddres] = useState('');

   useEffect(() => {
      const getData = async () => {
         try {
            const res = await wareHouseApi.getById(id)
            setData(res.data)
            setLoading(true)
         } catch (err) {}
      }
      getData()
   }, [id])

   const handleEnter = (event) => {
      if (event.key.toLowerCase() === "enter") {
        const form = event.target.form;
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
      }
   };

   const deleteWareHouseHandler = async (e, id) => {
      e.preventDefault()
      try {
         await wareHouseApi.delete(id)
         toast.success('Muvaffaqqiyatli o\'chirildi')
         navigate('/home/warehouse')
      } catch (err) { }
   }

   const editWareHouseHandler = async (e, id) => {
      e.preventDefault()

      const check = {
         editName: editName.trim().length === 0,
         editAddres: editAddres.trim().length === 0
      }

      if(check.editName || check.editAddres) {
         toast.warning('Barcha maydonlar to\'ldirilishi shart')
         return
      }

      const params = {
         name: editName,
         address: editAddres
      }

      try {
         await wareHouseApi.edit(id, params)
         toast.success('Muvaffaqqiyatli tahrirlandi')
         setTimeout(() => {
            window.location.reload()
         }, 1000) 
      } catch(err){}
   }

   return (
      <div className='panel p-4'>
         <Navbar/>
         {loading ? (
            <div className='row'>
               <div className='col-12'>
                  <Link to='/home/warehouse' className='btn btn-primary mb-4'>Omborlar</Link>
                  <h4 className='mb-4'>Warehouse ID: {data.id}</h4>
                  <div className='table-responsive'>
                     <table className='table table-bordered fw-bold text-center'>
                        <thead>
                           <tr>
                              <td>ID</td>
                              <td>Warehouse name</td>
                              <td>Warehouse addres</td>
                        
                              {role === '100' ? (
                                 <>
                                    <td>Update</td>
                                    <td>Delete</td>
                                 </>
                              ):(<></>)}
                              
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>{1}</td>
                              <td>{data.name}</td>
                              <td>{data.address}</td>
                              {role === '100' ? (
                                 <>
                                     <td>
                                       <button className='btn btn-warning text-white fw-bold' data-bs-toggle="modal" data-bs-target={`#update${data.id}`}
                                          onClick={() => {
                                             setEditName(data.name)
                                             setEditAddres(data.address)
                                          }}
                                       >
                                          <i className='bi bi-pencil'></i> Update
                                       </button>
                                    </td>
                                    <td>
                                       <button className='btn btn-danger' onClick={(e) => {
                                          deleteWareHouseHandler(e, data.id)
                                       }}>
                                          <i className='bi bi-trash'></i> Delete
                                       </button>
                                    </td> 
                                 </>
                              ): (<></>)}
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>

               <div className="modal fade" id={`update${data.id}`} aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title" id="exampleModalLabel">Tahrirlash</h5>
                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <form>
                              <div className='mb-3'>
                                 <input className='form-control' type='text' id='name' placeholder='name' onKeyDown={handleEnter} defaultValue={""} onChange={e=>setEditName(e.target.value)} />
                              </div>
                              <div className='mb-3'>
                                 <input className='form-control' type='text' id='addres' placeholder='addres' onKeyDown={handleEnter} defaultValue={""} onChange={e =>setEditAddres(e.target.value)} />
                              </div>
                              <div>
                                 <button 
                                    className='btn btn-success d-block'
                                    onClick={editWareHouseHandler}
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
            </div>
         ): (
            <div className='d-flex align-items-center justify-content-center'>
               <Loader/>
            </div>
         )}

         <ToastContainer/>
      </div>
   );
};

export default WarehouseItem;
