import {useState} from 'react';
import { Link } from 'react-router-dom';
import { airoportApi } from '../../api/airoportApi';

const AiroportTable = ({ item, index, handleEnter, deleteAiroportHandler, toast, getData }) => {
   const [name, setName] = useState();
   
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
      <tr className='text-center'>
         <td>{index}</td>
         <td>{item.id}</td>
         <td>{item.name}</td>
         <td>{item.is_active ? 'Aktiv' : 'Aktiv emas'}</td>
         <td>
            <Link to={`/home/airoport/${item.id}`} className='btn btn-primary fw-bold'>
               <i className='bi bi-eye'></i>
            </Link>
         </td>
         <td className='text-center'>
            <button className='btn btn-warning fw-bold text-white' data-bs-toggle="modal" data-bs-target={`#update${index}`} onClick={() => {
               setName(item.name)
            }}>
               <i className='bi bi-pencil'></i>
            </button>
            <div className="modal fade" id={`update${index}`} aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div className="modal-dialog">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Tahrirlash</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div className="modal-body">
                        <form onSubmit={(e) => {
                           updateHandler(e, item.id)
                        }}>
                           <div className='mb-3'>
                              <input className='form-control' type='text' id='name' placeholder='name'  onKeyDown={handleEnter} 
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
               deleteAiroportHandler(e, item.id)
            }}>
               <i className='bi bi-trash'></i>
            </button>
         </td>
      </tr>
   )
};

export default AiroportTable;
