import {useEffect, useState, useCallback } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Loader } from '../../components/Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import WarhouseTable from './WarehouseTable';
import './warehouse.css';  
import { wareHouseApi } from '../../api/wareHouseApi';
import Pagination from '../../components/Pagination/Pagination';

const Warhouse = () => {
   const role = localStorage.getItem('role');
   const [warHouseName, setWarHouseName] = useState('');
   const [warHouseAddres, setWarHouseAddres] = useState('');
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [searchFilter, setSearchFilter] = useState('');
   const [currentPage, setCurrentPage] = useState(1);

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
         const res = await wareHouseApi.getAll()
         setData(res.data.reverse())
         setLoading(true)
      } catch (err) {}
   }

   useEffect(() => {
      getData()
   }, [])

   const addWareHouseHandler = async (e) => {
      e.preventDefault()

      const check = {
         warHouseName: warHouseName.trim().length === 0,
         warHouseAddres: warHouseAddres.trim().length === 0
      }

      if(check.warHouseName || check.warHouseAddres) {
         toast.warning('Barcha maydonlar to\'ldirilishi shart')
         return
      }

      const params = {
         name: warHouseName,
         address: warHouseAddres
      }

      try {
         await wareHouseApi.add(params)
         getData()
      } catch(err) {}
   }

   let NUM_OF_RECORDS = data.length;
   let LIMIT = 10;

   const onPageChanged = useCallback(
      (event, page) => {
        event.preventDefault();
        setCurrentPage(page);
      },
      [setCurrentPage]
   );
   const currentData = data.slice(
      (currentPage - 1) * LIMIT,
      (currentPage - 1) * LIMIT + LIMIT
   );

   const deleteWareHouseHandler = async (e, id) => {
      e.preventDefault()
      try {
         await wareHouseApi.delete(id)
         getData()
         toast.success('Muvaqqiyatli o\'chirildi')
      } catch (err) {}
   }
   return (
      <div className='panel w-100 p-4'>
         <Navbar/>
         <div className='container'>
            {role === '100' ? (
               <>
                <form className='row' onSubmit={addWareHouseHandler}>
                     <div className='col-6'>
                        <label className='form-label' id='number'>Ombor nomi</label>
                        <input className='form-control' type='text' id='number' placeholder='warehouse name' onKeyDown={handleEnter} value={warHouseName}  onChange={e=>setWarHouseName(e.target.value)} />
                     </div>
                     <div className='col-5'>
                        <label className='form-label' id='full_name'>Ombor manzili</label>
                        <input className='form-control' type='text' id='full_name' placeholder='warehouse addres'  onKeyDown={handleEnter} value={warHouseAddres} onChange={e=>setWarHouseAddres(e.target.value)} />
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
                  <input className='form-control mb-3' placeholder='Search Warhouse ID' value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
                     {data.length > 0 ? (
                       <>
                           <table className='table table-bordered fw-bold text-center table-striped table-hover'>
                              <thead>
                                 <tr>
                                    <td>#</td>
                                    <td>ID</td>
                                    <td>Warehouse name</td>
                                    <td>Warehouse addres</td>
                                    <td>Details</td>
                                    {role === '100' ? (
                                       <>
                                          <td>Update</td>
                                          <td>Delete</td>
                                       </>
                                    ): (
                                       <></>
                                    )}
                                 </tr>
                              </thead>

                              <tbody>
                                 {currentData.map((item, index) => (
                                    <WarhouseTable item={item} index={currentPage === 1 ? index + 1 : index  + (currentPage - 1) * 10 + 1} toast={toast} handleEnter={handleEnter} key={index} getData={getData} deleteWareHouseHandler={deleteWareHouseHandler} role={role} />
                                 ))}
                              </tbody>                        
                           </table>
                           {Math.ceil(NUM_OF_RECORDS/LIMIT) > 1 ? (
                              <Pagination
                                 totalRecords={NUM_OF_RECORDS}
                                 pageLimit={LIMIT}
                                 pageNeighbours={2}
                                 onPageChanged={onPageChanged}
                                 currentPage={currentPage}
                              />
                           ): (
                              <></>
                           )}
                       </>
                     ) : (
                        <div className='alert alert-info d-flex align-items-center justify-content-center'>
                           Omborlar ro'yxati bo'sh
                        </div>
                     )}
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

export default Warhouse;