import React from 'react';
import {Link} from "react-router-dom";
import Navbar from '../Navbar/Navbar';

function Panel() {
  return (
    <>
      <div className="panel p-4">
        <Navbar/>

        <div className="col-12 mt-5 mx-3">

         <div className="col">
         <Link to='/home/new-order' className="btn btn-lg btn-primary p-3 w-25 mx-2">
            <i className="bi bi-plus-circle"></i> Yangi
         </Link>

         <Link to='/home/new-id-order'  type="button" className="btn btn-lg btn-primary p-3 w-25 mx-2">
          <i className="bi bi-plus-circle"></i> ID bo'yicha
          </Link>
          <Link to='/home/send-order' type="button" className="btn btn-lg btn-primary p-3 w-25 mx-2">
          <i className="bi bi-send"></i> Jo'natish
          </Link>
         </div>

         <div className="col mt-5">
          <Link to='/home/recive' type="button" className="btn btn-lg btn-primary p-3 w-25 mx-2">
          <i className="bi bi-arrow-down-right-square"></i> Qabul qilish
          </Link>
          <Link to='/home/submit-order' type="button" className="btn btn-lg btn-primary p-3 w-25 mx-2">
            <i className="bi bi-arrow-up-right-square"></i> Topshirish
          </Link>
         </div>


        </div>


      </div>


    </>
  );
}

export default Panel;