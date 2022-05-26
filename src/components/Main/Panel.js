import React from 'react';
import {Link} from "react-router-dom";
import Navbar from '../Navbar/Navbar';

function Panel() {

  const styles = {
    widthSm: {
      width: '49%'
    }
  }

  return (
    <>
      <div className="panel p-4">
        <Navbar/>

        <div className="row">
            <Link to='/home/new-order' className="btn btn-lg my-1 btn-primary p-3 mx-1 col-lg-3" style={styles.widthSm}>
                <i className="bi bi-plus-circle"></i> Yangi
            </Link>
              <Link to='/home/send-order' type="button" style={styles.widthSm} className="btn btn-lg my-1 btn-primary p-3 col-lg-3 mx-1">
              <i className="bi bi-send"></i> Jo'natish
              </Link>
              <Link to='/home/recive' type="button" style={styles.widthSm} className="btn btn-lg my-1 btn-primary p-3 mx-1 col-lg-3">
                <i className="bi bi-arrow-down-right-square"></i> Qabul qilish
                </Link>
            <Link style={styles.widthSm} to='/home/submit-order' type="button" className="btn btn-lg my-1 btn-primary p-3 mx-1 col-lg-3">
              <i className="bi bi-arrow-up-right-square"></i> Topshirish
            </Link>
        </div>
      </div>
    </>
  );
}

export default Panel;