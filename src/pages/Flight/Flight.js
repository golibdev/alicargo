import { useEffect, useState, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { airoportApi } from '../../api/airoportApi';
import { flightApi } from '../../api/flightApi';
import { Loader } from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import Pagination from '../../components/Pagination/Pagination';
import FlightList from './FlightList';

const Flight = () => {
  const role = localStorage.getItem('role');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [flights, setFlights] = useState([]);
  const [fromAirport, setFromAirport] = useState('')
  const [toAirport, setToAirport] = useState('')
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
  
  const getAiroports = async () => {
    try {
      const res = await airoportApi.getAllAiroports();
      setData(res.data.reverse());
      setLoading(true);
    } catch (err) {}
  }

  const getFlights = async () => {
    try {
      const res = await flightApi.getAll()
      setFlights(res.data.reverse());
    } catch (err) {}
  }

  useEffect(() => {
    getAiroports();
    getFlights();
  }, [])

  const newFlightHandler = async (e) => {
    e.preventDefault();

    const check = {
      name: name.trim().length === 0,
      fromAirport: fromAirport.trim().length === 0,
      toAirport: toAirport.trim().length === 0
    }

    if (check.name || check.fromAirport || check.toAirport) {
      toast.warning('Maydon to\'ldirilmagan');
      return;
    }

    const params = {
      name,
      from_airport: fromAirport,
      to_airport: toAirport
    }

    try {
      await flightApi.create(params);
      getFlights();
      toast.success('Aeroport qo\'shildi');
      setName('');
    } catch (err) {}
  }

  const deleteFlightHandler = async (e, id) => {
    e.preventDefault()
    try {
      await flightApi.delete(id);
      getFlights();
      toast.success('Aeroport o\'chirildi');
    } catch (err) {}
  }

  let NUM_OF_RECORDS = flights.length;
  let LIMIT = 10;

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = flights.slice(
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );
  const filter = flights.filter(item => item.name.toLowerCase().includes(searchFilter.toLowerCase()) || item.id === Number(searchFilter));


  return (
    <div className='panel p-4'>
      <Navbar />
      <div className='container'>

        {role === '100' ? (
          <form className='row' onSubmit={newFlightHandler}>

            <div className='col-3'>
              <label className='form-label' id='name'>Name</label>
              <input className='form-control' type='text' id='name' placeholder='name' onKeyDown={handleEnter} value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="col-4" >
            <label className='form-label' id='reys1'>From airoport</label>
              <select className="form-select" id="reys1" value={fromAirport} onChange={e => setFromAirport(e.target.value)}> 
                <option value=''>Jo'natilgan aeroportni tanlang</option>
                {data.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </select>

            </div>
            <div className="col-4" >
            <label className='form-label' id='reys2'>To airoport</label>
              <select className="form-select" id="rey2" value={toAirport} onChange={e => setToAirport(e.target.value)}> 
              <option value=''>Qabul qilinadigan aeroportni tanlang</option>
                {data.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </select>

            </div>

            <div className='col-1'>

              <label className='form-label'></label>
              <button className='btn btn-success fw-bold d-block mt-2'>
                <i className='bi bi-check'></i>
              </button>

            </div>

          </form>
        ): (<></>)}
        {loading ? (
          <div className='row'>
            <div className='col-12'>
              <input className='form-control mt-4 mb-4' placeholder='search' value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
              <div className='table-responsive'>
                {flights.length > 0 ? (
                  <table className='table table-bordered fw-bold text-center table-striped table-hover'> 
                    <thead>
                      <tr className='text-center'>
                        <td>#</td>
                        <th>Reys ID</th>
                        <th>Name</th>
                        {role === '100' ? (
                          <>
                            <th>Update</th>
                            <th>Delete</th>
                          </>
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
                                <FlightList key={index} item={item} index={currentPage === 1 ? index + 1 : index + (currentPage - 1) * 10 + 1} handleEnter={handleEnter} toast={toast} getFlights={getFlights} newFlightHandler={newFlightHandler} deleteFlightHandler={deleteFlightHandler} data={data} role={role} />
                              ))}
                            </>
                          ) : (
                            <tr>
                              <td colSpan='7'>No data</td>
                            </tr>
                          )}
                        </>
                      ) : (
                        <>
                          {currentData.map((item, index) => (
                            <FlightList key={index} item={item} index={currentPage === 1 ? index + 1 : index + (currentPage - 1) * 10 + 1} handleEnter={handleEnter} toast={toast} deleteFlightHandler={deleteFlightHandler} getFlights={getFlights} data={data} role={role} />
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                ) : (
                  <div className='alert alert-info d-flex align-items-center justify-content-center'>
                   Reyslar mavjud emas
                  </div>
                )}

                <div className="pagination-wrapper">
                  {Math.ceil(NUM_OF_RECORDS / LIMIT) > 1 ? (
                    <Pagination
                      totalRecords={NUM_OF_RECORDS}
                      pageLimit={LIMIT}
                      pageNeighbours={2}
                      onPageChanged={onPageChanged}
                      currentPage={currentPage}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='d-flex align-items-center justify-content-center mt-5'>
            <Loader />
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
};

export default Flight;
