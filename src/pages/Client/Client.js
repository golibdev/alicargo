import {useEffect, useState} from 'react';
import { clientApi } from '../../api/clientApi';
import Navbar from '../../components/Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from '../../components/Loader/Loader';
import ClientsTable from './ClientsTable';
import './client.css'
import Alert from '../../components/Main/Alert';
import PaginationClient from '../../components/Pagination/PaginationClient';

export const Client = () => {
   const role = localStorage.getItem('role');
   const [number, setNumber] = useState('');
   const [fullName, setFullName] = useState('');
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [searchFilter, setSearchFilter] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [pageCount, setPageCount] = useState(0);

   const handleEnter = (event) => {
      if (event.key.toLowerCase() === "enter") {
        const form = event.target.form;
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
      }
   };

   const getData = async () => {
      try {
         const res = await clientApi.getAllClient()
         setData(res.data.results.reverse())
         setPageCount(Math.ceil(res.data.count / 10))
         setLoading(true)
      } catch (err) {}
   }

   const addClientHandler = async (event) => {
      event.preventDefault()
      
      const check = {
         number: number.trim().length === 0,
      }

      if(check.number){
         toast.warning('Number kiritish majburiy')
         return
      }

      const params = {
         number,
         full_name: fullName
      }

      try {
         await clientApi.add(params)
         getData()
         toast.success('Mijoz qo\'shildi')
         setNumber('')
         setFullName('')
      } catch(err) {}

   }

   useEffect(() => {
      getData()
   }, [])

   const deleteClientHandler = async (id) => {
      try {
         await clientApi.deleteClient(id)
         toast.success('Mijoz o`chirildi')
         getData()
      } catch (err) {}
   };

   const filter = data.filter(item => item.number.toLowerCase().includes(searchFilter.toLowerCase()))
   return (
      <div className='panel p-4'>
         <Navbar/>
         <div className='container'>
            {role === '100' ? (
               <>
                  <form className='row' onSubmit={addClientHandler}>
                     <div className='col-6'>
                        <label className='form-label' id='number'>Number</label>
                        <input className='form-control' type='text' id='number' placeholder='number' onKeyDown={handleEnter} value={number} onChange={e=>setNumber(e.target.value)} />
                     </div>
                     <div className='col-5'>
                        <label className='form-label' id='full_name'>Full name</label>
                        <input className='form-control' type='text' id='full_name' placeholder='Full name'  onKeyDown={handleEnter} value={fullName} onChange={e=>setFullName(e.target.value)} />
                     </div>
                     <div className='col-1'>
                        <label className='form-label' id='age'></label>
                        <button className='btn btn-success fw-bold d-block mt-2' type='submit'>
                           <i className='bi bi-check'></i>
                        </button>
                     </div>
                  </form>
                  <hr/>
               </>
            ): (<></>)}

            {loading ? (
               <div className='row'>
                  <div className='col-12'>
                     <input className='form-control mb-3' placeholder='Search user number' value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
                     <div className='table-responsive'>
                        {data.length > 0 ? (
                           <table className='table table-bordered fw-bold text-center table-striped table-hover'>
                              <thead>
                                 <tr>
                                    <td>#</td>
                                    <td>number</td>
                                    <td>Full name</td>
                                    {role === '100' ? (
                                       <><td>Update</td>
                                       <td>Delete</td></>
                                    ): (
                                       <></>
                                    )}
                                 </tr>
                              </thead>
                              <tbody>
                                 {searchFilter.length > 0 ? (
                                    <>
                                       {filter.length > 0 ? (
                                          <>
                                             {filter.map((item, index) => (
                                                <ClientsTable item={item} index={currentPage === 1 ? index + 1 : index  + (currentPage - 1) * 10 + 1} deleteClientHandler={deleteClientHandler} toast={toast} getData={getData} handleEnter={handleEnter} key={index} role={role} />
                                             ))}
                                          </>
                                       ): (
                                          <tr>
                                             <td colSpan='7'>No data</td>
                                          </tr>
                                       )}
                                    </>
                                 ): (
                                    <>
                                       {data.map((item, index) => (
                                          <ClientsTable item={item} index={currentPage === 1 ? index + 1 : index  + (currentPage - 1) * 10 + 1} currentPage={currentPage} deleteClientHandler={deleteClientHandler} toast={toast} getData={getData} handleEnter={handleEnter} key={index} role={role} />
                                       ))}
                                    </>
                                 )}
                              </tbody>
                           </table>
                        ): (
                           <Alert/>
                        )}
                        <div className="pagination-wrapper">
                           {pageCount > 1 ? (
                              <>
                                 {searchFilter.length > 0 ? (
                                    <PaginationClient cargos={filter} pageCount={Math.ceil(filter.length / 10)} setCargos={setData} setCurrentPage={setCurrentPage} currentPage={currentPage} setLoading={setLoading} />
                                 ): (
                                    <PaginationClient cargos={data} pageCount={pageCount} setCargos={setData} setCurrentPage={setCurrentPage} currentPage={currentPage} setLoading={setLoading} />
                                 )}
                              </>
                           ): (
                              <></>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            ): (
               <div className='d-flex align-items-center justify-content-center'>
                  <Loader/>
               </div>
            )}
         </div>
         <ToastContainer/>
      </div>
   );
};
