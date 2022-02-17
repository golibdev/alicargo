import {useState} from 'react';
import { Link } from 'react-router-dom'
import { wareHouseApi } from '../../api/wareHouseApi';


const WarehouseTable = ({
   item, 
   index, 
   toast, 
   handleEnter, 
   getData, 
   deleteWareHouseHandler,
   role
}) => {

   const [editName, setEditName] = useState('');
   const [editAddres, setEditAddres] = useState('');

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
         getData()
         toast.success('Muvaffaqqiyatli tahrirlandi')
         setTimeout(() => {
            window.location.reload()
         }, 1000) 
      } catch(err){ }
   }
   
   return (
      <tr>
         <td>{index}</td>
         <td>{item.id}</td>
         <td>{item.name}</td>
         <td>{item.address}</td>
         <td>
            <Link to={`/home/warehouse/${item.id}`} className='btn btn-primary text-white'>
               <i className='bi bi-eye'></i>
            </Link>
         </td>
         
         {role === '100' ? (
            <>
               <td>
                  <button className='btn btn-warning text-white fw-bold' data-bs-toggle="modal" data-bs-target={`#update${item.id}`} onClick={() => {
                     setEditName(item.name);
                     setEditAddres(item.address);
                  }} >
                     <i className='bi bi-pencil'></i> Update
                  </button>
                  <div className="modal fade" id={`update${item.id}`} aria-labelledby="exampleModalLabel" aria-hidden="true">
                     <div className="modal-dialog">
                        <div className="modal-content">
                           <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Tahrirlash</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                           </div>
                           <div className="modal-body">
                              <form>
                                 <div className='mb-3'>
                                    <input className='form-control' type='text' id='name' placeholder='name' onKeyDown={handleEnter}
                                    value={editName} 
                                    onChange={e => setEditName(e.target.value)}
                                    />
                                 </div>
                                 <div className='mb-3'>
                                    <input className='form-control' type='text' id='addres' placeholder='addres'  onKeyDown={handleEnter} 
                                    value={editAddres}
                                    onChange={e=>setEditAddres(e.target.value)}
                                    />
                                 </div>
                                 <div>
                                    <button 
                                       className='btn btn-success d-block'
                                       onClick={(e) => editWareHouseHandler(e, item.id)}
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
                  <button className='btn btn-danger' onClick={(e) => {
                     deleteWareHouseHandler(e, item.id)
                  }}>
                     <i className='bi bi-trash'></i> Delete
                  </button>
               </td>
            </>
         ): (<></>)}
      </tr>
   );
};

export default WarehouseTable;
