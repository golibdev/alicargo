import React from 'react';

const SubmitOrderItem = ({ item, deleteOrderHandler }) => {
   return (
      <div className='container'>
         <div className="row">
            {/* <p>Client ID</p> */}
            <div className="col-4">
               <p className='mb-0'>Client ID</p>
               <p className='items'>{item.client.number}</p>
            </div>

            {/* <p>Shtrix kodi</p> */}
            <div className="col-4">
               <p className='mb-0'>Shtrix kodi</p>
               <p className='items'>{item.barcode}</p>
            </div>

            {/* <p>Og'irligi</p> */}
            <div className="col-3">
               <p className='mb-0'>Og'irligi</p>
               <p className='items'>{item.weight}</p>
            </div>
            <div className='col-1'>
               <p style={{ opacity: '0' }} className="mb-0">Delete</p>
               <button className="btn delet btn-danger col-8" onClick={(e) => {
                  deleteOrderHandler(e, item.id)
               }}>
                  <i className="bi bi-trash"></i>
               </button>
            </div>
         </div>
      </div>
   );
};

export default SubmitOrderItem;
