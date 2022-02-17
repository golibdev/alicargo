import { useState} from 'react';
import { toast } from 'react-toastify';
import { staffsApi } from '../../api/staffsApi';

const EmpolyeTable = ({ item, index, getStaffs, handleEnter }) => {
   const [fullName, setFullName] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [role, setRole] = useState('');
   const deleteStaffHandler = async (e, id) => {
      e.preventDefault();
      try {
         await staffsApi.deleteStaff(id);
         toast.success('Сотрудник удален');
         getStaffs();
      } catch (err) {}
   };

   const updatedHandler = async (e, id) => {
      e.preventDefault();
      const check = {
         fullName: fullName.trim().length === 0,
         username: username.trim().length === 0,
         password: password.trim().length === 0,
         role: role.trim().length === 0
      }

      if (check.fullName || check.username || check.password || check.role) {
         toast.error('Barcha maydonlar to\'ldirilishi shart');
         return;
      }

      const params = {
         full_name: fullName,
         username,
         password,
         role
      }
      try {
         await staffsApi.updateStaff(id, params);
         toast.success('Сотрудник обновлен');
         getStaffs();
         setTimeout(() => {
            window.location.reload();
         }, 1000);
      } catch (err) {}
   };

   return (
      <tr>
         <td>{index}</td>
         <td>{item.full_name}</td>
         <td>{item.username}</td>
         <td>{item.role}</td>
         <td>{item.warehouse !== null ? item.warehouse.name : 'Aniq emas'}</td>
         <td>
            <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#update${index}`} onClick={() => {
               setFullName(item.full_name);
               setUsername(item.username);
               setPassword(item.password);
               setRole(item.role);
            }}>
               <i className='bi bi-pen'></i> <span>Update</span>
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
                              <input className='form-control' type='text' id='fullName' placeholder='fullName' onKeyDown={handleEnter}
                              value={fullName}
                              onChange={e => setFullName(e.target.value)}
                              />
                           </div>
                           <div className='mb-3'>
                              <input className='form-control' type='text' id='full_name' placeholder='username' onKeyDown={handleEnter} 
                              value={username}
                              onChange={e => setUsername(e.target.value)}
                              />
                           </div>
                           <div className='mb-3'>
                              <input className='form-control' type='password' id='full_name' placeholder='password' onKeyDown={handleEnter} 
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              />
                           </div>
                           <div className='mb-3'>
                              <select className='form-select' value={role} onChange={(e) => setRole(e.target.value)} onKeyDown={handleEnter}>
                                 <option value=''>Roleni tanlang</option>
                                 <option value='98'>Uzbek staff</option>
                                 <option value='99'>Xitoy Staff</option>
                              </select>
                           </div>
                           <div>
                              <button 
                                 className='btn btn-success d-block'
                                 onClick={(e) => updatedHandler(e, item.id)}
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
               deleteStaffHandler(e, item.id);
            }}>
               <i className='bi bi-trash'></i> <span>Delete</span>
            </button>
         </td>
      </tr>
   )
};

export default EmpolyeTable;
