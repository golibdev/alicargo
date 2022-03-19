import React, { useState, useEffect } from 'react';
import newOrderApi from '../../api/newOrderApi';
import { toast, ToastContainer } from 'react-toastify'
import OrderList from './OrderList';
import { Loader } from '../Loader/Loader'
import Navbar from '../Navbar/Navbar';
import { wareHouseApi } from '../../api/wareHouseApi';

const NewOrder = () => {
  const role = localStorage.getItem('role');
  const [data, setData] = useState([])
  const [client, setClient] = useState('')
  const [barcode, setBarcode] = useState('')
  const [weight, setWeight] = useState('')
  const [warehouse, setWarehouse] = useState('')
  const [warehouses, setWarehouses] = useState([])
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

  const fetchData = async () => {
    try {
      const res = await newOrderApi.getStatus('1')
      setData(res.data.results.reverse())
      setPageCount(Math.ceil(res.data.count / 10))
      setLoading(true)
    } catch (err) {}
  }

  const getWarehouses = async () => {
    try {
      const res = await wareHouseApi.getAll()
      setWarehouses(res.data)
    } catch (err) {}
  }

  useEffect(() => {
    getWarehouses()
    fetchData()
  }, [])

  const newOrderHandler = async (e) => {
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
      await newOrderApi.newOrder(params)
      setClient('')
      setBarcode('')
      setWeight('')
      // setWarehouse('')
      toast.success("Muvaffaqiyatli qo'shildi!")
      fetchData()
    } catch (err) {}
  }

  const deleteOrderHandler = async (barcode) => {
    try {
      await newOrderApi.deleteOrder(barcode)
      toast.success('Muvaqqatli o\'chirildi!')
      fetchData()
    } catch (err) {}
  }

  return (
    <div className="panel p-4">
      <Navbar/>
      <form className="form-row row mt-3" onSubmit={newOrderHandler}>
        <div className="col-3 mb-3">
          <label>Number</label>
          <input
            type="number"
            className="form-control w-100 p-2"
            placeholder="number"
            onKeyDown={handleEnter}
            value={client}
            onChange={(e) => setClient(e.target.value)}
            
          />

        </div>


        <div className="col-3 mb-3">
          <label >Shtrix kodi</label>
          <input
            type="text"
            className="form-control w-100 p-2"
            placeholder="Shtrix kodi"
            onKeyDown={handleEnter}
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />

        </div>


        <div className="col-2 mb-3">
          <label >Og'irligi</label>
          <input
            type="number"
            className="form-control w-100 p-2"
            placeholder="Og'irligi"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onKeyDown={handleEnter}
          />
        </div>
        <div className='col-3 mb-3'>
          <label>Ombor</label>
          <select className="form-select w-100 p-2"  onKeyDown={handleEnter} onChange={(e) => setWarehouse(e.target.value)}>
            <option value="">Warehouse</option>
            {warehouses.map((item, index) => (
              <option key={index} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="col-1 mb-3">
          <button className="btn btn-success mt-4" >
            <i className="bi bi-check-circle del p-2 "></i>
          </button>
        </div>
      </form>
      <hr/>

      <div className="row mt-4 d-flex align-items-center justify-content-center">
        {loading ? <OrderList deleteOrderHandler={deleteOrderHandler} currentPage={currentPage} role={role} cargos={data} pageCount={pageCount} setCargos={setData} setCurrentPage={setCurrentPage} setLoading={setLoading} /> : <Loader />}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default NewOrder;