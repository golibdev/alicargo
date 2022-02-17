import React from 'react';

const IdOrderItem = ({item, deleteOrderHandler}) => {
  return (
    <div className='container'>
      <div className="row">
         
          {/* <p>Shtrix kodi</p> */}
          <div className="col-6">
            <p className='mb-0'>Shtrix kodi</p>
            <p className='items'>{item.barcode}</p>
          </div>

          {/* <p>Og'irligi</p> */}
          <div className="col-5">
            <p className='mb-0'>Og'irligi</p>
            <p className='items'>{item.weight}</p>
          </div>
          <div className='col-1'>
            <p style={{ opacity: '0' }} className="mb-0">Delete</p>
            <div className="btn delet btn-danger col-8" onClick={() => {
              deleteOrderHandler(item.id)
            }}><i className="bi bi-trash"></i></div>
          </div>
      </div>
    </div>
  );
};

export default IdOrderItem;