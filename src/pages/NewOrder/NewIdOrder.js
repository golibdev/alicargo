import React, { useState, useEffect , useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import IdOrderList from './IdOrderList';
import './id.css';
import newOrderApi from '../../api/newOrderApi';
import { wareHouseApi } from '../../api/wareHouseApi';

const NewIdOrder = () => {
  const [data, setData] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [warehouse, setWarehouse] = useState('')
  const [client, setClient] = useState('')
  const [barcode, setBarcode] = useState('')
  const [weight, setWeight] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)


  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  const three=useRef();
  
  const handleBack = (event) => {
    event.preventDefault();
    three.current.focus();
  }

  const firstInput = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    firstInput.current.focus();
  };

  const getWarehouses = async () => {
    try {
      const res = await wareHouseApi.getAll()
      setWarehouses(res.data)
    } catch (err) {}
  }

  const getData = async () => {
    try {
      const res = await newOrderApi.getStatus('1')
      setData(res.data.results.reverse())
      setPageCount(Math.ceil(res.data.count / 10))  
      setLoading(true)
    } catch (err) {}
  }

  useEffect(() => {
    getData()
    getWarehouses()
  }, [])

  const adddNewOrderHandler = async (e) => {
    e.preventDefault()

    const check = {
      client: client.trim().length === 0,
      barcode: barcode.trim().length === 0,
      weight: weight.length === 0,
      warehouse: warehouse.length === 0
    }

    if(check.client || check.barcode || check.weight || check.warehouse) {
      toast.error('Barcha maydonlar to\'ldirilishi shart!')
      return
    }

    const params = {
      client: client,
      barcode,
      weight: Number(weight),
      warehouse: Number(warehouse)
    }

    try {
      handleBack(e)
      await newOrderApi.newOrder(params)
      setBarcode('')
      setWeight('')
      toast.success('Muvaffaqiyatli qo\'shildi!')
      getData()
    } catch(err) {
      if(err.response.data.client) {
        toast.error(err.response.data.client[0])
      }
    }
  }

  const deleteOrderHandler = async (id) => {
    try {
      await newOrderApi.deleteOrder(id)
      toast.success('Muvaqqatli o\'chirildi!')
      getData()
    } catch (err) {}
  }

  
  return (
    <div className="panel p-4">
      <Navbar/>
      <form className="row">
        <div className="col-4" >
          <label>Number</label>
          <input
            type="text"
            className="form-control w-100 p-2"
            placeholder="number"
            onKeyDown={handleEnter}
            onChange={(e) => setClient(e.target.value)}
          />
        </div>
        <div className="col-4">
          <button className="btn btn-info text-white fw-bold mt-4" onClick={handleClick}>
            <i className="bi bi-check-circle del"></i> Davom etish
          </button>
        </div>
     </form>
      <form className="form-row row mt-3" onSubmit={adddNewOrderHandler}>
        <div className='col-4'>
          <label>Omborxona</label>
          <select className="form-select w-100 p-2" value={warehouse} onChange={(e) => setWarehouse(e.target.value)} ref={firstInput} onKeyDown={handleEnter}>
            <option value="">Omborxona</option>
            {warehouses.map((item, index) => (
              <option key={index} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="col-4">
          <label >Shtrix kodi</label>
          <input
            type="text"
            className="form-control w-100 p-2"
            placeholder="Shtrix kodi"
            onKeyDown={handleEnter}
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            ref={three}
          />
        </div>
        <div className="col-3">
          <label >Og'irligi</label>
          <input
            type="number"
            className="form-control w-100 p-2"
            placeholder="Og'irligi"
            onKeyDown={handleEnter}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="col-1">
          <button className="btn btn-success text-white fw-bold mt-4">
            <i className="bi bi-check-circle del"></i>
          </button>
        </div>
      </form>
      <hr/>
      <div className="row mt-4 d-flex align-items-center justify-content-center">
        {loading ? <IdOrderList deleteOrderHandler={deleteOrderHandler} currentPage={currentPage} cargos={data} pageCount={pageCount} setCargos={setData} setCurrentPage={setCurrentPage} setLoading={setLoading}  /> : <Loader />}
      </div>

      <ToastContainer/>
    </div>
  );
};

export default NewIdOrder;