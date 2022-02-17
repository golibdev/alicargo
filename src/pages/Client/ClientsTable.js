import {useState} from 'react';
import { clientApi } from '../../api/clientApi';

const ClientsTable = ({item, index, toast, getData, deleteClientHandler, handleEnter, role }) => {
   const [editNumber, setEditNumber] = useState('');
   const [editFullName, setEditFullName] = useState('');

   const updateClientHandler = async (e, id) => {
      e.preventDefault()

      const check = {
         editNumber: editNumber.trim().length === 0
      }

      if(check.editNumber){
         toast.warning('Number kiritish majburiy')
         return
      }

      let params = {}

      editFullName.length === 0 ? params = { editNumber } : params = { number: editNumber, full_name: editFullName }

      try {
         await clientApi.upateClient(id, params)
         toast.success('Mijoz yangilandi')
         getData()

         setTimeout(() => {
            window.location.reload()
         }, 2000)
      } catch(err) {
         toast.warning(err.response.data.number[0])
      }
   }
   return (
      <tr>
         <td>{index}</td>
         <td>{item.number}</td>
         <td>{item.full_name}</td>
         {role === '100' ? (
            <>
               <td>
                  <button className='btn btn-warning text-white fw-bold' data-bs-toggle="modal" data-bs-target={`#update${index}`} onClick={() => {
                     setEditNumber(item.number)
                     setEditFullName(item.full_name)
                  }}>
                     <i className='bi bi-pencil'></i> Update
                  </button>
                  <div className="modal fade" id={`update${index}`} aria-labelledby="exampleModalLabel" aria-hidden="true">
                     <div className="modal-dialog">
                        <div className="modal-content">
                           <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Tahrirlash</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                           </div>
                           <div className="modal-body">
                              <form>
                                 <div className='mb-3'>
                                    <input className='form-control' type='text' id='number' placeholder='number' onKeyDown={handleEnter}
                                    value={editNumber} 
                                    onChange={e => setEditNumber(e.target.value)}
                                    />
                                 </div>
                                 <div className='mb-3'>
                                    <input className='form-control' type='text' id='full_name' placeholder='Full name'  onKeyDown={handleEnter} 
                                    value={editFullName}
                                    onChange={e=>setEditFullName(e.target.value)}
                                    />
                                 </div>
                                 <div>
                                    <button 
                                       className='btn btn-success d-block'
                                       onClick={(e)=>updateClientHandler(e, item.id)}
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
                  <button className='btn btn-danger' onClick={() => {
                     deleteClientHandler(item.id)
                  }}>
                     <i className='bi bi-trash'></i> Delete
                  </button>
               </td>
            </>
         ): (
            <></>
         )}
      </tr>
   );
};

export default ClientsTable;
