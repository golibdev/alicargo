import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import ReceiveList from './ReceiveList';
import './receive.css';
import newOrderApi from '../../api/newOrderApi';
import { wareHouseApi } from '../../api/wareHouseApi';


const Recive = () => {
  const [data, setData] = useState([])
  const [datas, setDatas] = useState([])
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
      if(index === 1) {
        form.elements[index + 2].focus();
        event.preventDefault();
      }
    }
  };

  const firstInput = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    firstInput.current.focus();
  };

  const handleBack = (event) => {
    event.preventDefault();
    firstInput.current.focus();
  }

  const getdataStatusTwo = async () => {
    try {
      const res = await newOrderApi.getStatusAll('2')
      setDatas(res.data.reverse())
    } catch (err) {}
  }

  const getData = async () => {
    try {
      const res = await newOrderApi.getStatus('3')
      setData(res.data.results.reverse())
      setPageCount(Math.ceil(res.data.count / 10))
      setLoading(true)
    } catch (err) {}
  }

  const getWareHouse = async () => {
    try {
       const res = await wareHouseApi.getAll()
       setWarehouses(res.data.reverse())
    } catch (err) {}
  }

  useEffect(() => {
    getData()
    getdataStatusTwo()
    getWareHouse()
  }, [])

  const filterClient = datas.filter(item => item.barcode === barcode)

  useEffect(() => {
    if(filterClient.length > 0) {
      setClient(filterClient[0].client.number)
      setWeight(filterClient[0].weight)
    } else {
      setClient('')
      setWeight('')
    }
  }, [filterClient])

  const updatedHandler = async (e) => {
    e.preventDefault()

    const check = {
      barcode: barcode.trim().length === 0,
      warehouse: warehouse.trim().length === 0
    }

    if(check.barcode || check.warehouse) {
      toast.error('Barcha maydonlar to\'ldirilishi shart!')
      return
    }

    const params = {
      warehouse: Number(warehouse),
      status: '3'
    }

    try {
      handleBack(e)
      await newOrderApi.updateOrder(barcode, params)
      setClient('')
      setBarcode('')
      setWeight('')
      setWarehouse('')
      getData()
      getdataStatusTwo()
      toast.success('Muvaffaqiyatli yangilandi!')
    } catch(err) {
      if(err.response.data.client) {
        toast.error(err.response.data.client[0])
      } else if(err.response.status === 404) {
        toast.error('Ma\'lumot mos kelmayapti!')
      }
    }
  }

  const deleteOrderHandler = async (e, barcode) => {
    e.preventDefault()
    try {
      await newOrderApi.deleteOrder(barcode)
      toast.success('Muvaqqatli o\'chirildi!')
      getData()
    } catch (err) {}
  }

  return (
    <div className="panel p-4">
      <Navbar />
      <form className="row">
        <div className="col-4" >
            <select className="form-select" value={warehouse} onChange={e => setWarehouse(e.target.value)}>
              <option value=''>Omborxonani tanlang</option>
              {warehouses.map((item, index) => (
              <option key={index} value={item.id}>
                  {item.name}
              </option>
              ))}
            </select>
        </div>
        <div className="col-4">
            <button className="btn btn-info text-white fw-bold mt-0" onClick={handleClick}>
              <i className="bi bi-check-circle del"></i> Davom etish
            </button>
        </div>
      </form>
      <form className="form-row row mt-3" onSubmit={updatedHandler}>
        <div className="col-4">
            <label>Client ID</label>
            <input
              type="number"
              className="form-control w-100 p-2"
              placeholder="Client IDni kiriting"
              value={client}
              disabled
            />
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
              ref={firstInput}
            />
        </div>
        <div className="col-3">
            <label >Og'irligi</label>
            <input
              type="number"
              className="form-control w-100 p-2"
              placeholder="Og'irligi"
              value={weight}
              disabled
            />
        </div>
        <div className="col-1">
            <button className="btn btn-success mt-4">
              <i className="bi bi-check-circle del p-2 "></i>
            </button>
        </div>
      </form>
      <hr />
      <div className="row mt-4 d-flex align-items-center justify-content-center">
        {/* NUM_OF_RECORDS={NUM_OF_RECORDS} */}
        {loading ? <ReceiveList deleteOrderHandler={deleteOrderHandler} currentPage={currentPage} cargos={data} pageCount={pageCount} setCargos={setData} setCurrentPage={setCurrentPage} setLoading={setLoading}  /> : <Loader />}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Recive;