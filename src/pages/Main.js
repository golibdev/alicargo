import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import newOrderApi from '../api/newOrderApi';

function Main() {
  const navigate = useNavigate();
  const [number, setNumber] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);
  const [addres] = useState(['我們的地址是烏山市']);
  const copyClipBoardHandler = () => {
    navigator.clipboard.writeText([addres[0]])
    setCopyStatus(true);

    setTimeout(() => {
      setCopyStatus(false);
    }, 1000);
  }

  const getData = async () => {
    const check = {
      number: number.trim().length === 0
    }

    if(check.number) {
      toast.error("Nomer kiritmadingiz")
      return
    }
    try {
      const res = await newOrderApi.getOrderByNumber(number);
      toast.success("Biroz kuting...")
      setTimeout(() => {
        if(res.data.results.length > 0) {
          navigate(`/cargo/${res.data.results[0].client.id}`)
        } else {
          toast.error("Ma'lumot topilmadi")
          return
        }
      }, 1000)
    } catch (err) {}
  }
  return (
    <div className="container-fluid">
      <div className='row'>
        <div className="col-12 col-lg-4 col-md-12 col-sm-12 main-side  bg-light">
          <div className="container ">
            <div className="row text-center">
              <div className="col-10 mx-auto useForm">
                <h3 className="text-center mt-3">MY.ALICARGO.UZ</h3>
                <input type="text" className="form-control col-sm-12 mt-3" placeholder="Mijoz raqamini kiriting" value={number} onChange={e => setNumber(e.target.value)} />
                <button className="btn btn-primary w-100 mt-3" onClick={getData}> <i className="bi bi-eye"></i> Posilkalarni ko'rish</button>
                <div className="addres">
                  <h5>Xitoydagi omborhonamiz manzili:</h5>
                  <p>{addres[0]}</p>
                  <button className="btn btn-primary w-50 mt-3" onClick={copyClipBoardHandler}><i className="bi bi-clipboard"></i> {!copyStatus ? "Nusxa olish" : "Nusxa olindi" }</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8 col-lg-8 col-md-12 col-sm-12 d-xl-block d-lg-block d-none    main-content-user ">
        </div>
        <ToastContainer/>
      </div>
    </div>
  );

}

export default Main;