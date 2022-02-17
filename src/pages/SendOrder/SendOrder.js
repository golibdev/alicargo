import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import SendOrderList from './SendOrderList';
import './send.css';
import newOrderApi from '../../api/newOrderApi';
import { flightApi } from '../../api/flightApi';

const SendOrder = () => {
  const [data, setData] = useState([])
  const [datas, setDatas] = useState([])
  const [airoport, setAiroport] = useState([])
  const [client, setClient] = useState('')
  const [barcode, setBarcode] = useState('')
  const [weight, setWeight] = useState('')
  const [flight, setFlight] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 2].focus();
      event.preventDefault();
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

  const getDataStatusOne = async () => {
    try {
      const res = await newOrderApi.getStatusAll('1')
      setDatas(res.data.reverse())
    } catch (err) {}
  }

  const getData = async () => {
    try {
      const res = await newOrderApi.getStatus('2')
      setData(res.data.results.reverse())
      setPageCount(Math.ceil(res.data.count / 10))
      setLoading(true)
    } catch (err) {}
  }

  const getFlights = async () => {
    try {
      const res = await flightApi.getAll()
      setAiroport(res.data)
    } catch (err) {}
  } 

  useEffect(() => {
    getData()
    getFlights()
    getDataStatusOne()
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

  const adddNewOrderHandler = async (e) => {
    e.preventDefault()

    const check = {
      barcode: barcode.trim().length === 0,
      flight: flight.length === 0
    }

    if(check.barcode || check.flight) {
      toast.error('Barcha maydonlar to\'ldirilishi shart!')
      return
    }

    const params = {
      status: '2',
      flight: Number(flight)
    }

    try {
      handleBack(e)
      await newOrderApi.updateOrder(barcode, params)
      setClient('')
      setBarcode('')
      setWeight('')
      toast.success("Muvaffaqiyatli qo'shildi!")
      getData()
      getDataStatusOne()
    } catch(err) {
      if(err.response.data.client) {
        toast.error(err.response.data.client[0])
      }else if(err.response.status === 404) {
        toast.error('Ma\'lumot mos kelmayapti!')
      }

      console.log(err.response);
    }
  }

  const deleteOrderHandler = async (e, barcode) => {
    e.preventDefault()
    try {
      await newOrderApi.deleteOrder(barcode)
      toast.success('Muvaqqatli o\'chirildi!')
      window.location.reload()
    } catch (err) {
      console.log(err.response);
    }
  }
  return (
    <div className="panel p-4">
      <Navbar />
      <form className="row">
        <div className="col-4" >
          <select className="form-select" value={flight} onChange={e => setFlight(e.target.value)}>
            <option value=''>Resyni tanlang</option>
            {airoport.map((item, index) => (
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
      <form className="form-row row mt-3" onSubmit={adddNewOrderHandler}>
        <div className="col-4">
          <label>Number</label>
          <input
            type="number"
            className="form-control w-100 p-2"
            placeholder="Number"
            onKeyDown={handleEnter}
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
        {loading ? <SendOrderList deleteOrderHandler={deleteOrderHandler} currentPage={currentPage} cargos={data} pageCount={pageCount} setCargos={setData} setCurrentPage={setCurrentPage} setLoading={setLoading} /> : <Loader />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SendOrder;