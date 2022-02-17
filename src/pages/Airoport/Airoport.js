import {useEffect, useState, useCallback} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { airoportApi } from '../../api/airoportApi';
import { Loader } from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import Pagination from '../../components/Pagination/Pagination';
import AiroportTable from './AiroportTable';

const Airoport = () => {
   const [name, setName] = useState('');
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [searchFilter, setSearchFilter] = useState('');
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
         const res = await airoportApi.getAllAiroports();
         setData(res.data.reverse());
         setLoading(true);
      } catch (err) {}
   }
   useEffect(() => {
      getData();
   })

   const newAirportHandler = async (e) => {
      e.preventDefault();

      const check = {
         name: name.trim().length === 0
      }

      if (check.name) {
         toast.warning('Maydon to\'ldirilmagan');
         return;
      }

      const params = {
         name
      }

      try {
         await airoportApi.createAiroport(params);
         getData();
         toast.success('Airoport qo\'shildi');
         setName('');
      } catch (err) {}
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

   const deleteAiroportHandler = async (e, id) => {
      e.preventDefault();
      try {
         await airoportApi.deleteAiroport(id)
         getData();
         toast.success('Airoport o\'chirildi');
      } catch (err) {}
   }

   const filter = data.filter(item => item.name.toLowerCase().includes(searchFilter.toLowerCase()))
   return (
      <div className='panel p-4'>
         <Navbar/>
         <div className='container'>
            <form className='row' onSubmit={newAirportHandler}>
               <div className='col-6'>
                  <label className='form-label' id='name'>Name</label>
                  <input className='form-control' type='text' id='name' placeholder='name' onKeyDown={handleEnter} value={name} onChange={e => setName(e.target.value)} />
               </div>
               <div className='col-6'>
                  <label className='form-label'></label>
                  <button className='btn btn-success fw-bold d-block mt-2'>
                     <i className='bi bi-check'></i>
                  </button>
               </div>
            </form>
            {loading ? (
               <div className='row'>
                  <div className='col-12'>
                     <input className='form-control mt-4 mb-4' placeholder='search' value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
                     <div className='table-responsive'>
                        {data.length > 0 ? (
                           <table className='table table-bordered fw-bold text-center table-striped table-hover'>
                              <thead>
                                 <tr className='text-center'>
                                    <td>#</td>
                                    <th>Airoport ID</th>
                                    <th>Name</th>
                                    <th>Is Active</th>
                                    <th>Details</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                 </tr>
                              </thead>
                              {searchFilter.length > 0 ? (
                                 <>
                                    {filter.length > 0 ? (
                                       <tbody>
                                          {filter.map((item, index) => (
                                             <AiroportTable key={index} item={item} index={currentPage === 1 ? index + 1 : index  + (currentPage - 1) * 10 + 1} handleEnter={handleEnter} deleteAiroportHandler={deleteAiroportHandler} toast={toast} getData={getData} />
                                          ))}
                                       </tbody>
                                    ): (
                                       <tr>
                                          <td colSpan='7'>No data</td>
                                       </tr>
                                    )}
                                 </>
                              ): (
                                 <tbody>
                                    {currentData.map((item, index) => (
                                       <AiroportTable key={index} item={item} index={currentPage === 1 ? index + 1 : index  + (currentPage - 1) * 10 + 1} handleEnter={handleEnter} deleteAiroportHandler={deleteAiroportHandler} toast={toast} getData={getData} />
                                    ))}
                                 </tbody>
                              )}
                           </table>
                           
                        ): (
                           <div className='alert alert-info d-flex align-items-center justify-content-center'>
                              Airoportlar mavjud emas
                           </div>
                        )}

                        <div className="pagination-wrapper">
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
                        </div>
                     </div>
                  </div>
               </div>
            ): (
               <div className='d-flex align-items-center justify-content-center mt-5'>
                  <Loader/>
               </div>
            )}
         </div>
         <ToastContainer/>
      </div>
   )
};

export default Airoport;
