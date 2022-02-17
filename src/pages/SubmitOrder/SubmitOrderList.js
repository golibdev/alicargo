import React from 'react';
import Alert from '../../components/Main/Alert';
import PaginationStatus from '../../components/Pagination/PaginationStatus';
import SubmitOrderItem from './SubmitOrderItem';

const SubmitOrderList = ({cargos, deleteOrderHandler, currentPage, setCargos, setCurrentPage, setLoading, pageCount}) => {
   return (
      cargos.length > 0 ? (
         <>
            {cargos.map((item, index) => (
               <SubmitOrderItem key={index} item={item} deleteOrderHandler={deleteOrderHandler} />
            ))}
            {pageCount > 1 ? (
               <PaginationStatus status={'4'} cargos={cargos} pageCount={pageCount} setCargos={setCargos}   setCurrentPage={setCurrentPage} currentPage={currentPage} setLoading={setLoading} />
            ): (
               <></>
            )}
         </>
      ):(
         <Alert/>
      )
   );
};

export default SubmitOrderList;
