import {useState} from 'react';
import { flightApi } from '../../api/flightApi';

const FlightList = ({ item, index, handleEnter, toast, getFlights, data, deleteFlightHandler, role }) => {
   const [name, setName] = useState();
   const [fromAirport, setFromAirport] = useState('');
   const [toAirport, setToAirport] = useState('');
   
   const updateHandler = async (e, id) => {
      e.preventDefault();
      
      const check = {
         name: name.trim().length === 0,
         fromAirport: fromAirport.length === 0,
         toAirport: toAirport.length === 0
      }
      
      if(check.name || check.fromAirport || check.toAirport) {
         toast.warning('Maydon to\'ldirilmagan');
         return;
      }
      
      const params = {
         name,
         from_airport: fromAirport,
         to_airport: toAirport
      }
      
      try {
         await flightApi.update(id, params);
         getFlights();
         toast.success('Airoport yangilandi');
         setName('');
         setToAirport('');
         setFromAirport('');
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
         {role === '100' ? (
            <>
               <td className='text-center'>
                  <button className='btn btn-warning fw-bold text-white' data-bs-toggle="modal" data-bs-target={`#update${index}`} onClick={() => {
                     setName(item.name)
                     setFromAirport(item.from_airport)
                     setToAirport(item.to_airport)
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
                                    <input className='form-control' type='text' id='name' placeholder='name' onKeyDown={handleEnter} 
                                    value={name}
                                    onChange={e=>setName(e.target.value)}
                                    />
                                 </div>
                                 <div className='mb-3'>
                                    <select className='form-select' value={fromAirport} onChange={e => setFromAirport(e.target.value)} onKeyDown={handleEnter}>
                                       <option value=''>From airoport</option>
                                       {data.map((item, index) => (
                                          <option key={index} value={item.id}>{item.name}</option>
                                       ))}
                                    </select>
                                 </div>
                                 <div className='mb-3'>
                                    <select className='form-select' value={toAirport} onChange={e => setToAirport(e.target.value)} onKeyDown={handleEnter}>
                                       <option>To airoport</option>
                                       {data.map((item, index) => (
                                          <option key={index} value={item.id}>{item.name}</option>
                                       ))}
                                    </select>
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
                     deleteFlightHandler(e, item.id)
                  }}>
                     <i className='bi bi-trash'></i>
                  </button>
               </td>
            </>
         ): (<></>)}
      </tr>
   )
};

export default FlightList;
