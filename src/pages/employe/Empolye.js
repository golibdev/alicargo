import {useCallback, useEffect, useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { staffsApi } from '../../api/staffsApi';
import { wareHouseApi } from '../../api/wareHouseApi';
import { Loader } from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import Pagination from '../../components/Pagination/Pagination';
import EmpolyeTable from './EmpolyeTable';

function Empolye(props) {
  const [data, setData] = useState([]);
  const [wareHouses, setWareHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [warehouse, setWarehouse] = useState('');
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

  const getWarehouses = async () => {
    try {
      const res = await wareHouseApi.getAll();
      setWareHouses(res.data.reverse());
    } catch (err) {}
  }

  const getStaffs = async () => {
    try {
      const res = await staffsApi.getStaffs();
      setData(res.data.reverse());
      setLoading(true);
    } catch (err) {}
  }

  useEffect(() => {
    getWarehouses();
    getStaffs();
  }, [])

  const addStaffHandler = async (event) => {
    event.preventDefault();

    const check = {
      fullName: fullName.trim().length === 0,
      username: username.trim().length === 0,
      password: password.trim().length === 0,
      role: role.trim().length === 0,
      warehouse: warehouse.trim().length === 0
    }

    if (check.fullName || check.username || check.password || check.role || check.warehouse) {
      toast.warning('Barcha maydonlar to\'ldirilishi shart');
      return;
    }

    const params = {
      full_name: fullName,
      username,
      password,
      role,
      warehouse: Number(warehouse)
    }

    try {
      await staffsApi.createStaff(params);
      getStaffs();
      toast.success('Mijoz qo\'shildi');
      setFullName('');
      setUsername('');
      setPassword('');
      setRole('');
      setWarehouse('');
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

  const filter = currentData.filter(item => item.full_name.toLowerCase().includes(searchFilter.toLocaleLowerCase()) || item.username.toLowerCase().includes(searchFilter.toLocaleLowerCase()))

  return (
    <div className='panel w-100 p-4'>
      <Navbar/>

      <form className='row' onSubmit={addStaffHandler}>
        <div className='form-group col-3 mb-3'>
          <label htmlFor='fullName'>FullName</label>
          <input type='text' className='form-control' id='fullName' value={fullName} onChange={(e) => setFullName(e.target.value)} onKeyDown={handleEnter} />
        </div>

        <div className='form-group col-3 mb-3'>
          <label htmlFor='username'>Username</label>
          <input type='text' className='form-control' id='username' value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleEnter}/>
        </div>

        <div className='form-group col-2 mb-3'>
          <label htmlFor='username'>Password</label>
          <input type='password' className='form-control' id='username' value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleEnter}/>
        </div>

        <div className='form-group col-2 mb-3'>
          <label htmlFor='username'>Role</label>
          <select className='form-select' value={role} onChange={(e) => setRole(e.target.value)} onKeyDown={handleEnter}>
            <option value=''>Roleni tanlang</option>
            <option value='98'>Uzbek staff</option>
            <option value='99'>Xitoy Staff</option>
          </select>
        </div>

        <div className='form-group col-2 mb-3'>
          <label htmlFor='username'>Warehouse</label>
          <select className='form-select' value={warehouse} onChange={(e) => setWarehouse(e.target.value)} onKeyDown={handleEnter}>
            <option value=''>Warehouseni tanlang</option>
            {wareHouses.map((item, index) => (
              <option key={index} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className='form-group col-2 mb-3'>
          <button className='btn btn-primary'>
            <i className='fa fa-plus'></i>
            <span>Yaratish</span>
          </button>
        </div>
      </form>
      {loading ? (
        <div className='row'>
          <div className='col-12'>
          <input className='form-control mb-3' placeholder='Search fullname or username' value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
            <table className='table table-bordered table-striped text-center'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>FullName</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Warehouse</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              {searchFilter.length > 0 ? (
                  <>
                      {filter.length > 0 ? (
                        <>
                            {filter.map((item, index) => (
                              <EmpolyeTable item={item} index={currentPage === 1 ? index + 1 : index  + (currentPage - 1) * 10 + 1} toast={toast} getStaffs={getStaffs} handleEnter={handleEnter} key={index} />
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
                      {currentData.map((item, index) => (
                        <EmpolyeTable item={item} index={currentPage === 1 ? index + 1 : index  + (currentPage - 1) * 10 + 1} currentPage={currentPage} toast={toast} getStaffs={getStaffs} handleEnter={handleEnter} key={index} />
                      ))}
                  </>
                )}
              </tbody>
            </table>
            {
              Math.ceil(NUM_OF_RECORDS / LIMIT) > 1 ? (
                <Pagination
                  currentPage={currentPage}
                  totalRecords={NUM_OF_RECORDS}
                  pageLimit={LIMIT}
                  onPageChanged={onPageChanged}
                />
              ):(<></>)
            }
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
}

export default Empolye;